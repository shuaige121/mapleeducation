"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

export default function PrivacyPage() {
  const { locale } = useI18n()
  const isZh = locale === "zh"

  return (
    <div className="container py-20">
      <h1 className="text-4xl font-bold text-secondary mb-6">
        {isZh ? "隐私与 PDPA 声明" : "Privacy & PDPA Notice"}
      </h1>

      <div className="space-y-4 text-muted-foreground leading-relaxed max-w-3xl">
        {isZh ? (
          <>
            <p>
              本声明用于说明 Maple Education Pte. Ltd.（“我们”）在您咨询留学/移民/管家等服务过程中，如何收集、使用与披露您的个人资料。我们将根据新加坡《2012 年个人数据保护法》（PDPA）处理您的个人资料。
            </p>
            <p>
              我们可能收集的信息包括：姓名、联系方式（电话/邮箱/微信/WhatsApp）、护照/身份证信息、教育背景、工作经历、家庭信息，以及为提供服务所必需的其他材料。
            </p>
            <p>
              我们收集与使用个人资料的目的包括：需求评估、方案设计、项目匹配、材料清单与文件管理、与合作院校/持牌服务商/主管部门沟通协调、开具报价与发票、合规留档与内部培训改进。
            </p>
            <p>
              在提供服务所必需的范围内，我们可能向合作院校、第三方服务提供方（例如公司秘书/会计/翻译/体检机构等）或主管部门披露相关个人资料。我们会尽合理努力要求相关方对资料保密并仅在必要范围内使用。
            </p>
            <p>
              您可向我们提出访问、更正或撤回同意的请求。撤回同意可能影响我们继续提供服务。联系我们：{" "}
              <a className="text-primary hover:underline" href="mailto:Maple@maplesgedu.com">Maple@maplesgedu.com</a>{" "}
              或通过 <Link className="text-primary hover:underline" href="/contact">Contact</Link> 页面。
            </p>
          </>
        ) : (
          <>
	            <p>
	              This notice explains how Maple Education Pte. Ltd. (we) may collect, use and disclose your personal data when you inquire about our study abroad, immigration/work pass or concierge services. We handle personal data in accordance with Singapore’s Personal Data Protection Act 2012 (PDPA).
	            </p>
            <p>
              We may collect: name, contact details (phone/email/WeChat/WhatsApp), passport/ID details, education and employment background, family information, and other documents reasonably required to deliver the services.
            </p>
            <p>
              Purposes include: needs assessment, planning and matching, document checklist and file management, coordination with schools/licensed service providers/authorities, quotations and invoices, compliance record keeping, and internal service improvement.
            </p>
            <p>
              Where necessary, we may disclose relevant data to schools, third‑party service providers (e.g., corporate secretary/accounting/translation/medical providers), or authorities. We take reasonable steps to ensure such parties keep information confidential and use it only as needed.
            </p>
            <p>
              You may request access, correction or withdrawal of consent. Withdrawing consent may affect our ability to continue providing services. Contact us at{" "}
              <a className="text-primary hover:underline" href="mailto:Maple@maplesgedu.com">Maple@maplesgedu.com</a>{" "}
              or via the <Link className="text-primary hover:underline" href="/contact">Contact</Link> page.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
