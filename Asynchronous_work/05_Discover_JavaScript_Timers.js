/**
 * TOPIC: DISCOVER JAVASCRIPT TIMERS (Node.js)
 * -----------------------------------------
 * This file covers setTimeout, setInterval, setImmediate, and Recursive Patterns.
 */

// ==========================================
// 1. setTimeout() - Executes ONCE after delay
// ==========================================
// Syntax: setTimeout(callback, delay, param1, param2)

const pizzaDelivery = setTimeout(
  (time) => {
    console.log(`\n🍕 Pizza delivered successfully within ${time} seconds.`);
  },
  5000,
  5,
);

console.log("Timer for Pizza started...");

// Example with multiple parameters
const greetUser = (firstName, secondName) => {
  console.log(`Hello: ${firstName} ${secondName}`);
};
setTimeout(greetUser, 2000, "I am delay First", "I am delay Second");

// ==========================================
// 2. Zero Delay (Event Loop Concept)
// ==========================================
// setTimeout with 0ms delay doesn't run "instantly".
// It waits for the Synchronous code to finish first.

setTimeout(() => {
  console.log("⏱️ I am running SECOND (Asynchronous)");
}, 0);

console.log("🚀 I am running FIRST (Synchronous)");

// ==========================================
// 3. setInterval() & clearInterval()
// ==========================================
// Runs repeatedly until stopped.

let count = 0;
const myCounter = setInterval(() => {
  count++;

  console.clear(); // Clears terminal for a clean UI effect
  console.log("============================");
  console.log(`⏱️  Current Counter: ${count}`);
  console.log("============================");

  if (count === 10) {
    clearInterval(myCounter);
    console.log("✅ Counter Stopped at 10!");
  }
}, 1000);

// ==========================================
// 4. Real-World Logic: Polling Data
// ==========================================
let isDataLoaded = false;

const checker = setInterval(() => {
  if (isDataLoaded) {
    console.log("📦 Data fetched! Closing interval...");
    clearInterval(checker);
  } else {
    console.log("⏳ Fetching data, please wait...");
  }
}, 1000);

// Simulating a network delay of 3 seconds
setTimeout(() => {
  isDataLoaded = true;
}, 3000);

// ==========================================
// 5. Recursive setTimeout (The Pro Way)
// ==========================================
// Best practice for tasks that take varying time (like Network requests).
// It ensures Task B starts ONLY after Task A is finished.

let iteration = 0;
const heavyTask = () => {
  iteration++;
  console.log(`\n🚀 Task ${iteration} started...`);

  const workTime = Math.random() * 2000; // Simulating variable work time

  setTimeout(() => {
    console.log(`✅ Task ${iteration} finished in ${workTime.toFixed(0)}ms`);

    if (iteration < 5) {
      // Schedule the NEXT task only AFTER this one is done
      setTimeout(heavyTask, 1000);
    } else {
      console.log("🏁 All Recursive tasks completed!");
    }
  }, workTime);
};
setTimeout(heavyTask, 1000);

// ==========================================
// 6. setImmediate() & clearImmediate()
// ==========================================
// Runs after I/O events in the "Check" phase of the Event Loop.

console.log("\n1. START (Sync)");

const immediateID = setImmediate(() => {
  console.log("3. VIP Entry: setImmediate (After Sync code)");
});

// clearImmediate(immediateID); // Uncomment this to cancel the VIP entry

console.log("2. END (Sync)");
