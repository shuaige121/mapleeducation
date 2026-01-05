"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n/context"

export function CTA() {
    const { t } = useI18n()

    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("cta.title")}</h2>
                <p className="mx-auto mt-4 max-w-[600px] text-lg text-primary-foreground/90">
                    {t("cta.subtitle")}
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                    <Button asChild size="lg" variant="secondary" className="text-lg font-semibold">
                        <Link href="/contact?type=student">
                            {t("cta.student")}
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg font-semibold">
                        <Link href="/contact?type=corporate">
                            {t("cta.corporate")}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
