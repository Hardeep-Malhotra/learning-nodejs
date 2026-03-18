// ============================================
// 📘 Event Loop Demonstration
// File: event-loop-demo.js
// ============================================

// ------------------------------------------------
// 🔹 Synchronous Code
// ------------------------------------------------
// Synchronous code executes line by line.
// Each statement waits for the previous one to finish.

console.log("Learn");

// ------------------------------------------------
// 🔹 Asynchronous Code (setTimeout)
// ------------------------------------------------
// setTimeout is a Web API / Node Timer API.
// It is handled by the Node.js runtime and executed
// after the current call stack is empty.

setTimeout(() => {
  console.log("Build");
}, 0); // 0 ms still goes to the callback queue

// ------------------------------------------------
// 🔹 Another Synchronous Statement
// ------------------------------------------------

console.log("Success");

// ------------------------------------------------
// 🔹 Microtask Example (Promise)
// ------------------------------------------------
// Promises go to the Microtask Queue.
// Microtasks run BEFORE the Macrotask Queue (setTimeout).

Promise.resolve().then(() => {
  console.log("Promise Microtask");
});


/**
 * 🚀 TOPIC: Understanding process.nextTick()
 * -----------------------------------------
 * Concept: "Tick" ka matlab hai jab JS engine ek operation khatam karke agle par jata hai.
 * process.nextTick() -> Ye loop ke agle phase par jane se PEHLE hi execute ho jata hai.
 */

console.log("--- 🏁 Start of Script ---");

// 1. setTimeout (Minimum 0ms delay)
setTimeout(() => {
    console.log("⏰ setTimeout: Agle 'Tick' ke end mein chalunga.");
}, 0);

// 2. process.nextTick (Emergency Priority)
process.nextTick(() => {
    console.log("🚀 process.nextTick: Sabse pehle main! (Before next phase)");
});

// 3. Normal Synchronous Task
console.log("📝 Normal Task: Main toh line-by-line chalta hoon.");

/**
 * 🤔 LOGIC KYA HAI?
 * nextTick() engine ko bolta hai: "Bhai, current kaam khatam hote hi, 
 * aur loop ke agle phase par jane se PEHLE, mera ye kaam nipta dena."
 */

console.log("--- 🏁 End of Script ---");