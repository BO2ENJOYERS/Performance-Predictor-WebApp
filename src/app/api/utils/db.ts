import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

let client: Client;

export async function dbConnection() {
  try {
    if (!client) {
      const connectionString = process.env.DATABASE_URL; // PostgreSQL connection string

      // Check if DATABASE_URL is provided in environment variables
      if (!connectionString) {
        throw new Error('DATABASE_URL is not set in environment variables');
      }

      // Initialize the client
      client = new Client({
        connectionString: connectionString,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false // SSL for production
      });

      // Connect to the database
      await client.connect();
      console.log('Database connection successful!');
    }
    return client; // Return the client
  } catch (err) {
    console.error('Database connection failed!', err);
    throw err; // Rethrow the error for further handling
  }
}
