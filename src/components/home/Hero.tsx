"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n/context"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"

export function Hero() {
    const { t, locale } = useI18n()

    return (
        <section className="relative overflow-hidden bg-muted/40 py-20 lg:py-32">
            <div className="absolute inset-0 z-0">
                <img src="/assets/hero-bg.webp" alt="Singapore Skyline" className="h-full w-full object-cover opacity-10" />
            </div>
            <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl xl:text-6xl">
                        {locale === "en" ? (
                            <>
                                {t("hero.title1")} <br />
                                <span className="text-primary">{t("hero.title2")}</span>
                            </>
                        ) : (
                            <>
                                <span className="text-primary">{t("hero.title1")}</span>
                                <br />
                                {t("hero.title2")}
                            </>
                        )}
                    </h1>
                    <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
                        {t("hero.subtitle")}
                        <br className="hidden sm:inline" />
                        {t("hero.subtitle2")}
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                            <Link href="/study-abroad">
                                {t("hero.cta1")}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg border-secondary text-secondary hover:bg-secondary/10">
                            <Link href="/immigration-workpasses">
                                {t("hero.cta2")}
                            </Link>
                        </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex -space-x-2">
                            {/* Placeholder for user avatars or trust indicators if needed */}
                        </div>
                        <p>{t("hero.trust")}</p>
                    </div>
                </div>
                <div className="relative mx-auto aspect-square w-full max-w-[500px] lg:mx-0">
                    {/* Decorative background circle */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl" />

                    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                        {/* <ImagePlaceholder className="h-full w-full" label="HERO IMAGE" /> */}
                        <img src="/assets/study-hero.webp" alt="Student Life in Singapore" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    )
}
