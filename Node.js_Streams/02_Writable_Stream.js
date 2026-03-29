// FILE: 02_Writable_Stream.js

/**
 * Topic: Writable Stream in Node.js
 * Concepts: Writing data, finish event, error handling
 */

const fs = require("node:fs");

// Create Writable Stream
const writer = fs.createWriteStream("output.txt", {
  encoding: "utf-8",
});

// Write data in chunks
writer.write("Hello Hardeep!\n");
writer.write("Learning Writable Streams...\n");

// End stream
writer.end("Stream ended successfully!");

// Finish event
writer.on("finish", () => {
  console.log("✅ Writing completed successfully.");
});

// Error handling
writer.on("error", (err) => {
  console.error("❌ Error:", err.message);
});
