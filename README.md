# 🎉 פורטל מסיבות - מערכת ניהול מקצועית

פורטל מסיבות מקצועי עם React + Firebase - מערכת ניהול מלאה לבעלי מועדונים ואדמין.

## 🎯 תכונות

### לציבור הרחב
- 🔍 חיפוש מסיבות
- 📍 סינון לפי עיר
- 📱 תצוגה מרגיעה של מסיבות
- 📞 קישור ישיר לטלפון/וואטסאפ
- 🖼️ הצגת תמונות מסיבות

### לבעלי מועדונים
- ➕ יצירת מסיבות חדשות
- ✏️ עריכה ומחיקה של מסיבות
- 📊 צפייה ברישומים של משתמשים
- 📤 העלאה של תמונות
- ⏳ סטטוס אישור מסיבה

### למנהל הראשי
- ✅ אישור מועדונים חדשים
- ❌ דחייה של מועדונים
- ✅ אישור מסיבות חדשות
- ❌ דחייה של מסיבות

## 🚀 התחלה מהירה

### 1. התקנה

```bash
npm install
```

### 2. הגדרת Firebase

עדכן את `src/utils/firebaseConfig.js` עם ה-credentials שלך:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### 3. הפעלה בפיתוח

```bash
npm run dev
```

הפורטל יפתח ב-http://localhost:3000

### 4. בנייה לייצור

```bash
npm run build
npm run preview
```

## 📁 מבנה הפרויקט

```
party-portal/
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx          # דף התחברות
│   │   ├── PublicPortal.jsx       # פורטל לציבור
│   │   ├── EventCard.jsx          # כרטיס מסיבה
│   │   ├── AdminDashboard.jsx     # לוח מנהל
│   │   ├── ClubDashboard.jsx      # לוח בעל מועדון
│   │   └── EventForm.jsx          # טופס יצירת מסיבה
│   ├── styles/
│   │   ├── LoginPage.css
│   │   ├── PublicPortal.css
│   │   ├── EventCard.css
│   │   ├── AdminDashboard.css
│   │   ├── ClubDashboard.css
│   │   └── EventForm.css
│   ├── utils/
│   │   └── firebaseConfig.js      # הגדרות Firebase
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🗄️ Firebase Collections

### users
```json
{
  "email": "club@example.com",
  "role": "club",
  "clubId": "club123",
  "approved": true,
  "createdAt": "timestamp"
}
```

### clubs
```json
{
  "name": "שם המועדון",
  "description": "תיאור",
  "phone": "0501234567",
  "email": "club@example.com",
  "approved": false,
  "createdAt": "timestamp"
}
```

### events
```json
{
  "clubId": "club123",
  "name": "שם המסיבה",
  "description": "תיאור מלא",
  "city": "תל אביב",
  "date": "timestamp",
  "phone": "0501234567",
  "link": "https://example.com",
  "imageUrl": "https://...",
  "approved": false,
  "createdAt": "timestamp"
}
```

### registrations
```json
{
  "clubId": "club123",
  "eventId": "event456",
  "name": "שם הרשום",
  "email": "user@example.com",
  "phone": "0501234567",
  "createdAt": "timestamp"
}
```

## 🔐 Firestore Security Rules

עדכן את Security Rules ב-Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /events/{document=**} {
      allow read: if resource.data.approved == true || request.auth.uid == resource.data.clubId;
      allow write: if request.auth.uid == resource.data.clubId;
      allow delete: if request.auth.uid == resource.data.clubId;
    }
    
    match /clubs/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid == document;
      allow delete: if request.auth.uid == document;
    }
    
    match /registrations/{document=**} {
      allow read: if request.auth.uid == resource.data.clubId;
      allow create: if request.auth != null;
      allow write: if request.auth.uid == resource.data.clubId;
    }
  }
}
```

## 💡 טיפים

1. **תמונות**: השתמש בCloudinary או Firebase Storage לתמונות גדולות
2. **ייצוא נתונים**: ניתן להוסיף CSV export של רישומים
3. **בוט טלגרם**: בשלב הבא - תוצאות רישום ישודרו לבוט

## 📝 רשימת TODO

- [ ] בוט טלגרם לרישומים
- [ ] API עבור מועדונים
- [ ] מערכת דירוגים
- [ ] מערכת הודעות
- [ ] ייצוא CSV
- [ ] SMS הודעות למועדונים

## 📞 תמיכה

לשאלות או בעיות - פנה ישירות.

---

**עיצוב ועיתוד**: מערכת ניהול מסיבות מקצועית 🚀
