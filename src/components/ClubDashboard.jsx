import { useState, useEffect } from 'react'
import { db, storage } from '../utils/firebaseConfig'
import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import EventForm from './EventForm'
import '../styles/ClubDashboard.css'

export default function ClubDashboard({ user }) {
  const [clubEvents, setClubEvents] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClubData()
  }, [user])

  const fetchClubData = async () => {
    try {
      // Fetch club events
      const eventsQuery = query(
        collection(db, 'events'),
        where('clubId', '==', user.uid)
      )
      const eventsSnapshot = await getDocs(eventsQuery)
      const events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setClubEvents(events)

      // Fetch registrations for all events
      if (events.length > 0) {
        const regsQuery = query(
          collection(db, 'registrations'),
          where('clubId', '==', user.uid)
        )
        const regsSnapshot = await getDocs(regsQuery)
        setRegistrations(regsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      }
    } catch (error) {
      console.error('Error fetching club data:', error)
    }
    setLoading(false)
  }

  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        await updateDoc(doc(db, 'events', editingEvent.id), eventData)
      } else {
        await addDoc(collection(db, 'events'), {
          ...eventData,
          clubId: user.uid,
          createdAt: new Date(),
          approved: false
        })
      }
      setShowForm(false)
      setEditingEvent(null)
      fetchClubData()
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  const deleteEvent = async (eventId) => {
    if (confirm('בטוח רוצה למחוק את המסיבה?')) {
      try {
        await deleteDoc(doc(db, 'events', eventId))
        fetchClubData()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  const eventRegs = editingEvent ? registrations.filter(r => r.eventId === editingEvent.id) : []

  return (
    <div className="club-dashboard">
      <div className="dashboard-header">
        <h2>לוח ניהול המועדון שלי</h2>
        <button onClick={() => setShowForm(true)} className="btn-new-event">
          <FiPlus /> מסיבה חדשה
        </button>
      </div>

      {loading ? (
        <div className="loading">טוען...</div>
      ) : (
        <div className="dashboard-content">
          <div className="events-section">
            <h3>המסיבות שלי ({clubEvents.length})</h3>
            {clubEvents.length === 0 ? (
              <p className="no-content">עדיין אין מסיבות. צור אחת חדשה!</p>
            ) : (
              <div className="events-list">
                {clubEvents.map(event => (
                  <div key={event.id} className="event-row">
                    <div className="event-info">
                      <h4>{event.name}</h4>
                      <p>{event.city}</p>
                      <span className={`status ${event.approved ? 'approved' : 'pending'}`}>
                        {event.approved ? '✓ אושר' : '⏳ בהמתנה'}
                      </span>
                    </div>
                    <div className="event-actions">
                      <button
                        onClick={() => {
                          setEditingEvent(event)
                          setShowForm(true)
                        }}
                        className="btn-small"
                      >
                        <FiEdit2 />
                      </button>
                      <button onClick={() => deleteEvent(event.id)} className="btn-small btn-danger">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="registrations-section">
            <h3>רישומים ({registrations.length})</h3>
            {registrations.length === 0 ? (
              <p className="no-content">אין רישומים עדיין</p>
            ) : (
              <div className="registrations-list">
                {registrations.map(reg => (
                  <div key={reg.id} className="registration-row">
                    <div>
                      <strong>{reg.name}</strong>
                      <p>{reg.email}</p>
                      <p>📞 {reg.phone}</p>
                    </div>
                    <div className="reg-date">
                      {new Date(reg.createdAt?.seconds * 1000).toLocaleDateString('he-IL')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showForm && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onClose={() => {
            setShowForm(false)
            setEditingEvent(null)
          }}
        />
      )}
    </div>
  )
}
