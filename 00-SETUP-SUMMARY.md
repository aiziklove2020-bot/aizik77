
# 🚀 TBDSM Lovable Migration - Setup Complete!

---

## ✅ What Has Been Created

### **Configuration Files:**
- ✅ `tailwind.config.ts` — Hebrew RTL + brand colors (red #E31828)
- ✅ `vite.config.ts` — TanStack Start + React 19
- ✅ `tsconfig.json` — TypeScript configuration
- ✅ `postcss.config.js` — Tailwind CSS processor
- ✅ `vercel.json` — Vercel deployment config
- ✅ `package.json` — Dependencies (React, Firebase, Supabase, Tailwind)
- ✅ `index.html` — Entry point with meta tags
- ✅ `.env.example` — Environment variables template

### **Source Files:**
- ✅ `src/main.tsx` — App entry point
- ✅ `src/router.tsx` — TanStack Router configuration (all 21 routes)
- ✅ `src/routes/__root.tsx` — Root layout with providers
- ✅ `src/routes/index.tsx` — Home page example
- ✅ `src/styles/globals.css` — Global styles + Hebrew RTL
- ✅ `src/firebase/config.ts` — Firebase initialization
- ✅ `src/supabase/client.ts` — Supabase client setup

### **API Examples:**
- ✅ `api/support-chat-send-example.ts` — Template for Vercel function

### **Documentation:**
- ✅ `MIGRATION_INSTRUCTIONS.md` — Step-by-step file migration guide
- ✅ `PAGES_SKELETON_TEMPLATE.ts` — Template for creating all pages

---

## 📋 Next Steps (Do These Now!)

### **Step 1: Copy All Your Old Files**

Follow `MIGRATION_INSTRUCTIONS.md` exactly. It tells you:
- Which folder to copy from (old project)
- Where to paste in (new project)
- What imports to update

**Folders to copy:**
1. `src/components/` → `src/components/`
2. `src/utils/` → `src/utils/`
3. `src/hooks/` → `src/hooks/`
4. `src/context/` → `src/context/`
5. `src/firebase/` → `src/firebase/` (except config.ts - we created new one)
6. `src/supabase/` → `src/supabase/`
7. `src/services/` → `src/services/`
8. `src/i18n/` + `src/locales/` → `src/i18n/` + `src/locales/`
9. `api/` → `api/`
10. `src/pages/*.css` → `src/styles/`

### **Step 2: Create All Page Files**

Create these files in `src/routes/`:
- `about.tsx`
- `contact.tsx`
- `register.tsx`
- `privacy.tsx`
- `deleterequest.tsx`
- `store.tsx`
- `workshops.tsx`
- `forum.tsx`
- `forum.$sectionId.tsx`
- `forum.$sectionId.$topicId.tsx`
- `forum.password-reset.tsx`
- `forum.email-verify.tsx`
- `blog.tsx`
- `blog.$postId.tsx`
- `profile.$userId.tsx`
- `bookmarks.tsx`
- `messages.tsx`
- `messages.$userId.tsx`
- `chat.tsx`
- `chat.$roomId.tsx`
- `chat.join.$token.tsx`
- `admin-login.tsx`
- `admin.tsx`

**Use `PAGES_SKELETON_TEMPLATE.ts` as reference** — just copy-paste and update content.

### **Step 3: Update Environment Variables**

Create `.env.local` file by copying `.env.example` and filling in:
- Firebase credentials (from tbdsm-5acca project)
- Supabase URL + key (if using chat)
- Telegram bot token
- GitHub tokens (for content publishing)
- Cloudinary credentials
- Resend email API key

### **Step 4: Replace Imports**

**Search & Replace in all files:**

```
react-router-dom → @tanstack/react-router
.jsx → .tsx
.js → .ts (for config files)
```

### **Step 5: Test Locally**

```bash
npm install
npm run dev
```

Should open http://localhost:3000 with your site in Hebrew RTL.

### **Step 6: Deploy to Vercel**

```bash
npm run build
vercel deploy
```

---

## 🎯 Key Differences from Old Project

### **React Router → TanStack Router**

**OLD:**
```jsx
import { useNavigate, useParams } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
```

**NEW:**
```tsx
import { useNavigate, useParams } from '@tanstack/react-router'
import { Router, Route, RootRoute } from '@tanstack/react-router'
```

### **Parameter Access**

**OLD:**
```jsx
const { userId } = useParams()  // /profile/:userId
```

**NEW:**
```tsx
const { userId } = useParams({ from: '/profile/$userId' })  // /profile/$userId
```

### **Navigation**

**OLD:**
```jsx
navigate(`/forum/${sectionId}/${topicId}`)
```

**NEW:**
```tsx
navigate({ to: '/forum/$sectionId/$topicId', params: { sectionId, topicId } })
```

---

## 🔗 Important File Locations

```
project-root/
├── src/
│   ├── main.tsx (entry)
│   ├── router.tsx (routing)
│   ├── routes/
│   │   ├── __root.tsx (layout)
│   │   ├── index.tsx (home)
│   │   └── ... (all other pages)
│   ├── components/
│   ├── utils/
│   ├── hooks/
│   ├── context/
│   ├── firebase/
│   ├── supabase/
│   ├── services/
│   ├── i18n/
│   └── styles/
├── api/
│   ├── support-chat-send.ts
│   ├── publish-content.ts
│   └── ... (13 endpoints)
├── public/
│   ├── favicon.svg
│   └── ... (static files)
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
├── index.html
├── .env.local (NOT in git!)
└── vercel.json
```

---

## 📚 Translation Keys (Hebrew)

All text should use `t()` from LanguageContext:

```tsx
import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export default function MyComponent() {
  const { t } = useContext(LanguageContext)
  
  return <h1>{t('home.title')}</h1>  // Returns Hebrew text
}
```

Translation files are in `src/locales/he/*.js` — they define all keys.

---

## 🎨 Colors & Styling

**Tailwind color variables (already configured):**
- `text-primary` — Red (#E31828)
- `bg-background` — Dark black (#0A0A0A)
- `bg-card` — Dark gray (#1a1a1a)
- `text-gold` — Gold accent (#C9A961)

**Dark theme by default** — no light mode (yet).

---

## ✨ What's Already Set Up

- ✅ Hebrew RTL (`<html dir="rtl" lang="he">`)
- ✅ Tailwind CSS 4 with RTL support
- ✅ Dark theme with brand colors
- ✅ Firebase (tbdsm-5acca)
- ✅ Supabase for chat
- ✅ Vercel serverless API functions
- ✅ TanStack Router (v1.49)
- ✅ React 19
- ✅ TypeScript strict mode
- ✅ All context providers (Auth, Content, ForumAuth, Language)

---

## ⚠️ Common Issues & Fixes

### **Issue: "Cannot find module 'react-router-dom'"**
→ Replace with `@tanstack/react-router` imports

### **Issue: "useParams() requires a route"**
→ Always pass `from` option: `useParams({ from: '/profile/$userId' })`

### **Issue: "Firestore rules reject reads"**
→ Check `.env.local` has correct Firebase credentials

### **Issue: Hebrew text not RTL**
→ Check tailwind.config.ts has `tailwindcss-rtl` plugin

### **Issue: Components missing LanguageContext**
→ Wrap in `<LanguageProvider>` (already in __root.tsx)

---

## 🆘 Need Help?

Check these files:
1. **For routing issues** → Look at `src/router.tsx`
2. **For imports** → Look at `MIGRATION_INSTRUCTIONS.md`
3. **For component structure** → Look at `src/routes/__root.tsx`
4. **For Firebase** → Look at `src/firebase/config.ts`
5. **For styles** → Look at `src/styles/globals.css` + `tailwind.config.ts`

---

## ✅ Checklist Before Going Live

- [ ] All components copied from old project
- [ ] All utils/hooks/context copied
- [ ] All pages created in src/routes/
- [ ] .env.local filled with credentials
- [ ] Imports updated (React Router → TanStack Router)
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Dev server runs (`npm run dev`)
- [ ] Home page loads correctly
- [ ] Forum/Blog load
- [ ] Admin panel loads
- [ ] Firebase reads/writes work
- [ ] Telegram notifications work
- [ ] Build succeeds (`npm run build`)
- [ ] Deploy to Vercel succeeds

---

## 🎉 You're Ready!

This is your complete Lovable/TanStack Start foundation.
Now just copy your files, test locally, and deploy!

**Any questions? All files are documented.** ✨
