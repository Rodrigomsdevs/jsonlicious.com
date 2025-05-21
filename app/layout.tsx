import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { JsonLd } from "@/components/json-ld"
import { GalaxyEffects } from "@/components/galaxy-effects"

const inter = Inter({ subsets: ["latin"] })

// Metadados SEO otimizados
export const metadata: Metadata = {
  title: "JSONlicious - Formatador e Validador de JSON Online",
  description:
    "Ferramenta gratuita e open source para formatar, validar e visualizar JSON com suporte a temas claro, escuro e interestelar. Converta, formate e valide JSON facilmente.",
  keywords: [
    "json",
    "formatador json",
    "validador json",
    "json formatter",
    "json validator",
    "json viewer",
    "json online",
    "ferramenta json",
    "open source",
    "código aberto",
    "json beautifier",
    "json parser",
    "json editor",
    "json tools",
  ],
  authors: [{ name: "Rodrigomsdevs", url: "https://github.com/Rodrigomsdevs" }],
  creator: "Rodrigomsdevs",
  publisher: "Rodrigomsdevs",
  applicationName: "JSONlicious",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jsonlicious.com"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://jsonlicious.com",
    title: "JSONlicious - Formatador e Validador de JSON Online",
    description:
      "Ferramenta gratuita e open source para formatar, validar e visualizar JSON com suporte a temas claro, escuro e interestelar.",
    siteName: "JSONlicious",
    images: [
      {
        url: "/images/jsonlicious-og.png",
        width: 1200,
        height: 630,
        alt: "JSONlicious - Formatador e Validador de JSON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSONlicious - Formatador e Validador de JSON Online",
    description:
      "Ferramenta gratuita e open source para formatar, validar e visualizar JSON com suporte a temas claro, escuro e interestelar.",
    images: ["/images/jsonlicious-og.png"],
    creator: "@Rodrigomsdevs",
    site: "@Rodrigomsdevs",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: interstellar)", color: "#090b16" },
    { media: "(prefers-color-scheme: jsonlicious)", color: "#fff8fa" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "normal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="jsonlicious">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <GalaxyEffects />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
