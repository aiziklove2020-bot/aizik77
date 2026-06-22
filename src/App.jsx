import { useState, useEffect } from 'react'
import { auth, db } from './utils/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import PublicPortal from './components/PublicPortal'
import ClubDashboard from './components/ClubDashboard'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role)
        }
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

  // Admin Login Screen
  if (showAdminLogin) {
    return <AdminLogin onClose={() => setShowAdminLogin(false)} />
  }

  // Public Homepage - No Login
  if (!currentUser) {
    return (
      <div className="app">
        <header className="public-header">
          <h1>🎉 פורטל מסיבות</h1>
          <button onClick={() => setShowAdminLogin(true)} className="admin-btn">
            ניהול
          </button>
        </header>
        <PublicPortal />
      </div>
    )
  }

  // Admin Dashboard
  if (userRole === 'admin') {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🎉 פורטל מסיבות - ניהול</h1>
          <button onClick={() => signOut(auth)} className="logout-btn">
            התנתקות
          </button>
        </header>
        <AdminDashboard user={currentUser} />
      </div>
    )
  }

  // Club Dashboard
  if (userRole === 'club') {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🎉 לוח בקרה - {currentUser.email}</h1>
          <button onClick={() => signOut(auth)} className="logout-btn">
            התנתקות
          </button>
        </header>
        <ClubDashboard user={currentUser} />
      </div>
    )
  }

  return null
}

export default App
