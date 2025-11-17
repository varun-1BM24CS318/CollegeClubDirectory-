import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"

export const metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <SiteHeader />
          <div className="min-h-[calc(100vh-160px)]">{children}</div>
          <SiteFooter />
        </Suspense>
      </body>
    </html>
  )
}
