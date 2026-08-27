import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'

/* 路由 → i18n key 前綴 */
const ROUTE_META = {
  '/':          'meta.home',
  '/about':     'meta.about',
  '/portfolio': 'meta.portfolio',
  '/resume':    'meta.resume',
  '/contact':   'meta.contact',
}

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * SPA 換頁時同步 <title>、meta description、og:* 與 <html lang>。
 * 沒有這段，所有頁面在瀏覽紀錄、分頁列與分享預覽裡都長得一模一樣。
 */
export default function usePageMeta() {
  const { pathname } = useLocation()
  const { lang, t } = useLang()

  useEffect(() => {
    const prefix = ROUTE_META[pathname] ?? 'meta.404'
    const title = t(`${prefix}.title`)
    const desc  = t(`${prefix}.desc`)
    const url   = `https://novie131.github.io${pathname}`

    document.title = title
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en'

    setMeta('meta[name="description"]',        'content', desc)
    setMeta('meta[property="og:title"]',       'content', title)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]',         'content', url)
    setMeta('meta[name="twitter:title"]',       'content', title)
    setMeta('meta[name="twitter:description"]', 'content', desc)
    setMeta('link[rel="canonical"]',            'href',    url)
  }, [pathname, lang, t])
}
