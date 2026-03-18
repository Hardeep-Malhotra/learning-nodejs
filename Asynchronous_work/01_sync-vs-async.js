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

// ------------------------------------------------
// 🔹 process.nextTick (Highest Priority)
// ------------------------------------------------
// nextTick runs before Promises in Node.js.

process.nextTick(() => {
  console.log("Next Tick");
});