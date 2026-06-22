import { useState, useEffect } from 'react'
import { db, auth } from '../utils/firebaseConfig'
import { collection, getDocs, query, where, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FiCheck, FiX, FiPlus, FiTrash2 } from 'react-icons/fi'
import '../styles/AdminDashboard.css'

export default function AdminDashboard({ user }) {
  const [clubs, setClubs] = useState([])
  const [pendingEvents, setPendingEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('clubs')
  const [showNewClubForm, setShowNewClubForm] = useState(false)
  const [newClub, setNewClub] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const clubsSnap = await getDocs(collection(db, 'clubs'))
      setClubs(clubsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      const eventsQuery = query(collection(db, 'events'), where('approved', '==', false))
      const eventsSnap = await getDocs(eventsQuery)
      setPendingEvents(eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error('Error fetching:', error)
    }
    setLoading(false)
  }

  const createNewClub = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      // Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, newClub.email, newClub.password)
      
      // Create club in Firestore
      await addDoc(collection(db, 'clubs'), {
        name: newClub.name,
        email: newClub.email,
        phone: newClub.phone,
        ownerId: userCred.user.uid,
        approved: true,
        createdAt: new Date()
      })

      // Create user document
      await addDoc(collection(db, 'users'), {
        uid: userCred.user.uid,
        email: newClub.email,
        role: 'club',
        createdAt: new Date()
      })

      setMessage(`✅ מועדון "${newClub.name}" נוצר בהצלחה`)
      setNewClub({ name: '', email: '', password: '', phone: '' })
      setShowNewClubForm(false)
      fetchData()
    } catch (error) {
      setMessage(`❌ שגיאה: ${error.message}`)
    }
  }

  const approveEvent = async (eventId) => {
    try {
      await updateDoc(doc(db, 'events', eventId), { approved: true })
      fetchData()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const rejectEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'events', eventId))
      fetchData()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteClub = async (clubId) => {
    if (confirm('בטוח למחוק את המועדון?')) {
      try {
        await deleteDoc(doc(db, 'clubs', clubId))
        fetchData()
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h2>🔐 לוח בקרה מנהל</h2>

        <div className="admin-tabs">
          <button
            className={activeTab === 'clubs' ? 'active' : ''}
            onClick={() => setActiveTab('clubs')}
          >
            🏢 מועדונים ({clubs.length})
          </button>
          <button
            className={activeTab === 'events' ? 'active' : ''}
            onClick={() => setActiveTab('events')}
          >
            🎉 מסיבות חדשות ({pendingEvents.length})
          </button>
        </div>

        {message && <div className="message">{message}</div>}

        {loading ? (
          <div className="loading">טוען...</div>
        ) : activeTab === 'clubs' ? (
          <div className="clubs-section">
            <button onClick={() => setShowNewClubForm(!showNewClubForm)} className="btn-add">
              <FiPlus /> מועדון חדש
            </button>

            {showNewClubForm && (
              <div className="club-form">
                <h3>יצירת מועדון חדש</h3>
                <form onSubmit={createNewClub}>
                  <input
                    type="text"
                    placeholder="שם המועדון"
                    value={newClub.name}
                    onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="דוא״ל"
                    value={newClub.email}
                    onChange={(e) => setNewClub({ ...newClub, email: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    placeholder="סיסמה"
                    value={newClub.password}
                    onChange={(e) => setNewClub({ ...newClub, password: e.target.value })}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="טלפון"
                    value={newClub.phone}
                    onChange={(e) => setNewClub({ ...newClub, phone: e.target.value })}
                  />
                  <button type="submit" className="btn-save">צור</button>
                </form>
              </div>
            )}

            <div className="clubs-list">
              {clubs.map(club => (
                <div key={club.id} className="club-item">
                  <div>
                    <h4>{club.name}</h4>
                    <p>📧 {club.email}</p>
                    {club.phone && <p>📞 {club.phone}</p>}
                  </div>
                  <button onClick={() => deleteClub(club.id)} className="btn-delete">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="events-section">
            {pendingEvents.length === 0 ? (
              <p>אין מסיבות חדשות</p>
            ) : (
              pendingEvents.map(event => (
                <div key={event.id} className="event-item">
                  <div>
                    <h4>{event.name}</h4>
                    <p>{event.description}</p>
                  </div>
                  <div className="actions">
                    <button onClick={() => approveEvent(event.id)} className="btn-approve">
                      <FiCheck />
                    </button>
                    <button onClick={() => rejectEvent(event.id)} className="btn-reject">
                      <FiX />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
