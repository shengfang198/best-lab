import bcrypt from 'bcrypt';
import { supabase } from '../db.js';

class User {
  constructor(data) {
    this.userId = data.user_id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.roleId = data.role_id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .limit(1);

      if (error) throw error;
      return data && data.length > 0 ? new User(data[0]) : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .limit(1);

      if (error) throw error;
      return data && data.length > 0 ? new User(data[0]) : null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }

  // Find user by ID
  static async findById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .limit(1);

      if (error) throw error;
      return data && data.length > 0 ? new User(data[0]) : null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  // Check if user exists (by email or username)
  static async exists(email, username) {
    try {
      // Check email
      const { data: emailData, error: emailError } = await supabase
        .from('users')
        .select('user_id')
        .eq('email', email.toLowerCase())
        .limit(1);

      if (emailError) {
        console.error('Email check error:', emailError);
        throw emailError;
      }

      if (emailData && emailData.length > 0) return true;

      // Check username
      const { data: usernameData, error: usernameError } = await supabase
        .from('users')
        .select('user_id')
        .eq('username', username)
        .limit(1);

      if (usernameError) {
        console.error('Username check error:', usernameError);
        throw usernameError;
      }

      return usernameData && usernameData.length > 0;
    } catch (error) {
      console.error('Error checking if user exists:', error);
      throw error;
    }
  }

  // Create new user
  static async create(userData) {
    try {
      const { username, email, password, firstname, lastname } = userData;

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const { data, error } = await supabase
        .from('users')
        .insert({
          username,
          email: email.toLowerCase(),
          password: hashedPassword,
          role_id: 1,
          firstname,
          lastname
        })
        .select()
        .single();

      if (error) throw error;
      return new User(data);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user
  async update(updateData) {
    try {
      const { firstname, lastname, username } = updateData;

      const { data, error } = await supabase
        .from('users')
        .update({
          firstname,
          lastname,
          username,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', this.userId)
        .select()
        .single();

      if (error) throw error;
      // Update current instance
      Object.assign(this, data);
      return this;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Update last login
  async updateLastLogin() {
    try {
      const { error } = await supabase
        .from('users')
        .update({ updated_at: new Date().toISOString() })
        .eq('user_id', this.userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating last login:', error);
      throw error;
    }
  }

  // Verify password
  async verifyPassword(password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  }

  // Convert to public data (without password)
  toPublicData() {
    return {
      userId: this.userId,
      username: this.username,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      roleId: this.roleId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default User;
