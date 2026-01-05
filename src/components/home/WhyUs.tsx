"use client"

import { CheckCircle2 } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function WhyUs() {
    const { t } = useI18n()

    const features = [
        {
            titleKey: "whyUs.local.title",
            descKey: "whyUs.local.desc",
        },
        {
            titleKey: "whyUs.transparent.title",
            descKey: "whyUs.transparent.desc",
        },
        {
            titleKey: "whyUs.compliance.title",
            descKey: "whyUs.compliance.desc",
        },
    ]

    return (
        <section className="py-20 bg-muted/50">
            <div className="container">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">{t("whyUs.title")}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t("whyUs.subtitle")}
                        </p>
                        <div className="mt-8 grid gap-6">
                            {features.map((feature) => (
                                <div key={feature.titleKey} className="flex gap-4">
                                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-secondary">{t(feature.titleKey)}</h3>
                                        <p className="text-muted-foreground">{t(feature.descKey)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-muted shadow-xl lg:aspect-square">
                        {/* Placeholder for a team photo or office shot */}
                        <div className="flex h-full items-center justify-center rounded-lg border border-border bg-muted/50 overflow-hidden">
                            <img src="/assets/placeholder-user.jpg" alt="Team" className="h-full w-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
