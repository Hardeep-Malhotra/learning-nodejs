/**
 * 🚀 NODE.JS PROMISES & ASYNC GUIDE
 * Topic: Promises, Async/Await, Advanced Methods, and Event Loop
 */

const { setTimeout: delay } = require("node:timers/promises");

// ==========================================
// 1. BASIC PROMISE CREATION
// ==========================================
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("✅ Request Successfully received.");
  } else {
    reject("❌ Request rejected while sending!");
  }
});

// Implementation of basic promise
/*
myPromise
  .then((message) => console.log(message))
  .catch((error) => console.log(error))
  .finally(() => console.log("Final: Code Execution Finished."));
*/

// ==========================================
// 2. ASYNC / AWAIT (Modern Syntax)
// ==========================================
const ZomatoPromise = new Promise((resolve, reject) => {
  const isPizzaReady = true;
  if (isPizzaReady) {
    resolve("🍕 Pizza is ready for delivery!");
  } else {
    reject("⏳ Waiting for pizza...");
  }
});

async function orderPizza() {
  try {
    const status = await ZomatoPromise;
    console.log("Async/Await:", status);
  } catch (error) {
    console.log("Error:", error);
  }
}
// orderPizza();

// ==========================================
// 3. PROMISE CHAINING
// ==========================================
function runChaining() {
  delay(1000)
    .then(() => {
      console.log("Step 1: First Task Completed...");
      return delay(1000); // Returning next promise
    })
    .then(() => {
      console.log("Step 2: Second Task Completed...");
    })
    .catch((error) => console.log("Chain Error:", error));
}

// ==========================================
// 4. ADVANCED PROMISE METHODS
// ==========================================

// --- Promise.all() ---
// (Wait for ALL to succeed. Short-circuits if any fails)
const fetchData1 = delay(1000).then(() => "Data From API 1");
const fetchData2 = delay(2000).then(() => "Data From API 2");

// Promise.all([fetchData1, fetchData2]).then(console.log);

// --- Promise.allSettled() ---
// (Waits for all to finish, regardless of success or failure)
const p1 = Promise.resolve("Success ✅");
const p2 = Promise.reject("Fail ❌");

// Promise.allSettled([p1, p2]).then((results) => console.log("All Settled:", results));

// --- Promise.race() ---
// (The first one to settle wins - whether success or error)
const fetching = delay(3000).then(() => "Data Fetched");
const timeout = delay(2000).then(() => {
  throw new Error("Timeout! ⏱️");
});

// Promise.race([fetching, timeout]).catch((err) => console.log("Race Result:", err.message));

// --- Promise.any() ---
// (The first SUCCESS wins. Ignores errors unless all fail)
const apiA = delay(1500).then(() => "API A wins");
const apiB = delay(1000).then(() => "API B wins");

// Promise.any([apiA, apiB]).then((data) => console.log("Any Result:", data));

// --- Promise.try() ---
// (Wraps sync/async code safely into a promise)
const mightCrash = () => {
  throw new Error("Something Went Wrong synchronously!");
};

/*
Promise.try(mightCrash)
  .then((res) => console.log(res))
  .catch((err) => console.log("Caught by Promise.try:", err.message));
*/

// ==========================================
// 5. EVENT LOOP SCHEDULING (Microtasks)
// ==========================================

console.log("--- Event Loop Sequence Start ---");

console.log("1. Main Sync Code (Pehle)");

setTimeout(() => {
  console.log("4. Timeout (Sabse Baad - MacroTask)");
}, 0);

queueMicrotask(() => {
  console.log("3. Microtask (VIP Entry - Promise level)");
});

console.log("2. Main Sync Code (Doosra)");

/**
 * Expected Output Order:
 * 1. Main Sync Code
 * 2. Main Sync Code (Doosra)
 * 3. Microtask (VIP)
 * 4. Timeout
 */
