#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

async function main(dbUrl) {
  console.log("🌱 Checking database...");
  const client = new Client({
    connectionString: dbUrl,
  });

  try {
    await client.connect();

    // Check if messages table exists and has data
    const { rows } = await client.query("SELECT COUNT(*) FROM messages");

    if (rows[0].count > 0) {
      console.log("✅ Database already populated, skipping seed");
      return;
    }

    // If no data exists, run the seed
    const SQL = `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      text VARCHAR (255),
      username VARCHAR (255),
      added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO messages (text, username) 
    VALUES
      ('Hi there!', 'Amando'),
      ('Hello World!', 'Charles'),
      ('Check out my Github', 'SReddy-96');
    `;

    await client.query(SQL);
    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    throw err;
  } finally {
    await client.end();
  }
}

const dbUrl = process.argv[2];
if (!dbUrl) {
  console.error("Please provide a database URL");
  process.exit(1);
}

main(dbUrl).catch((err) => {
  console.error(err);
  process.exit(1);
});
