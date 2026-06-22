# 🔧 מדריך התקנה מפורט

## שלב 1: הכנה

### בדיקת דרישות
```bash
# בדוק גרסת Node
node --version  # צריך להיות 16.0 ומעלה

# בדוק npm
npm --version
```

## שלב 2: הגדרת Firebase

### 2.1 - צור פרויקט Firebase
1. היכנס ל-[firebase.google.com](https://firebase.google.com)
2. לחץ על "Get Started" או "Create a project"
3. בחר את שם הפרויקט שלך
4. בחר את המדינה שלך
5. לחץ "Create project"

### 2.2 - הוסף Firestore Database
1. בעמוד הפרויקט, לחץ על "Firestore Database"
2. לחץ "Create database"
3. בחר "Start in test mode"
4. בחר את האזור שלך (מומלץ: `europe-west1` לאירופה)
5. לחץ "Create"

### 2.3 - הוסף Web App
1. בעמוד הפרויקט, לחץ על ⚙️ > Project Settings
2. לחץ על "Add app" > Web (</> )
3. בחר שם לאפליקציה (לדוגמה: "CRM System")
4. בחר "Also set up Firebase Hosting for this app" (אופציונלי)
5. לחץ "Register app"

### 2.4 - העתק את הקונפיגורציה
1. אתה תראה קוד עם firebaseConfig
2. העתק את הערכים:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

### 2.5 - עדכן את firebase-config.js
```javascript
// firebase-config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // שים כאן את apiKey
  authDomain: "YOUR_AUTH_DOMAIN",   // שים כאן את authDomain
  projectId: "YOUR_PROJECT_ID",     // שים כאן את projectId
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## שלב 3: הגדרת אבטחת Firestore

### 3.1 - גש לחוקי הבטחה
1. בעמוד הפרויקט, לחץ על "Firestore Database"
2. לחץ על Tab "Rules"

### 3.2 - עדכן את החוקים
החלף את הקוד הקיים ב:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // אם אתה רוצה שכל אחד יוכל לקרוא וכתוב (בדיקה בלבד)
    match /customers/{document=**} {
      allow read, write: if true;
    }
    
    // או להגן עם Authentication (מומלץ)
    match /customers/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. לחץ "Publish"

## שלב 4: התקנה מקומית

### 4.1 - שכפל את הקבצים
```bash
cd crm-system
```

### 4.2 - התקן חבילות
```bash
npm install
```

אם יש בעיות, נסה:
```bash
npm install --legacy-peer-deps
```

### 4.3 - הפעל בעיתוי פיתוח
```bash
npm run dev
```

צפה לברכה:
```
VITE v4.5.0 ready in 234 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

## שלב 5: בדיקת התקנה

1. פתח את [http://localhost:3000](http://localhost:3000)
2. אתה אמור לראות את לוח הקדמי
3. עבור ל"הוסף לקוח"
4. הוסף לקוח בדיקה

אם הכל עובד - **מברך!** 🎉

## שלב 6: פיתוח

### טיפים לפיתוח
- השינויים בקבצים שמורים אוטומטית
- פתח את הקונסול (F12) לבדיקת שגיאות
- בדוק את Firebase Console לנתונים חדשים

### בעיות נפוצות

#### ❌ "Cannot find module 'firebase'"
```bash
npm install firebase
```

#### ❌ "VITE_FIREBASE_API_KEY is not defined"
עדכן את firebase-config.js עם הערכים הנכונים

#### ❌ "Permission denied" ב-Firestore
בדוק את חוקי הבטחה - עדכן אותם להיות פתוחים לבדיקה

#### ❌ "Cannot GET /"
וודא שהפעלת `npm run dev`

## שלב 7: פריסה ל-Vercel

### 7.1 - התקן Vercel CLI
```bash
npm install -g vercel
```

### 7.2 - התחברות ל-Vercel
```bash
vercel login
```

### 7.3 - בנה וטוען
```bash
npm run build
```

### 7.4 - פרוס
```bash
vercel --prod
```

## שלב 8: הגדרות נוספות (אופציונליות)

### שינוי מחירי המנויים

בקובץ `App.jsx`, חפש:

```javascript
const SUBSCRIPTION_TYPES = {
  monthly: { name: 'חודשי', price: 300 },
  combined: { name: 'משולב', price: 650 },
  oneTime: { name: 'חד פעמי', price: 80 }
};
```

שנה את הערכים לפי הצורך.

### שינוי צבעים

בקובץ `App.css`, בחלק `:root`:

```css
:root {
  --primary: #3b82f6;        /* הצבע הראשי */
  --secondary: #8b5cf6;      /* הצבע המשני */
  --success: #10b981;        /* צבע הצלחה */
  --danger: #ef4444;         /* צבע סכנה */
}
```

## תמיכה וסיוע

אם נתקלת בבעיות:
1. בדוק את הקונסול (F12) לשגיאות
2. בדוק את Firebase Console לנתונים
3. נסה `npm install` שוב
4. נסה לנקות את ה-cache: `npm cache clean --force`

---

**עדכון אחרון:** דצמבר 2024
