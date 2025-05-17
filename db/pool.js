const { Pool } = require("pg");

const SECRET = process.env;

const pool = new Pool({
  host: SECRET.HOST,
  user: SECRET.USER,
  database: SECRET.DATABASE,
  password: SECRET.DATABASE_PASSWORD,
  port: 5432,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
});

// Error handling for the pool
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Test connection function
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
    return true;
  } catch (err) {
    console.error('Database connection error:', err.message);
    return false;
  }
}

// Test connection on startup
testConnection();

module.exports = { pool };
