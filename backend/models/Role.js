import { query } from '../db.js';

class Role {
  constructor(data) {
    this.roleId = data.role_id;
    this.roleName = data.role_name;
    this.description = data.description;
  }

  // Find role by ID
  static async findById(roleId) {
    try {
      const result = await query(
        'SELECT role_id, role_name, description FROM roles WHERE role_id = $1',
        [roleId]
      );
      return result.rows.length > 0 ? new Role(result.rows[0]) : null;
    } catch (error) {
      console.error('Error finding role by ID:', error);
      throw error;
    }
  }

  // Find role by name
  static async findByName(roleName) {
    try {
      const result = await query(
        'SELECT role_id, role_name, description FROM roles WHERE role_name = $1',
        [roleName]
      );
      return result.rows.length > 0 ? new Role(result.rows[0]) : null;
    } catch (error) {
      console.error('Error finding role by name:', error);
      throw error;
    }
  }

  // Get all roles
  static async findAll() {
    try {
      const result = await query('SELECT role_id, role_name, description FROM roles ORDER BY role_id');
      return result.rows.map(row => new Role(row));
    } catch (error) {
      console.error('Error finding all roles:', error);
      throw error;
    }
  }

  // Create new role
  static async create(roleData) {
    try {
      const { roleName, description } = roleData;
      const result = await query(
        'INSERT INTO roles (role_name, description) VALUES ($1, $2) RETURNING role_id, role_name, description',
        [roleName, description]
      );
      return new Role(result.rows[0]);
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  // Update role
  async update(updateData) {
    try {
      const { roleName, description } = updateData;
      const result = await query(
        'UPDATE roles SET role_name = $1, description = $2 WHERE role_id = $3 RETURNING role_id, role_name, description',
        [roleName, description, this.roleId]
      );

      if (result.rows.length > 0) {
        Object.assign(this, result.rows[0]);
        return this;
      }

      return null;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  // Delete role
  async delete() {
    try {
      const result = await query('DELETE FROM roles WHERE role_id = $1', [this.roleId]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }
}

export default Role;
