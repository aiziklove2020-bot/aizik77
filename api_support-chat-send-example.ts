import { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * API Endpoint: /api/support-chat-send
 * 
 * POST /api/support-chat-send
 * 
 * Sends a message to the support chat via Telegram
 * 
 * Body:
 * {
 *   "name": "User Name",
 *   "email": "user@example.com",
 *   "message": "Help me with...",
 *   "phone": "+972..."  (optional)
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "messageId": "telegram_message_id"
 * }
 */

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message, phone } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, message',
      })
    }

    // Build Telegram message
    const telegramMessage = `
🆕 הודעה חדשה מטופס תמיכה

👤 שם: ${name}
📧 אימייל: ${email}
${phone ? `📱 טלפון: ${phone}` : ''}

💬 הודעה:
${message}

⏰ שעה: ${new Date().toLocaleString('he-IL')}
    `.trim()

    // Send to Telegram via Bot
    const botToken = process.env.SUPPORT_CHAT_TELEGRAM_BOT_TOKEN
    const chatId = process.env.SUPPORT_CHAT_TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('❌ Telegram config missing')
      return res.status(500).json({
        error: 'Server configuration error',
      })
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    })

    if (!telegramResponse.ok) {
      throw new Error(`Telegram API error: ${telegramResponse.statusText}`)
    }

    const telegramData = await telegramResponse.json()

    // Optional: Save to Firebase for record keeping
    // const admin = require('firebase-admin')
    // await admin.firestore().collection('supportChat').add({
    //   name,
    //   email,
    //   phone,
    //   message,
    //   telegramMessageId: telegramData.result.message_id,
    //   createdAt: new Date().toISOString(),
    // })

    return res.status(200).json({
      success: true,
      messageId: telegramData.result.message_id,
    })
  } catch (error) {
    console.error('❌ Error in support-chat-send:', error)
    return res.status(500).json({
      error: 'Failed to send message',
      details: error instanceof Error ? error.message : String(error),
    })
  }
}
