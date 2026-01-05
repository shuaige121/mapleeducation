"use client"

import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, UserCheck } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Services() {
    const { t } = useI18n()

    const services = [
        {
            titleKey: "services.studyAbroad.title",
            descKey: "services.studyAbroad.desc",
            icon: GraduationCap,
            href: "/study-abroad",
            ctaKey: "services.studyAbroad.cta",
        },
        {
            titleKey: "services.immigration.title",
            descKey: "services.immigration.desc",
            icon: Briefcase,
            href: "/immigration-workpasses",
            ctaKey: "services.immigration.cta",
        },
        {
            titleKey: "services.concierge.title",
            descKey: "services.concierge.desc",
            icon: UserCheck,
            href: "/butler-concierge",
            ctaKey: "services.concierge.cta",
        },
    ]

    return (
        <section className="py-20 bg-background">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">{t("services.title")}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {services.map((service) => (
                        <Card key={service.titleKey} className="flex flex-col border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl text-secondary">{t(service.titleKey)}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription className="text-base">{t(service.descKey)}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="ghost" className="w-full justify-start p-0 text-primary hover:text-primary/80 hover:bg-transparent">
                                    <Link href={service.href} className="flex items-center gap-2">
                                        {t(service.ctaKey)} &rarr;
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
