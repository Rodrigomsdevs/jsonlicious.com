"use client"

import { useTheme } from "@/contexts/theme-context"
import { useEffect, useState } from "react"
import { InterstellarEffects } from "./interstellar-effects"

export function GalaxyEffects() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Garantir que o componente só renderize no cliente para evitar erros de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (theme === "interstellar") {
    return <InterstellarEffects />
  }

  // Efeitos para o tema JsonLicious são gerenciados via CSS
  return null
}
