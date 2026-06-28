import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import SEO from '../components/SEO'
import StarsBackground from '../components/StarsBackground'
import HeroSection from '../components/HeroSection'
import RSSFeedTicker from '../components/RSSFeedTicker'

export default function Home() {
  const { t } = useContext(LanguageContext)

  return (
    <>
      <SEO 
        title={t('home.title')}
        description={t('home.description')}
      />
      
      <div className="relative">
        <StarsBackground />
        
        <HeroSection />
        
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <RSSFeedTicker />
          </div>
        </section>

        <section className="py-16 px-4 bg-card">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t('home.featuresTitle')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-background rounded-lg hover:bg-card-hover transition-smooth">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {t('home.feature1Title')}
                </h3>
                <p className="text-gray-400">
                  {t('home.feature1Desc')}
                </p>
              </div>
              
              <div className="p-6 bg-background rounded-lg hover:bg-card-hover transition-smooth">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {t('home.feature2Title')}
                </h3>
                <p className="text-gray-400">
                  {t('home.feature2Desc')}
                </p>
              </div>
              
              <div className="p-6 bg-background rounded-lg hover:bg-card-hover transition-smooth">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {t('home.feature3Title')}
                </h3>
                <p className="text-gray-400">
                  {t('home.feature3Desc')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
