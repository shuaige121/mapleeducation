"use client"

import { MessageCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const PHONE_NUMBER = "6586863695"

export function WhatsAppButton() {
    const { locale } = useI18n()

    const message = locale === "zh"
        ? "您好，我想咨询枫叶集团的服务"
        : "Hello, I'd like to inquire about Maple Group services"

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#128C7E] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="h-7 w-7" />
        </a>
    )
}
