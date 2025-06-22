import { lazy } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

const MiddleBlock = lazy(() => import("../../components/MiddleBlock"))
const Container = lazy(() => import("../../common/Container"))
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"))
const ContentBlock = lazy(() => import("../../components/ContentBlock"))
const LanguageSlider = lazy(
  () => import("../../components/LanguageSlider/LanguageSlider")
)

const Home = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const baseUrl = "https://www.it-ib.com"

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
        <title>{t("meta.home.title", "ITIB - Professional Translation & Interpretation Services")}</title>
        <meta
          name="description"
          content={t("meta.home.description", "ITIB provides professional interpretation and translation services for businesses worldwide. Certified translators, 100+ languages, fast turnaround.")}
        />
        <meta
          name="keywords"
          content={t("meta.home.keywords", "translation services, interpretation services, professional translators, document translation, simultaneous interpretation, ITIB")}
        />
        <link rel="canonical" href={`${baseUrl}${currentLang === 'en' ? '' : `/${currentLang}`}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={t("meta.home.title", "ITIB - Professional Translation & Interpretation Services")} />
        <meta property="og:description" content={t("meta.home.description", "ITIB provides professional interpretation and translation services for businesses worldwide.")} />
        <meta property="og:url" content={`${baseUrl}${currentLang === 'en' ? '' : `/${currentLang}`}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={currentLang === 'ar' ? 'ar_AR' : 'en_US'} />
        
        {/* Additional SEO */}
        <meta name="author" content="ITIB - Interpretation & Translation International Bureau" />
        <meta property="og:site_name" content="ITIB" />
      </Helmet>
      
      <Container>
        <ScrollToTop />
        <ContentBlock
          direction="right"
          title={t("intro.title")}
          content={t("intro.text")}
          button={t("intro.button")}
          icon="developer.svg"
          id="intro"
        />
        <MiddleBlock
          title={t("middleBlock.title")}
          content={t("middleBlock.text")}
          button={t("middleBlock.button")}
        />
        <LanguageSlider
          title={t("languages.title")}
          languages={t("languages.list", { returnObjects: true })}
        />
        <ContentBlock
          direction="right"
          title={t("mission.title")}
          content={t("mission.text")}
          icon="product-launch.svg"
          id="mission"
        />
        <ContentBlock
          direction="left"
          title={t("product.title")}
          content={t("product.text")}
          icon="waving.svg"
          id="product"
        />
      </Container>
    </>
  )
}

export default Home