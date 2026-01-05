"use client"

import * as React from "react"
import { useI18n } from "@/lib/i18n/context"
import { Course, richCourses } from "@/data/courses"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, BookOpen, Clock, DollarSign, GraduationCap, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function CourseMatcher() {
    const { t } = useI18n()
    const [searchTerm, setSearchTerm] = React.useState("")
    const [selectedProvider, setSelectedProvider] = React.useState<string>("all")
    const [selectedMajor, setSelectedMajor] = React.useState<string>("all")
    const [maxBudget, setMaxBudget] = React.useState<string>("")
    const [selectedQS, setSelectedQS] = React.useState<string>("all")
    const [isFilterOpen, setIsFilterOpen] = React.useState(false) // For mobile simplified view

    // Derived data
    const providers = React.useMemo(() => {
        const s = new Set(richCourses.map(c => c.provider))
        return Array.from(s).sort()
    }, [])

    const majors = React.useMemo(() => {
        const s = new Set(richCourses.flatMap(c => c.majors || [c.major || "Other"]))
        return Array.from(s).sort()
    }, [])

    const parseQSRank = (qs?: string): number => {
        if (!qs || qs === "N/A" || qs === "Specialized") return 9999

        // Handle "Top 500" format
        const topMatch = qs.match(/Top\s*(\d+)/i)
        if (topMatch) return parseInt(topMatch[1])

        // Handle "#123" or "123" format
        const numMatch = qs.match(/#?(\d+)/)
        if (numMatch) return parseInt(numMatch[1])

        return 9999
    }

    const filteredCourses = React.useMemo(() => {
        return richCourses.filter(course => {
            const searchLower = searchTerm.toLowerCase()
            const matchesSearch =
                course.name.toLowerCase().includes(searchLower) ||
                course.provider.toLowerCase().includes(searchLower) ||
                (course.partner && course.partner.toLowerCase().includes(searchLower))

            const matchesProvider = selectedProvider === "all" || course.provider === selectedProvider
            const matchesMajor = selectedMajor === "all" ||
                (course.majors && course.majors.includes(selectedMajor)) ||
                course.major === selectedMajor

            const budgetVal = parseInt(maxBudget)
            const matchesBudget = !maxBudget || isNaN(budgetVal) || (course.tuitionSgdMin !== undefined && course.tuitionSgdMin <= budgetVal)

            let matchesQS = true
            if (selectedQS !== "all") {
                const rankLimit = parseInt(selectedQS)
                const courseRank = parseQSRank(course.qs)
                matchesQS = courseRank <= rankLimit
            }

            return matchesSearch && matchesProvider && matchesMajor && matchesBudget && matchesQS
        })
    }, [searchTerm, selectedProvider, selectedMajor, maxBudget, selectedQS])

    const activeFiltersCount = [
        selectedProvider !== "all",
        selectedMajor !== "all",
        selectedQS !== "all",
        !!maxBudget
    ].filter(Boolean).length

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 pb-20">
            {/* Header Section */}
            <div className="relative bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 pb-8 pt-8 md:pt-12 px-4 shadow-sm">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Course Finder
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
                            Explore {richCourses.length} curated programs from Singapore's top private education institutions.
                        </p>
                    </motion.div>

                    {/* Quick Search Bar */}
                    <div className="relative max-w-2xl">
                        <div className="relative group">
                            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                type="search"
                                placeholder="Search by university, major, or course name..."
                                className="pl-11 h-12 text-base rounded-xl shadow-sm border-gray-200 dark:border-gray-800 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 mt-8">
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

                    {/* Filters Sidebar - Desktop */}
                    <div className="hidden lg:block space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Filter className="w-4 h-4" /> Filters
                                </h3>
                                {activeFiltersCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 text-xs text-muted-foreground hover:text-primary"
                                        onClick={() => {
                                            setSelectedProvider("all")
                                            setSelectedMajor("all")
                                            setSelectedQS("all")
                                            setMaxBudget("")
                                        }}
                                    >
                                        Clear({activeFiltersCount})
                                    </Button>
                                )}
                            </div>

                            <Card className="border-none shadow-none bg-transparent space-y-6 p-0">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">QS Ranking</label>
                                    <Select value={selectedQS} onValueChange={setSelectedQS}>
                                        <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="Any Ranking" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Any Ranking</SelectItem>
                                            <SelectItem value="50">Top 50</SelectItem>
                                            <SelectItem value="100">Top 100</SelectItem>
                                            <SelectItem value="200">Top 200</SelectItem>
                                            <SelectItem value="500">Top 500</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Provider</label>
                                    <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                                        <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="All Providers" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Providers</SelectItem>
                                            {providers.map(p => (
                                                <SelectItem key={p} value={p}>{p}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Major</label>
                                    <Select value={selectedMajor} onValueChange={setSelectedMajor}>
                                        <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="All Majors" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Majors</SelectItem>
                                            {majors.map(m => (
                                                <SelectItem key={m} value={m} className="capitalize">{m.replace('_', ' ')}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Budget (SGD/Year)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            placeholder="e.g. 25000"
                                            className="pl-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                            value={maxBudget}
                                            onChange={(e) => setMaxBudget(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-4">
                        <Button variant="outline" className="w-full justify-between" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                            {isFilterOpen ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg border mt-2 p-4 space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Provider</label>
                                        <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                {providers.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Major</label>
                                        <Select value={selectedMajor} onValueChange={setSelectedMajor}>
                                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All</SelectItem>
                                                {majors.map(m => <SelectItem key={m} value={m} className="capitalize">{m.replace('_', ' ')}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Max Budget</label>
                                        <Input type="number" placeholder="e.g. 25000" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Results Area */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Showing {filteredCourses.length} results</span>
                        </div>

                        <motion.div layout className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
                            <AnimatePresence mode="popLayout">
                                {filteredCourses.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="col-span-full py-12 flex flex-col items-center justify-center text-center space-y-4 rounded-2xl bg-white dark:bg-gray-950 border border-dashed border-gray-300 dark:border-gray-800"
                                    >
                                        <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-900">
                                            <Search className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">No matches found</h3>
                                            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                                        </div>
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setSearchTerm("")
                                                setSelectedProvider("all")
                                                setSelectedMajor("all")
                                                setMaxBudget("")
                                            }}
                                        >
                                            Clear all filters
                                        </Button>
                                    </motion.div>
                                ) : (
                                    filteredCourses.map((course, index) => (
                                        <motion.div
                                            key={course.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            layoutId={course.id}
                                        >
                                            <Card className="group h-full flex flex-col overflow-hidden border-gray-200 dark:border-gray-800 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 bg-white dark:bg-gray-950">
                                                <CardHeader className="pb-3 space-y-3">
                                                    <div className="flex justify-between items-start">
                                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 hover:text-blue-800 border-none px-2.5 py-1">
                                                            {course.provider}
                                                        </Badge>
                                                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                            {course.awardLevel === "bachelor" ? "UG" : (course.awardLevel === "master" ? "PG" : "Dip")}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                                                            {course.name}
                                                        </CardTitle>
                                                        {course.partner && (
                                                            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                                                <span>{course.partner}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="flex-1 pb-4">
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {course.qs && !course.qs.includes("N/A") && (
                                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50 text-xs font-semibold">
                                                                <span className="text-amber-500">★</span>
                                                                {course.qs}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                                        {course.highlights || "Contact us for more details."}
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                                                        <div className="flex items-center gap-2.5">
                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                            <span>{course.duration}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2.5">
                                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                                            <span className="font-medium">
                                                                {course.tuitionSgdMin ? `${(course.tuitionSgdMin / 1000).toFixed(1)}k SGD` : "TBC"}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2.5 col-span-2">
                                                            <GraduationCap className="w-4 h-4 text-gray-400" />
                                                            <span className="capitalize text-muted-foreground">Major: </span>
                                                            <span className="capitalize font-medium text-foreground">{(course.major || "General").replace('_', ' ')}</span>
                                                        </div>
                                                    </div>
                                                </CardContent>

                                                <CardFooter className="pt-0 pb-5 px-6">
                                                    <Button asChild className="w-full bg-slate-900 text-white hover:bg-primary transition-all shadow-sm">
                                                        <a href={course.official || "/contact"} target="_blank" rel="noopener noreferrer">
                                                            {course.official ? "View Details" : "Enquire"}
                                                        </a>
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChevronDown({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6" /></svg>
}
