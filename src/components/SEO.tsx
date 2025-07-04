import React from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
  locale?: string
  alternateUrls?: Record<string, string>
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

interface StructuredData {
  "@context": string
  "@type": string
  name: string
  alternateName?: string[]
  url?: string
  logo?: string
  description?: string
  priceRange?: string
  telephone?: string
  email?: string
  founder?: {
    "@type": string
    name: string
    jobTitle: string
  }
  address?: {
    "@type": string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  areaServed?: string[]
  knowsLanguage?: string[]
  openingHoursSpecification?: Array<{
    "@type": string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  locale,
  alternateUrls = {},
  author,
  publishedTime,
  modifiedTime,
}) => {
  const { i18n } = useTranslation()
  const currentLang = locale || i18n.language

  // Default values for your translation agency
  const defaults = {
    title: "ITIB | Mohamed Abd ElQawy Translation Agency",
    description:
      "ITIB - Mohamed Abdelkawy's professional translation agency in Egypt providing certified services in Cairo, Alexandria, Maadi, Sharm El Sheikh, Marsa Allam, and Dahab. Led by CEO Mohamed Abd ElQawy.",
    keywords:
      "ITIB, translation Egypt, مكتب محمد عبد القوي للترجمة الرسمية, مكتب ترجمة معتمده, Mohamed Abdelkawy, Mohamed Abd ElQawy, translation agency, translation agency Egypt, certified translation, legal translation, business translation, document translation, Arabic translation, English translation",
    image: "https://your-domain.com/images/itib-logo.jpg",
    url: "https://your-domain.com",
    author: "Mohamed Abd ElQawy",
  }

  const seo = {
    title: title || defaults.title,
    description: description || defaults.description,
    keywords: keywords || defaults.keywords,
    image: image || defaults.image,
    url: url || defaults.url,
    author: author || defaults.author,
  }

  // Structured data for the translation agency
  const structuredData: StructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ITIB Translation Agency",
    alternateName: [
      "مكتب محمد عبد القوي للترجمة",
      "Mohamed Abd ElQawy Translation Bureau",
    ],
    url: seo.url,
    logo: seo.image,
    description: seo.description,
    priceRange: "$$",
    telephone: "+20-YOUR-PHONE",
    email: "info@your-domain.com",
    founder: {
      "@type": "Person",
      name: "Mohamed Abd ElQawy",
      jobTitle: "CEO and Founder",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "YOUR ADDRESS",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
      postalCode: "YOUR-POSTAL",
      addressCountry: "EG",
    },
    areaServed: [
      "Cairo",
      "Alexandria",
      "Maadi",
      "Sharm El Sheikh",
      "Marsa Alam",
      "Dahab",
    ],
    knowsLanguage: ["Arabic", "English", "French", "German", "Spanish"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={currentLang} />
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />

      {/* Language alternates */}
      {Object.entries(alternateUrls).map(([lang, altUrl]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={altUrl} />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta
        property="og:locale"
        content={currentLang === "ar" ? "ar_EG" : "en_US"}
      />
      <meta property="og:site_name" content="ITIB Translation Agency" />

      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />

      {/* Additional Meta Tags */}
      <meta name="author" content={seo.author} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="theme-color" content="#2067b2" />

      {/* Geo tags for local SEO */}
      <meta name="geo.position" content="30.0444;31.2357" />
      <meta name="geo.placename" content="Cairo, Egypt" />
      <meta name="geo.region" content="EG" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

export default SEO
