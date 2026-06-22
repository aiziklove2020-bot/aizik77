import { useState, useEffect } from 'react'
import { db } from '../utils/firebaseConfig'
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore'
import { FiCheck, FiX, FiEye } from 'react-icons/fi'
import '../styles/AdminDashboard.css'

export default function AdminDashboard({ user }) {
  const [pendingClubs, setPendingClubs] = useState([])
  const [pendingEvents, setPendingEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('clubs')

  useEffect(() => {
    fetchPendingItems()
  }, [])

  const fetchPendingItems = async () => {
    try {
      // Fetch pending clubs
      const clubsQuery = query(collection(db, 'clubs'), where('approved', '==', false))
      const clubsSnapshot = await getDocs(clubsQuery)
      setPendingClubs(clubsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      // Fetch pending events
      const eventsQuery = query(collection(db, 'events'), where('approved', '==', false))
      const eventsSnapshot = await getDocs(eventsQuery)
      setPendingEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error('Error fetching pending items:', error)
    }
    setLoading(false)
  }

  const approveClub = async (clubId) => {
    try {
      await updateDoc(doc(db, 'clubs', clubId), { approved: true })
      setPendingClubs(pendingClubs.filter(c => c.id !== clubId))
    } catch (error) {
      console.error('Error approving club:', error)
    }
  }

  const rejectClub = async (clubId) => {
    try {
      await updateDoc(doc(db, 'clubs', clubId), { approved: false, rejected: true })
      setPendingClubs(pendingClubs.filter(c => c.id !== clubId))
    } catch (error) {
      console.error('Error rejecting club:', error)
    }
  }

  const approveEvent = async (eventId) => {
    try {
      await updateDoc(doc(db, 'events', eventId), { approved: true })
      setPendingEvents(pendingEvents.filter(e => e.id !== eventId))
    } catch (error) {
      console.error('Error approving event:', error)
    }
  }

  const rejectEvent = async (eventId) => {
    try {
      await updateDoc(doc(db, 'events', eventId), { approved: false, rejected: true })
      setPendingEvents(pendingEvents.filter(e => e.id !== eventId))
    } catch (error) {
      console.error('Error rejecting event:', error)
    }
  }

  return (
    <div className="admin-dashboard">
      <h2>לוח בקרה מנהל</h2>

      <div className="admin-tabs">
        <button
          className={activeTab === 'clubs' ? 'active' : ''}
          onClick={() => setActiveTab('clubs')}
        >
          ✅ מועדונים חדשים ({pendingClubs.length})
        </button>
        <button
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          🎉 מסיבות חדשות ({pendingEvents.length})
        </button>
      </div>

      {loading ? (
        <div className="loading">טוען...</div>
      ) : activeTab === 'clubs' ? (
        <div className="pending-list">
          {pendingClubs.length === 0 ? (
            <p>אין מועדונים חדשים למאשרות</p>
          ) : (
            pendingClubs.map(club => (
              <div key={club.id} className="pending-item">
                <div className="item-details">
                  <h3>{club.name}</h3>
                  <p>{club.description}</p>
                  {club.phone && <p>📞 {club.phone}</p>}
                  {club.email && <p>✉️ {club.email}</p>}
                </div>
                <div className="item-actions">
                  <button onClick={() => approveClub(club.id)} className="btn-approve">
                    <FiCheck /> אישור
                  </button>
                  <button onClick={() => rejectClub(club.id)} className="btn-reject">
                    <FiX /> דחייה
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="pending-list">
          {pendingEvents.length === 0 ? (
            <p>אין מסיבות חדשות למאשרות</p>
          ) : (
            pendingEvents.map(event => (
              <div key={event.id} className="pending-item">
                <div className="item-details">
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  {event.city && <p>📍 {event.city}</p>}
                  {event.phone && <p>📞 {event.phone}</p>}
                </div>
                <div className="item-actions">
                  <button onClick={() => approveEvent(event.id)} className="btn-approve">
                    <FiCheck /> אישור
                  </button>
                  <button onClick={() => rejectEvent(event.id)} className="btn-reject">
                    <FiX /> דחייה
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
