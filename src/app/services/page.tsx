"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/ServiceCard"
import { useI18n } from "@/lib/i18n/context"
import {
    GraduationCap,
    School,
    Building2,
    BookOpen,
    UserCheck,
    Plane,
    FileText,
    HelpCircle,
} from "lucide-react"

export default function ServicesPage() {
    const { t } = useI18n()

    const services = [
        {
            titleKey: "servicesPage.k12International.title",
            descKey: "servicesPage.k12International.desc",
            featuresKey: "servicesPage.k12International.features",
            icon: School,
            href: "/study-abroad",
            variant: "featured" as const,
        },
        {
            titleKey: "servicesPage.publicAeis.title",
            descKey: "servicesPage.publicAeis.desc",
            featuresKey: "servicesPage.publicAeis.features",
            icon: GraduationCap,
            href: "/study-abroad",
            variant: "featured" as const,
        },
        {
            titleKey: "servicesPage.privateUni.title",
            descKey: "servicesPage.privateUni.desc",
            featuresKey: "servicesPage.privateUni.features",
            icon: Building2,
            href: "/study-abroad",
            variant: "default" as const,
        },
        {
            titleKey: "servicesPage.publicUni.title",
            descKey: "servicesPage.publicUni.desc",
            featuresKey: "servicesPage.publicUni.features",
            icon: BookOpen,
            href: "/study-abroad",
            variant: "featured" as const,
        },
        {
            titleKey: "servicesPage.butler.title",
            descKey: "servicesPage.butler.desc",
            featuresKey: "servicesPage.butler.features",
            icon: UserCheck,
            href: "/butler-concierge",
            variant: "featured" as const,
        },
        {
            titleKey: "servicesPage.studyTours.title",
            descKey: "servicesPage.studyTours.desc",
            featuresKey: "servicesPage.studyTours.features",
            icon: Plane,
            href: "/contact",
            variant: "default" as const,
        },
        {
            titleKey: "servicesPage.documents.title",
            descKey: "servicesPage.documents.desc",
            featuresKey: "servicesPage.documents.features",
            icon: FileText,
            href: "/contact",
            variant: "default" as const,
        },
        {
            titleKey: "servicesPage.academic.title",
            descKey: "servicesPage.academic.desc",
            featuresKey: "servicesPage.academic.features",
            icon: HelpCircle,
            href: "/contact",
            variant: "default" as const,
        },
    ]

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            {t("servicesPage.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed sm:text-xl">
                            {t("servicesPage.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 lg:py-24 bg-background">
                <div className="container">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.titleKey}
                                titleKey={service.titleKey}
                                descKey={service.descKey}
                                featuresKey={service.featuresKey}
                                icon={service.icon}
                                href={service.href}
                                variant={service.variant}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-secondary">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            {t("servicesPage.cta.title")}
                        </h2>
                        <p className="mt-4 text-lg text-white/80">
                            {t("servicesPage.cta.subtitle")}
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="mt-8 bg-primary hover:bg-primary/90 text-white"
                        >
                            <Link href="/contact">
                                {t("servicesPage.cta.button")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
