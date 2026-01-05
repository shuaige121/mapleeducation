"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, ShieldAlert } from "lucide-react"

export default function DualDegreePage() {
    const { locale } = useI18n()
    const isZh = locale === "zh"

    const structure = isZh
        ? [
              "国内阶段：合作学校/预科课程（视项目而定）",
              "新加坡阶段：私立合作院校课程（文凭/本科学程）",
              "海外阶段：合作大学授予本科学位（视项目而定）",
          ]
        : [
              "Domestic phase: partner school / foundation (program dependent)",
              "Singapore phase: private partner institution coursework",
              "Overseas phase: partner university bachelor’s degree (program dependent)",
          ]

    const fit = isZh
        ? [
              "希望在时间与成本之间取得平衡的家庭",
              "更看重学位完成效率与长期可选项，而不是只做“校名比较”",
              "愿意接受更快节奏的学习安排，并具备较强的自我管理能力",
          ]
        : [
              "Families balancing timeline and total cost",
              "Those who value executable pathways over brand-only comparisons",
              "Students ready for a faster pace with strong self-management",
          ]

    const support = [
        {
            title: isZh ? "项目筛选与比较" : "Program selection & comparison",
            desc: isZh
                ? "解释不同项目的结构、学制与成本，协助做出更可执行的选择。"
                : "Clarify structure, duration and cost so you can choose an executable pathway.",
        },
        {
            title: isZh ? "申请与材料准备" : "Applications & documents",
            desc: isZh
                ? "整理成绩单与材料清单，协助理解学费结构、条款与关键节点。"
                : "Coordinate transcripts and key documents, and help you understand fees, terms and milestones.",
        },
        {
            title: isZh ? "落地与生活安置（可选）" : "Landing & life setup (optional)",
            desc: isZh
                ? "在新加坡阶段可配套落地支持，减少孩子独自处理行政与生活事项的压力。"
                : "Optional on-the-ground support in Singapore to reduce admin/life overhead for students.",
        },
    ]

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {isZh ? "合作办学本科（双学位）" : "Dual Degree / Partner Program Pathway"}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed">
                            {isZh
                                ? "本科学制更短的国际路径：在时间与成本之间取得平衡，并获得国际学位。"
                                : "A time‑efficient international pathway designed to balance timeline, cost and credential outcomes."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Structure */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <Clock className="h-7 w-7 text-secondary" />
                            <h2 className="text-2xl font-bold text-secondary">
                                {isZh ? "路线结构" : "Path structure"}
                            </h2>
                        </div>
                        <Card className="border-border">
                            <CardContent className="p-6">
                                <ul className="space-y-2">
                                    {structure.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <div className="rounded-xl border border-border bg-muted/30 p-6">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {isZh
                                    ? "说明：时间上的“节省”通常来自学分抵免或加速课程安排，但也意味着对学习节奏与自我管理要求更高。"
                                    : "Note: Faster timelines often come from credit transfers or accelerated schedules—requiring stronger self‑management and consistency."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fit */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "适合谁" : "Who it fits"}
                        </h2>
                    </div>
                    <div className="mt-10 mx-auto max-w-3xl">
                        <Card className="border-border">
                            <CardContent className="p-6">
                                <ul className="space-y-2">
                                    {fit.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Masters note */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl space-y-6">
                        <h2 className="text-2xl font-bold text-secondary text-center">
                            {isZh ? "与公立大学硕士的关系" : "About public university master’s progression"}
                        </h2>
                        <Card className="border-border">
                            <CardContent className="p-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
                                <p>
                                    {isZh
                                        ? "部分学生希望在完成本科学位后申请 NUS/NTU 等公立大学授课型硕士。我们会在规划阶段解释可能的路径与要求。"
                                        : "Some students aim to pursue taught master’s programs at NUS/NTU after completing their bachelor’s degree. We clarify possible routes and requirements during planning."}
                                </p>
                                <p>
                                    {isZh
                                        ? "重要提示：合作项目学位在很多情况下可作为申请材料的一部分，但是否接受与是否录取由目标院校各院系按当期政策独立决定，不构成任何录取承诺。"
                                        : "Important: a partner-program degree can often be part of an application, but acceptance and admission are determined independently by the target faculty under current policies—no admission guarantee."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Support */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "我们能提供的支持" : "How we help"}
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {support.map((item) => (
                            <Card key={item.title} className="border-border">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg text-secondary">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Button asChild className="bg-primary hover:bg-primary/90">
                            <Link href="/contact">{isZh ? "预约咨询" : "Book a consultation"}</Link>
                        </Button>
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
                                <h3 className="font-semibold text-secondary">
                                    {isZh ? "风险提示" : "Risk note"}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isZh
                                        ? "合作办学项目涉及多方政策与条款变化（学分承认、课程设置、费用等）。我们会协助梳理重点，但不代替法律或院校官方意见。"
                                        : "Partner programs involve multiple parties and policies (credit recognition, curriculum, fees). We help clarify key points, but this is not a substitute for legal advice or official information."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
