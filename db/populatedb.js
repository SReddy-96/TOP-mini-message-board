#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

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

const dbUrl = process.argv[2]; // e.g., postgresql://user:pass@host:port/dbname

if (!dbUrl) {
  console.error("❌ Please provide a database URL as an argument.");
  process.exit(1);
}

async function main() {
  console.log("🌱 Seeding database...");

  const client = new Client({
    connectionString: dbUrl, // use passed URL here
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("✅ Done seeding.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.end();
  }
}

main();
