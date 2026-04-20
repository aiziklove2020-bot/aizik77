# BDSM Chat (עם Firebase)

צ'אט בזמן אמת בעברית המחובר ל-Firebase. כל ההודעות נשמרות בענן ומשתמשים שונים רואים אחד את השני בזמן אמת.

## קבצים בפרויקט

- **`index.html`** - הצ'אט המלא (קובץ אחד)
- **`vercel.json`** - הגדרות פריסה ל-Vercel
- **`firestore.rules`** - חוקי אבטחה ל-Firestore (צריך להעתיק ל-Firebase Console)
- **`README.md`** - הקובץ הזה

## הגדרות חובה ב-Firebase Console

לפני שהאתר יעבוד, צריך 4 הגדרות חד-פעמיות:

### 1. הפעל Firestore
- https://console.firebase.google.com/project/tbdsm-5acca/firestore
- לחץ "Create database" → "Start in test mode" → location: eur3 → Enable

### 2. הפעל Authentication (Anonymous)
- https://console.firebase.google.com/project/tbdsm-5acca/authentication
- Get started → Sign-in method → Anonymous → Enable → Save

### 3. הוסף את Vercel כדומיין מורשה
- באותו מסך של Authentication → Settings → Authorized domains
- Add domain: `aizik77.vercel.app`

### 4. העתק את חוקי האבטחה
- https://console.firebase.google.com/project/tbdsm-5acca/firestore/rules
- מחק הכל → הדבק את תוכן `firestore.rules` → Publish

## העלאה ל-Vercel

1. פתח את ה-GitHub repo שלך
2. מחק את `index.html` הישן
3. העלה את `index.html`, `vercel.json`, `firestore.rules` ו-`README.md`
4. Vercel ייפרוס מחדש אוטומטית תוך דקה

## בדיקה

1. פתח את https://aizik77.vercel.app/ בחלון רגיל
2. פתח את אותו URL בחלון **Incognito/פרטי**
3. שלח הודעה בחלון אחד - היא תופיע בחלון השני בתוך שנייה!

## פתרון בעיות

- **"permission-denied" ב-Console**: עדכן את חוקי האבטחה ב-Firebase (שלב 4)
- **לא רואה הודעות של אחרים**: ודא ש-Firestore מופעל ושהוספת את הדומיין למורשים
- **מסך שגיאה**: פתח F12 → Console → שלח את השגיאה האדומה
