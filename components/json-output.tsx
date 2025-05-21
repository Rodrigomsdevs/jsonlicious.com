"use client"

import { Copy, Code, FileJson, Download } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { JsonRenderer } from "./json-renderer"

interface JsonOutputProps {
  value: string
}

export function JsonOutput({ value }: JsonOutputProps) {
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState<"tree" | "raw">("tree")

  const copyToClipboard = () => {
    if (!value) return

    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadJson = () => {
    if (!value) return

    const blob = new Blob([value], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "data.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Analisa a string JSON para um objeto para o renderizador
  const getParsedJson = () => {
    try {
      return value ? JSON.parse(value) : null
    } catch (e) {
      return null
    }
  }

  const parsedJson = getParsedJson()

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem-64px)]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">JSON Formatado</h2>
        <div className="flex items-center gap-2">
          {value && (
            <>
              <div className="flex border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("tree")}
                  className={`px-2 py-1 text-xs flex items-center gap-1 ${
                    viewMode === "tree"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <FileJson className="h-3.5 w-3.5" />
                  Árvore
                </button>
                <button
                  onClick={() => setViewMode("raw")}
                  className={`px-2 py-1 text-xs flex items-center gap-1 ${
                    viewMode === "raw"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Code className="h-3.5 w-3.5" />
                  Bruto
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-1 transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copiado!" : "Copiar"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadJson}
                className="flex items-center gap-1 transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="h-3.5 w-3.5" />
                Baixar
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 font-mono text-sm overflow-auto border rounded-md bg-background transition-all relative json-output-container">
        {!value ? (
          <span className="text-muted-foreground">O JSON formatado aparecerá aqui</span>
        ) : viewMode === "raw" ? (
          <pre>{value}</pre>
        ) : parsedJson ? (
          <JsonRenderer data={parsedJson} />
        ) : (
          <span className="text-destructive">JSON inválido</span>
        )}
      </div>
    </div>
  )
}
