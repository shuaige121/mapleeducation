import { CourseMatcher } from "@/components/tools/CourseMatcher"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Course Matcher | Maple Education",
    description: "Find the perfect course for your study abroad journey with our smart course matching tool.",
}

export default function CourseMatcherPage() {
    return (
        <div className="container py-10">
            <CourseMatcher />
        </div>
    )
}
