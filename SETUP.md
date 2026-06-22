# 🚀 הנחיות התקנה והפעלה

## שלב 1️⃣: עדכון Firebase

1. פתח Firebase Console (https://console.firebase.google.com/)
2. צור פרויקט חדש או בחר קיים
3. עבור אל Settings > Project Settings
4. עבור ל-Your apps ולחץ על Web (</> icon)
5. העתק את ה-Firebase config
6. פתח `src/utils/firebaseConfig.js` והחלף את YOUR_* בערכים האמיתיים

## שלב 2️⃣: Firestore Setup

1. ב-Firebase Console, עבור אל Firestore Database
2. בחר "Start in Production Mode"
3. בחר region (מומלץ Europe)
4. עדכן את Security Rules (ראה README.md)

## שלב 3️⃣: Firebase Storage

1. ב-Firebase Console, עבור אל Storage
2. לחץ "Get Started"
3. בחר את אותו region

## שלב 4️⃣: Authentication

1. ב-Firebase Console, עבור אל Authentication
2. לחץ "Get Started"
3. בחר "Email/Password" ופעל את זה

## שלב 5️⃣: Local Setup

```bash
# 1. עבור לתיקיית הפרויקט
cd party-portal

# 2. התקן dependencies
npm install

# 3. הפעל בפיתוח
npm run dev
```

## שלב 6️⃣: יצירת Admin

כשהפורטל רץ לראשונה:

1. הירשם עם דוא״ל (זה יהיה האדמין)
2. עדכן ב-Firestore collection `users` את ה-role ל-"admin"

```json
{
  "email": "admin@example.com",
  "role": "admin",
  "uid": "matching-firebase-uid",
  "createdAt": "timestamp"
}
```

## שלב 7️⃣: הוספת Club Owner

1. כשמישהו מנסה להירשם כמועדון:
   - רשומה חדשה נוצרת ב-`clubs` collection עם `approved: false`
   - האדמין רואה את זה בלוח הבקרה
   - אחרי אישור, הוא יכול להתחבר

## שלב 8️⃣: Deployment ל-Vercel

```bash
# 1. בנה את הפרויקט
npm run build

# 2. אתחול Git
git init
git add .
git commit -m "Initial commit"

# 3. דחוף ל-GitHub
git remote add origin https://github.com/YOUR_USER/party-portal.git
git push -u origin main

# 4. ב-Vercel:
# - כנס לـ vercel.com
# - Import Project מ-GitHub
# - בחר את הrepo
# - Deploy!
```

## 📊 Firestore Collections Structure

### users (auto-created)
```
├── email
├── role: "admin" | "club"
├── clubId (if role=club)
└── createdAt
```

### clubs (manual creation on signup)
```
├── name
├── description
├── phone
├── email
├── approved: boolean
├── rejected: boolean
├── createdAt
└── ownerId: uid
```

### events (created by clubs)
```
├── name
├── description
├── city
├── date
├── phone
├── link
├── imageUrl
├── clubId
├── approved: boolean
├── rejected: boolean
└── createdAt
```

### registrations (created on signup to events)
```
├── name
├── email
├── phone
├── clubId
├── eventId
└── createdAt
```

## ⚙️ Configuration Files

### Firebase Config (`src/utils/firebaseConfig.js`)
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

## 🧪 Testing

1. **Test Login**: הירשם עם דוא״ל וסיסמה
2. **Test Club Creation**: צור מועדון חדש (ממתין לאישור)
3. **Test Event Creation**: כשאתה מאושר, צור מסיבה
4. **Test Public Portal**: בהיותך בלי תפקיד, ראה רק מסיבות מאושרות

## 🔧 Troubleshooting

### "Firestore initialization failed"
- בדוק שה-config נכון ב-`firebaseConfig.js`
- וודא שבחרת region ב-Firebase

### "Cannot upload image"
- בדוק שStorage פעיל ב-Firebase
- וודא שה-rules מאפשרים uploads

### "Can't create events"
- וודא שה-role שלך הוא "club" ב-Firestore
- בדוק את Security Rules

## 📱 Mobile Responsive?

כן! האתר מוגדל לעבודה על:
- 📱 טלפון (320px+)
- 📱 טאבלט (768px+)
- 💻 דסקטופ

## 🎯 Next Steps (שלב ב')

- [ ] בוט Telegram
- [ ] API for clubs
- [ ] Email notifications
- [ ] CSV export
- [ ] Analytics

---

**אם קיימות בעיות - בדוק את Console ב-Browser (F12)**
