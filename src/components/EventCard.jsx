import { FiPhone, FiLink, FiMapPin, FiCalendar } from 'react-icons/fi'
import '../styles/EventCard.css'

export default function EventCard({ event }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp.seconds * 1000)
    return date.toLocaleDateString('he-IL')
  }

  return (
    <div className="event-card">
      {event.imageUrl && (
        <div className="event-image">
          <img src={event.imageUrl} alt={event.name} />
        </div>
      )}

      <div className="event-content">
        <h3>{event.name}</h3>

        {event.city && (
          <div className="event-info">
            <FiMapPin /> <span>{event.city}</span>
          </div>
        )}

        {event.date && (
          <div className="event-info">
            <FiCalendar /> <span>{formatDate(event.date)}</span>
          </div>
        )}

        {event.description && (
          <p className="event-description">{event.description}</p>
        )}

        <div className="event-actions">
          {event.phone && (
            <a href={`tel:${event.phone}`} className="btn btn-primary">
              <FiPhone /> {event.phone}
            </a>
          )}
          {event.link && (
            <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <FiLink /> פרטים נוספים
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
