import type { Metadata } from "next"
import { ToolsPageClient } from "./ToolsPageClient"

export const metadata: Metadata = {
  title: "Tools | Maple Group",
  description: "Explore schools in Singapore and get a quick study pathway suggestion.",
}

export default function ToolsPage() {
  return <ToolsPageClient />
}

