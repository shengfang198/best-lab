import { createClient } from '@supabase/supabase-js';

/* eslint-disable no-undef */
// Supabase configuration from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
/* eslint-enable no-undef */

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Test database connection
const testConnection = async () => {
  try {
    const { error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }

    console.log('✅ Database connected successfully');
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    return false;
  }
};

// Query helper function - wrapper around Supabase client
const query = async (table, options = {}) => {
  const start = Date.now();

  try {
    // Build query using Supabase fluent API
    let query = supabase.from(table);

    // Apply filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    // Apply single filter (for backward compatibility)
    if (options.filterKey && options.filterValue) {
      query = query.eq(options.filterKey, options.filterValue);
    }

    // Apply ordering
    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending !== false
      });
    }

    // Apply limit
    if (options.limit) {
      query = query.limit(options.limit);
    }

    // Execute query
    let result;
    if (options.method === 'insert') {
      result = await query.insert(options.data).select(options.select || '*');
    } else if (options.method === 'update') {
      result = await query.update(options.data).select(options.select || '*');
    } else if (options.method === 'delete') {
      result = await query.delete();
    } else {
      result = await query.select(options.select || '*');
    }

    const duration = Date.now() - start;
    console.log('📊 Query executed in', duration, 'ms:', table, options.method || 'select');

    if (result.error) {
      throw result.error;
    }

    // Return format similar to pg pool for compatibility
    return {
      rows: result.data || [],
      rowCount: result.data?.length || 0
    };

  } catch (err) {
    const duration = Date.now() - start;
    console.error('❌ Query failed after', duration, 'ms:', table, err);
    throw err;
  }
};

// Close database connection (not needed for Supabase, but keep for compatibility)
const close = async () => {
  console.log('🔄 Supabase connection cleanup completed');
};

export { supabase, query, testConnection, close };
export default supabase;
