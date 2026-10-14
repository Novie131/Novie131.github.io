#!/usr/bin/env bash
#
# 一鍵發布 —— 自動 commit 目前的改動並推上 main，觸發 GitHub Actions 部署。
#
#   ./deploy.sh                        # 自動產生 commit 訊息
#   ./deploy.sh -m "更新作品集"
#   ./deploy.sh -m "只改幾個字" -n     # 跳過檢查
#
# 工作區沒有改動、但有已 commit 還沒 push 的東西時，會直接 push。
#
# 預設會先跑 lint 和 build。這不是形式 —— workflow 拿到你推的 commit 之後會
# 重跑一次 npm run build，本機建不起來的東西線上一樣建不起來，差別只在於
# 你要嘛現在花十秒知道，要嘛一分鐘後去 Actions 分頁看紅色叉叉。

set -euo pipefail

cd "$(dirname "$0")"

MSG=""
SKIP_CHECKS=0

usage() {
  cat <<'EOF'
用法：./deploy.sh [-m "commit 訊息"] [-n]

  -m <訊息>   commit 訊息（省略則自動產生「chore: 更新網站（日期時間）」）
  -n          跳過 lint 與 build 檢查
  -h          顯示這段說明

流程：確認在 main → 確認有改動或未推送的 commit → lint → build → commit → push
push 之後 GitHub Actions 約一分鐘完成部署。
EOF
}

while getopts ":m:nh" opt; do
  case "$opt" in
    m)  MSG="$OPTARG" ;;
    n)  SKIP_CHECKS=1 ;;
    h)  usage; exit 0 ;;
    :)  echo "❌ -$OPTARG 需要一個值" >&2; exit 1 ;;
    \?) echo "❌ 未知選項：-$OPTARG" >&2; echo >&2; usage >&2; exit 1 ;;
  esac
done

# 只有 main 會觸發 .github/workflows/deploy.yml
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" != "main" ]]; then
  echo "❌ 目前在 $BRANCH 分支，但只有 main 會觸發部署。" >&2
  echo "   切回去：git switch main" >&2
  exit 1
fi

DIRTY="$(git status --porcelain)"
# 已經 commit 但還沒推上去的數量；沒有 upstream 時當作 0
AHEAD="$(git rev-list --count '@{u}..HEAD' 2>/dev/null || echo 0)"

if [[ -z "$DIRTY" && "$AHEAD" -eq 0 ]]; then
  echo "✅ 沒有任何變更，也沒有未推送的 commit —— 不需要發布。"
  exit 0
fi

if [[ -n "$DIRTY" ]]; then
  echo "本次要 commit 的變更："
  git status --short
  echo
fi
if [[ "$AHEAD" -gt 0 ]]; then
  echo "尚未推送的 commit（$AHEAD 個）："
  git log --oneline '@{u}..HEAD'
  echo
fi

if [[ "$SKIP_CHECKS" -eq 0 ]]; then
  if [[ ! -d node_modules ]]; then
    echo "❌ 找不到 node_modules，請先跑：npm ci" >&2
    exit 1
  fi

  echo "▶ lint…"
  npm run lint --silent

  echo "▶ build…"
  npm run build --silent

  echo
  echo "✅ 檢查通過"
  echo
fi

if [[ -n "$DIRTY" ]]; then
  if [[ -z "$MSG" ]]; then
    # 沒給 -m 就自動產生：標題放時間，內文列出改到的檔案，事後翻 log 還看得出改了什麼
    MSG="chore: 更新網站（$(date '+%Y-%m-%d %H:%M')）"
    git add -A
    git commit -q -m "$MSG" -m "$(git diff --cached --name-status)"
  else
    git add -A
    git commit -q -m "$MSG"
  fi
  echo "📝 已 commit：$(git log --oneline -1)"
fi

git push

SHA="$(git rev-parse --short HEAD)"
REPO="$(git remote get-url origin | sed -E 's#(git@|https://)github\.com[:/]##; s#\.git$##')"

echo
echo "🚀 已推送 $SHA"
echo "   Actions： https://github.com/$REPO/actions"
echo "   網站：    https://novie131.github.io/"
echo
echo "   約一分鐘後生效。看不到改動的話先 Ctrl+F5 硬重新整理。"
