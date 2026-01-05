"use client"

import { LucideIcon, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

interface ServiceCardProps {
    titleKey: string
    descKey: string
    featuresKey: string
    icon: LucideIcon
    href?: string
    variant?: "default" | "featured"
}

export function ServiceCard({
    titleKey,
    descKey,
    featuresKey,
    icon: Icon,
    href = "/contact",
    variant = "default",
}: ServiceCardProps) {
    const { t } = useI18n()
    const features = t(featuresKey).split("|")

    const isFeatured = variant === "featured"

    return (
        <Card className={`flex flex-col h-full border transition-all duration-300 hover:shadow-xl ${
            isFeatured
                ? "border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg"
                : "border-border hover:border-primary/20"
        }`}>
            <CardHeader className="pb-4">
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${
                    isFeatured
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                }`}>
                    <Icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl text-secondary leading-tight">
                    {t(titleKey)}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed mt-2">
                    {t(descKey)}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                <div className="mb-6">
                    <p className="text-sm font-medium text-secondary mb-3">
                        {t("servicesPage.keyFeatures")}
                    </p>
                    <ul className="space-y-2">
                        {features.slice(0, 5).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                            </li>
                        ))}
                        {features.length > 5 && (
                            <li className="text-sm text-muted-foreground pl-6">
                                {t("common.moreCount", { count: features.length - 5 })}
                            </li>
                        )}
                    </ul>
                </div>
                <div className="mt-auto">
                    <Button
                        asChild
                        variant={isFeatured ? "default" : "outline"}
                        className={`w-full ${isFeatured ? "bg-primary hover:bg-primary/90" : "border-primary text-primary hover:bg-primary/10"}`}
                    >
                        <Link href={href}>
                            {t("servicesPage.learnMore")}
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
