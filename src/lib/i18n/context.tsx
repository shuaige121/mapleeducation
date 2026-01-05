"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export type Locale = "en" | "zh"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Translation dictionaries
const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.studyAbroad": "Study Abroad",
    "nav.k12International": "K12 & International",
    "nav.k12InternationalDesc": "International schools and IB curriculum pathways.",
    "nav.publicAeis": "Public & AEIS",
    "nav.publicAeisDesc": "Singapore government school pathways via AEIS.",
    "nav.new2Path": "New2 & Bridging",
    "nav.new2PathDesc": "Pathways for O-Level/N-Level graduates.",
    "nav.dualDegree": "Dual Degree",
    "nav.dualDegreeDesc": "Private university degrees and pathways to public masters.",
    "nav.immigration": "Immigration",
    "nav.concierge": "Concierge",
    "nav.resources": "Resources",
    "nav.about": "About",
    "nav.contact": "Contact Us",
    "nav.home": "Home",

    // Hero
    "hero.title1": "Study, Work & Live",
    "hero.title2": "in Singapore",
    "hero.subtitle": "From study planning to long-term settlement, our local team is with you every step of the way.",
    "hero.subtitle2": "Trusted by students, families, and professionals.",
    "hero.cta1": "Start Your Journey",
    "hero.cta2": "Corporate & EP Services",
    "hero.trust": "Local Team • Transparent Process • Compliance First",

    // Services Section
    "services.title": "Our Core Services",
    "services.subtitle": "Tailored solutions for every stage of your Singapore journey.",
    "services.studyAbroad.title": "Study Abroad",
    "services.studyAbroad.desc": "Comprehensive planning for K12, AEIS, and University pathways.",
    "services.studyAbroad.cta": "Explore Pathways",
    "services.immigration.title": "Immigration & Work Passes",
    "services.immigration.desc": "Expert guidance on Student PR, Self-Employed EP, and Work Passes.",
    "services.immigration.cta": "View Options",
    "services.concierge.title": "Butler & Concierge",
    "services.concierge.desc": "One-stop support for student management and family settlement.",
    "services.concierge.cta": "Our Services",

    // Why Us Section
    "whyUs.title": "Why Choose Maple Group?",
    "whyUs.subtitle": "We are not just agents; we are your partners in Singapore. Our commitment to transparency and professionalism sets us apart.",
    "whyUs.local.title": "Local Team",
    "whyUs.local.desc": "Based in Singapore with deep local knowledge and networks.",
    "whyUs.transparent.title": "Transparent Process",
    "whyUs.transparent.desc": "Clear contracts, no hidden fees, and honest advice.",
    "whyUs.compliance.title": "Compliance First",
    "whyUs.compliance.desc": "We work with licensed partners for legal and secretarial matters.",
    "whyUs.imagePlaceholder": "Team / Office Image",

    // CTA Section
    "cta.title": "Ready to Start Your Journey?",
    "cta.subtitle": "Whether you are planning to study abroad or looking for corporate services, our team is here to help.",
    "cta.student": "Student Consultation",
    "cta.corporate": "Corporate Consultation",

    // About Page
    "about.hero.title": "About Maple Group",
    "about.hero.subtitle": "Your trusted partner for education, immigration, and settlement services in Singapore.",
    "about.story.title": "Our Story",
    "about.story.p1": "Maple Group was founded with a simple mission: to help families and professionals navigate their journey to Singapore with confidence and clarity.",
    "about.story.p2": "Our team members have personally experienced the challenges of studying, working, and settling in Singapore. We understand the complexities of choosing the right school, securing work passes, and building a life in a new country.",
    "about.story.p3": "Today, we serve students from kindergarten to university, professionals seeking employment passes, and families looking for comprehensive settlement support.",
    "about.mission.title": "Our Mission",
    "about.mission.desc": "To provide transparent, professional, and personalized services that empower our clients to achieve their educational and career goals in Singapore.",
    "about.values.title": "Our Values",
    "about.values.integrity.title": "Integrity",
    "about.values.integrity.desc": "We provide honest advice and clear pricing. No hidden fees, no unrealistic promises.",
    "about.values.professionalism.title": "Professionalism",
    "about.values.professionalism.desc": "We work with licensed partners and maintain the highest standards of service.",
    "about.values.care.title": "Client Care",
    "about.values.care.desc": "Every client's journey is unique. We listen, understand, and tailor our services accordingly.",
    "about.values.compliance.title": "Compliance",
    "about.values.compliance.desc": "We strictly adhere to Singapore regulations and work only with authorized partners.",
    "about.team.title": "Our Team",
    "about.team.desc": "Our team combines local expertise with international perspectives. Based in Singapore, we have first-hand experience with the education system, immigration processes, and daily life in the city-state.",
    "about.legal.title": "Legal Entities",
    "about.legal.education": "Maple Education Pte. Ltd. - Education consulting and student services",
    "about.legal.group": "Maple Group - Brand umbrella for all services",
    "about.legal.note": "For services requiring professional licenses (legal, secretarial, immigration filing), we partner with licensed firms and clearly disclose all roles and responsibilities.",
    "about.disclaimer.title": "Important Notice",
    "about.disclaimer.text": "Maple Group does not guarantee admission to any school, approval of any visa or work pass, or success of any immigration application. All outcomes depend on official authorities' decisions and individual circumstances. We provide guidance, preparation support, and coordination services only.",
    "about.cta.title": "Ready to Learn More?",
    "about.cta.desc": "Contact us for a free consultation to discuss your goals and how we can help.",
    "about.cta.button": "Get in Touch",

    // Contact Page
    "contact.hero.title": "Contact Us",
    "contact.hero.subtitle": "Get in touch with our team. We're here to help you plan your Singapore journey.",
    "contact.form.title": "Send Us a Message",
    "contact.form.name": "Full Name",
    "contact.form.namePlaceholder": "Your full name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "your.email@example.com",
    "contact.form.phone": "Phone Number",
    "contact.form.phonePlaceholder": "+65 XXXX XXXX",
    "contact.form.inquiryType": "Inquiry Type",
    "contact.form.selectType": "Select inquiry type",
    "contact.form.typeStudy": "Study Abroad",
    "contact.form.typeImmigration": "Immigration & Work Passes",
    "contact.form.typeConcierge": "Butler & Concierge Services",
    "contact.form.typeCorporate": "Corporate Services",
    "contact.form.typeOther": "Other",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us about your goals and how we can help...",
    "contact.form.submit": "Send Message",
    "contact.form.pdpaNotice": "By submitting this form, you agree to our data protection policy in accordance with PDPA.",
    "contact.info.title": "Contact Information",
    "contact.info.address": "Office Address",
    "contact.info.whatsappNote": "Quick response via WhatsApp",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.hours": "Business Hours",
    "contact.info.hoursDetail": "Mon - Fri: 9:00 AM - 6:00 PM (SGT)",
    "contact.map.title": "Find Us",
    "contact.map.directions": "Located at Peninsula Plaza, easily accessible via City Hall MRT station.",
    "contact.whatsappCta.title": "Prefer WhatsApp?",
    "contact.whatsappCta.subtitle": "Chat with us directly for faster responses.",
    "contact.whatsappCta.button": "Chat on WhatsApp",

    // Services Page
    "servicesPage.hero.title": "Our Services",
    "servicesPage.hero.subtitle": "Comprehensive education and settlement services tailored to your needs. From school applications to landing support, we're with you every step of the way.",

    // K12 International Schools
    "servicesPage.k12International.title": "K12 International Schools",
    "servicesPage.k12International.desc": "International kindergarten, primary, and secondary school applications. Partner schools include Canadian International School, Australian International School, Stamford American, and more.",
    "servicesPage.k12International.features": "School consultation & aptitude testing|School selection planning|Interview coaching & enrollment training|Application materials & submission|Student visa & dependent pass|Pre-departure preparation|Landing concierge service",

    // Public Schools & AEIS
    "servicesPage.publicAeis.title": "Public Schools & AEIS",
    "servicesPage.publicAeis.desc": "Singapore government school pathways including top primary schools like Nanyang Primary, Tao Nan School, and elite secondary schools like Raffles Institution and Hwa Chong Institution.",
    "servicesPage.publicAeis.features": "School consultation & aptitude testing|School selection planning|AEIS exam preparation & tutoring|Application materials & submission|Student visa & dependent pass|Pre-departure preparation|Landing concierge service",

    // Private University
    "servicesPage.privateUni.title": "Private University Applications",
    "servicesPage.privateUni.desc": "Applications to Kaplan, JCU Singapore, Curtin, PSB Academy, SIM, MDIS, LASALLE, NAFA, and other prestigious private institutions.",
    "servicesPage.privateUni.features": "School selection planning|Academic assessment|Document writing service|Guaranteed admission evaluation|Application materials & submission|Student visa application|Pre-departure preparation|Landing concierge service",

    // Public University
    "servicesPage.publicUni.title": "Public University Applications",
    "servicesPage.publicUni.desc": "NUS (QS #8), NTU (QS #12), SMU, SUTD, SIT, SUSS, and UAS applications. Comprehensive planning with document writing and background enhancement.",
    "servicesPage.publicUni.features": "Target school & major planning|Application timeline management|Document writing & polishing|Background enhancement program|Interview preparation|Application submission & tracking|Visa processing guidance",

    // Butler / Concierge Service
    "servicesPage.butler.title": "Overseas Butler Service",
    "servicesPage.butler.desc": "Three-month comprehensive landing support from airport pickup to daily life assistance. We help students settle in Singapore with peace of mind.",
    "servicesPage.butler.features": "Pre-departure guidance & checklist|Airport pickup service (optional)|SIM card, transport card & essentials|School registration & health check|Bank account setup assistance|Regular welfare check-ins|24/7 emergency support|Student social gatherings",

    // Study Tours
    "servicesPage.studyTours.title": "Study Tours & Camps",
    "servicesPage.studyTours.desc": "NUS Business Elite Program, STEAM Summer Camp (ages 15-18), Global Youth Leadership Negotiation Course, and customized study tours.",
    "servicesPage.studyTours.features": "Official certificates upon completion|Customizable itineraries by age group|University campus immersion|Cultural experience activities|Professional networking opportunities|Leadership skill development",

    // Document & Background
    "servicesPage.documents.title": "Document Writing & Background Enhancement",
    "servicesPage.documents.desc": "One-on-one customized personal statements, application material polishing, and strategic planning for research, internships, competitions, and volunteer activities.",
    "servicesPage.documents.features": "Personal statement writing|Application material enhancement|Research project guidance|Internship placement assistance|Competition preparation|Volunteer activity planning|Comprehensive profile building",

    // Academic Support
    "servicesPage.academic.title": "Academic Support & Appeals",
    "servicesPage.academic.desc": "Assignment tutoring and exam preparation support. Academic appeal services for attendance issues or academic integrity concerns.",
    "servicesPage.academic.features": "Assignment tutoring|Exam preparation|Academic progress monitoring|Attendance issue appeals|Academic integrity appeals|One-on-one academic coaching",

    // CTA
    "servicesPage.cta.title": "Ready to Get Started?",
    "servicesPage.cta.subtitle": "Contact us for a free consultation. Let us help you plan your Singapore education journey.",
    "servicesPage.cta.button": "Free Consultation",

    // Common
    "servicesPage.learnMore": "Learn More",
    "servicesPage.keyFeatures": "Key Features",
    "common.moreCount": "+{count} more…",
    "nav.toggleMenu": "Toggle menu",

    // Home / Map / Pathfinder
    "home.explore.title": "Explore Schools in Singapore",
    "home.explore.subtitle1": "Discover key institutions in Singapore, their locations, and connectivity.",
    "home.explore.subtitle2": "Click a school to see nearby MRT stations and property insights.",
    "map.loading": "Loading map…",
    "map.nearestMrtStations": "Nearest MRT stations",
    "map.visitWebsite": "Visit website",
    "pathfinder.title": "Find Your Perfect Study Path",
    "pathfinder.subtitle": "Tell us a bit about yourself and we'll recommend the best route for you.",
    "pathfinder.form.age": "Current age",
    "pathfinder.form.qualification": "Highest qualification",
    "pathfinder.form.grades": "Average grades",
    "pathfinder.qual.highSchool": "High School / Year 10-12",
    "pathfinder.qual.oLevel": "GCE O-Level",
    "pathfinder.qual.aLevel": "GCE A-Level",
    "pathfinder.qual.diploma": "Diploma / Polytechnic",
    "pathfinder.qual.degree": "Bachelor's Degree",
    "pathfinder.grade.excellent": "Excellent (A)",
    "pathfinder.grade.good": "Good (B)",
    "pathfinder.grade.average": "Average (C)",
    "pathfinder.grade.pass": "Pass (D/E)",
    "pathfinder.button.seeFuture": "See my future",
    "pathfinder.availableAt": "Available at:",
    "pathfinder.button.startOver": "Start over",
    "pathfinder.availableAtContact": "Talk to us for a suitable shortlist.",

    // Tools
    "tools.hero.title": "Tools",
    "tools.hero.subtitle": "Explore schools and get a quick pathway suggestion. For a tailored plan, talk to our team.",
    "tools.hero.jump.map": "School map",
    "tools.hero.jump.pathfinder": "Study path finder",
    "tools.hero.cta": "Talk to an advisor",
    "tools.footer.title": "Want a tailored plan?",
    "tools.footer.subtitle": "Share your background and goals — we’ll recommend a shortlist and timeline.",
    "tools.footer.cta": "Contact us",

    // Footer
    "footer.description": "Your trusted partner for Study, Work, and Life in Singapore. Professional education consulting and corporate services.",
    "footer.services": "Services",
    "footer.studyAbroad": "Study Abroad",
    "footer.immigration": "Immigration & Work Passes",
    "footer.butler": "Butler & Concierge",
    "footer.selfEmployedEp": "Self-Employed EP",
    "footer.company": "Company",
    "footer.aboutUs": "About Us",
    "footer.resources": "Resources",
    "footer.contact": "Contact Us",
    "footer.privacy": "Privacy Policy",
    "footer.contactTitle": "Contact",
    "footer.rights": "All rights reserved.",
  },
  zh: {
    // Navbar
    "nav.studyAbroad": "留学服务",
    "nav.k12International": "K12 国际学校",
    "nav.k12InternationalDesc": "国际学校及IB课程升学路径。",
    "nav.publicAeis": "政府学校 & AEIS",
    "nav.publicAeisDesc": "通过AEIS进入新加坡政府学校。",
    "nav.new2Path": "New2 衔接课程",
    "nav.new2PathDesc": "O水准/N水准毕业生升学通道。",
    "nav.dualDegree": "双学位项目",
    "nav.dualDegreeDesc": "私立大学学位及公立硕士升学路径。",
    "nav.immigration": "移民服务",
    "nav.concierge": "管家服务",
    "nav.resources": "资源中心",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",
    "nav.home": "首页",

    // Hero
    "hero.title1": "在新加坡",
    "hero.title2": "学习、工作、生活",
    "hero.subtitle": "从留学规划到长期定居，我们的本地团队全程陪伴。",
    "hero.subtitle2": "深受学生、家庭和专业人士信赖。",
    "hero.cta1": "开启您的旅程",
    "hero.cta2": "企业 & EP 服务",
    "hero.trust": "本地团队 • 透明流程 • 合规优先",

    // Services Section
    "services.title": "核心服务",
    "services.subtitle": "为您新加坡之旅的每个阶段提供定制化解决方案。",
    "services.studyAbroad.title": "留学服务",
    "services.studyAbroad.desc": "K12、AEIS及大学升学路径的全面规划。",
    "services.studyAbroad.cta": "探索升学路径",
    "services.immigration.title": "移民与工作准证",
    "services.immigration.desc": "学生PR、自雇EP及工作准证的专业指导。",
    "services.immigration.cta": "查看选项",
    "services.concierge.title": "管家服务",
    "services.concierge.desc": "学生管理和家庭安居的一站式支持。",
    "services.concierge.cta": "我们的服务",

    // Why Us Section
    "whyUs.title": "为什么选择枫叶集团？",
    "whyUs.subtitle": "我们不仅是中介，更是您在新加坡的合作伙伴。我们对透明度和专业性的承诺使我们与众不同。",
    "whyUs.local.title": "本地团队",
    "whyUs.local.desc": "扎根新加坡，拥有深厚的本地知识和人脉网络。",
    "whyUs.transparent.title": "透明流程",
    "whyUs.transparent.desc": "合同清晰、无隐藏费用、建议真诚。",
    "whyUs.compliance.title": "合规优先",
    "whyUs.compliance.desc": "我们与持牌合作伙伴合作处理法律和秘书事务。",
    "whyUs.imagePlaceholder": "团队/办公室图片",

    // CTA Section
    "cta.title": "准备好开始您的旅程了吗？",
    "cta.subtitle": "无论您是计划留学还是寻求企业服务，我们的团队都随时为您提供帮助。",
    "cta.student": "学生咨询",
    "cta.corporate": "企业咨询",

    // About Page
    "about.hero.title": "关于枫叶集团",
    "about.hero.subtitle": "您在新加坡教育、移民和安居服务的可信赖伙伴。",
    "about.story.title": "我们的故事",
    "about.story.p1": "枫叶集团成立的初心很简单：帮助家庭和专业人士自信、清晰地规划新加坡之旅。",
    "about.story.p2": "我们的团队成员都亲身经历过在新加坡学习、工作和定居的挑战。我们深知选择合适学校、获取工作准证、在异国建立生活的种种复杂性。",
    "about.story.p3": "如今，我们服务从幼儿园到大学的学生、寻求工作准证的专业人士，以及需要全面安居支持的家庭。",
    "about.mission.title": "我们的使命",
    "about.mission.desc": "提供透明、专业、个性化的服务，助力客户在新加坡实现教育和职业目标。",
    "about.values.title": "我们的价值观",
    "about.values.integrity.title": "诚信为本",
    "about.values.integrity.desc": "我们提供真诚的建议和清晰的价格。无隐藏费用，不做不切实际的承诺。",
    "about.values.professionalism.title": "专业服务",
    "about.values.professionalism.desc": "我们与持牌合作伙伴合作，保持最高的服务标准。",
    "about.values.care.title": "客户关怀",
    "about.values.care.desc": "每位客户的旅程都是独特的。我们倾听、理解，并据此定制服务。",
    "about.values.compliance.title": "合规经营",
    "about.values.compliance.desc": "我们严格遵守新加坡法规，仅与授权合作伙伴合作。",
    "about.team.title": "我们的团队",
    "about.team.desc": "我们的团队将本地专业知识与国际视野相结合。扎根新加坡，我们对这里的教育体系、移民流程和日常生活有着第一手的经验。",
    "about.legal.title": "法律主体",
    "about.legal.education": "Maple Education Pte. Ltd. - 教育咨询及学生服务",
    "about.legal.group": "Maple Group - 所有服务的品牌统称",
    "about.legal.note": "对于需要专业执照的服务（法律、秘书、移民申报），我们与持牌机构合作，并清晰披露各方角色和职责。",
    "about.disclaimer.title": "重要声明",
    "about.disclaimer.text": "枫叶集团不保证任何学校录取、任何签证或工作准证的批准，或任何移民申请的成功。所有结果取决于官方机构的决定和个人具体情况。我们仅提供指导、准备支持和协调服务。",
    "about.cta.title": "想了解更多？",
    "about.cta.desc": "联系我们进行免费咨询，讨论您的目标以及我们如何能够帮助您。",
    "about.cta.button": "联系我们",

    // Contact Page
    "contact.hero.title": "联系我们",
    "contact.hero.subtitle": "与我们的团队取得联系，我们随时为您的新加坡之旅提供帮助。",
    "contact.form.title": "发送消息",
    "contact.form.name": "姓名",
    "contact.form.namePlaceholder": "您的姓名",
    "contact.form.email": "电子邮箱",
    "contact.form.emailPlaceholder": "your.email@example.com",
    "contact.form.phone": "电话号码",
    "contact.form.phonePlaceholder": "+65 XXXX XXXX",
    "contact.form.inquiryType": "咨询类型",
    "contact.form.selectType": "请选择咨询类型",
    "contact.form.typeStudy": "留学服务",
    "contact.form.typeImmigration": "移民与工作准证",
    "contact.form.typeConcierge": "管家服务",
    "contact.form.typeCorporate": "企业服务",
    "contact.form.typeOther": "其他",
    "contact.form.message": "留言内容",
    "contact.form.messagePlaceholder": "请告诉我们您的目标以及我们如何能够帮助您...",
    "contact.form.submit": "发送消息",
    "contact.form.pdpaNotice": "提交此表单即表示您同意我们依据 PDPA 的数据保护政策。",
    "contact.info.title": "联系方式",
    "contact.info.address": "办公地址",
    "contact.info.whatsappNote": "通过 WhatsApp 快速回复",
    "contact.info.phone": "电话",
    "contact.info.email": "邮箱",
    "contact.info.hours": "营业时间",
    "contact.info.hoursDetail": "周一至周五：上午 9:00 - 下午 6:00（新加坡时间）",
    "contact.map.title": "我们的位置",
    "contact.map.directions": "位于半岛广场，可从政府大厦地铁站轻松到达。",
    "contact.whatsappCta.title": "更喜欢 WhatsApp？",
    "contact.whatsappCta.subtitle": "直接与我们聊天，获得更快的回复。",
    "contact.whatsappCta.button": "WhatsApp 咨询",

    // Services Page
    "servicesPage.hero.title": "我们的服务",
    "servicesPage.hero.subtitle": "为您量身定制的全方位教育与安居服务。从学校申请到落地支持，我们全程陪伴。",

    // K12 International Schools
    "servicesPage.k12International.title": "低龄私立国际学校",
    "servicesPage.k12International.desc": "国际幼儿园、小学、中学申请。合作院校包括加拿大国际学校、澳洲国际学校、美国斯坦福国际学校等。",
    "servicesPage.k12International.features": "选校咨询及入学能力测试|选校规划|面试辅导及入学培训|材料收集及申请|学生签证及陪读签证|行前准备|落地管家服务",

    // Public Schools & AEIS
    "servicesPage.publicAeis.title": "政府学校 & AEIS",
    "servicesPage.publicAeis.desc": "新加坡政府学校升学路径，包括南洋小学、道南学校等顶尖小学，以及莱佛士书院、华侨中学等精英中学。",
    "servicesPage.publicAeis.features": "选校咨询及入学能力测试|选校规划|AEIS入学考试辅导|材料收集及申请|学生签证及陪读签证|行前准备|落地管家服务",

    // Private University
    "servicesPage.privateUni.title": "私立大学申请",
    "servicesPage.privateUni.desc": "Kaplan、JCU新加坡校区、科廷大学、PSB学院、SIM、MDIS、拉萨尔艺术学院、南洋艺术学院等知名私立院校申请。",
    "servicesPage.privateUni.features": "选校规划|学术评估|文书服务|保录取评估服务|材料收集及申请|学生签证申请|行前准备|落地管家服务",

    // Public University
    "servicesPage.publicUni.title": "公立大学申请",
    "servicesPage.publicUni.desc": "新加坡国立大学(QS全球第8)、南洋理工大学(QS全球第12)、SMU、SUTD、SIT、SUSS、UAS申请。提供文书写作和背景提升全方位规划。",
    "servicesPage.publicUni.features": "目标院校及专业规划|申请时间线管理|文书撰写与润色|背景提升项目|面试辅导|申请提交与跟进|签证办理指导",

    // Butler / Concierge Service
    "servicesPage.butler.title": "境外管家服务",
    "servicesPage.butler.desc": "三个月全方位落地支持，从接机到日常生活协助。让学生安心融入新加坡，让家长放心。",
    "servicesPage.butler.features": "行前指导及清单|接机服务（可选）|电话卡、交通卡及生活必需品|学校报到及体检|银行开户协助|定期生活关怀|7×24小时紧急支持|留学生聚会活动",

    // Study Tours
    "servicesPage.studyTours.title": "游学研学团",
    "servicesPage.studyTours.desc": "新加坡国立大学商务精英研学课程、STEAM夏令营（15-18岁）、全球青年领袖谈判课程及定制化游学项目。",
    "servicesPage.studyTours.features": "课程结束后获得官方证书|可按年龄定制路线|大学校园沉浸体验|文化体验活动|专业人脉拓展|领导力培养",

    // Document & Background
    "servicesPage.documents.title": "文书服务 & 背景提升",
    "servicesPage.documents.desc": "一对一定制个人陈述、申请材料润色，针对性规划科研、实习、竞赛、志愿服务等课外活动。",
    "servicesPage.documents.features": "个人陈述撰写|申请材料润色|科研项目指导|实习安排协助|竞赛准备|志愿活动规划|综合背景提升",

    // Academic Support
    "servicesPage.academic.title": "学术辅导 & 申诉服务",
    "servicesPage.academic.desc": "作业辅导和考试备考支持。为出勤不达标或有学术诚信问题的学生提供申诉服务。",
    "servicesPage.academic.features": "作业辅导|考试备考|学业进度监督|出勤问题申诉|学术诚信申诉|一对一学术辅导",

    // CTA
    "servicesPage.cta.title": "准备好开始了吗？",
    "servicesPage.cta.subtitle": "联系我们获取免费咨询。让我们帮您规划新加坡留学之旅。",
    "servicesPage.cta.button": "免费咨询",

    // Common
    "servicesPage.learnMore": "了解更多",
    "servicesPage.keyFeatures": "服务亮点",
    "common.moreCount": "+{count} 项更多…",
    "nav.toggleMenu": "展开菜单",

    // Home / Map / Pathfinder
    "home.explore.title": "探索新加坡院校",
    "home.explore.subtitle1": "了解新加坡主要院校的地理位置与交通便利度。",
    "home.explore.subtitle2": "点击学校查看附近地铁站与区域房价参考。",
    "map.loading": "地图加载中…",
    "map.nearestMrtStations": "最近的地铁站",
    "map.visitWebsite": "打开官网",
    "pathfinder.title": "找到最适合你的升学路线",
    "pathfinder.subtitle": "告诉我们你的基本情况，我们会推荐更适合的路径。",
    "pathfinder.form.age": "当前年龄",
    "pathfinder.form.qualification": "最高学历 / 阶段",
    "pathfinder.form.grades": "平均成绩",
    "pathfinder.qual.highSchool": "高中/中学（Year 10-12）",
    "pathfinder.qual.oLevel": "O 水准（GCE O-Level）",
    "pathfinder.qual.aLevel": "A 水准（GCE A-Level）",
    "pathfinder.qual.diploma": "大专 / 理工（Diploma）",
    "pathfinder.qual.degree": "本科（Bachelor）",
    "pathfinder.grade.excellent": "优秀（A）",
    "pathfinder.grade.good": "良好（B）",
    "pathfinder.grade.average": "中等（C）",
    "pathfinder.grade.pass": "及格（D/E）",
    "pathfinder.button.seeFuture": "查看推荐路线",
    "pathfinder.availableAt": "可申请院校：",
    "pathfinder.button.startOver": "重新开始",
    "pathfinder.availableAtContact": "联系顾问获取可选院校清单。",

    // Tools
    "tools.hero.title": "免费工具",
    "tools.hero.subtitle": "用选校地图和路线自测快速了解方向；需要更精准的定制方案，欢迎联系我们。",
    "tools.hero.jump.map": "选校地图",
    "tools.hero.jump.pathfinder": "路线自测",
    "tools.hero.cta": "联系顾问",
    "tools.footer.title": "需要更精准的方案？",
    "tools.footer.subtitle": "告诉我们你的背景与目标，我们将给出院校清单与时间线建议。",
    "tools.footer.cta": "联系我们",

    // Footer
    "footer.description": "您在新加坡学习、工作和生活的可信赖伙伴。专业的教育咨询和企业服务。",
    "footer.services": "服务项目",
    "footer.studyAbroad": "留学服务",
    "footer.immigration": "移民与工作准证",
    "footer.butler": "管家服务",
    "footer.selfEmployedEp": "自雇EP",
    "footer.company": "公司信息",
    "footer.aboutUs": "关于我们",
    "footer.resources": "资源中心",
    "footer.contact": "联系我们",
    "footer.privacy": "隐私政策",
    "footer.contactTitle": "联系方式",
    "footer.rights": "版权所有。",
  },
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const urlLocale = new URLSearchParams(window.location.search).get("lang")
      if (urlLocale === "en" || urlLocale === "zh") return urlLocale
    } catch {
      // ignore
    }

    try {
      const savedLocale = localStorage.getItem("locale") as Locale
      if (savedLocale === "en" || savedLocale === "zh") return savedLocale
    } catch {
      // ignore
    }

    try {
      const nav = String(navigator.language || "").toLowerCase()
      if (nav.startsWith("zh")) return "zh"
      return "en"
    } catch {
      return "zh"
    }
  })

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem("locale", newLocale)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      const urlLocale = url.searchParams.get("lang")
      if (urlLocale !== "en" && urlLocale !== "zh") return
      try {
        localStorage.setItem("locale", urlLocale)
      } catch {
        // ignore
      }
      url.searchParams.delete("lang")
      window.history.replaceState({}, "", url.toString())
    } catch {
      // ignore
    }
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let text = translations[locale][key] || key
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replaceAll(`{${k}}`, String(v))
        })
      }
      return text
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
