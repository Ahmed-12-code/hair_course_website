"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null

    if (savedTheme) {
      setTheme(savedTheme)
      root.classList.remove("light", "dark")
      root.classList.add(savedTheme)
    } else {
      // Default to light mode
      setTheme("light")
      root.classList.remove("dark")
      root.classList.add("light")
    }
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const newTheme = theme === "dark" ? "light" : "dark"

    root.classList.remove(theme)
    root.classList.add(newTheme)
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-primary/30 hover:bg-primary/10 shadow-lg bg-card"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 text-primary" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary hover:scale-110 hover:rotate-180 transition-all duration-700 shadow-lg bg-card"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary rotate-0 scale-100 transition-all duration-700" />
      ) : (
        <Moon className="h-5 w-5 text-primary rotate-0 scale-100 transition-all duration-700" />
      )}
    </Button>
  )
}
