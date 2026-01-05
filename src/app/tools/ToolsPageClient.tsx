"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import InteractiveMap from "@/components/map/InteractiveMap"
import SchoolPathfinder from "@/components/home/SchoolPathfinder"

export function ToolsPageClient() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t("tools.hero.title")}
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              {t("tools.hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                <a href="#map">{t("tools.hero.jump.map")}</a>
              </Button>
              <Button asChild variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                <a href="#pathfinder">{t("tools.hero.jump.pathfinder")}</a>
              </Button>
              <Button asChild variant="secondary" className="bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 border-none">
                <Link href="/tools/course-matcher">Course Matcher (New)</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/contact">{t("tools.hero.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="map" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("home.explore.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("home.explore.subtitle1")}
              <br />
              {t("home.explore.subtitle2")}
            </p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      <section id="pathfinder" className="py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <SchoolPathfinder />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              {t("tools.footer.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("tools.footer.subtitle")}
            </p>
            <div className="mt-8 flex items-center justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/contact">{t("tools.footer.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

