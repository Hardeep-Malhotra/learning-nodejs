const fs = require("fs");

/**
 * fs.createReadStream(path, options)
 */

const readStream = fs.createReadStream("Learn_Node.js_Stream/data.txt", {
  // Path automatically first argument me diya gaya hai

  flags: "r", // File ko Read Mode me open karega

  encoding: "utf8", // Buffer ko String me convert karega

  fd: null, // Node.js khud File Descriptor create karega

  mode: 0o666, // File permission (Mostly ignored in ReadStream)

  autoClose: true, // Reading complete hone ke baad file automatically close hogi

  emitClose: true, // Close hone ke baad 'close' event emit hoga

  start: 0, // File kaha se read karni start hogi (Byte Position)

  end: 100, // Sirf byte 0 se 100 tak read karega

  highWaterMark: 20, // Har baar 20 bytes ka chunk read karega
});

let chunkCount = 0;

/**
 * Fired for every chunk
 */
readStream.on("data", (chunk) => {
  chunkCount++;

  console.log(`\nChunk ${chunkCount}`);
  console.log("--------------------");
  console.log(chunk);
});

/**
 * Fired once when reading is completed
 */
readStream.on("end", () => {
  console.log("\n✅ File Reading Completed");
});

/**
 * Fired if any error occurs
 */
readStream.on("error", (err) => {
  console.log("❌ Error:", err.message);
});

/**
 * Fired when file is opened
 */
readStream.on("open", (fd) => {
  console.log("📂 File Opened");
  console.log("File Descriptor:", fd);
});

/**
 * Fired when stream is ready
 */
readStream.on("ready", () => {
  console.log("🚀 Stream is Ready");
});

/**
 * Fired when file descriptor is closed
 */
readStream.on("close", () => {
  console.log("🔒 File Closed");
});
