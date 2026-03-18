/**
 * 📚 TOPIC: BLOCKING vs NON-BLOCKING I/O
 * ---------------------------------------
 * 🛑 Blocking: Sequential execution. Programs stops until task finishes.
 * ⚡ Non-Blocking: Concurrent execution. Program continues; task runs in background.
 */

const fs = require("node:fs");
const path = "Asynchronous_work/03_index.js";

// ==========================================
// 🛑 OPTION 1: BLOCKING (Synchronous)
// Use Case: App Startup, Loading Configs/Keys
// ==========================================

console.log("-----------------------------------------");
console.log("1️⃣ [BLOCKING] Starting Configuration Setup...");

try {
  // readFileSync blocks the main thread here
  const apiKey = fs.readFileSync(path, "UTF-8");

  console.log(`✅ [BLOCKING] Data Fetched successfully.`);
  console.log(`API Data Preview: ${apiKey.substring(0, 50)}...`);
} catch (err) {
  console.error(`❌ [BLOCKING] Error fetching data: ${err.message}`);
  process.exit(1); // Kill process if critical config fails
}

console.log("3️⃣ [BLOCKING] Setup Complete. Main app is starting now.");
console.log("-----------------------------------------");

// ==========================================================
// ⚡ OPTION 2: NON-BLOCKING (Asynchronous)
// Use Case: Web Servers, High Performance APIs, File Uploads
// ==========================================================

console.log("-----------------------------------------");
console.log("🚀 [NON-BLOCKING] Request received to read data...");

// readFile offloads the task to Libuv and moves to the next line immediately
fs.readFile(path, "UTF-8", (err, data) => {
  if (err) {
    console.error(`❌ [NON-BLOCKING] Error: ${err.message}`);
    return;
  }

  console.log("\n📖 [NON-BLOCKING] Background Task Finished!");
  console.log(
    `📄 [NON-BLOCKING] Data Received (Size: ${data.length} characters)`,
  );
});

// This runs BEFORE the file is finished reading
console.log("✅ [NON-BLOCKING] Main thread is FREE! Handling other users...");

function handleOtherTask() {
  console.log("⚡ [NON-BLOCKING] Serving another request... No waiting time!");
}

handleOtherTask();
console.log("-----------------------------------------");
