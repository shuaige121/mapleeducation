"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    GraduationCap,
    Home,
    Route,
    School,
    ShieldAlert,
} from "lucide-react"

export default function StudyAbroadPage() {
    const { locale } = useI18n()
    const isZh = locale === "zh"

    const pathways = [
        {
            icon: School,
            title: isZh ? "低龄留学：国际学校路线" : "K12: International Schools",
            desc: isZh
                ? "从幼儿园到 IB/A Level 的一条龙路径，面向国际化升学方向。"
                : "A full pathway from early years to IB/A-Level for a globally aligned education.",
            href: "/study/k12-international",
            bullets: isZh
                ? ["课程体系选择（IB/A Level/IGCSE 等）", "入学节点与转学策略", "材料准备与申请跟进"]
                : ["Curriculum fit (IB/A-Level/IGCSE)", "Entry timing & transfer strategy", "Documents & application tracking"],
        },
        {
            icon: GraduationCap,
            title: isZh ? "低龄留学：公立学校 & AEIS" : "K12: Public Schools & AEIS",
            desc: isZh
                ? "通过 AEIS/S-AEIS 进入政府小学或中学，衔接本地升学路径。"
                : "Enter Singapore government schools via AEIS/S-AEIS and follow local progression routes.",
            href: "/study/k12-public-aeis",
            bullets: isZh
                ? ["AEIS 时间线与备考规划", "选校建议（地区/目标/档位）", "学生证与落地安排"]
                : ["AEIS timeline & preparation plan", "School choice guidance (area/goal/fit)", "Student pass & landing support"],
        },
        {
            icon: Route,
            title: isZh ? "新二 / 衔接课程路线" : "New2 & Bridging Pathways",
            desc: isZh
                ? "适合初中或高一/高二阶段，借助过渡课程衔接到本科与长期规划。"
                : "For secondary students seeking a bridging route to undergraduate studies and longer-term options.",
            href: "/study/new2-path",
            bullets: isZh
                ? ["目标与预算匹配 1–2 条可执行路线", "课程/院校对接与材料统筹", "关键节点复盘与调整"]
                : ["1–2 executable routes aligned to goals & budget", "Course/school selection & document coordination", "Re-evaluate at key milestones"],
        },
        {
            icon: BookOpen,
            title: isZh ? "合作办学本科（双学位）" : "Dual Degree / Partner Programs",
            desc: isZh
                ? "更短学制的国际路径，适合在时间与成本间平衡并获得国际学位的家庭。"
                : "A time-efficient international route designed to balance timeline, cost and credential outcomes.",
            href: "/study/dual-degree-path",
            bullets: isZh
                ? ["项目结构与学制拆解", "风险提示与合规边界", "毕业后工作/读研路径讨论"]
                : ["Program structure & study duration breakdown", "Risk notes & compliance boundaries", "Post-grad work / master's planning"],
        },
    ]

    const services = [
        {
            title: isZh ? "路径规划与选校建议" : "Pathway planning & school selection",
            desc: isZh
                ? "围绕年级、成绩、语言能力与预算，讨论 2–3 条可能路径，并说明时间与费用区间。"
                : "Explore 2–3 pathways based on grade, academics, language readiness and budget—aligned to timeline and cost ranges.",
        },
        {
            title: isZh ? "申请执行与材料把关" : "Application execution & document control",
            desc: isZh
                ? "制定材料清单，协助准备与核对关键信息，提交申请并跟进学校反馈。"
                : "Create checklists, prepare and validate key information, submit applications and follow up with schools.",
        },
        {
            title: isZh ? "文书结构建议与背景规划" : "Writing structure & profile strategy",
            desc: isZh
                ? "提供合规的结构建议与方向规划，强调真实性，不做“代写起家”的操作。"
                : "Provide compliant guidance on structure and positioning—authenticity first, no misleading practices.",
        },
        {
            title: isZh ? "签证与行前说明" : "Student pass & pre‑departure briefing",
            desc: isZh
                ? "协助理解学生证流程与材料要求，并提供行前清单与落地第一周指引。"
                : "Explain the student pass flow and requirements, plus practical pre‑departure checklists and week‑one guidance.",
        },
        {
            title: isZh ? "落地与管家服务（可选）" : "Landing & concierge support (optional)",
            desc: isZh
                ? "如有需要，可配套接机、住宿与生活安置、报到陪同等服务，降低落地成本。"
                : "Optional add‑ons such as airport pickup, accommodation/life setup and registration accompaniment.",
        },
    ]

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            {isZh ? "Maple Education 留学服务" : "Study Abroad with Maple Education"}
                        </h1>
                        <p className="mt-6 text-lg text-white/80 leading-relaxed sm:text-xl">
                            {isZh
                                ? "不只是帮你提交申请，而是先从“你想要的未来”开始，一起选择合适的路线与节奏。"
                                : "We start from your long‑term goals—not just applications—and build a pathway that fits your timeline, budget and outcomes."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
                        <p className="text-lg text-secondary font-semibold">
                            {isZh ? "从低龄到本科的完整路径设计" : "End‑to‑end pathway design from K12 to undergraduate"}
                        </p>
                        <p>
                            {isZh
                                ? "Maple Education 是 Maple Group 旗下专注留学与学生服务的业务线。我们以新加坡本地运营经验为基础，通过「路径设计 + 申请执行 + 落地服务」三个层面，帮助家庭在预算、时间与目标之间做出平衡。"
                                : "Maple Education is the education line under Maple Group. With local Singapore experience, we support families across three layers—pathway design, application execution, and landing support—to balance budget, timeline and goals."}
                        </p>
                        <div className="mt-6 rounded-xl border bg-muted/30 p-6">
                            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                                <span className="rounded-full bg-primary/10 px-4 py-2 text-primary">
                                    {isZh ? "低龄" : "K12"}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <span className="rounded-full bg-primary/10 px-4 py-2 text-primary">
                                    {isZh ? "新二/衔接" : "Bridging"}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <span className="rounded-full bg-primary/10 px-4 py-2 text-primary">
                                    {isZh ? "本科" : "Undergrad"}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <span className="rounded-full bg-primary/10 px-4 py-2 text-primary">
                                    {isZh ? "读研/工作" : "Master/Work"}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <span className="rounded-full bg-primary/10 px-4 py-2 text-primary">
                                    {isZh ? "长期规划" : "Long‑term planning"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pathways */}
            <section className="bg-muted/50 py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "主线与核心路径" : "Core pathways"}
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {isZh
                                ? "按阶段与目标选择更适合的路线，再进入细化的申请与落地执行。"
                                : "Pick the pathway that best matches your stage and goal, then execute with clarity and structure."}
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {pathways.map((item) => {
                            const Icon = item.icon
                            return (
                                <Card key={item.href} className="border-border hover:border-primary/30 transition-colors">
                                    <CardHeader className="pb-4">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-xl text-secondary leading-tight">
                                            {item.title}
                                        </CardTitle>
                                        <p className="text-muted-foreground mt-2 leading-relaxed">
                                            {item.desc}
                                        </p>
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
                                            <Link href={item.href}>
                                                {isZh ? "查看详情" : "Explore"}
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "我们具体做什么" : "What we do"}
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            {isZh
                                ? "每一条路线都离不开清晰的时间线、材料管理与落地执行。"
                                : "Every pathway needs a clear timeline, disciplined document management, and reliable execution."}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {services.map((service) => (
                            <Card key={service.title} className="border-border">
                                <CardContent className="p-6 space-y-3">
                                    <h3 className="font-semibold text-secondary">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross links */}
            <section className="bg-muted/50 py-16">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <Home className="mx-auto mb-5 h-10 w-10 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {isZh ? "需要落地支持？" : "Need landing support?"}
                        </h2>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            {isZh
                                ? "如果你希望有人协助接机、住宿与生活安置、报到与体检等落地事项，可了解境外管家与秘书服务模块。"
                                : "If you need help with airport pickup, accommodation/life setup, registration and other landing tasks, explore our concierge support modules."}
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Button asChild className="bg-primary hover:bg-primary/90">
                                <Link href="/butler-concierge">
                                    {isZh ? "查看管家服务" : "Concierge services"}
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                <Link href="/contact">
                                    {isZh ? "预约咨询" : "Talk to us"}
                                </Link>
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
                                    {isZh ? "风险提示与免责声明" : "Risk notes & disclaimer"}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isZh
                                        ? "留学涉及学校、考试机构与政府部门等第三方。我们会基于公开信息与经验提供建议并协助执行，但不承诺“保证录取/保证签证/保证身份”。最终结果以院校与主管部门决定为准。"
                                        : "Study outcomes depend on third parties (schools, testing bodies and authorities). We provide guidance and coordination based on public information and experience, but do not guarantee admissions, visas or any status outcomes. Final decisions are made by the relevant institutions and authorities."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
