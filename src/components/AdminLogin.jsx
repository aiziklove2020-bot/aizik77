import { useState } from 'react'
import { auth } from '../utils/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FiX } from 'react-icons/fi'
import '../styles/AdminLogin.css'

export default function AdminLogin({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      onClose()
    } catch (err) {
      setError('דוא״ל או סיסמה שגויים')
    }
    setLoading(false)
  }

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-modal">
        <button onClick={onClose} className="close-btn">
          <FiX />
        </button>

        <h2>כניסה למנהל</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="דוא״ל"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="סיסמה"
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'טוען...' : 'כניסה'}
          </button>
        </form>
      </div>
    </div>
  )
}
