import { useState, useEffect } from 'react'
import { storage } from '../utils/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FiX } from 'react-icons/fi'
import '../styles/EventForm.css'

export default function EventForm({ event, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: event?.name || '',
    description: event?.description || '',
    city: event?.city || '',
    date: event?.date ? new Date(event.date.seconds * 1000).toISOString().split('T')[0] : '',
    phone: event?.phone || '',
    link: event?.link || '',
    imageUrl: event?.imageUrl || '',
    imageFile: null
  })
  const [uploading, setUploading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }))
    }
  }

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `events/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      return await getDownloadURL(storageRef)
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = formData.imageUrl

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile)
      }

      const eventData = {
        name: formData.name,
        description: formData.description,
        city: formData.city,
        date: new Date(formData.date),
        phone: formData.phone,
        link: formData.link,
        imageUrl: imageUrl
      }

      onSave(eventData)
    } catch (error) {
      console.error('Error saving event:', error)
    }
    setUploading(false)
  }

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2>{event ? 'ערוך מסיבה' : 'מסיבה חדשה'}</h2>
          <button onClick={onClose} className="close-btn">
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>שם המסיבה *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="לדוגמה: מסיבה בר של אלכס"
            />
          </div>

          <div className="form-group">
            <label>תיאור *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="תיאור המסיבה..."
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>עיר *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="תל אביב"
              />
            </div>

            <div className="form-group">
              <label>תאריך *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>טלפון</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0501234567"
              />
            </div>

            <div className="form-group">
              <label>קישור (אתר/רשומה)</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>תמונה</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {(formData.imageUrl || formData.imageFile) && (
              <div className="image-preview">
                <img
                  src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.imageUrl}
                  alt="preview"
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" disabled={uploading} className="btn-submit">
              {uploading ? 'שולח...' : 'שמור מסיבה'}
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
