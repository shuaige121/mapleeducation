"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckCircle2, Clock, Plane, ShieldAlert, UserCheck } from "lucide-react"

export default function ConciergePage() {
    const { locale } = useI18n()
    const isZh = locale === "zh"

    const modules = [
        {
            icon: UserCheck,
            title: isZh ? "学生 & 家庭：境外管家" : "Student & Family: Overseas Butler",
            desc: isZh
                ? "覆盖行前、接机（可选）、生活安置、入学与持续关怀。适合中学、本科与研究生家庭。"
                : "Pre-departure, optional airport pickup, life setup, school onboarding and ongoing care—ideal for student families.",
            bullets: isZh
                ? ["行前清单与入境须知", "电话卡/交通卡/生活必需品", "报到、体检、学生证流程陪同（按需）", "7×24 紧急联络与协调"]
                : ["Pre‑departure checklist", "SIM card / transport card / essentials", "Onboarding & admin accompaniment (as needed)", "24/7 emergency coordination"],
        },
        {
            icon: Building2,
            title: isZh ? "在职 & 企业：秘书与 Concierge" : "Corporate & Concierge",
            desc: isZh
                ? "面向在职人士与企业客户的本地支持：行政协调、银行预约陪同、EP 项目配套等。"
                : "Local support for professionals and employers: admin coordination, banking appointments, EP project support and more.",
            bullets: isZh
                ? ["EP/自雇 EP 项目配套（信息与材料统筹）", "对接持牌公司秘书与会计服务商", "商务访客基础接待与交通安排建议"]
                : ["EP/self‑employed EP coordination (info & docs)", "Liaise with licensed secretarial/accounting partners", "Visitor reception basics & transport suggestions"],
        },
        {
            icon: Plane,
            title: isZh ? "地接服务（短期）" : "Ground support (short stays)",
            desc: isZh
                ? "适合短期访新考察、家长探访与学校/项目面谈期间的落地支持。"
                : "For short visits—school tours, family visits, interviews and on-the-ground coordination.",
            bullets: isZh
                ? ["接送机与行程衔接（可选）", "住宿/交通建议与协助", "必要的本地陪同与沟通协调"]
                : ["Airport transfers (optional)", "Accommodation/transport guidance", "Local accompaniment and coordination"],
        },
    ]

    const workflow = isZh
        ? [
              "需求评估：线上沟通确认目标、预算与时间",
              "方案设计：按模块组合服务范围与周期",
              "合同与报价：明确责任边界、费用与付款节点",
              "执行与汇报：按约定节奏更新关键节点",
              "复盘与续约：服务期满评估与升级建议",
          ]
        : [
              "Discovery: confirm goals, budget and timeline",
              "Proposal: combine modules and duration",
              "Agreement: scope, boundaries and payment schedule",
              "Execution: progress updates at key milestones",
              "Review: end-of-term review and renewal options",
          ]

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {isZh ? "境外管家与秘书服务" : "Butler & Concierge Services"}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed">
                            {isZh
                                ? "让学生安心融入新加坡，让家长更放心。可按需求选择 3 个月标准周期并支持延长。"
                                : "Help students settle smoothly in Singapore and give families peace of mind. Standard 3‑month packages with extensions available."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Modules */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <Clock className="mx-auto mb-5 h-10 w-10 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "服务模块" : "Service modules"}
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {isZh
                                ? "按人群与场景拆分，支持组合式服务与透明报价。"
                                : "Structured by audience and scenarios—modular and transparently priced."}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {modules.map((module) => {
                            const Icon = module.icon
                            return (
                                <Card key={module.title} className="border-border">
                                    <CardHeader className="pb-4">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-lg text-secondary">{module.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{module.desc}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {module.bullets.map((bullet) => (
                                            <div key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{bullet}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Workflow */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "服务流程" : "Workflow"}
                        </h2>
                    </div>
                    <div className="mt-12 mx-auto max-w-3xl">
                        <Card className="border-border">
                            <CardContent className="p-6">
                                <ol className="space-y-3">
                                    {workflow.map((step, idx) => (
                                        <li key={step} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                                {idx + 1}
                                            </span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </CardContent>
                        </Card>
                        <div className="mt-10 text-center">
                            <Button asChild className="bg-primary hover:bg-primary/90">
                                <Link href="/contact">{isZh ? "获取报价与方案" : "Get a proposal"}</Link>
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
                                <h3 className="font-semibold text-secondary">
                                    {isZh ? "服务边界说明" : "Service boundaries"}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isZh
                                        ? "本服务为生活与学习/工作支持性质，不替代学校、宿舍或公共机构的管理职责。我们不承担医疗诊疗、法律代理或监护人职责；必要时会协助联系专业机构或相关负责人。所有细节与价格以当期正式合同与报价单为准。"
                                        : "This service provides lifestyle and study/work support and does not replace school/dorm/agency responsibilities. We do not provide medical treatment, legal representation or guardianship; we can help coordinate with qualified professionals when needed. Scope and pricing are governed by the signed agreement and quotation."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
