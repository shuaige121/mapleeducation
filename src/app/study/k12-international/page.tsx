"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Globe2, School, ShieldAlert } from "lucide-react"

export default function K12InternationalPage() {
    const { locale } = useI18n()
    const isZh = locale === "zh"

    const stages = isZh
        ? [
              "幼儿园（Kindergarten / Early Years）",
              "小学（Primary / PYP）",
              "初中阶段（MYP / IGCSE / Lower Secondary）",
              "高中阶段（IBDP / A Level / AP 等）",
          ]
        : [
              "Early Years (Kindergarten)",
              "Primary (PYP)",
              "Lower Secondary (MYP / IGCSE, etc.)",
              "Upper Secondary (IBDP / A-Level / AP, etc.)",
          ]

    const schools = [
        {
            name: "Canadian International School (CIS)",
            desc: isZh ? "IB 全体系（PYP/MYP/DP），适合走全球 IB 路线。" : "Full IB continuum (PYP/MYP/DP) for a global IB pathway.",
        },
        {
            name: "Australian International School (AIS)",
            desc: isZh ? "澳洲课程 + IBDP，适合英联邦方向与多出口选择。" : "Australian curriculum + IBDP, suitable for Commonwealth pathways and flexibility.",
        },
        {
            name: "Global Indian International School (GIIS)",
            desc: isZh ? "CBSE/IGCSE/IBDP 多体系并行，学费与体系选择更灵活。" : "Multiple tracks (CBSE/IGCSE/IBDP) with more flexible options.",
        },
        {
            name: "Stamford American International School (SAIS)",
            desc: isZh ? "美式路线与 IB 选项并行，强调探究式学习。" : "US-style learning with IB options and inquiry-led approaches.",
        },
    ]

    const support = [
        {
            title: isZh ? "选校与路径设计" : "School fit & pathway design",
            desc: isZh
                ? "结合孩子性格、语言与家庭预算，给出 2–3 所候选学校与入学节点建议。"
                : "Match personality, language readiness and budget, then propose 2–3 options with the right entry timing.",
        },
        {
            title: isZh ? "申请与材料协助" : "Applications & documentation",
            desc: isZh
                ? "整理材料清单，协助准备成绩单、在读证明、推荐信与入学测试安排等。"
                : "Build a checklist and coordinate transcripts, school reports, references and entrance tests as needed.",
        },
        {
            title: isZh ? "签证与陪读信息说明" : "Student pass & family arrangements",
            desc: isZh
                ? "解释学生证流程与常见问题，并在需要时对家长短期/长期停留方案做信息说明。"
                : "Explain student pass basics and provide informational guidance for family stay arrangements when applicable.",
        },
        {
            title: isZh ? "落地与管家服务（可选）" : "Landing & concierge support (optional)",
            desc: isZh
                ? "接机、住宿与生活安置、入学报到陪同等，帮助孩子更快适应新加坡生活。"
                : "Airport pickup, accommodation/life setup and onboarding accompaniment to help students settle in smoothly.",
        },
    ]

    const faqs = [
        {
            q: isZh ? "读哪一所国际学校最有利于申请 NUS/NTU？" : "Which international school best helps with NUS/NTU applications?",
            a: isZh
                ? "公立大学更看重整体学业表现、课程体系的难度、英语能力与综合履历，而不是只看学校名字。我们会基于目标和现实条件做路线与学校的组合建议。"
                : "Public universities evaluate overall academic performance, curriculum rigor, English proficiency and holistic profile—beyond brand name. We propose a realistic route based on your goals and constraints.",
        },
        {
            q: isZh ? "国际学校学费差异为什么这么大？" : "Why do tuition fees vary so much?",
            a: isZh
                ? "与学校定位、课程体系、设施资源与班级规模有关。规划阶段我们会给出预算区间，并解释不同组合下的总成本差异。"
                : "It often reflects positioning, curriculum, facilities and class sizes. We clarify budget ranges and total cost differences across options.",
        },
        {
            q: isZh ? "孩子英语基础一般，能直接入读吗？" : "Can a student enroll with limited English?",
            a: isZh
                ? "部分学校提供语言支持，但仍需评估孩子的适应能力。更合适的方案可能是先进行语言/过渡课程，具体以测试与面谈结果为准。"
                : "Some schools offer language support, but readiness matters. A language or bridging plan may be better—depending on assessments and interviews.",
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
                            {isZh ? "新加坡国际学校路线" : "Singapore International School Pathway"}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed">
                            {isZh
                                ? "适合希望在国际化环境中完成小学到高中的学生，直通世界主流大学。"
                                : "A full pathway from early years to high school in an international environment—with global university exits."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <Globe2 className="h-7 w-7 text-secondary" />
                            <h2 className="text-2xl font-bold text-secondary">
                                {isZh ? "路线概览" : "Path overview"}
                            </h2>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <Card className="border-border">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-secondary">
                                        {isZh ? "教学阶段" : "Stages"}
                                    </h3>
                                    <ul className="mt-4 space-y-2">
                                        {stages.map((stage) => (
                                            <li key={stage} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{stage}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="border-border">
                                <CardContent className="p-6 space-y-3">
                                    <h3 className="font-semibold text-secondary">
                                        {isZh ? "常见升学去向" : "Common destinations"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {isZh
                                            ? "英美澳新及欧洲主流大学；符合条件时也可申请新加坡公立大学（NUS/NTU/SMU 等）。"
                                            : "Mainstream universities in the US/UK/AU/NZ/Europe; and Singapore public universities (NUS/NTU/SMU) when official criteria are met."}
                                    </p>
                                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                        <Link href="/study/k12-public-aeis">
                                            {isZh ? "也看看 AEIS 公立路线" : "Explore AEIS pathway"}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schools */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <School className="mx-auto mb-5 h-10 w-10 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "国际学校示例（部分）" : "School examples"}
                        </h2>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            {isZh
                                ? "以下为结构示例，具体选择以当期招生政策与家庭目标匹配为准。"
                                : "Examples below are for structure and reference. Final choices depend on admissions policies and your goals."}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        {schools.map((school) => (
                            <Card key={school.name} className="border-border">
                                <CardContent className="p-6 space-y-2">
                                    <h3 className="font-semibold text-secondary">{school.name}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{school.desc}</p>
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
                            {isZh ? "我们如何支持你" : "How we support you"}
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {isZh
                                ? "从选校到落地，帮助家庭把复杂流程拆成可执行的时间线。"
                                : "From selection to landing, we turn complex steps into an executable timeline."}
                        </p>
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
                                        ? "所有录取与签证结果由学校与主管部门独立决定。我们提供信息与执行协助，但不承诺任何特定录取结果。"
                                        : "Admissions and visa outcomes are determined solely by schools and authorities. We provide guidance and coordination, but do not promise specific results."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
