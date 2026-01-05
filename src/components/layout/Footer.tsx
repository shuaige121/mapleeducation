"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"

export function Footer() {
    const { t } = useI18n()

    return (
        <footer className="bg-muted py-12 text-muted-foreground">
            <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <img src="/assets/logo.jpg" alt="Maple Group Logo" className="h-8 w-8 rounded-full object-cover" />
                        <span className="text-lg font-bold text-foreground">Maple Group</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        {t("footer.description")}
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">{t("footer.services")}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/study-abroad" className="hover:text-primary">{t("footer.studyAbroad")}</Link></li>
                        <li><Link href="/immigration-workpasses" className="hover:text-primary">{t("footer.immigration")}</Link></li>
                        <li><Link href="/butler-concierge" className="hover:text-primary">{t("footer.butler")}</Link></li>
                        <li><Link href="/immigration-workpasses/self-employed-ep" className="hover:text-primary">{t("footer.selfEmployedEp")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">{t("footer.company")}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-primary">{t("footer.aboutUs")}</Link></li>
                        <li><Link href="/resources" className="hover:text-primary">{t("footer.resources")}</Link></li>
                        <li><Link href="/contact" className="hover:text-primary">{t("footer.contact")}</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary">{t("footer.privacy")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wider">{t("footer.contactTitle")}</h3>
                    <ul className="space-y-2 text-sm">
                        <li>111 North Bridge Road, #25-01</li>
                        <li>Peninsula Plaza, Singapore 179098</li>
                        <li className="pt-2">Email: <a href="mailto:Maple@maplesgedu.com" className="hover:text-primary">Maple@maplesgedu.com</a></li>
                        <li>
                            WhatsApp:{" "}
                            <a
                                href="https://wa.me/6586863695"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                            >
                                +65 8686 3695
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mt-12 border-t pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Maple Education Pte. Ltd. {t("footer.rights")}</p>
            </div>
        </footer>
    )
}
