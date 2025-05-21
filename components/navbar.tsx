"use client"

import { Github } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "@/contexts/theme-context"

export function Navbar() {
  const { theme } = useTheme()

  return (
    <header
      className={`sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        theme === "interstellar" ? "navbar-glow" : ""
      } navbar-container`}
    >
      <div className="flex h-16 items-center px-4 w-full">
        <div className="mr-4 flex">
          <a href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <Image
                src="/images/jsonlicious-icon.png"
                alt="JSONlicious Logo - Sorvete com a letra J"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-xl">JSONlicious</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild className="transition-all hover:bg-primary/10">
              <a
                href="https://github.com/Rodrigomsdevs/jsonlicious.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Repositório GitHub do JSONlicious"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
