"use client"

import { useState, useCallback } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"

type JsonValue = string | number | boolean | null | JsonObject | JsonArray
type JsonObject = { [key: string]: JsonValue }
type JsonArray = JsonValue[]

interface JsonRendererProps {
  data: JsonValue
  level?: number
  path?: string
}

export function JsonRenderer({ data, level = 0, path = "" }: JsonRendererProps) {
  // Usamos um único estado para rastrear todos os nós colapsados
  const [collapsedPaths, setCollapsedPaths] = useState<Record<string, boolean>>({})

  // Função para alternar o estado de colapso de um caminho específico
  const toggleCollapse = useCallback((nodePath: string) => {
    setCollapsedPaths((prev) => ({
      ...prev,
      [nodePath]: !prev[nodePath],
    }))
  }, [])

  // Verifica se um nó está colapsado
  const isCollapsed = useCallback(
    (nodePath: string) => {
      // Por padrão, colapsa nós com nível > 2
      if (collapsedPaths[nodePath] === undefined) {
        return level > 2
      }
      return collapsedPaths[nodePath]
    },
    [collapsedPaths, level],
  )

  // Função para obter o tipo de um valor
  const getType = (value: JsonValue): string => {
    if (value === null) return "nulo"
    if (Array.isArray(value)) return "array"
    return typeof value
  }

  // Função para obter o tamanho de um valor
  const getSize = (value: JsonValue): number | null => {
    if (Array.isArray(value)) return value.length
    if (value !== null && typeof value === "object") return Object.keys(value).length
    return null
  }

  // Função para obter a cor com base no tipo
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "string":
        return "text-green-600 dark:text-green-400 interstellar:text-emerald-400"
      case "number":
        return "text-blue-600 dark:text-blue-400 interstellar:text-blue-400"
      case "boolean":
        return "text-purple-600 dark:text-purple-400 interstellar:text-purple-400"
      case "nulo":
        return "text-gray-600 dark:text-gray-400 interstellar:text-gray-400"
      case "object":
      case "array":
        return "text-yellow-600 dark:text-yellow-400 interstellar:text-amber-400"
      default:
        return ""
    }
  }

  // Função para renderizar um valor primitivo
  const renderPrimitive = (
    value: string | number | boolean | null,
    type: string,
    key?: string,
    isArrayItem = false,
  ) => {
    let displayValue: string
    if (type === "string") {
      displayValue = `"${String(value)}"`
    } else if (type === "nulo") {
      displayValue = "null"
    } else {
      displayValue = String(value)
    }

    return (
      <span>
        {key !== undefined && !isArrayItem && (
          <>
            <span className="text-red-600 dark:text-red-400 interstellar:text-red-400">"{key}"</span>
            <span className="text-gray-600 dark:text-gray-400 interstellar:text-gray-400">: </span>
          </>
        )}
        <span className={getTypeColor(type)}>{displayValue}</span>
        <span
          className="text-gray-500 dark:text-gray-500 interstellar:text-gray-500 text-xs ml-1 select-none"
          title={`Tipo: ${type}`}
        >
          {type}
        </span>
      </span>
    )
  }

  // Função para renderizar um objeto ou array
  const renderComplex = (
    value: JsonObject | JsonArray,
    nodePath: string,
    key?: string,
    isArrayItem = false,
    index?: number,
  ) => {
    const isObject = !Array.isArray(value)
    const isArray = Array.isArray(value)
    const size = getSize(value)
    const isEmpty = size === 0
    const type = isObject ? "object" : "array"
    const collapsed = isCollapsed(nodePath)

    return (
      <div className="relative">
        {key !== undefined && !isArrayItem && (
          <>
            <span className="text-red-600 dark:text-red-400 interstellar:text-red-400">"{key}"</span>
            <span className="text-gray-600 dark:text-gray-400 interstellar:text-gray-400">: </span>
          </>
        )}

        {!isEmpty && (
          <button
            onClick={() => toggleCollapse(nodePath)}
            className="inline-flex items-center focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700 interstellar:hover:bg-blue-900/30 rounded p-0.5 -ml-0.5"
          >
            {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        )}

        <span className={getTypeColor(type)}>{isObject ? "{" : "["}</span>

        <span
          className="text-gray-500 dark:text-gray-500 interstellar:text-gray-500 text-xs ml-1 select-none"
          title={`Tipo: ${type}, Tamanho: ${size}`}
        >
          {type}
          {size !== null ? ` (${size})` : ""}
        </span>

        {isEmpty ? (
          <span className={getTypeColor(type)}>{isObject ? "}" : "]"}</span>
        ) : collapsed ? (
          <span
            className="text-gray-600 dark:text-gray-400 interstellar:text-gray-400 cursor-pointer"
            onClick={() => toggleCollapse(nodePath)}
          >
            {" ... "}
            <span className={getTypeColor(type)}>{isObject ? "}" : "]"}</span>
          </span>
        ) : (
          <>
            <div className="pl-4 border-l border-gray-300 dark:border-gray-700 interstellar:border-blue-800/50 ml-1">
              {isObject &&
                Object.entries(value as JsonObject).map(([k, v], i, arr) => (
                  <div key={k}>
                    {renderValue(v, k, false, undefined, `${nodePath}.${k}`)}
                    {i < arr.length - 1 && (
                      <span className="text-gray-600 dark:text-gray-400 interstellar:text-gray-400">,</span>
                    )}
                  </div>
                ))}

              {isArray &&
                (value as JsonArray).map((item, i, arr) => (
                  <div key={i}>
                    {renderValue(item, undefined, true, i, `${nodePath}[${i}]`)}
                    {i < arr.length - 1 && (
                      <span className="text-gray-600 dark:text-gray-400 interstellar:text-gray-400">,</span>
                    )}
                  </div>
                ))}
            </div>
            <span className={getTypeColor(type)}>{isObject ? "}" : "]"}</span>
          </>
        )}
      </div>
    )
  }

  // Função principal para renderizar qualquer valor JSON
  const renderValue = (value: JsonValue, key?: string, isArrayItem = false, index?: number, nodePath = path) => {
    const type = getType(value)

    // Para valores primitivos
    if (["string", "number", "boolean", "nulo"].includes(type)) {
      return renderPrimitive(value as string | number | boolean | null, type, key, isArrayItem)
    }

    // Para objetos e arrays
    return renderComplex(value as JsonObject | JsonArray, nodePath, key, isArrayItem, index)
  }

  return <div className="json-renderer">{renderValue(data)}</div>
}
