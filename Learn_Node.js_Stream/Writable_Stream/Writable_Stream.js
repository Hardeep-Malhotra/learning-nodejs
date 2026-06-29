/****************************************************************************************
 *                    Node.js Writable Stream - Complete Notes
 *                        Beginner → Advanced → Production
 *
 * Author : Hardeep Singh
 * Notes  : ChatGPT
 ****************************************************************************************/

const fs = require("fs");

/****************************************************************************************
 * 📌 Topic 1: What is a Writable Stream?
 ****************************************************************************************/

/**
 * Definition:
 * ----------
 * A Writable Stream is used to write data to a destination
 * (such as a file, network socket, or HTTP response)
 * in small chunks instead of writing everything at once.
 *
 * Real Life Example:
 * ------------------
 * Imagine filling a water tank using a bucket.
 *
 * Bucket
 *   ↓
 * Tank
 *   ↓
 * Bucket
 *   ↓
 * Tank
 *
 * Data is also written chunk by chunk.
 */

/****************************************************************************************
 * 📌 Creating a Writable Stream
 ****************************************************************************************/

const writeStream = fs.createWriteStream("./output.txt", {
  encoding: "utf8",
});

/**
 * createWriteStream()
 *
 * Creates a Writable Stream object.
 *
 * It DOES NOT immediately write data.
 *
 * It only creates a stream that is ready to write.
 */

/****************************************************************************************
 * 📌 Topic 2: write() Method
 ****************************************************************************************/

/**
 * write()
 *
 * Used to write data into the stream.
 *
 * Syntax:
 *
 * stream.write(data);
 */

writeStream.write("Hello Bro!\n");
writeStream.write("Welcome to Node.js Streams.\n");
writeStream.write("Learning Writable Stream.\n");

/**
 * Output (output.txt)
 *
 * Hello Bro!
 * Welcome to Node.js Streams.
 * Learning Writable Stream.
 */

/****************************************************************************************
 * 📌 Topic 3: end() Method
 ****************************************************************************************/

/**
 * end()
 *
 * Tells Node.js that
 * no more data will be written.
 *
 * Always call end()
 * after writing data.
 */

writeStream.end();

/****************************************************************************************
 * 📌 Topic 4: finish Event
 ****************************************************************************************/

/**
 * finish Event
 *
 * Fired AFTER all data has been successfully
 * written into the destination.
 *
 * Important:
 *
 * finish DOES NOT mean
 * file is closed.
 *
 * It only means
 * writing has completed.
 */

writeStream.on("finish", () => {
  console.log("✅ FINISH EVENT");
  console.log("All data has been written successfully.");
});

/****************************************************************************************
 * 📌 Topic 5: close Event
 ****************************************************************************************/

/**
 * close Event
 *
 * Fired when
 * File Descriptor (FD)
 * has been closed.
 *
 * After this event,
 * the stream cannot be used anymore.
 */

writeStream.on("close", () => {
  console.log("🔒 CLOSE EVENT");
  console.log("File has been closed.");
});

/****************************************************************************************
 * 📌 Topic 6: error Event
 ****************************************************************************************/

/**
 * error Event
 *
 * Fired when an error occurs.
 *
 * Examples:
 *
 * ✔ Invalid Path
 * ✔ Permission Denied
 * ✔ Disk Failure
 *
 * Production Rule:
 *
 * Always handle error events.
 */

writeStream.on("error", (err) => {
  console.log("❌ ERROR EVENT");
  console.log(err.message);
});

/****************************************************************************************
 * 📌 Execution Flow
 ****************************************************************************************/

/**
 * createWriteStream()
 *        │
 *        ▼
 * write()
 *        │
 *        ▼
 * write()
 *        │
 *        ▼
 * write()
 *        │
 *        ▼
 * end()
 *        │
 *        ▼
 * finish Event
 *        │
 *        ▼
 * close Event
 */

/****************************************************************************************
 * 📌 Interview Notes
 ****************************************************************************************/

/**
 * Q1. What is Writable Stream?
 *
 * A Writable Stream writes data
 * to a destination chunk by chunk.
 */

/**
 * Q2. Which method writes data?
 *
 * write()
 */

/**
 * Q3. Which method ends the stream?
 *
 * end()
 */

/**
 * Q4. Difference between finish and close?
 *
 * finish
 * ------
 * Writing completed.
 *
 * close
 * -----
 * File Descriptor closed.
 */

/**
 * Q5. Why use Writable Streams?
 *
 * ✔ Low Memory Usage
 * ✔ Large File Writing
 * ✔ Better Performance
 * ✔ Production Ready
 */
