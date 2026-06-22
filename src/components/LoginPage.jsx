import { useState } from 'react'
import { auth } from '../utils/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { FiMail, FiLock } from 'react-icons/fi'
import '../styles/LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🎉 פורטל מסיבות</h1>
        <p className="subtitle">מנהל מסיבות מקצועי</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FiMail /> דוא״ל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label><FiLock /> סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'טוען...' : isSignUp ? 'הירשם' : 'כניסה'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="toggle-btn"
        >
          {isSignUp ? 'כבר יש לך חשבון? כנס' : 'אין לך חשבון? הירשם'}
        </button>

        <div className="demo-notice">
          <small>משהו כמו פורטל מסיבות שלא קיים בשוק 🚀</small>
        </div>
      </div>
    </div>
  )
}
