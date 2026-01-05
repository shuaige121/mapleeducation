"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, GraduationCap, ShieldAlert } from "lucide-react"

export default function PublicAEISPage() {
    const { locale } = useI18n()
    const isZh = locale === "zh"

    const overview = isZh
        ? [
              "AEIS/S-AEIS → 政府小学/中学",
              "政府小学 → PSLE → 中学路径选择",
              "政府中学 → O Level → JC/理工学院 → 本科",
              "关键节点可根据情况转国际学校或回国继续升学",
          ]
        : [
              "AEIS/S-AEIS → Government primary/secondary school",
              "Primary → PSLE → secondary placement routes",
              "Secondary → O-Level → JC/Polytechnic → undergraduate",
              "Optional pivots: international school or return to home system",
          ]

    const services = [
        {
            title: isZh ? "AEIS 规划与备考建议" : "AEIS planning & preparation",
            desc: isZh
                ? "解释报名时间、年级选择与整体难度，结合孩子基础评估合理的准备周期。"
                : "Clarify timelines, grade selection and expected difficulty, then define a realistic preparation window.",
        },
        {
            title: isZh ? "选校建议（档位与地区）" : "School selection guidance",
            desc: isZh
                ? "按目标与风险偏好给出“稳健/冲刺”档位建议，同时考虑通勤与生活成本。"
                : "Recommend safe/stretch targets and consider commute distance and living costs.",
        },
        {
            title: isZh ? "申请材料与流程协助" : "Documents & process coordination",
            desc: isZh
                ? "整理材料清单，协助准备成绩单、学校报告等，并提示常见踩坑点。"
                : "Build checklists, coordinate school reports and highlight common pitfalls.",
        },
        {
            title: isZh ? "学生证与陪读信息说明" : "Student pass & family arrangements",
            desc: isZh
                ? "解释学生证流程与常见问题，并在需要时提供陪读/探访的路径信息说明。"
                : "Explain student pass basics and provide informational guidance for family stay arrangements when applicable.",
        },
    ]

    const schools = isZh
        ? [
              "Rosyth School、Nanyang Primary School、Tao Nan School、Ai Tong School",
              "Raffles Institution、Hwa Chong Institution、Nanyang Girls' High School、ACS (Independent)",
          ]
        : [
              "Rosyth School, Nanyang Primary School, Tao Nan School, Ai Tong School",
              "Raffles Institution, Hwa Chong Institution, Nanyang Girls' High School, ACS (Independent)",
          ]

    const faqs = [
        {
            q: isZh ? "AEIS 一年只有一次，错过了怎么办？" : "What if I miss AEIS or don’t pass?",
            a: isZh
                ? "可以考虑 S-AEIS 或在下一年度 AEIS 再报考；也可在此期间用过渡课程/国际学校方案避免完全空档。"
                : "Consider S-AEIS, re-attempt the next AEIS cycle, or use bridging/international options to avoid a long gap.",
        },
        {
            q: isZh ? "英文基础一般，是否建议直接考？" : "Should we attempt AEIS with weak English?",
            a: isZh
                ? "可以报考但通过率会受影响。通常建议先进行系统语言与学科辅导，再选择合适年份与年级报考。"
                : "You can register, but outcomes will be impacted. It’s often better to build language and subject foundations before attempting.",
        },
        {
            q: isZh ? "走公立路线就一定能申请 PR 吗？" : "Does public school guarantee PR eligibility?",
            a: isZh
                ? "不保证。PR 是否获批由 ICA 根据多因素独立决定。本页仅提供信息与路径示意，具体请结合个案评估。"
                : "No. PR outcomes are determined by ICA using multiple factors. This page is informational; suitability depends on individual circumstances.",
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
                            {isZh ? "新加坡公立学校 & AEIS 路线" : "Public Schools & AEIS Pathway"}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed">
                            {isZh
                                ? "通过 AEIS/S-AEIS 进入政府小学或中学，为孩子铺路本地升学路径。"
                                : "Enter Singapore government schools via AEIS/S-AEIS and follow the local education progression route."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <GraduationCap className="h-7 w-7 text-secondary" />
                            <h2 className="text-2xl font-bold text-secondary">
                                {isZh ? "路线概览" : "Path overview"}
                            </h2>
                        </div>
                        <Card className="border-border">
                            <CardContent className="p-6">
                                <ul className="space-y-2">
                                    {overview.map((item) => (
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
                                    ? "提示：公立学校名额、录取政策与难度会随年度变化。我们会基于公开信息与经验协助规划，但不替代官方政策。"
                                    : "Note: quota, policies and difficulty change yearly. We help you plan based on public information and experience, but this does not replace official policies."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "我们能提供的支持" : "How we help"}
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {isZh
                                ? "把备考、选校、材料与签证拆成可执行的清单与时间线。"
                                : "Turn preparation, selection, documents and visas into an executable checklist and timeline."}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        {services.map((service) => (
                            <Card key={service.title} className="border-border">
                                <CardContent className="p-6 space-y-2">
                                    <h3 className="font-semibold text-secondary">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
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

            {/* Schools */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-2xl font-bold text-secondary text-center">
                            {isZh ? "重点学校示意（示例）" : "Examples of schools (reference)"}
                        </h2>
                        <p className="mt-4 text-center text-muted-foreground text-sm leading-relaxed">
                            {isZh
                                ? "以下仅为示意，避免暗示与学校存在商业合作关系。"
                                : "Examples below are for reference only and do not imply commercial partnerships."}
                        </p>
                        <div className="mt-8 grid gap-4">
                            {schools.map((line) => (
                                <Card key={line} className="border-border">
                                    <CardContent className="p-6 text-sm text-muted-foreground leading-relaxed">
                                        {line}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
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
                                        ? "AEIS/S-AEIS 竞争激烈，政策与难度可能调整。我们提供规划与执行协助，但不保证任何考试、录取或签证结果。"
                                        : "AEIS/S-AEIS is competitive and policies may change. We provide guidance and coordination, but do not guarantee exam, admission or visa outcomes."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
