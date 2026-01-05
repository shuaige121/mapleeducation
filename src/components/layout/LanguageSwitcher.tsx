"use client"

import { useI18n, Locale } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const toggleLocale = () => {
    const newLocale: Locale = locale === "en" ? "zh" : "en"
    setLocale(newLocale)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="flex items-center gap-1.5 text-sm font-medium"
    >
      <Globe className="h-4 w-4" />
      <span>{locale === "en" ? "中文" : "EN"}</span>
    </Button>
  )
}
