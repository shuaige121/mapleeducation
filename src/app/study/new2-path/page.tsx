"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Route, ShieldAlert } from "lucide-react"

export default function New2PathPage() {
    const { locale } = useI18n()
    const isZh = locale === "zh"

    const who = isZh
        ? [
              "完成国内初三/中考后，希望衔接新加坡体系继续学习",
              "高一/高二在读，对高考路线不确定，考虑转向海外/新加坡路径",
              "学术或语言尚未达到直录要求，需要过渡期积累学术能力与履历",
          ]
        : [
              "Students after lower secondary looking to enter the Singapore pathway",
              "High school students reconsidering the local exam route and exploring overseas options",
              "Those needing a bridging period to strengthen academics, language and profile",
          ]

    const routes = [
        {
            title: isZh ? "路径 A（常见）" : "Route A (common)",
            desc: isZh
                ? "国内初中毕业 → 新二/预科 → 私立院校文凭/本科 → 海外合作大学本科/就业。"
                : "Lower secondary → New2/bridging → private diploma/degree → partner university degree / employment.",
        },
        {
            title: isZh ? "路径 B（转向海外硕士）" : "Route B (towards overseas master’s)",
            desc: isZh
                ? "高二退出高考体系 → 衔接课程 → 私立本科 → 申请其他国家硕士（以当期院校要求为准）。"
                : "Exit local exam route → bridging → private undergrad → apply for overseas master’s (subject to current requirements).",
        },
        {
            title: isZh ? "路径 C（目标公立硕士）" : "Route C (public master’s goal)",
            desc: isZh
                ? "初中毕业 → 新二 → 私立本科 → 满足条件后申请新加坡公立大学硕士（不构成录取承诺）。"
                : "New2 → private undergrad → apply for Singapore public master’s when eligible (no admission guarantee).",
        },
    ]

    const support = [
        {
            title: isZh ? "评估与路线讨论" : "Assessment & route discussion",
            desc: isZh
                ? "根据成绩、英语、预算与目标（本科/硕士/回国发展等）筛选 1–2 条可执行路线。"
                : "Align grades, English, budget and goals to 1–2 executable routes.",
        },
        {
            title: isZh ? "课程与学校选择" : "Course & school selection",
            desc: isZh
                ? "解释衔接课程的结构差异与出口，避免“只看名字不看路径”。"
                : "Clarify program structures and downstream options—beyond school names.",
        },
        {
            title: isZh ? "申请与材料准备" : "Applications & documents",
            desc: isZh
                ? "梳理成绩单、语言成绩、个人陈述与推荐信等材料，协助提交并跟进反馈。"
                : "Coordinate transcripts, language scores, statements and references, then track submissions and feedback.",
        },
        {
            title: isZh ? "落地与关键节点复盘" : "Landing support & milestone reviews",
            desc: isZh
                ? "如有需要可配套落地管家；在升本科/换课程等节点提醒重新评估路径。"
                : "Optional landing support; re-evaluate at key milestones (degree progression, program switches).",
        },
    ]

    const faqs = [
        {
            q: isZh ? "新二是不是“走捷径”，会影响申请名校吗？" : "Is New2 a shortcut that hurts top-school applications?",
            a: isZh
                ? "新二是一种课程安排，不是捷径。学校更关注长期成绩、课程深度与履历是否扎实，而不是只看是否走过新二。"
                : "New2 is a curriculum arrangement, not a shortcut. Schools evaluate long-term grades, rigor and profile—beyond the label.",
        },
        {
            q: isZh ? "新二和合作办学本科怎么选？" : "How do I choose between New2 and dual-degree routes?",
            a: isZh
                ? "看长期目标：更看重“更快完成本科学历”，还是更看重“本科阶段的资源与节奏”。我们会用时间与成本对比帮助决策。"
                : "It depends on goals: speed to a degree vs. structure/resources. We compare timelines and total costs to support the decision.",
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
                            {isZh ? "新二 / 衔接课程路线" : "New2 & Bridging Pathways"}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed">
                            {isZh
                                ? "为本科与未来规划预留更多可能：适合初中或高一/高二阶段的学生。"
                                : "Create more options for undergraduate and long-term planning—ideal for secondary students."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Who it's for */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <Route className="h-7 w-7 text-secondary" />
                            <h2 className="text-2xl font-bold text-secondary">
                                {isZh ? "适用人群" : "Who it’s for"}
                            </h2>
                        </div>
                        <Card className="border-border">
                            <CardContent className="p-6">
                                <ul className="space-y-2">
                                    {who.map((item) => (
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

            {/* Routes */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "典型路径示例" : "Example routes"}
                        </h2>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            {isZh
                                ? "以下仅展示结构示意，并不构成任何录取或身份承诺。"
                                : "Examples below illustrate structures only and do not constitute any admission or status guarantee."}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {routes.map((route) => (
                            <Card key={route.title} className="border-border">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg text-secondary">{route.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                    {route.desc}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "Maple Education 在新二路径中的角色" : "How we support your New2 journey"}
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        {support.map((item) => (
                            <Card key={item.title} className="border-border">
                                <CardContent className="p-6 space-y-2">
                                    <h3 className="font-semibold text-secondary">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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

            {/* FAQ */}
            <section className="bg-muted/50 py-16">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-2xl font-bold text-secondary text-center">
                            {isZh ? "常见问题" : "FAQ"}
                        </h2>
                        <div className="mt-10 space-y-6">
                            {faqs.map((item) => (
                                <Card key={item.q} className="border-border">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base text-secondary">{item.q}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                        {item.a}
                                    </CardContent>
                                </Card>
                            ))}
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
                                <h3 className="font-semibold text-secondary">
                                    {isZh ? "风险提示" : "Risk note"}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isZh
                                        ? "新二/衔接课程只是过渡方案，并不能保证升学或录取任何特定大学。各院校对背景的认可度以当期政策为准。"
                                        : "New2/bridging is a transition strategy and does not guarantee admission to any specific institution. Recognition varies by school and current policy."}
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    <Link href="/immigration-workpasses" className="text-primary hover:underline">
                                        {isZh ? "了解移民与工作准证信息" : "Explore immigration & work pass info"}
                                    </Link>
                                    <ArrowRight className="inline-block h-4 w-4 ml-1 text-muted-foreground" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
