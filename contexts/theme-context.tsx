"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark" | "interstellar" | "jsonlicious"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("jsonlicious") // Definindo JsonLicious como padrão

  useEffect(() => {
    // Executa apenas no lado do cliente
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme | null
      if (storedTheme && ["light", "dark", "interstellar", "jsonlicious"].includes(storedTheme)) {
        setTheme(storedTheme)
      } else {
        // Quando não há tema salvo, usa JsonLicious como padrão
        setTheme("jsonlicious")
      }
    }
  }, [])

  useEffect(() => {
    // Executa apenas no lado do cliente
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)

      const root = document.documentElement
      root.classList.remove("light", "dark", "interstellar", "jsonlicious")
      root.classList.add(theme)
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider")
  }
  return context
}
