import { cn } from "@/utils/classes"
import { IconMoon, IconSun } from "justd-icons"
import { useEffect, useState } from "react"
import { Button } from "ui"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("light")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const handleSwitchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", newTheme)
  }

  return (
    <Button appearance="outline" size="square-petite" aria-label="Switch theme" onPress={handleSwitchTheme}>
      <IconSun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark" ? "opacity-0 scale-0 -rotate-90" : "opacity-100 scale-100 rotate-0"
        )}
      />
      <IconMoon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-90"
        )}
      />
    </Button>
  )
}
