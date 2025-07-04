import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SEO from '../../components/SEO';

const PricingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  color: #666;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 30px;
`;

const Pricing = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Helper function to safely convert translation to array
  const getTranslationArray = (key: string): string[] => {
    try {
      const translation = t(key, { returnObjects: true });
      return Array.isArray(translation) ? translation : [];
    } catch (error) {
      console.error(`Error retrieving translation for key: ${key}`, error);
      return [];
    }
  };

  // Generate SEO data
  const seoData = useMemo(() => {
    const baseUrl = window.location.origin;
    const currentPath = location.pathname;
    
    // Get some pricing principles for keywords
    const pricingPrinciples = getTranslationArray('pricing.pricingPrinciples.details')
      .slice(0, 3)
      .join(' ')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '');
    
    return {
      title: t('seo.pricing.title', { 
        defaultValue: 'Translation Pricing | ITIB Egypt - Competitive Rates & Free Quotes' 
      }),
      description: t('seo.pricing.description', { 
        defaultValue: 'Get competitive translation rates from ITIB Translation Agency in Egypt. Free quotes for certified document translation, legal translation, and business translation services. Transparent pricing by Mohamed Abd ElQawy\'s team.'
      }),
      keywords: t('seo.pricing.keywords', {
        defaultValue: `translation pricing Egypt, ITIB rates, translation cost Cairo, certified translation prices, legal translation fees, business document translation cost, Mohamed Abd ElQawy pricing, free translation quote Egypt, ${pricingPrinciples}`
      }),
      url: `${baseUrl}${currentPath}`,
      alternateUrls: {
        'en': `${baseUrl}/en/pricing`,
        'ar': `${baseUrl}/ar/pricing`,
        'x-default': `${baseUrl}/pricing`
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, i18n.language, location.pathname]);

  // Structured data for pricing/service page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Translation Services",
    "provider": {
      "@type": "Organization",
      "name": "ITIB Translation Agency",
      "founder": {
        "@type": "Person",
        "name": "Mohamed Abd ElQawy"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Egypt"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Translation Services Pricing",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Document Translation",
            "description": t('pricing.introduction.paragraph1', { defaultValue: 'Professional document translation services' })
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Certified Translation",
            "description": "Official certified translation for legal and government documents"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Translation",
            "description": "Professional business document and contract translation"
          }
        }
      ]
    },
    "priceRange": "$$"
  };

  // FAQ structured data for common pricing questions
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does ITIB calculate translation prices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('pricing.introduction.paragraph2', { 
            defaultValue: "Our pricing is based on document type, language pair, complexity, and turnaround time. We provide free quotes for all projects."
          })
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer free translation quotes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ITIB provides free, no-obligation quotes for all translation projects. Simply send us your documents for review."
        }
      },
      {
        "@type": "Question",
        "name": "What factors affect translation pricing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": getTranslationArray('pricing.pricingPrinciples.details').join(' ') || "Pricing depends on document type, language combination, technical complexity, and delivery timeframe."
        }
      }
    ]
  };

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
        alternateUrls={seoData.alternateUrls}
        type="website"
      />
      
      {/* Structured data for services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      
      <PricingContainer>
        <Section>
          <Title>{t('pricing.title')}</Title>
          
          <Paragraph>
            {t('pricing.introduction.paragraph1')}
          </Paragraph>
          
          <Paragraph>
            {t('pricing.introduction.paragraph2')}
          </Paragraph>
        </Section>

        <Section>
          <Title>{t('pricing.quoteProcess.title')}</Title>
          <List>
            {getTranslationArray('pricing.quoteProcess.details').map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{t('pricing.pricingPrinciples.title')}</Title>
          <List>
            {getTranslationArray('pricing.pricingPrinciples.details').map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{t('pricing.additionalServices.title')}</Title>
          <List>
            {getTranslationArray('pricing.additionalServices.details').map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{t('pricing.generalNotes.title')}</Title>
          <List>
            {getTranslationArray('pricing.generalNotes.details').map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </List>
        </Section>
      </PricingContainer>
    </>
  );
};

export default Pricing;