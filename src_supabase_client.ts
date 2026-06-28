import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase not configured - chat may not work')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Helper to get authenticated Supabase client
export async function getAuthenticatedSupabaseClient() {
  // If using custom JWT from your server
  const token = localStorage.getItem('supabase_jwt')
  
  if (token) {
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: '',
    })
  }

  return supabase
}

// Helper for RLS (Row Level Security) queries
export const supabaseQueries = {
  // Get user's chat messages
  async getUserMessages(userId: string) {
    return supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  // Get chat room details
  async getChatRoom(roomId: string) {
    return supabase
      .from('chat_rooms')
      .select('*')
      .eq('id', roomId)
      .single()
  },

  // Send message (RLS will ensure user_id matches)
  async sendMessage(
    roomId: string,
    userId: string,
    content: string,
    metadata?: Record<string, any>
  ) {
    return supabase
      .from('chat_messages')
      .insert({
        room_id: roomId,
        user_id: userId,
        content,
        metadata,
      })
      .select()
      .single()
  },

  // Report message
  async reportMessage(messageId: string, reason: string) {
    return supabase
      .from('chat_message_reports')
      .insert({
        message_id: messageId,
        reason,
      })
  },
}
