"use client"

import type React from "react"

import { AlertCircle, FileUp } from "lucide-react"
import { useState, useRef } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sampleJson } from "@/utils/sample-json"

interface JsonInputProps {
  value: string
  onChange: (value: string) => void
  error: string | null
}

export function JsonInput({ value, onChange, error }: JsonInputProps) {
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadSample = () => {
    const sampleData = JSON.stringify(sampleJson, null, 2)
    onChange(sampleData)
    setFileInfo(null)
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileUpload = (file: File) => {
    if (!file || (!file.type.includes("json") && !file.name.endsWith(".json"))) {
      alert("Por favor, selecione um arquivo JSON válido.")
      return
    }

    setFileInfo({
      name: file.name,
      size: formatBytes(file.size),
    })

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        onChange(content)
      } catch (err) {
        console.error("Erro ao ler o arquivo:", err)
      }
    }
    reader.readAsText(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem-64px)]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">JSON de Entrada</h2>
        <div className="flex gap-2">
          <button
            onClick={loadSample}
            className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Carregar Exemplo
          </button>
          <button
            onClick={triggerFileInput}
            className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors flex items-center gap-1"
          >
            <FileUp className="h-3.5 w-3.5" />
            Carregar Arquivo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            onClick={() => {
              onChange("")
              setFileInfo(null)
            }}
            className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {fileInfo && (
        <div className="mb-2 text-xs text-muted-foreground flex items-center">
          <span>
            Arquivo: {fileInfo.name} ({fileInfo.size})
          </span>
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cole seu JSON aqui..."
        className="flex-1 p-4 font-mono text-sm resize-none border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        spellCheck="false"
      />
    </div>
  )
}
