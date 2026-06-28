// ============================================
// SKELETON TEMPLATE FOR ALL PAGES
// ============================================
// Copy this template and replace:
// 1. "PageName" with actual page name
// 2. "page.title" with correct translation key
// 3. Implement page-specific content

import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import SEO from '../components/SEO'

export default function PageName() {
  const { t } = useContext(LanguageContext)

  return (
    <>
      <SEO 
        title={t('pages.pageTitle')}
        description={t('pages.pageDescription')}
      />
      
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            {t('pages.pageTitle')}
          </h1>
          
          {/* Page content here */}
        </div>
      </div>
    </>
  )
}

// ============================================
// PAGES TO CREATE (all follow the above pattern)
// ============================================
/*

CREATED:
✅ src/routes/index.tsx - Home

TO CREATE:
🔲 src/routes/about.tsx
🔲 src/routes/contact.tsx
🔲 src/routes/register.tsx
🔲 src/routes/privacy.tsx
🔲 src/routes/deleterequest.tsx
🔲 src/routes/store.tsx
🔲 src/routes/workshops.tsx
🔲 src/routes/forum.tsx
🔲 src/routes/forum.$sectionId.tsx
🔲 src/routes/forum.$sectionId.$topicId.tsx
🔲 src/routes/forum.password-reset.tsx
🔲 src/routes/forum.email-verify.tsx
🔲 src/routes/blog.tsx
🔲 src/routes/blog.$postId.tsx
🔲 src/routes/profile.$userId.tsx
🔲 src/routes/bookmarks.tsx
🔲 src/routes/messages.tsx
🔲 src/routes/messages.$userId.tsx
🔲 src/routes/chat.tsx
🔲 src/routes/chat.$roomId.tsx
🔲 src/routes/chat.join.$token.tsx
🔲 src/routes/admin-login.tsx
🔲 src/routes/admin.tsx

*/
