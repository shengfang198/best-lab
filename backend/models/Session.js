import { query } from '../db.js';

class Session {
  constructor(data) {
    this.sessionId = data.session_id;
    this.userId = data.user_id;
    this.token = data.token;
    this.createdAt = data.created_at;
    this.expiresAt = data.expires_at;
  }

  // Create new session
  static async create(userId, token, expiresAt) {
    try {
      const result = await query('sessions', {
        method: 'insert',
        data: {
          user_id: userId,
          token,
          expires_at: expiresAt
        }
      });
      return new Session(result.rows[0]);
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  // Find valid session by token
  static async findValidByToken(token) {
    try {
      // For Supabase, we need to handle the timestamp comparison differently
      // Get current timestamp and filter on client side
      const now = new Date().toISOString();
      const result = await query('sessions', {
        filters: { token }
      });

      // Filter expired sessions on client side
      const validSessions = result.rows.filter(session =>
        new Date(session.expires_at) > new Date(now)
      );

      return validSessions.length > 0 ? new Session(validSessions[0]) : null;
    } catch (error) {
      console.error('Error finding session by token:', error);
      throw error;
    }
  }

  // Delete session by token
  static async deleteByToken(token) {
    try {
      const result = await query('sessions', {
        method: 'delete',
        filters: { token }
      });
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  }

  // Delete expired sessions (for Supabase, this would need to be handled differently)
  static async deleteExpired() {
    try {
      // For Supabase, we could implement this by fetching expired sessions and deleting them individually
      // For now, return 0 as this is not implemented
      console.log('Delete expired sessions not implemented for Supabase');
      return 0;
    } catch (error) {
      console.error('Error deleting expired sessions:', error);
      throw error;
    }
  }

  // Check if session is expired
  isExpired() {
    return new Date() > new Date(this.expiresAt);
  }
}

export default Session;
