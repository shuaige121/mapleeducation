"use client"

import { useEffect } from "react"
import { useI18n } from "@/lib/i18n/context"

export function HtmlLangSync() {
  const { locale } = useI18n()

  useEffect(() => {
    try {
      document.documentElement.lang = locale === "zh" ? "zh-CN" : "en"
    } catch {
      // ignore
    }
  }, [locale])

  return null
}

