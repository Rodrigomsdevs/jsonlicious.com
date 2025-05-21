"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { JsonInput } from "@/components/json-input"
import { JsonOutput } from "@/components/json-output"
import { Footer } from "@/components/footer"
import { sampleJson } from "@/utils/sample-json"

export default function Home() {
  const [jsonInput, setJsonInput] = useState("")
  const [jsonOutput, setJsonOutput] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Carrega o JSON de exemplo na renderização inicial
    const initialJson = JSON.stringify(sampleJson, null, 2)
    setJsonInput(initialJson)
    setJsonOutput(initialJson)
  }, [])

  const formatJson = (input: string) => {
    try {
      if (!input.trim()) {
        setJsonOutput("")
        setError(null)
        return
      }

      const parsedJson = JSON.parse(input)
      const formattedJson = JSON.stringify(parsedJson, null, 2)
      setJsonOutput(formattedJson)
      setError(null)
    } catch (err) {
      setError("JSON inválido: " + (err as Error).message)
      setJsonOutput("")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4 pb-0">
        <JsonInput
          value={jsonInput}
          onChange={(value) => {
            setJsonInput(value)
            formatJson(value)
          }}
          error={error}
        />
        <JsonOutput value={jsonOutput} />
      </main>
      <Footer />
    </div>
  )
}
