/**
 * 📚 TOPIC: THE NODE.JS EVENT LOOP (The Heart of Node.js)
 * -------------------------------------------------------
 * Order of Priority:
 * 1. Synchronous Code (Call Stack)
 * 2. process.nextTick() (Microtask - Highest Priority)
 * 3. Timers Phase (setTimeout)
 * 4. Poll Phase (I/O Callbacks like fs.readFile)
 * 5. Check Phase (setImmediate)
 */

const fs = require("node:fs");

console.log("------- 🏁 Script Start (Synchronous) -------");

// 1️⃣ Timers Phase: Executes after the specified threshold (0ms)
setTimeout(() => {
  console.log("⏰ 1. setTimeout (Timers Phase) - 0ms");
}, 0);

// 2️⃣ Check Phase: Executes immediately after the Poll phase
setImmediate(() => {
  console.log("✅ 2. setImmediate (Check Phase)");
});

// 3️⃣ Microtask: Not part of the loop, executes AFTER current operation but BEFORE next phase
process.nextTick(() => {
  console.log("🚀 3. process.nextTick (Microtask - Immediate Priority)");
});

// 4️⃣ Poll Phase: I/O operations (File Reading)
// Note: Inside an I/O callback, setImmediate ALWAYS runs before setTimeout
fs.readFile("Asynchronous_work/03_index.js", "utf8", () => {
  console.log("\n--- 📥 Inside I/O Callback (Poll Phase) ---");

  // Inside I/O, the Event Loop is in the Poll Phase.
  // Next phase is 'Check', so setImmediate will win the race here.
  setTimeout(() => console.log("⏰ 4. Internal setTimeout (Next Loop)"), 0);
  setImmediate(() => console.log("✅ 5. Internal setImmediate (Check Phase)"));
  process.nextTick(() =>
    console.log("🚀 6. Internal nextTick (VVIP Priority)"),
  );
});

console.log("------- 🏁 Script End (Synchronous) -------");

/**
 * 💡 EXECUTION FLOW EXPECTATION:
 * 1. Synchronous logs (Start & End)
 * 2. process.nextTick (Clears the microtask queue)
 * 3. setTimeout vs setImmediate (Race depends on OS performance)
 * 4. I/O Callback (Once file is read)
 * 5. Internal nextTick (Highest priority inside the callback)
 * 6. Internal setImmediate (Check phase follows Poll phase)
 * 7. Internal setTimeout (Runs in the next iteration of the loop)
 */
