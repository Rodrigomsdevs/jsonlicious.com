"use client"

import { Moon, Sun, Sparkles, IceCream } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0 dark:rotate-90 interstellar:scale-0 interstellar:rotate-90 jsonlicious:scale-0 jsonlicious:rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0 interstellar:scale-0 interstellar:rotate-90 jsonlicious:scale-0 jsonlicious:rotate-90" />
          <Sparkles className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all interstellar:scale-100 interstellar:rotate-0 jsonlicious:scale-0 jsonlicious:rotate-90" />
          <IceCream className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all jsonlicious:scale-100 jsonlicious:rotate-0" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4 mr-2" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4 mr-2" />
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("interstellar")}>
          <Sparkles className="h-4 w-4 mr-2" />
          Interestelar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("jsonlicious")}>
          <IceCream className="h-4 w-4 mr-2" />
          JsonLicious
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
