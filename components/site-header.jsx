"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { BookOpen } from "lucide-react"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    setCurrentUser(user)

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser") || "null")
      setCurrentUser(updatedUser)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    router.push("/")
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 flex justify-center items-center gap-4">
        <div className="relative">
          <Image
            src="/bms-logo.jpg"
            alt="BMS College of Engineering Logo"
            width={80}
            height={80}
            priority
            className="rounded-full shadow-lg border-2 border-primary/30 hover:shadow-xl transition-shadow"
          />
        </div>
        <p className="text-center text-lg font-bold tracking-wide md:text-xl">BMS COLLEGE OF ENGINEERING</p>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="College Club Directory Home">
          <span className="font-semibold tracking-tight"><BookOpen className="h-5 w-5 mr-2" /> Club Directory</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm hover:underline" href="/">
            Home
          </Link>
          <Link className="text-sm hover:underline" href="/about">
            About
          </Link>
          <Link className="text-sm hover:underline" href="/contact">
            Contact
          </Link>
          {currentUser?.role === "admin" && (
            <Link className="text-sm hover:underline" href={`/club-admin/${currentUser.assignedClubId}`}>
              My Club
            </Link>
          )}
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{currentUser.name}</span>
              <Button size="sm" onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button size="sm" variant="outline">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>

        <Button
          variant="outline"
          className="md:hidden bg-transparent"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          {open ? "Close" : "Menu"}
        </Button>
      </div>

      <div id="mobile-menu" className={cn("border-t md:hidden", open ? "block" : "hidden")}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 md:px-6">
          <Link onClick={() => setOpen(false)} className="py-2" href="/">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} className="py-2" href="/about">
            About
          </Link>
          <Link onClick={() => setOpen(false)} className="py-2" href="/contact">
            Contact
          </Link>
          {currentUser?.role === "admin" && (
            <Link onClick={() => setOpen(false)} className="py-2" href={`/club-admin/${currentUser.assignedClubId}`}>
              My Club
            </Link>
          )}
          {currentUser ? (
            <div className="flex flex-col gap-2 pt-2 border-t">
              <span className="text-sm text-muted-foreground">{currentUser.name}</span>
              <Button size="sm" onClick={handleLogout} variant="outline" className="w-full bg-transparent">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link onClick={() => setOpen(false)} href="/sign-in">
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link onClick={() => setOpen(false)} href="/sign-up">
                <Button size="sm" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
