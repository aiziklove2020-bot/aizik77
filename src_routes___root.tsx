import { RootRoute, Outlet } from '@tanstack/react-router'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SupportChat from '../components/SupportChat'
import TelegramChat from '../components/TelegramChat'
import { LanguageProvider } from '../context/LanguageContext'
import { SiteAuthProvider } from '../context/AuthContext'
import { ForumAuthProvider } from '../context/ForumAuthContext'
import { ContentProvider } from '../context/ContentContext'
import '../styles/globals.css'

export const rootRoute = new RootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <html dir="rtl" lang="he">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#E31828" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground font-hebrew">
        <LanguageProvider>
          <SiteAuthProvider>
            <ForumAuthProvider>
              <ContentProvider>
                <div className="min-h-screen flex flex-col">
                  <Navigation />
                  
                  <main className="flex-1 w-full">
                    <Outlet />
                  </main>
                  
                  <Footer />
                </div>
                
                {/* Floating widgets */}
                <SupportChat />
                <TelegramChat />
              </ContentProvider>
            </ForumAuthProvider>
          </SiteAuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
