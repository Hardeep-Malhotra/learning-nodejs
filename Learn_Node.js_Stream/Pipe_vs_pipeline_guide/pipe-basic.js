```javascript
const fs = require("fs");

/****************************************************************************************
 *                           Node.js pipe() - Complete Notes
 ****************************************************************************************/

/****************************************************************************************
 * 📌 Topic 1: What is pipe()?
 ****************************************************************************************/

/**
 * Definition:
 * ----------
 * pipe() is a method that connects a Readable Stream
 * directly to a Writable Stream.
 *
 * It automatically transfers data from source to destination.
 *
 * Syntax:
 *
 * readableStream.pipe(writableStream);
 *
 * Benefits:
 * ---------
 * ✔ No need to manually read chunks.
 * ✔ No need to manually write chunks.
 * ✔ Handles Backpressure automatically.
 * ✔ Faster and Memory Efficient.
 */


/****************************************************************************************
 * 📌 Topic 2: Basic pipe() Example
 ****************************************************************************************/

// Create a source file
// fs.writeFileSync(
//   "source.txt",
//   "Hello, this is the source file content!"
// );

// Create Streams
// const readStream = fs.createReadStream("source.txt");
// const writeStream = fs.createWriteStream("destination.txt");

// Connect both streams
// readStream.pipe(writeStream);

// Fired after writing is completed
// writeStream.on("finish", () => {
//   console.log("✅ File copied successfully.");
//
//   console.log(
//     "Destination File Content:\n",
//     fs.readFileSync("destination.txt", "utf8")
//   );
// });

/*
Internal Working

source.txt

      │

      ▼

Readable Stream

      │

      ▼

pipe()

      │

      ▼

Writable Stream

      │

      ▼

destination.txt

*/


/****************************************************************************************
 * 📌 Topic 3: pipe() Error Problem
 ****************************************************************************************/

/*
Suppose the source file does NOT exist.

Question:

Will pipe() automatically handle the error?

Answer:

❌ No.

pipe() automatically transfers data,
but it does NOT automatically handle
stream errors.

You must always listen for the error event.
*/


// Source file does NOT exist
const readStream = fs.createReadStream("does-not-exist.txt");

// Destination file
const writeStream = fs.createWriteStream("destination.txt");

// Connect Streams
readStream.pipe(writeStream);


/****************************************************************************************
 * 📌 Readable Stream Error
 ****************************************************************************************/

readStream.on("error", (err) => {

  console.log("❌ Read Error");

  console.log(err.message);

});


/****************************************************************************************
 * 📌 Check Writable Stream Status
 ****************************************************************************************/

/*
destroyed

Returns:

true  -> Stream has been destroyed.

false -> Stream is still alive.
*/

setTimeout(() => {

  console.log("Writable Stream Destroyed :", writeStream.destroyed);

}, 100);


/****************************************************************************************
 * 📌 Interview Notes
 ****************************************************************************************/

/**
 * Q1. What is pipe()?
 *
 * pipe() connects a Readable Stream
 * directly to a Writable Stream.
 */


/**
 * Q2. Why should we use pipe()?
 *
 * ✔ Cleaner Code
 * ✔ Less Memory Usage
 * ✔ Better Performance
 * ✔ Automatic Backpressure Handling
 */


/**
 * Q3. Does pipe() automatically handle errors?
 *
 * ❌ No.
 *
 * You should always listen for the
 * 'error' event.
 */


/**
 * Q4. What happens if the source file doesn't exist?
 *
 * Readable Stream emits an error.
 *
 * The Writable Stream may remain open
 * until it is destroyed or closed.
 */


/**
 * Q5. What is writeStream.destroyed?
 *
 * It returns a boolean value.
 *
 * true
 * ----
 * Stream is destroyed.
 *
 * false
 * -----
 * Stream is still active.
 */


/****************************************************************************************
 * 📌 Production Best Practice
 ****************************************************************************************/

/*
Always handle errors from BOTH streams.

Example:

readStream.on("error", ...);

writeStream.on("error", ...);

Never assume pipe() will handle errors automatically.
*/


/****************************************************************************************
 * 📌 One-Line Interview Definition
 ****************************************************************************************/

/*
pipe() is a method that connects a Readable Stream
to a Writable Stream and automatically transfers data
while efficiently handling the flow of data.
*/
```;
