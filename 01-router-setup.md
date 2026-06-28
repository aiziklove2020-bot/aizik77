# 🚀 TBDSM Site - Lovable Migration Plan

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # Root layout
│   ├── index.tsx           # Home page
│   ├── about.tsx           # About page
│   ├── contact.tsx         # Contact page
│   ├── register.tsx        # Register page
│   ├── privacy.tsx         # Privacy page
│   ├── deleterequest.tsx   # Delete account
│   ├── store.tsx           # Store page
│   ├── workshops.tsx       # Workshops page
│   ├── forum.tsx           # Forum list
│   ├── forum.$sectionId.tsx           # Forum section
│   ├── forum.$sectionId.$topicId.tsx  # Forum topic
│   ├── forum.password-reset.tsx       # Password reset
│   ├── forum.email-verify.tsx         # Email verify
│   ├── blog.tsx            # Blog list
│   ├── blog.$postId.tsx    # Blog post
│   ├── profile.$userId.tsx # User profile
│   ├── bookmarks.tsx       # Bookmarks
│   ├── messages.tsx        # Messages
│   ├── messages.$userId.tsx# Messages with user
│   ├── chat.tsx            # Chat lobby
│   ├── chat.$roomId.tsx    # Chat room
│   ├── chat.join.$token.tsx# Chat invite join
│   ├── admin-login.tsx     # Admin login
│   └── admin.tsx           # Admin panel
│
├── components/             # All 60+ components from old project
├── utils/                  # All 26 utilities from old project
├── hooks/                  # All 3 hooks from old project
├── context/                # All 11 contexts from old project
├── firebase/               # All Firebase modules
├── supabase/               # Supabase client
├── i18n/                   # Hebrew translations + LanguageContext
│
api/                        # Vercel serverless functions
├── publish-content.ts
├── git-history.ts
├── import-content-from-git.ts
├── telegram-relay.ts
├── support-chat-send.ts
├── chat-notification-bridge.ts
├── forum-auth.ts
├── record-deploy-status.ts
├── chat-supabase-jwt.ts
├── telegram-webhook.ts
├── chat-admin-reports.ts
└── support-chat-diagnostic.ts
```

---

## Key Changes from React Router → TanStack Router

### Old (React Router):
```typescript
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
<Route path="/forum/:sectionId/:topicId" element={<ForumTopic />} />
```

### New (TanStack Router):
```typescript
import { RootRoute, Route, Router, RootRouteWithContext } from '@tanstack/react-router'
const forumTopicRoute = new Route({
  getParentRoute: () => forumSectionRoute,
  path: '$topicId',
  component: ForumTopic
})
```

---

## RTL + Hebrew Setup

✅ `<html dir="rtl" lang="he">`
✅ Tailwind `direction: rtl` in globals
✅ LanguageContext provides `t()` function
✅ All text uses translation keys from locales/he/

---

## Firebase Projects

- **Main:** tbdsm-5acca (content, forum, blog, users, subscriptions)
- **Chat (optional):** VITE_FIREBASE_CHAT_* (if using dedicated chat project)

---

## Supabase (Chat Backend)

- JWT auth via `/api/chat-supabase-jwt`
- RLS on `chat_message_reports`, user-scoped data
- PostgREST API for chat operations

---

## Environment Variables (.env.local)

```env
# Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=tbdsm-5acca
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Supabase (if using)
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# Admin API Secret
VITE_ADMIN_API_SECRET=...

# Telegram
VITE_TELEGRAM_BOT_TOKEN=... (optional, for admin)

# GitHub (for content publishing)
GITHUB_TOKEN=...
GITHUB_OWNER=...
GITHUB_REPO=...
GITHUB_BRANCH=PublishMode

# Email (Resend)
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
```

---

## Next Steps

1. ✅ Create Lovable project with TanStack Start
2. ✅ Copy all components/utils/context/firebase to `src/`
3. ✅ Create route files in `src/routes/`
4. ✅ Update imports (React Router → TanStack Router)
5. ✅ Set up Hebrew RTL in tailwind.config.ts
6. ✅ Copy API routes to `api/`
7. ✅ Test routing + page loads
8. ✅ Deploy to Vercel

---

## Status: READY TO START 🚀
