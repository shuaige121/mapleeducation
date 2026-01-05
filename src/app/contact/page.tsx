"use client"

import type { FormEvent } from "react"
import { useState } from "react"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react"

export default function ContactPage() {
    const { t } = useI18n()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [inquiryType, setInquiryType] = useState("")
    const [message, setMessage] = useState("")

    const WHATSAPP_PHONE_E164_NO_PLUS = "6586863695"

    const inquiryTypeLabel = (value: string) => {
        if (value === "study") return t("contact.form.typeStudy")
        if (value === "immigration") return t("contact.form.typeImmigration")
        if (value === "concierge") return t("contact.form.typeConcierge")
        if (value === "corporate") return t("contact.form.typeCorporate")
        if (value === "other") return t("contact.form.typeOther")
        return value
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const parts = [
            `${t("contact.form.name")}: ${name.trim() || "-"}`,
            `${t("contact.form.phone")}: ${phone.trim() || "-"}`,
            `${t("contact.form.email")}: ${email.trim() || "-"}`,
            `${t("contact.form.inquiryType")}: ${inquiryType ? inquiryTypeLabel(inquiryType) : "-"}`,
            `${t("contact.form.message")}: ${message.trim() || "-"}`,
        ]

        const text = parts.join("\n").slice(0, 2000).trim()
        const base = `https://wa.me/${WHATSAPP_PHONE_E164_NO_PLUS}`
        const url = text ? `${base}?text=${encodeURIComponent(text)}` : base
        window.open(url, "_blank", "noopener,noreferrer")
    }

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#1a3b5c] opacity-90" />
                <div className="container relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {t("contact.hero.title")}
                        </h1>
                        <p className="mt-6 text-lg text-white/80">
                            {t("contact.hero.subtitle")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 lg:py-24">
                <div className="container">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Contact Info & Map - Left Column */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-secondary mb-6">
                                    {t("contact.info.title")}
                                </h2>
                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-secondary">
                                                {t("contact.info.address")}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                111 North Bridge Road, #25-01<br />
                                                Peninsula Plaza, Singapore 179098
                                            </p>
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                                            <MessageCircle className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-secondary">WhatsApp</h3>
                                            <a
                                                href="https://wa.me/6586863695"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:underline font-medium"
                                            >
                                                +65 8686 3695
                                            </a>
                                            <p className="text-sm text-muted-foreground">
                                                {t("contact.info.whatsappNote")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-secondary">
                                                {t("contact.info.phone")}
                                            </h3>
                                            <a href="tel:+6586863695" className="text-primary hover:underline">
                                                +65 8686 3695
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-secondary">
                                                {t("contact.info.email")}
                                            </h3>
                                            <a href="mailto:Maple@maplesgedu.com" className="text-primary hover:underline">
                                                Maple@maplesgedu.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="flex gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-secondary">
                                                {t("contact.info.hours")}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {t("contact.info.hoursDetail")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div>
                                <h3 className="font-semibold text-secondary mb-4">
                                    {t("contact.map.title")}
                                </h3>
                                <div className="rounded-xl overflow-hidden shadow-lg border">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.796512893891!2d103.85070687496567!3d1.2928569617455168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a5e9ca6c4f%3A0x9e1f67b97f77b3fc!2sPeninsula%20Plaza!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg"
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Maple Group Office Location"
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground mt-3">
                                    {t("contact.map.directions")}
                                </p>
                            </div>
                        </div>

	                        {/* Contact Form - Right Column */}
	                        <div>
	                            <h2 className="text-2xl font-bold text-secondary mb-6">
	                                {t("contact.form.title")}
	                            </h2>
	                            <Card className="border-none shadow-lg">
	                                <CardContent className="p-6">
	                                    <form className="space-y-6" onSubmit={handleSubmit}>
	                                        <div className="grid gap-4 sm:grid-cols-2">
	                                            <div className="space-y-2">
	                                                <label className="text-sm font-medium text-secondary">
	                                                    {t("contact.form.name")}
	                                                </label>
	                                                <Input
	                                                    value={name}
	                                                    onChange={(e) => setName(e.target.value)}
	                                                    placeholder={t("contact.form.namePlaceholder")}
	                                                />
	                                            </div>
	                                            <div className="space-y-2">
	                                                <label className="text-sm font-medium text-secondary">
	                                                    {t("contact.form.email")}
	                                                </label>
	                                                <Input
	                                                    value={email}
	                                                    onChange={(e) => setEmail(e.target.value)}
	                                                    type="email"
	                                                    placeholder={t("contact.form.emailPlaceholder")}
	                                                />
	                                            </div>
	                                        </div>
	                                        <div className="space-y-2">
	                                            <label className="text-sm font-medium text-secondary">
	                                                {t("contact.form.phone")}
	                                            </label>
	                                            <Input
	                                                value={phone}
	                                                onChange={(e) => setPhone(e.target.value)}
	                                                type="tel"
	                                                placeholder={t("contact.form.phonePlaceholder")}
	                                            />
	                                        </div>
	                                        <div className="space-y-2">
	                                            <label className="text-sm font-medium text-secondary">
	                                                {t("contact.form.inquiryType")}
	                                            </label>
	                                            <select
	                                                value={inquiryType}
	                                                onChange={(e) => setInquiryType(e.target.value)}
	                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
	                                            >
	                                                <option value="">{t("contact.form.selectType")}</option>
	                                                <option value="study">{t("contact.form.typeStudy")}</option>
	                                                <option value="immigration">{t("contact.form.typeImmigration")}</option>
	                                                <option value="concierge">{t("contact.form.typeConcierge")}</option>
	                                                <option value="corporate">{t("contact.form.typeCorporate")}</option>
	                                                <option value="other">{t("contact.form.typeOther")}</option>
	                                            </select>
	                                        </div>
	                                        <div className="space-y-2">
	                                            <label className="text-sm font-medium text-secondary">
	                                                {t("contact.form.message")}
	                                            </label>
	                                            <Textarea
	                                                value={message}
	                                                onChange={(e) => setMessage(e.target.value)}
	                                                placeholder={t("contact.form.messagePlaceholder")}
	                                                className="min-h-[120px]"
	                                            />
	                                        </div>
	                                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
	                                            <MessageCircle className="mr-2 h-4 w-4" />
	                                            {t("contact.form.submit")}
	                                        </Button>
	                                        <p className="text-xs text-muted-foreground text-center">
	                                            {t("contact.form.pdpaNotice")}
	                                        </p>
	                                    </form>
	                                </CardContent>
	                            </Card>
	                        </div>
	                    </div>
	                </div>
	            </section>

            {/* WhatsApp CTA Banner */}
            <section className="bg-green-600 py-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white">
                                {t("contact.whatsappCta.title")}
                            </h2>
                            <p className="text-white/90 mt-2">
                                {t("contact.whatsappCta.subtitle")}
                            </p>
                        </div>
                        <a
                            href="https://wa.me/6586863695"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                        >
                            <MessageCircle className="h-5 w-5" />
                            {t("contact.whatsappCta.button")}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
