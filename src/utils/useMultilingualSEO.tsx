import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOContent {
  title: string;
  description: string;
  keywords?: string;
}

interface SEOData extends SEOContent {
  url: string;
  alternateUrls: Record<string, string>;
}

type PageSEOContent = {
  [key in 'en' | 'ar']: SEOContent;
};

type SEOPages = {
  home: PageSEOContent;
  services: PageSEOContent;
  about: PageSEOContent;
  contact: PageSEOContent;
  [key: string]: PageSEOContent;
};

export const useMultilingualSEO = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  const getSEOData = (page: keyof SEOPages): SEOData => {
    const baseUrl = 'https://your-domain.com';
    const currentPath = location.pathname;
    
    const seoData: SEOPages = {
      home: {
        en: {
          title: 'ITIB | Mohamed Abd ElQawy Translation Agency',
          description: 'Professional translation agency in Egypt providing certified services across Cairo, Alexandria, and more.',
          keywords: 'translation agency Egypt, certified translation, legal translation, Mohamed Abd ElQawy, ITIB'
        },
        ar: {
          title: 'ITIB | مكتب محمد عبد القوي للترجمة المعتمدة',
          description: 'مكتب ترجمة معتمد في مصر يقدم خدمات الترجمة المحترفة في القاهرة والإسكندرية وجميع أنحاء مصر',
          keywords: 'مكتب ترجمة معتمد, ترجمة قانونية, محمد عبد القوي, ترجمة رسمية'
        }
      },
      services: {
        en: {
          title: 'Translation Services | ITIB Translation Agency Egypt',
          description: 'Professional translation services: Legal documents, business contracts, certificates. Certified translations in Arabic, English, and multiple languages.',
          keywords: 'legal translation Egypt, business translation, certified translation services, document translation'
        },
        ar: {
          title: 'خدمات الترجمة | مكتب ITIB للترجمة المعتمدة',
          description: 'خدمات ترجمة احترافية: المستندات القانونية، العقود التجارية، الشهادات. ترجمة معتمدة بالعربية والإنجليزية ولغات متعددة.',
          keywords: 'ترجمة قانونية, ترجمة تجارية, خدمات ترجمة معتمدة, ترجمة مستندات'
        }
      },
      about: {
        en: {
          title: 'About ITIB | Mohamed Abd ElQawy - CEO & Founder',
          description: 'Learn about ITIB Translation Agency and CEO Mohamed Abd ElQawy. Leading translation services provider in Egypt since [YEAR].',
          keywords: 'Mohamed Abd ElQawy, ITIB history, translation agency Egypt, about ITIB'
        },
        ar: {
          title: 'عن ITIB | محمد عبد القوي - المؤسس والرئيس التنفيذي',
          description: 'تعرف على مكتب ITIB للترجمة والرئيس التنفيذي محمد عبد القوي. رائد خدمات الترجمة في مصر منذ [YEAR].',
          keywords: 'محمد عبد القوي, تاريخ ITIB, مكتب ترجمة مصر, عن ITIB'
        }
      },
      contact: {
        en: {
          title: 'Contact ITIB | Translation Services in Cairo, Egypt',
          description: 'Contact ITIB Translation Agency in Cairo, Egypt. Get in touch with Mohamed Abd ElQawy\'s team for professional translation services.',
          keywords: 'contact ITIB, translation agency Cairo, Egypt translation services'
        },
        ar: {
          title: 'اتصل بنا | خدمات الترجمة في القاهرة، مصر',
          description: 'اتصل بمكتب ITIB للترجمة في القاهرة، مصر. تواصل مع فريق محمد عبد القوي للحصول على خدمات ترجمة احترافية.',
          keywords: 'اتصل ITIB, مكتب ترجمة القاهرة, خدمات ترجمة مصر'
        }
      }
    };
    
    const currentLang = i18n.language as 'en' | 'ar';
    const pageData = seoData[page]?.[currentLang] || seoData[page]?.['en'];
    
    return {
      ...pageData,
      url: `${baseUrl}${currentPath}`,
      alternateUrls: {
        en: `${baseUrl}/en${location.pathname}`,
        ar: `${baseUrl}/ar${location.pathname}`,
        'x-default': `${baseUrl}${location.pathname}`
      }
    };
  };
  
  return { getSEOData };
};