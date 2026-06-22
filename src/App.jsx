import { useState, useEffect } from 'react'
import { auth } from './utils/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import PublicPortal from './components/PublicPortal'
import AdminDashboard from './components/AdminDashboard'
import ClubDashboard from './components/ClubDashboard'
import LoginPage from './components/LoginPage'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        // צריך לקרוא מ-Firestore כדי לדעת מה התפקיד של המשתמש
        setUserRole('club') // זה יתעדכן בהמשך
      } else {
        setUserRole(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <div className="loading">טוען...</div>
  }

  if (!currentUser) {
    return <LoginPage />
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>פורטל מסיבות</h1>
        <button onClick={() => signOut(auth)} className="logout-btn">
          התנתקות
        </button>
      </header>

      {userRole === 'admin' && <AdminDashboard user={currentUser} />}
      {userRole === 'club' && <ClubDashboard user={currentUser} />}
      {!userRole && <PublicPortal user={currentUser} />}
    </div>
  )
}

export default App
