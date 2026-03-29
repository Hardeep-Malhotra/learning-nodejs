const { Transform } = require('node:stream');

/**
 * 04_Transform_Streams.js
 * * Purpose: Demonstrates how a Transform Stream modifies data 
 * as it flows from a Readable source to a Writable destination.
 */

// 1. Initialize the Transform Stream
const upperCaseTr = new Transform({
  /**
   * The transform method is called for every 'chunk' of data.
   * @param {Buffer} chunk - The data being piped in.
   * @param {string} encoding - The encoding type (if string).
   * @param {Function} callback - Called when processing is done.
   */
  transform(chunk, encoding, callback) {
    // Process: Convert the binary chunk to a string and uppercase it
    const upperData = chunk.toString().toUpperCase();

    // Output: Pass the transformed data to the next stream
    // Syntax: callback(error, data)
    callback(null, upperData);
  }
});

console.log("🚀 Transform Stream Active!");
console.log("Type something in lowercase to see it converted to UPPERCASE:");

// 2. The Pipeline
// process.stdin (Readable) -> upperCaseTr (Transform) -> process.stdout (Writable)
process.stdin.pipe(upperCaseTr).pipe(process.stdout);