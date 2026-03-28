
// FIEL : 01_Readable_Stream
/**
 * Topic: Efficiently Streaming Large Files in Express.js
 * Concepts: Readable Streams, Chunks, Buffering, and Writable Responses
 */

const fs = require("node:fs");
const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  // 1. Create a Readable Stream inside the request handler.
  // This ensures every user gets a fresh stream of the file.
  const fileReader = fs.createReadStream("./large_data.txt", {
    encoding: "utf-8",
    // highWaterMark defines the size of each 'chunk' (16KB here).
    // It prevents the server from loading the entire file into RAM.
    highWaterMark: 16 * 1024,
  });

  /**
   * 2. The 'data' Event:
   * This event is triggered every time a 16KB chunk is ready in the buffer.
   */
  fileReader.on("data", (chunk) => {
    console.log(
      `Sending a chunk of size: ${chunk.length} bytes to the browser...`,
    );

    // We use res.write() instead of res.send().
    // res.write() keeps the connection open for more data.
    const canContinue = res.write(chunk);

    // Logic for Backpressure:
    // If res.write() returns false, it means the client's network is slow.
    // We should pause reading to prevent memory overflow.
    if (!canContinue) {
      fileReader.pause();
      res.once("drain", () => {
        fileReader.resume();
      });
    }
  });

  /**
   * 3. The 'end' Event:
   * Triggered when the entire file has been read successfully.
   */
  fileReader.on("end", () => {
    console.log("File streaming completed successfully.");
    // res.end() tells the browser that no more data is coming.
    res.end("\n\n--- [END OF STREAM] ---");
  });

  /**
   * 4. The 'error' Event:
   * Handles scenarios like "File Not Found" or "Permission Denied".
   */
  fileReader.on("error", (err) => {
    console.error("Stream Error:", err.message);

    // Ensure we don't try to send headers twice if an error occurs mid-stream
    if (!res.headersSent) {
      res.status(500).send("Internal Server Error: Could not process file.");
    } else {
      res.end();
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log(
    `Keep the Network Tab open to see the 'Transfer-Encoding: chunked' header.`,
  );
});
