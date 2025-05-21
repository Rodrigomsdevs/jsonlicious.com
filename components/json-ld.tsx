export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JSONlicious",
    headline: "JSONlicious - Formatador e Validador de JSON Online",
    description: "Um formatador e validador de JSON bonito e poderoso, gratuito e open source.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Person",
      name: "Rodrigomsdevs",
      url: "https://github.com/Rodrigomsdevs",
    },
    creator: {
      "@type": "Person",
      name: "Rodrigomsdevs",
      url: "https://github.com/Rodrigomsdevs",
    },
    softwareVersion: "1.0.0",
    license: "https://github.com/Rodrigomsdevs/jsonlicious.com/blob/main/LICENSE",
    url: "https://jsonlicious.com",
    image: "https://jsonlicious.com/images/jsonlicious-og.png",
    screenshot: "https://jsonlicious.com/images/jsonlicious-screenshot.png",
    inLanguage: ["pt-BR", "en-US"],
    keywords:
      "json, formatador json, validador json, visualizador json, json online, ferramenta json, open source, código aberto, json beautifier, json parser",
    applicationSubCategory: "Development Tools",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "10",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2023-05-20",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://jsonlicious.com",
    },
    potentialAction: {
      "@type": "UseAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://jsonlicious.com",
      },
      expectsAcceptanceOf: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  }

  // Adiciona o WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JSONlicious",
    url: "https://jsonlicious.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://jsonlicious.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  )
}
