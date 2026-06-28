# 📋 הוראות מיגרציה - העתקת קבצים מהפרויקט הישן ל-Lovable

## **שלב 1: בנייה של תיקיות**

```bash
# צור את מבנה התיקיות הבסיסי
mkdir -p src/{components,utils,hooks,context,firebase,supabase,services,i18n,locales/he,styles}
mkdir -p api
```

---

## **שלב 2: העתק קבצי Components**

**מהפרויקט הישן:** `src/components/`  
**ליעד החדש:** `src/components/`

📁 קבצים להעתקה:
- ✅ Admin/* (כל תיקיית ה-admin)
- ✅ Forum/* (כל קבצי הפורום)
- ✅ Chat/* (כל קבצי הצ'אט)
- ✅ Registration/* (כל קבצי ההרשמה)
- ✅ a11y/* (accessibility)
- ✅ בכל קבצי ה-components הבודדים

**עדכונים נדרשים:**
```javascript
// ❌ OLD
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// ✅ NEW
import { useNavigate, useParams } from '@tanstack/react-router'
```

---

## **שלב 3: העתק Utils**

**מהפרויקט הישן:** `src/utils/`  
**ליעד החדש:** `src/utils/`

📁 קבצים להעתקה:
- ✅ adminApi.js
- ✅ balanceMatching.js
- ✅ cache.js
- ✅ chatClient.js
- ✅ dateFormat.js
- ✅ ... (כל ה-26 utils)

**לא צריך עדכון imports** - utils בדרך כלל עצמאיים.

---

## **שלב 4: העתק Hooks**

**מהפרויקט הישן:** `src/hooks/`  
**ליעד החדש:** `src/hooks/`

📁 קבצים להעתקה:
- ✅ useFocusTrap.js
- ✅ useAdminSection.js
- ✅ useDraft.js

---

## **שלב 5: העתק Context**

**מהפרויקט הישן:** `src/context/`  
**ליעד החדש:** `src/context/`

📁 קבצים להעתקה:
- ✅ AuthContext.jsx → AuthContext.tsx
- ✅ ContentContext.jsx → ContentContext.tsx
- ✅ ForumAuthContext.jsx → ForumAuthContext.tsx
- ✅ LanguageContext.jsx → LanguageContext.tsx

**עדכון נדרש:**
```typescript
// הוסף Hebrew RTL support בLanguageContext
export const LanguageContext = createContext<{
  t: (key: string) => string
  locale: 'he' | 'en'
}>({
  t: (key) => key,
  locale: 'he',
})
```

---

## **שלב 6: העתק Firebase**

**מהפרויקט הישן:** `src/firebase/`  
**ליעד החדש:** `src/firebase/`

📁 קבצים להעתקה:
- ✅ config.js → config.ts
- ✅ forum.js → forum.ts
- ✅ notifications.js → notifications.ts
- ✅ ... (כל 28 הקבצים)

**עדכון import נדרש:**
```typescript
// בconfig.ts - שנה ל-TypeScript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// etc.
```

---

## **שלב 7: העתק Supabase**

**מהפרויקט הישן:** `src/supabase/`  
**ליעד החדש:** `src/supabase/`

📁 קבצים להעתקה:
- ✅ client.js → client.ts
- ✅ authBridge.js → authBridge.ts

---

## **שלב 8: העתק Services**

**מהפרויקט הישן:** `src/services/`  
**ליעד החדש:** `src/services/`

📁 קבצים להעתקה:
- ✅ contentCache.js → contentCache.ts
- ✅ contentService.js → contentService.ts

---

## **שלב 9: העתק i18n (עברית)**

**מהפרויקט הישן:** `src/i18n/` + `src/locales/`  
**ליעד החדש:** `src/i18n/` + `src/locales/he/`

📁 קבצים להעתקה:
- ✅ i18n/LanguageContext.jsx ← כבר נעתק בשלב 5
- ✅ i18n/translations.js → i18n/translations.ts
- ✅ locales/he/* (כל 21 קבצי התרגום)

---

## **שלב 10: העתק Pages**

**מהפרויקט הישן:** `src/pages/`  
**ליעד החדש:** `src/routes/`

⚠️ **IMPORTANT: צריך להתאים את ה-structure**

### המרה מ-React Router ל-TanStack Router:

**OLD Structure:**
```
src/pages/
├── Home.jsx
├── Home.css
├── Forum.jsx
├── ForumTopic.jsx
└── ...
```

**NEW Structure:**
```
src/routes/
├── __root.tsx (root layout)
├── index.tsx (Home)
├── forum.tsx (Forum list)
├── forum.$sectionId.tsx
├── forum.$sectionId.$topicId.tsx
└── ...
```

### Update Content בכל page:

```typescript
// ❌ OLD (React Router)
import { useParams, useNavigate } from 'react-router-dom'

// ✅ NEW (TanStack Router)
import { useParams, useNavigate } from '@tanstack/react-router'

// עדכן את השם של ה-export:
export default function ForumTopic() { ... }
```

---

## **שלב 11: העתק API Functions**

**מהפרויקט הישן:** `api/`  
**ליעד החדש:** `api/`

📁 קבצים להעתקה:
- ✅ publish-content.js → publish-content.ts
- ✅ git-history.js → git-history.ts
- ✅ ... (כל 13 functions)

**עדכון נדרש:**
```typescript
// ✅ Vercel Serverless Function
export default async function handler(req, res) {
  // function body
}

// העדכן path exports
export { handler as default }
```

---

## **שלב 12: עדכון CSS**

**מהפרויקט הישן:** `src/pages/*.css`  
**ליעד החדש:** `src/styles/`

📁 קבצים להעתקה:
- ✅ Home.css → styles/home.css
- ✅ About.css → styles/about.css
- ✅ ... (כל CSS files)

**בתוך קבצי React (tsx):**
```typescript
// ❌ OLD
import './About.css'

// ✅ NEW - Tailwind first, then import if needed
import { useState } from 'react'
import '../styles/about.css'
```

---

## **שלב 13: עדכון Imports - החשוב ביותר!**

### Search and Replace:

```
❌ import { useNavigate } from 'react-router-dom'
✅ import { useNavigate } from '@tanstack/react-router'

❌ import { useParams } from 'react-router-dom'
✅ import { useParams } from '@tanstack/react-router'

❌ import { Link } from 'react-router-dom'
✅ import { Link } from '@tanstack/react-router'

❌ import { useLocation } from 'react-router-dom'
✅ import { useLocation } from '@tanstack/react-router'
```

---

## **שלב 14: עדכון Configuration Files**

**שנה את שמות קבצים:**
- tailwind.config.js → tailwind.config.ts
- vite.config.js → vite.config.ts
- postcss.config.js → postcss.config.js (בסדר כמו שהוא)

**בכל קובץ tsx/ts:** הוסף TypeScript typing.

---

## **Checklist Final:**

- [ ] כל ה-components בעברית RTL
- [ ] כל ה-utils מועתקים
- [ ] כל ה-context מורץ עם TypeScript
- [ ] Firebase config עם tbdsm-5acca
- [ ] Supabase client מוגדר
- [ ] כל ה-API endpoints מועתקים
- [ ] כל ה-pages במבנה TanStack Router
- [ ] Imports עודכנו (React Router → TanStack Router)
- [ ] .env.local עם כל ה-credentials
- [ ] CSS files מהעתקים

---

## **אם יש שגיאות:**

```bash
# בדוק את ה-imports
grep -r "react-router-dom" src/

# בדוק TypeScript errors
npm run type-check

# התחל את ה-dev server
npm run dev
```

---

**✅ כשכל זה בעיצום - הפרויקט מוכן ל-test!**
