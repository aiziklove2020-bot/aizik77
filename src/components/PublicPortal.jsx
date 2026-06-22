import { useState, useEffect } from 'react'
import { db } from '../utils/firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { FiSearch, FiMapPin, FiPhone, FiLink } from 'react-icons/fi'
import EventCard from './EventCard'
import '../styles/PublicPortal.css'

export default function PublicPortal() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApprovedEvents()
  }, [])

  const fetchApprovedEvents = async () => {
    try {
      const q = query(collection(db, 'events'), where('approved', '==', true))
      const snapshot = await getDocs(q)
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setEvents(eventsData)
      setFilteredEvents(eventsData)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
    setLoading(false)
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    filterEvents(value, selectedCity)
  }

  const handleCityFilter = (city) => {
    setSelectedCity(city)
    filterEvents(searchTerm, city)
  }

  const filterEvents = (search, city) => {
    let filtered = events

    if (search) {
      filtered = filtered.filter(e =>
        e.name?.toLowerCase().includes(search.toLowerCase()) ||
        e.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (city) {
      filtered = filtered.filter(e => e.city === city)
    }

    setFilteredEvents(filtered)
  }

  const cities = [...new Set(events.map(e => e.city).filter(Boolean))]

  return (
    <div className="public-portal">
      <div className="portal-hero">
        <h2>🎊 מסיבות קרובות אליך</h2>
        <p>גלה את המסיבות הבאות בעיר שלך</p>
      </div>

      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="חפש מסיבה..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {cities.length > 0 && (
        <div className="city-filter">
          <button
            className={selectedCity === '' ? 'active' : ''}
            onClick={() => handleCityFilter('')}
          >
            כל הערים
          </button>
          {cities.map(city => (
            <button
              key={city}
              className={selectedCity === city ? 'active' : ''}
              onClick={() => handleCityFilter(city)}
            >
              <FiMapPin /> {city}
            </button>
          ))}
        </div>
      )}

      <div className="events-grid">
        {loading ? (
          <div className="loading">טוען מסיבות...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>לא נמצאו מסיבות התואמות את החיפוש</p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  )
}
