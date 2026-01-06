import { supabase } from '../db.js';

class Role {
  constructor(data) {
    this.roleId = data.role_id;
    this.roleName = data.role_name;
    this.description = data.description;
  }

  // Find role by ID
  static async findById(roleId) {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('role_id, role_name, description')
        .eq('role_id', roleId)
        .limit(1);

      if (error) throw error;
      return data && data.length > 0 ? new Role(data[0]) : null;
    } catch (error) {
      console.error('Error finding role by ID:', error);
      throw error;
    }
  }

  // Find role by name
  static async findByName(roleName) {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('role_id, role_name, description')
        .eq('role_name', roleName)
        .limit(1);

      if (error) throw error;
      return data && data.length > 0 ? new Role(data[0]) : null;
    } catch (error) {
      console.error('Error finding role by name:', error);
      throw error;
    }
  }

  // Get all roles
  static async findAll() {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('role_id, role_name, description')
        .order('role_id');

      if (error) throw error;
      return data.map(row => new Role(row));
    } catch (error) {
      console.error('Error finding all roles:', error);
      throw error;
    }
  }

  // Create new role
  static async create(roleData) {
    try {
      const { roleName, description } = roleData;
      const { data, error } = await supabase
        .from('roles')
        .insert({
          role_name: roleName,
          description
        })
        .select()
        .single();

      if (error) throw error;
      return new Role(data);
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  // Update role
  async update(updateData) {
    try {
      const { roleName, description } = updateData;
      const { data, error } = await supabase
        .from('roles')
        .update({
          role_name: roleName,
          description
        })
        .eq('role_id', this.roleId)
        .select()
        .single();

      if (error) throw error;
      Object.assign(this, data);
      return this;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  // Delete role
  async delete() {
    try {
      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('role_id', this.roleId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }
}

export default Role;
