"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"
import LaunchModal from "./launch-modal"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled ? "bg-white/70 backdrop-blur-lg dark:bg-black/70 shadow-lg" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
            <span className="relative">
              <span className="absolute -inset-1 rounded-full blur-sm bg-gradient-to-r from-pink-500 to-purple-500 opacity-70 group-hover:opacity-100 transition duration-200"></span>
              <span className="relative">PackPal</span>
            </span>
            <Rocket className="h-6 w-6 animate-bounce" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#checklist">Checklist</NavLink>
            <NavLink href="#tips">Tips</NavLink>
            <NavLink href="#leaderboard">Leaderboard</NavLink>
            <NavLink href="#about">About</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="default"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-full px-6 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300 dark:hover:shadow-purple-900"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Launch Packing Mode
            </Button>
          </div>
        </div>
      </header>
      <LaunchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200 group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
    </Link>
  )
}
