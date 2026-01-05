"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, CheckCircle2, FileText, Map, ShieldAlert } from "lucide-react"

export default function ResourcesPage() {
    const { locale } = useI18n()
    const isZh = locale === "zh"

    const categories = [
        {
            icon: BookOpen,
            title: isZh ? "留学指南" : "Study guides",
            desc: isZh
                ? "从低龄到本科：路线选择、申请节奏与落地准备的关键提示。"
                : "Key notes for K12 to undergraduate planning, application pacing and landing preparation.",
            links: [
                { label: isZh ? "留学服务总览" : "Study abroad overview", href: "/study-abroad" },
                { label: isZh ? "国际学校路线" : "International schools", href: "/study/k12-international" },
                { label: isZh ? "公立 AEIS 路线" : "Public AEIS pathway", href: "/study/k12-public-aeis" },
            ],
        },
        {
            icon: FileText,
            title: isZh ? "EP & 工作准证（信息）" : "EP & work passes (info)",
            desc: isZh
                ? "常见路径的资料整理、材料清单与风险提示（不构成法律意见）。"
                : "Information mapping, document checklists and risk notes (not legal advice).",
            links: [
                { label: isZh ? "移民与工作准证" : "Immigration & work passes", href: "/immigration-workpasses" },
                { label: isZh ? "自雇 EP / 公司设立" : "Self‑employed EP", href: "/immigration-workpasses/self-employed-ep" },
            ],
        },
        {
            icon: Map,
            title: isZh ? "免费工具" : "Free tools",
            desc: isZh
                ? "选校地图 + 路线自测：快速了解院校分布与可选方向。"
                : "School map + pathway finder for a quick self-check.",
            links: [{ label: isZh ? "打开工具页" : "Open tools", href: "/tools" }],
        },
    ]

    const checklists = isZh
        ? [
              "首次咨询前：准备孩子年级、最近成绩、语言水平与预算范围",
              "申请阶段：核对护照信息、成绩单版本与关键日期（报名/考试/开学）",
              "落地阶段：住宿安排、电话卡/交通卡、体检与报到清单",
              "涉及签证/准证：以官方当期要求为准，复杂个案建议寻求持牌专业意见",
          ]
        : [
              "Before consulting: grade, recent results, language level and budget range",
              "During application: validate passport details, transcripts and key dates",
              "Landing: accommodation, SIM/transport, medical check and onboarding checklist",
              "For visas/passes: follow official requirements; complex cases should seek licensed advice",
          ]

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {isZh ? "资源中心" : "Resources"}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed">
                            {isZh ? "路线、材料与落地的一站式信息入口。" : "A practical hub for pathways, documents and landing preparation."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {categories.map((category) => {
                            const Icon = category.icon
                            return (
                                <Card key={category.title} className="border-border">
                                    <CardHeader className="pb-4">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-xl text-secondary">{category.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{category.desc}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {category.links.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="block rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-secondary hover:border-primary/30 hover:bg-muted/50 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Checklists */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "快速清单" : "Quick checklist"}
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {isZh ? "用于帮助你在关键节点不遗漏重要事项。" : "A simple list to avoid missing key items at each stage."}
                        </p>
                    </div>
                    <div className="mt-12 mx-auto max-w-3xl">
                        <Card className="border-border">
                            <CardContent className="p-6">
                                <ul className="space-y-2">
                                    {checklists.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <div className="mt-10 text-center">
                            <Button asChild className="bg-primary hover:bg-primary/90">
                                <Link href="/contact">{isZh ? "需要帮助？联系团队" : "Need help? Contact us"}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-12">
                <div className="container">
                    <div className="mx-auto max-w-3xl rounded-xl border border-primary/20 bg-primary/5 p-6">
                        <div className="flex gap-4">
                            <ShieldAlert className="h-6 w-6 flex-shrink-0 text-primary" />
                            <div className="space-y-2">
                                <h3 className="font-semibold text-secondary">{isZh ? "免责声明" : "Disclaimer"}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isZh
                                        ? "本页内容仅供信息参考。政策与要求可能随时更新，涉及签证、准证、法律或税务事项，请以官方与具备资质的专业机构意见为准。"
                                        : "Content is for informational purposes only. Policies and requirements can change. For visas, passes, legal or tax matters, rely on official sources and qualified professionals."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
