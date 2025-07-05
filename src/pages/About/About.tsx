import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SEO from "../../components/SEO";

const Container = styled.div`
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
`;

const List = styled.ul`
  columns: 3;
  -webkit-columns: 3;
  -moz-columns: 3;
  list-style-type: disc;
  padding-left: 20px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContactSection = styled.div`
  width: 48%;
`;

const About = () => {
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

  // Helper function to safely get translation string
  const getTranslationString = (key: string, defaultValue: string = ''): string => {
    try {
      return t(key) || defaultValue;
    } catch (error) {
      console.error(`Error retrieving translation for key: ${key}`, error);
      return defaultValue;
    }
  };

  // Generate SEO data
  const seoData = useMemo(() => {
    const baseUrl = window.location.origin;
    const currentPath = location.pathname;
    
    // Get document types for keywords
    const docTypes = getTranslationArray('about.documentTypes.list').slice(0, 5).join(', ');
    
    return {
      title: t('seo.about.title', { 
        defaultValue: 'About ITIB | Mohamed Abd ElQawy - CEO & Founder | Translation Agency Egypt' 
      }),
      description: t('seo.about.description', { 
        defaultValue: `Learn about ITIB Translation Agency led by CEO Mohamed Abd ElQawy. Professional certified translation services in Cairo (Zamalek & Maadi offices) and across Egypt. Specializing in ${docTypes || 'legal and business documents'}.`
      }),
      keywords: t('seo.about.keywords', {
        defaultValue: `Mohamed Abd ElQawy, ITIB about, translation agency Egypt, Zamalek office, Maadi office, certified translation Cairo, ${docTypes || 'document translation'}, professional translation services Egypt`
      }),
      url: `${baseUrl}${currentPath}`,
      alternateUrls: {
        'en': `${baseUrl}/en/about`,
        'ar': `${baseUrl}/ar/about`,
        'x-default': `${baseUrl}/about`
      },
      author: 'Mohamed Abd ElQawy'
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, i18n.language, location.pathname]);

  const documentTypes = getTranslationArray('about.documentTypes.list');
  const mobilesZamalek = getTranslationArray('about.contact.zamalekOffice.mobile');
  const mobilesMaadi = getTranslationArray('about.contact.maadiOffice.mobile');

  // Structured data for the About page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "ITIB Translation Agency",
      "founder": {
        "@type": "Person",
        "name": "Mohamed Abd ElQawy",
        "jobTitle": "CEO and Founder"
      },
      "description": getTranslationString('about.intro.description', 'Professional translation agency in Egypt'),
      "address": [
        {
          "@type": "PostalAddress",
          "name": "Zamalek Office",
          "streetAddress": getTranslationString('about.contact.zamalekOffice.address', ''),
          "addressLocality": "Zamalek, Cairo",
          "addressCountry": "EG",
          "telephone": mobilesZamalek.join(', ')
        },
        {
          "@type": "PostalAddress", 
          "name": "Maadi Office",
          "streetAddress": getTranslationString('about.contact.maadiOffice.address', ''),
          "addressLocality": "Maadi, Cairo",
          "addressCountry": "EG",
          "telephone": mobilesMaadi.join(', ')
        }
      ],
      "knowsAbout": documentTypes
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
        author={seoData.author}
      />
      
      {/* Additional structured data for About page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Container>
        <Section>
          <Title>{getTranslationString('about2.title', 'About Us')}</Title>
          <Paragraph>{getTranslationString('about.intro.description', 'Introduction description not available')}</Paragraph>
        </Section>

        <Section>
          <Title>{getTranslationString('about.services.title', 'Our Services')}</Title>
          <Paragraph>{getTranslationString('about.services.description', 'Services description not available')}</Paragraph>
        </Section>

        <Section>
          <Title>{getTranslationString('about.documentTypes.title', 'Documents We Translate')}</Title>
          <List>
            {documentTypes.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </List>
        </Section>

        <Section>
          <Title>{getTranslationString('about.contact.title', 'Contact Information')}</Title>
          <Paragraph>{getTranslationString('about.contact.description', 'Contact description not available')}</Paragraph>
          
          <ContactInfo>
            <ContactSection>
              <Title>{getTranslationString('about.contact.zamalekOffice.title', 'Zamalek Office')}</Title>
              <Paragraph>{getTranslationString('about.contact.zamalekOffice.address', 'Zamalek Address Not Available')}</Paragraph>
              <Paragraph>{getTranslationString('about.contact.zamalekOffice.telFax', 'Tel/Fax Not Available')}</Paragraph>
              <Paragraph>
                Mobile:
                <br />
                {mobilesZamalek.length > 0 
                  ? mobilesZamalek.join(', ') 
                  : 'No mobile numbers available'}
              </Paragraph>
            </ContactSection>

            <ContactSection>
              <Title>{getTranslationString('about.contact.maadiOffice.title', 'Maadi Office')}</Title>
              <Paragraph>{getTranslationString('about.contact.maadiOffice.address', 'Maadi Address Not Available')}</Paragraph>
              <Paragraph>{getTranslationString('about.contact.maadiOffice.telFax', 'Tel/Fax Not Available')}</Paragraph>
              <Paragraph>
                Mobile:
                <br />
                {mobilesMaadi.length > 0 
                  ? mobilesMaadi.join(', ') 
                  : 'No mobile numbers available'}
              </Paragraph>
            </ContactSection>
          </ContactInfo>
        </Section>
      </Container>
    </>
  );
};

export default About;