"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Building2, CheckCircle2, ShieldAlert, Users } from "lucide-react"

export default function ImmigrationPage() {
    const { locale } = useI18n()
    const isZh = locale === "zh"

    const pathways = [
        {
            icon: Building2,
            title: isZh ? "自雇 EP / 公司设立" : "Self‑Employed EP / Company Setup",
            desc: isZh
                ? "适合有创业或长期规划的人群。我们提供流程与材料统筹，并对接持牌合作伙伴。"
                : "For founders and long‑term planners. We coordinate the process/documents and liaise with licensed partners.",
            href: "/immigration-workpasses/self-employed-ep",
            bullets: isZh
                ? ["评估（行业/岗位/薪资/股权/时间线）", "材料清单与文件统筹", "对接秘书/会计/翻译等服务商"]
                : ["Feasibility (industry/role/salary/shareholding/timeline)", "Document checklist & coordination", "Liaise with secretarial/accounting/translation partners"],
        },
        {
            icon: Briefcase,
            title: isZh ? "EP / S Pass / WP 信息说明" : "EP / S Pass / WP information",
            desc: isZh
                ? "面向在职人士与企业客户，提供信息梳理、材料管理与流程协调（非法律意见）。"
                : "For professionals and employers—information mapping, document management and process coordination (not legal advice).",
            href: "/contact",
            bullets: isZh
                ? ["资格与材料清单梳理", "时间线与风险点说明", "对接合规持牌合作伙伴（如需）"]
                : ["Eligibility & document checklist", "Timeline & risk notes", "Coordinate with licensed partners when needed"],
        },
        {
            icon: Users,
            title: isZh ? "家属与长期规划（信息）" : "Dependants & long‑term planning (info)",
            desc: isZh
                ? "提供家属随行/探访与长期规划的信息说明，并结合个案建议沟通方向。"
                : "Informational guidance for dependant arrangements and longer-term planning based on your circumstances.",
            href: "/contact",
            bullets: isZh
                ? ["DP/LTVP 基础信息与常见问题", "学生与家庭的路线讨论", "与留学/落地服务的衔接建议"]
                : ["DP/LTVP basics and FAQs", "Student/family route discussions", "How it connects to study & landing support"],
        },
    ]

    const whatWeDo = isZh
        ? [
              "信息梳理与可行性初筛（不替代官方与持牌意见）",
              "材料清单与进度管理，减少遗漏与反复",
              "对接合规持牌合作伙伴（公司秘书、会计、律师等）并明确分工",
              "合同与报价清晰，强调透明与合规边界",
          ]
        : [
              "Information mapping & feasibility pre-check (not a replacement for official/licensed advice)",
              "Document checklist and progress tracking to reduce rework",
              "Coordinate with licensed partners (secretarial, accounting, legal) with clear roles",
              "Transparent scope and pricing with compliance-first boundaries",
          ]

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {isZh ? "移民与工作准证" : "Immigration & Work Passes"}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed">
                            {isZh
                                ? "本页仅提供信息与路径示意，不构成法律意见，也不保证任何审批结果。"
                                : "This page is informational and does not constitute legal advice or guarantee any approval outcomes."}
                        </p>
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
                                <h2 className="font-semibold text-secondary">
                                    {isZh ? "免责声明与角色说明" : "Disclaimer & role clarity"}
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isZh
                                        ? "我们主要扮演“顾问与协调”的角色：基于公开信息与经验提供路径讨论与材料统筹；涉及持牌职责的环节（如公司秘书职责、法律意见等）由合规持牌合作伙伴承担。最终审批结果由相关政府部门独立决定。"
                                        : "We focus on advisory coordination—pathway discussions and document coordination based on public information and experience. Licensed responsibilities (e.g., corporate secretarial duties, legal advice) are handled by compliant licensed partners. Final outcomes are determined solely by the relevant authorities."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation cards */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "常见路径导览" : "Common routes"}
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {isZh
                                ? "按你的目标选择对应方向，我们会在咨询中进一步拆解可行性、时间线与风险点。"
                                : "Pick the direction that matches your goal. In consultation we break down feasibility, timeline and key risks."}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {pathways.map((item) => {
                            const Icon = item.icon
                            return (
                                <Card key={item.title} className="border-border">
                                    <CardHeader className="pb-4">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-lg text-secondary">{item.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{item.desc}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="space-y-2">
                                            {item.bullets.map((bullet) => (
                                                <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                            <Link href={item.href}>{isZh ? "查看/咨询" : "View / consult"}</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* What we do */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-2xl font-bold text-secondary text-center">
                            {isZh ? "我们如何协助" : "How we help"}
                        </h2>
                        <div className="mt-10">
                            <Card className="border-border">
                                <CardContent className="p-6">
                                    <ul className="space-y-2">
                                        {whatWeDo.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="mt-10 text-center">
                            <Button asChild className="bg-primary hover:bg-primary/90">
                                <Link href="/contact">{isZh ? "预约咨询" : "Book a consultation"}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
