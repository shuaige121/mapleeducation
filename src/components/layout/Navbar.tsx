"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n/context"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function Navbar() {
    const { t } = useI18n()

    const components = [
        {
            titleKey: "nav.k12International",
            href: "/study/k12-international",
            descKey: "nav.k12InternationalDesc",
        },
        {
            titleKey: "nav.publicAeis",
            href: "/study/k12-public-aeis",
            descKey: "nav.publicAeisDesc",
        },
        {
            titleKey: "nav.new2Path",
            href: "/study/new2-path",
            descKey: "nav.new2PathDesc",
        },
        {
            titleKey: "nav.dualDegree",
            href: "/study/dual-degree-path",
            descKey: "nav.dualDegreeDesc",
        },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    {/* <ImagePlaceholder className="h-10 w-10" label="LOGO" rounded /> */}
                    <img src="/assets/logo.jpg" alt="Maple Group Logo" className="h-10 w-10 rounded-full object-cover" />
                    <span className="hidden font-bold sm:inline-block text-primary text-xl">
                        Maple Group
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{t("nav.studyAbroad")}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.titleKey}
                                                title={t(component.titleKey)}
                                                href={component.href}
                                            >
                                                {t(component.descKey)}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/immigration-workpasses" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {t("nav.immigration")}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/butler-concierge" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {t("nav.concierge")}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/resources" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {t("nav.resources")}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/about" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {t("nav.about")}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center space-x-2">
                    <LanguageSwitcher />
                    <div className="hidden md:block">
                        <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
                            <Link href="/contact">{t("nav.contact")}</Link>
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">{t("nav.toggleMenu")}</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col space-y-4 mt-4">
                                    <Link href="/" className="font-bold text-lg">{t("nav.home")}</Link>
                                    <div className="flex flex-col space-y-2 pl-4 border-l-2">
                                        <span className="font-semibold text-muted-foreground">{t("nav.studyAbroad")}</span>
                                        <Link href="/study/k12-international" className="text-sm">{t("nav.k12International")}</Link>
                                        <Link href="/study/k12-public-aeis" className="text-sm">{t("nav.publicAeis")}</Link>
                                        <Link href="/study/new2-path" className="text-sm">{t("nav.new2Path")}</Link>
                                        <Link href="/study/dual-degree-path" className="text-sm">{t("nav.dualDegree")}</Link>
                                    </div>
                                    <Link href="/immigration-workpasses" className="font-medium">{t("nav.immigration")}</Link>
                                    <Link href="/butler-concierge" className="font-medium">{t("nav.concierge")}</Link>
                                    <Link href="/resources" className="font-medium">{t("nav.resources")}</Link>
                                    <Link href="/about" className="font-medium">{t("nav.about")}</Link>
                                    <Link href="/contact" className="font-medium text-primary">{t("nav.contact")}</Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
