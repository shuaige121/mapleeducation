"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n/context"
import { Heart, Shield, Users, Award, Building2, AlertCircle } from "lucide-react"

export default function AboutPage() {
    const { t } = useI18n()

    const values = [
        {
            icon: Heart,
            titleKey: "about.values.integrity.title",
            descKey: "about.values.integrity.desc",
        },
        {
            icon: Award,
            titleKey: "about.values.professionalism.title",
            descKey: "about.values.professionalism.desc",
        },
        {
            icon: Users,
            titleKey: "about.values.care.title",
            descKey: "about.values.care.desc",
        },
        {
            icon: Shield,
            titleKey: "about.values.compliance.title",
            descKey: "about.values.compliance.desc",
        },
    ]

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {t("about.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg text-white/80">
                            {t("about.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                                {t("about.story.title")}
                            </h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p className="text-lg leading-relaxed">
                                    {t("about.story.p1")}
                                </p>
                                <p className="leading-relaxed">
                                    {t("about.story.p2")}
                                </p>
                                <p className="leading-relaxed">
                                    {t("about.story.p3")}
                                </p>
                            </div>
                        </div>
                        <div className="relative mx-auto aspect-square w-full max-w-[400px] lg:mx-0">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl" />
                            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted shadow-xl">
                                <img src="/assets/placeholder-user.jpg" alt="About Us" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {t("about.mission.title")}
                        </h2>
                        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                            {t("about.mission.desc")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                        {t("about.values.title")}
                    </h2>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <Card key={value.titleKey} className="border-none bg-muted/50 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <value.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="mb-2 font-semibold text-secondary">
                                        {t(value.titleKey)}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t(value.descKey)}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-secondary py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <Users className="mx-auto mb-6 h-12 w-12 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            {t("about.team.title")}
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-white/80">
                            {t("about.team.desc")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Legal Entities Section */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="h-8 w-8 text-secondary" />
                            <h2 className="text-2xl font-bold tracking-tight text-secondary sm:text-3xl">
                                {t("about.legal.title")}
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="rounded-lg border border-border bg-muted/30 p-4">
                                <p className="font-medium text-secondary">
                                    {t("about.legal.education")}
                                </p>
                            </div>
                            <div className="rounded-lg border border-border bg-muted/30 p-4">
                                <p className="font-medium text-secondary">
                                    {t("about.legal.group")}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">
                                {t("about.legal.note")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="bg-muted/50 py-12">
                <div className="container">
                    <div className="mx-auto max-w-3xl rounded-lg border border-primary/20 bg-primary/5 p-6">
                        <div className="flex gap-4">
                            <AlertCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                            <div>
                                <h3 className="font-semibold text-secondary">
                                    {t("about.disclaimer.title")}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {t("about.disclaimer.text")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {t("about.cta.title")}
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {t("about.cta.desc")}
                        </p>
                        <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90">
                            <Link href="/contact">
                                {t("about.cta.button")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
