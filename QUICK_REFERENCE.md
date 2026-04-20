# 📝 כרטיס עזר מהיר - פקודות נפוצות

## 🚀 הפעלה

```bash
# הפעלת המערכת (לפיתוח)
npm start

# בניה לפרודקשן
npm run build

# התקנת חבילות (אם חסר משהו)
npm install
```

---

## 👤 פרטי התחברות

```
אדמין: admin / 2109
דמו:   demo / demo
אורח:  לחץ "כניסה כאורח"
```

---

## 🔥 קבצים חשובים

```
src/
├── App.jsx              ← הקוד הראשי של הצ'אט
├── firebase-config.js   ← חיבור ל-Firebase (שים את הנתונים שלך!)
├── index.css            ← עיצוב
└── index.js             ← נקודת כניסה

tailwind.config.js       ← הגדרות Tailwind
package.json             ← רשימת חבילות
```

---

## 🛠️ פקודות Firebase

```bash
# כניסה ל-Firebase
firebase login

# אתחול Hosting
firebase init hosting

# העלאה לאינטרנט
npm run build
firebase deploy
```

---

## 🐛 פתרון בעיות מהיר

| בעיה | פתרון |
|------|--------|
| Module not found | `npm install` |
| Port 3000 תפוס | סגור תהליכים אחרים או `PORT=3001 npm start` |
| Firebase שגיאות | בדוק firebase-config.js |
| Tailwind לא עובד | `npx tailwindcss init` |

---

## 📂 מבנה הפרויקט

```
bdsm-chat/
│
├── public/              ← קבצים סטטיים
├── src/
│   ├── App.jsx         ← ⭐ הצ'אט
│   ├── firebase-config.js ← ⭐ Firebase
│   ├── index.css       ← ⭐ CSS
│   └── index.js
│
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🎨 תכונות מיוחדות

### מצב מסכה (משתמשים)
- כפתור "🎭 הפעל מצב מסכה" בסיידבר
- 10 מסכות לבחירה
- אנונימיות מלאה (מנהלים רואים)

### כפתורי אדמין (על הודעות)
- רחף עם עכבר על הודעה
- 📌 = נעץ הודעה
- 🗑️ = מחק הודעה
- רק אדמינים רואים!

### התראות מסיבות
- אוטומטי בחמישי ושישי
- אדמין יכול להפעיל/לכבות ידנית
- אדמין יכול לשנות טקסט

---

## 🔐 אבטחה

**חובה לעדכן חוקי Firestore לפני פרסום!**

1. Firebase Console → Firestore Database
2. Rules טאב
3. העתק מ-`firestore.rules`
4. Publish

---

## 📊 מיקום קבצים ב-Firebase

```
Firestore Collections:
- users/           ← משתמשים
- messages/        ← הודעות
- rooms/           ← חדרים
- privateMessages/ ← הודעות פרטיות
- onlineUsers/     ← מי מחובר
- bans/            ← חסימות
```

---

## 💡 טיפים

1. **שמור את firebase-config בטוח** - יש בו מפתחות!
2. **עדכן את .gitignore** - אל תעלה סיסמאות
3. **גבה את Firebase** - Firestore → Export
4. **בדוק Console** - F12 לשגיאות
5. **החבר GA** - Google Analytics לסטטיסטיקות

---

## 🆘 קישורים מהירים

- Firebase Console: https://console.firebase.google.com
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com
- Lucide Icons: https://lucide.dev

---

## 📞 עזרה נוספת

אם תקוע - פתח Console (F12) וחפש שגיאות אדומות!
