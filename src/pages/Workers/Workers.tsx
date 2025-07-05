import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SEO from '../../components/SEO';

const WorkersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 40px;
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
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 30px;
  columns: 3;
  -webkit-columns: 3;
  -moz-columns: 3;
`;

const Workers = () => {
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
    
    // Get interpretation services for keywords
    const interpretationTypes = getTranslationArray('workers.interpretationServices.eventTypes')
      .slice(0, 5)
      .join(', ');
    
    return {
      title: t('seo.workers.title', { 
        defaultValue: 'Professional Translators & Interpreters | ITIB Egypt Team' 
      }),
      description: t('seo.workers.description', { 
        defaultValue: `ITIB Translation Agency employs certified translators and interpreters in Egypt. Our team provides professional interpretation services for ${interpretationTypes || 'conferences, business meetings, legal proceedings'}. Led by Mohamed Abd ElQawy.`
      }),
      keywords: t('seo.workers.keywords', {
        defaultValue: `professional translators Egypt, certified interpreters Cairo, ITIB translation team, Mohamed Abd ElQawy team, conference interpreters, legal interpreters Egypt, business interpreters Alexandria, ${interpretationTypes || 'simultaneous interpretation'}, translation quality commitment`
      }),
      url: `${baseUrl}${currentPath}`,
      alternateUrls: {
        'en': `${baseUrl}/en/our-team`,
        'ar': `${baseUrl}/ar/our-team`,
        'x-default': `${baseUrl}/our-team`
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, i18n.language, location.pathname]);

  // Get data for structured data
  const eventTypes = getTranslationArray('workers.interpretationServices.eventTypes');
  const qualityPoints = getTranslationArray('workers.qualityCommitment.points');
  const statistics = getTranslationArray('workers.statistics.points');

  // Structured data for the team/workers page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ITIB Translation & Interpretation Services",
    "provider": {
      "@type": "Organization",
      "name": "ITIB Translation Agency",
      "founder": {
        "@type": "Person",
        "name": "Mohamed Abd ElQawy",
        "jobTitle": "CEO"
      }
    },
    "serviceType": ["Translation Services", "Interpretation Services"],
    "areaServed": {
      "@type": "Country",
      "name": "Egypt"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interpretation Services",
      "itemListElement": eventTypes.map((event, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": event,
          "provider": "ITIB Professional Interpreters"
        }
      }))
    }
  };

  // FAQ structured data about the team
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What qualifications do ITIB translators have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": qualityPoints.join(' ') || "Our translators are certified professionals with specialized expertise in various fields including legal, medical, technical, and business translation."
        }
      },
      {
        "@type": "Question",
        "name": "What types of interpretation services does ITIB provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `ITIB provides professional interpretation services for: ${eventTypes.join(', ')}. Our interpreters are experienced in both simultaneous and consecutive interpretation.`
        }
      },
      {
        "@type": "Question",
        "name": "How does ITIB ensure translation quality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('workers.qualityCommitment.title') + ': ' + qualityPoints.slice(0, 3).join(' ') || "We maintain strict quality standards through certified translators, peer review processes, and specialized expertise in various fields."
        }
      },
      {
        "@type": "Question",
        "name": "How many translators work with ITIB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": statistics.join(' ') || "ITIB works with a network of certified translators and interpreters across Egypt, ensuring coverage for all major languages and specializations."
        }
      }
    ]
  };

  // Team/Employee structured data
  const teamStructuredData = {
    "@context": "https://schema.org",
    "@type": "EmployeeRole",
    "roleName": "Professional Translator/Interpreter",
    "responsibilities": [
      "Certified document translation",
      "Legal and technical translation",
      "Conference interpretation",
      "Business meeting interpretation",
      "Quality assurance and proofreading"
    ],
    "skills": getTranslationArray('workers.translationCharacteristics.points'),
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "ITIB Translation Agency",
      "founder": "Mohamed Abd ElQawy"
    }
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
      
      {/* Professional Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      
      {/* Team structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamStructuredData) }}
      />
      
      <WorkersContainer>
        <Section>
          <Title>{t('workers.title')}</Title>
          <Paragraph>
            {t('workers.introduction.paragraph1')}
          </Paragraph>
          <Paragraph>
            {t('workers.introduction.paragraph2')}
          </Paragraph>
        </Section>

        <Section>
          <Title>{t('workers.interpretationServices.title')}</Title>
          <Paragraph>
            {t('workers.interpretationServices.description')}
          </Paragraph>
          <List>
            {getTranslationArray('workers.interpretationServices.eventTypes').map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{t('workers.qualityCommitment.title')}</Title>
          <List>
            {getTranslationArray('workers.qualityCommitment.points').map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{t('workers.translationCharacteristics.title')}</Title>
          <List>
            {getTranslationArray('workers.translationCharacteristics.points').map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{t('workers.confidentiality.title')}</Title>
          <List>
            {getTranslationArray('workers.confidentiality.points').map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{t('workers.statistics.title')}</Title>
          <List>
            {getTranslationArray('workers.statistics.points').map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </List>
        </Section>
      </WorkersContainer>
    </>
  );
};

export default Workers;