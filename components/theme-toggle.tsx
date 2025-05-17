"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useSoundEffect } from "@/components/sound-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { playSound } = useSoundEffect()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
        <span className="sr-only">Toggle theme</span>
        <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark")
        playSound("switch")
      }}
      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun
        className={`h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all duration-300 ${theme === "dark" ? "opacity-0 scale-0" : "opacity-100"}`}
      />
      <Moon
        className={`absolute h-[1.5rem] w-[1.5rem] rotate-90 transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 scale-0"}`}
      />
    </Button>
  )
}

// Also export as default for compatibility
export default ThemeToggle
