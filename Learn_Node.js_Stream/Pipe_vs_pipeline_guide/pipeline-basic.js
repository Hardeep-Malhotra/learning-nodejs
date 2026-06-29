/****************************************************************************************
 *                           Topic 4 : pipe() Error Handling
 ****************************************************************************************/

/**
 * Problem:
 * --------
 * What happens if the source file does NOT exist?
 *
 * Answer:
 * -------
 * The Readable Stream emits an "error" event.
 *
 * pipe() DOES NOT automatically handle stream errors.
 *
 * Therefore, we should always listen for the "error" event.
 *
 * Production Rule:
 * ----------------
 * Always handle errors from both
 * Readable Stream and Writable Stream.
 */

const fs = require("fs");

// Source file does NOT exist
const readStream = fs.createReadStream("does-not-exist.txt");

// Destination file
const writeStream = fs.createWriteStream("destination.txt");

/**
 * Connect Readable Stream with Writable Stream.
 */

readStream.pipe(writeStream);

/****************************************************************************************
 * Readable Stream Error
 ****************************************************************************************/

readStream.on("error", (err) => {
  console.log("❌ Read Stream Error");

  console.log(err.message);

  /**
   * Best Practice
   *
   * If the source stream fails,
   * destroy the destination stream
   * to release system resources.
   */

  writeStream.destroy();
});

/****************************************************************************************
 * Writable Stream Error
 ****************************************************************************************/

writeStream.on("error", (err) => {
  console.log("❌ Write Stream Error");

  console.log(err.message);
});

/****************************************************************************************
 * close Event
 ****************************************************************************************/

writeStream.on("close", () => {
  console.log("🔒 Writable Stream Closed");
});

/****************************************************************************************
 * destroyed Property
 ****************************************************************************************/

/**
 * destroyed
 *
 * Returns:
 *
 * true
 * -----
 * Stream has been destroyed.
 *
 * false
 * ------
 * Stream is still active.
 */

setTimeout(() => {
  console.log("Is Writable Stream Destroyed?");

  console.log(writeStream.destroyed);
}, 100);

/****************************************************************************************
 * Internal Flow
 ****************************************************************************************/

/**
 * File Not Found
 *        │
 *        ▼
 * Readable Stream
 *        │
 *        ▼
 * error Event
 *        │
 *        ▼
 * writeStream.destroy()
 *        │
 *        ▼
 * close Event
 */

/****************************************************************************************
 * Interview Questions
 ****************************************************************************************/

/**
 * Q1. Does pipe() automatically handle stream errors?
 *
 * Answer:
 * No.
 * We must manually listen for the "error" event.
 */

/**
 * Q2. What happens if the source file does not exist?
 *
 * Answer:
 * The Readable Stream emits an "error" event.
 */

/**
 * Q3. Why do we call writeStream.destroy()?
 *
 * Answer:
 * To release system resources and close
 * the Writable Stream when the Readable
 * Stream fails.
 */

/**
 * Q4. What does writeStream.destroyed return?
 *
 * true  -> Stream is destroyed.
 * false -> Stream is still active.
 */

/****************************************************************************************
 * Production Best Practice
 ****************************************************************************************/

/**
 * Always remember:
 *
 * ✔ Handle Readable Stream errors.
 * ✔ Handle Writable Stream errors.
 * ✔ Destroy the Writable Stream if the Readable Stream fails.
 * ✔ Never assume pipe() will handle errors automatically.
 */
