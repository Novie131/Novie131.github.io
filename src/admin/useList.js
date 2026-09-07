import { useMemo } from 'react'

/**
 * 清單通用操作 —— 所有編輯器的陣列欄位都走這裡。
 *
 * update / replace 的差別：物件清單用 update（合併欄位），
 * 純值清單（色票、段落）用 replace（整個換掉）。
 */
export default function useList(list, setList) {
  return useMemo(() => ({
    update: (i, patch) => setList(list.map((it, n) => (n === i ? { ...it, ...patch } : it))),
    replace: (i, value) => setList(list.map((it, n) => (n === i ? value : it))),
    remove: i => setList(list.filter((_, n) => n !== i)),
    move: (i, dir) => {
      const j = i + dir
      if (j < 0 || j >= list.length) return
      const next = [...list]
      next[i] = list[j]
      next[j] = list[i]
      setList(next)
    },
    add: item => setList([...list, item]),
  }), [list, setList])
}
