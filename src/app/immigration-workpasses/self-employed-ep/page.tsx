"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

export default function SelfEmployedEpPage() {
  const { locale } = useI18n()
  const isZh = locale === "zh"

  return (
    <div className="container py-20">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        {isZh ? "自雇 EP / 公司设立" : "Self‑Employed EP / Company Setup"}
      </h1>

      <div className="space-y-4 text-muted-foreground leading-relaxed max-w-3xl">
        {isZh ? (
          <>
            <p>
              该页面用于介绍“自雇 EP + 公司设立”的基本流程、所需材料与风险提示。具体审批结果由新加坡主管部门独立决定，我们不会做任何“保证获批/保证开户/保证时效”的承诺。
            </p>
            <p>
              我们可以提供：方案评估（行业/岗位/薪资/股权/时间线）、材料清单与文件统筹、对接持牌公司秘书/会计/翻译等服务商、递交与进度协调，以及家属 DP/LTVP 的路径说明与材料准备建议。
            </p>
            <p>
              自雇 EP 涉及公司注册、秘书/注册地址、会计税务、尽调与银行开户等第三方服务与费用，通常由第三方单独报价与收款；我们负责统筹与项目管理。
            </p>
            <p>
              如需了解报价与适配建议，请通过 <Link className="text-primary hover:underline" href="/contact">Contact</Link> 联系我们，我们会按你的背景做一次初步评估后再给出可执行方案。
            </p>
          </>
        ) : (
          <>
            <p>
              This page outlines the general flow, documents and key risk notes for a self‑employed EP and company setup journey. All outcomes are solely determined by the relevant Singapore authorities. We do not guarantee approvals, bank account opening, or timelines.
            </p>
            <p>
              We can support with: feasibility discussion (industry/role/salary/shareholding/timeline), document checklist and coordination, liaising with licensed corporate secretarial/accounting/translation providers, submission coordination and progress tracking, and guidance on dependant routes (DP/LTVP).
            </p>
            <p>
              Company incorporation, secretarial/registered address, accounting/tax, due diligence and banking typically involve third‑party services and fees charged separately by those providers. We focus on project coordination and delivery management.
            </p>
	            <p>
	              For pricing and suitability, please reach us via <Link className="text-primary hover:underline" href="/contact">Contact</Link>. We will review your background and propose an executable plan.
	            </p>
          </>
        )}
      </div>
    </div>
  )
}
