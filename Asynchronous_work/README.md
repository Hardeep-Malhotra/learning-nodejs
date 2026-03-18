# 🚀 Asynchronous Flow Control in JavaScript

_This guide explains how JavaScript handles heavy tasks without freezing, comparing it with traditional languages and demonstrating practical patterns._

---

## 1. Why JavaScript is Different?

In traditional programming languages, operations are **Synchronous** by default. When a heavy task occurs, they handle it differently than JavaScript.

### Traditional Languages (C, Java, Python, PHP, Ruby)

- **Strategy:** They use **Multi-threading** or spawning new processes.
- **How it works:** For every new request or heavy task, the system creates a new "Thread" (a sub-process).
- **The Problem:** Each thread consumes memory. If you have thousands of tasks, the server might run out of RAM.

### JavaScript (Node.js)

- **Strategy:** **Single-threaded, Non-blocking Event Loop**.
- **How it works:** JS has only one main thread. Instead of waiting for a file to read, it hands the task to the **System/Web API** and moves to the next line.
- **The Benefit:** It can handle thousands of concurrent connections with very little memory.

---

## 2. The Event Loop "Magic"

Even if you set a timeout to `0ms`, it will always run after the synchronous code. This is the core of Asynchronous flow.

```js
console.log("1. High Priority (Sync)");

setTimeout(() => {
    console.log("3. Low Priority (Async Task)");
}, 0);

console.log("2. High Priority (Sync)");
Output Order: 1 -> 2 -> 3
```

**3. Practical Patterns for Flow Control**
A. Series Execution (One-by-One)
Use this when Task B needs data from Task A. We use recursion to ensure order.

```js
const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "images");

fs.readdir(folder, (err, files) => {
  const images = files.filter((f) => f.endsWith(".jpg"));

  function processSeries(index) {
    if (index >= images.length) return console.log("All processed!");

    fs.readFile(path.join(folder, images[index]), (err, data) => {
      console.log(`Read: ${images[index]}`);
      // Trigger next only after current is finished
      processSeries(index + 1);
    });
  }
  processSeries(0);
});
```

**B. Parallel Execution (All at once)**
Use this when tasks are independent (e.g., sending multiple emails). It is much faster but uses more resources at once.

**C. Limited Series (Batching)**
A mix of both. Useful for processing 1 million records in batches of 100 to prevent system crashes.

**4. State Management & Anti-patterns**
State Dependency: Happens when a function relies on external data.

Passing Directly: Always pass variables into functions to maintain "State".

**Global Variables ❌:** Avoid them in Async code. Because tasks finish at different times, global variables can lead to unpredictable bugs.

### 📊 Comparison Summary Table

| Feature        | Synchronous (Java/Python/PHP)                          | Asynchronous JS (Node.js)                                |
| :------------- | :----------------------------------------------------- | :------------------------------------------------------- |
| **Threading**  | **Multi-threaded**: Spawns a new thread for each task. | **Single-threaded**: Uses an Event Loop for all tasks.   |
| **Efficiency** | **High RAM Usage**: Each thread consumes memory.       | **Low RAM Usage**: Very efficient with system resources. |
| **Blocking**   | **Blocking**: Thread stops until the task is finished. | **Non-blocking**: Tasks are handled in the background.   |
| **Complexity** | **Thread Safety**: Hard to manage locking/unlocking.   | **Flow Control**: Managing Callbacks or Promises.        |
| **Best For**   | Heavy CPU tasks (Image/Video processing).              | High I/O tasks (Chat apps, APIs, Streaming).             |

---

# 🚀 Node.js Promises & Asynchronous Programming Guide

**A comprehensive guide to mastering Asynchronous JavaScript in Node.js, covering everything from basic Promises to advanced Event Loop scheduling.**

---

## 📑 Table of Contents

- [What is a Promise?](#-what-is-a-promise)
- [Promise States](#-promise-states)
- [Basic Usage (.then, .catch)](#-basic-usage)
- [Modern Async/Await](#-asyncawait)
- [Advanced Promise Methods](#-advanced-promise-methods)
- [Event Loop Scheduling](#-event-loop-scheduling)

---

## 💡 What is a Promise?

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It acts as a placeholder for a value that is not yet available.

---

## 🚦 Promise States

Every Promise exists in one of these three states:

| State         | Description                                    |
| :------------ | :--------------------------------------------- |
| **Pending**   | Initial state, operation is still in progress. |
| **Fulfilled** | Operation completed successfully.              |
| **Rejected**  | Operation failed with an error.                |

---

## 🛠 Basic Usage

You can create a promise using the `new Promise()` constructor and handle it using `.then()` and `.catch()`.

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("✅ Operation Successful!");
  } else {
    reject("❌ Operation Failed!");
  }
});

myPromise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log("Cleanup: Execution Finished."));
```

---

# ⚡ Async/Await

_Introduced in ES6, async/await allows you to write asynchronous code that looks and behaves like synchronous code, making it much easier to read._

```JavaScript
async function handleTask() {
  try {
    const data = await myPromise;
    console.log(data);
  } catch (err) {
    console.error("Caught Error:", err);
  }
}
```

---

# 🧪 Advanced Promise Methods Comparison

| Method                     | Behavior                                                                             | Use Case                                                                                      |
| :------------------------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **`Promise.all()`**        | Waits for **all** promises to fulfill. If **any** one fails, it rejects immediately. | When you need all data to be successful before proceeding (e.g., loading a dashboard).        |
| **`Promise.allSettled()`** | Waits for **all** promises to finish, whether they succeed or fail.                  | When you want the result/status of every task, regardless of failure (e.g., bulk email logs). |
| **`Promise.race()`**       | Returns the result of the **first** promise to settle (either success or failure).   | Useful for implementing timeouts (e.g., stopping a request if it takes too long).             |
| **`Promise.any()`**        | Returns the **first successful** promise. Rejects only if **all** fail.              | When you need the fastest successful response from multiple redundant servers.                |
| **`Promise.try()`**        | Wraps a function (sync or async) into a promise to catch errors consistently.        | To handle both synchronous and asynchronous errors in a single `.catch()` block.              |

---

# ⏳ Event Loop Scheduling

Node.js provides various mechanisms to schedule tasks. Understanding their priority is key to writing efficient code:

`process.nextTick():` Executes immediately after the current operation, before the next event loop phase.

`queueMicrotask():` Specifically for microtasks (like Promises). Runs before I/O and timers.

`setImmediate():` Schedules a script to run in the "Check" phase of the event loop.

`setTimeout(fn, 0):` Schedules a task to run after a minimum delay of 0ms.

---

# 🏁 Execution Priority Order:

Synchronous Code (Highest Priority)

`process.nextTick()`

`queueMicrotask() / Promises`

`Timers (setTimeout) / setImmediate`

## 🚀 Environment Requirements

Node.js v22.0.0+ is recommended to support the latest methods like Promise.try() and Promise.withResolvers().

---

# ⏲️ Discover JavaScript Timers (Node.js)

## **Timers are essential for scheduling code execution in the future. In Node.js, timers are global functions, meaning you don't need to require('timers') to use them.**

## 📌 Table of Contents

`setTimeout()`

`setInterval()`

## `setImmediate()`

### \***\*Recursive setTimeout vs setInterval\*\***

---

**Clear Methods**

**`1. setTimeout()`**
Used to execute a function once after a specific delay (in milliseconds).

```JavaScript
const timer = setTimeout((param) => {
console.log(`Executed after 2s with param: ${param}`);
}, 2000, "Pizza 🍕");
Zero Delay: setTimeout(() => {}, 0)
```

does not run immediately. It is queued to run after the current synchronous code finishes.

**`2. setInterval()`**
Used to execute a function repeatedly at every fixed time interval.

```JavaScript
let count = 0;
const interval = setInterval(() => {
count++;
console.log(`Interval Count: ${count}`);
if (count === 5) clearInterval(interval);
}, 1000);
```

**` 3. setImmediate()`**
A Node.js specific timer that runs immediately after the current Poll phase (I/O events) of the Event Loop.

```JavaScript
setImmediate(() => {
console.log("Runs after I/O events, but before setTimeout(0)");
});
```

---

### **4. Recursive setTimeout vs setInterval**

---

The Problem with setInterval
setInterval triggers the next call regardless of whether the previous execution finished. This can lead to overlapping if the task takes longer than the interval.

The Solution: Recursive setTimeout
This pattern guarantees a fixed delay between executions because the next timer is only scheduled after the current task completes.

```JavaScript
const heavyTask = () => {
// Do some heavy work...
setTimeout(heavyTask, 1000);
// Schedule NEXT only when THIS is done
};
setTimeout(heavyTask, 1000);
```

### **5. Clear Methods**

Every timer returns an object (in Node.js) or an ID (in Browsers) that can be used to cancel the execution.

### 🛑 Cancellation Methods

In Node.js, every timer function returns an **object** (Timeout/Immediate object). You can use this object to cancel the execution before it happens.

| Timer Method         | Cancellation Method            | Description                                            |
| :------------------- | :----------------------------- | :----------------------------------------------------- |
| **`setTimeout()`**   | `clearTimeout(timerObj)`       | Stops a one-time delayed function from running.        |
| **`setInterval()`**  | `clearInterval(intervalObj)`   | Stops a repeating interval loop.                       |
| **`setImmediate()`** | `clearImmediate(immediateObj)` | Cancels a "VIP" immediate task before the Check phase. |

#### Example:

```javascript
const myTimer = setTimeout(() => {
  console.log("This will not run!");
}, 5000);

// Decided to cancel it
clearTimeout(myTimer);
```

### 🚀 Execution Summary Table

This table shows exactly **when** each timer runs in the Node.js Event Loop:

| Method                   | Execution | Event Loop Phase      | Priority                |
| :----------------------- | :-------- | :-------------------- | :---------------------- |
| **`process.nextTick()`** | Instant   | Before the next phase | **Highest (Immediate)** |
| **`setImmediate()`**     | Once      | Check Phase           | **High (After I/O)**    |
| **`setTimeout()`**       | Once      | Timers Phase          | **Medium (Delayed)**    |
| **`setInterval()`**      | Repeated  | Timers Phase          | **Medium (Repeated)**   |

---

# 📖 Node.js: Blocking vs. Non-Blocking I/O

## _Understanding the difference between Blocking and Non-Blocking is the key to mastering Node.js performance. Node.js is single-threaded, but it handles high concurrency using the Event Loop and Libuv._

## 1. What is Blocking (Synchronous)? 🛑

Blocking refers to operations that stop the execution of additional JavaScript until the current operation finishes. The Event Loop cannot continue while a blocking operation is occurring.

Naming Convention: Usually ends with Sync (e.g., readFileSync, writeFileSync).

Best For: Initial application setup, such as loading environment variables or configuration files.

## `Risk:` If used in a web server, one heavy request can "freeze" the server for all other users.

### 💻 Synchronous Example:

---

```JavaScript
const fs = require('node:fs');

console.log("1. Task Start");
const data = fs.readFileSync('file.txt', 'utf8'); // Blocks here
console.log("2. Data:", data);
console.log("3. Next Task");

// Output Order: 1 -> 2 -> 3
```

---

## 2. What is Non-Blocking (Asynchronous)? ⚡

`
Non-Blocking allows Node.js to start an I/O operation (like reading a file or database) and move to the next task immediately. Once the I/O is done, a callback is executed.

Mechanism: Offloads I/O tasks to Libuv (C++ Thread Pool).

`Best For:` Real-time applications, APIs, and handling thousands of concurrent users.

## `Benefit: `High Throughput (more work done in less time).

### 💻 Asynchronous Example:

---

```JavaScript
const fs = require('node:fs');

console.log("1. Task Start");
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("3. Data:", data); // Executes later
});
console.log("2. Next Task");

// Output Order: 1 -> 2 -> 3 (Task 2 runs while file is reading)
```

## 📊 Comparison Table: Blocking vs Non-Blocking

| Feature             | Blocking (Synchronous) 🛑 | Non-Blocking (Asynchronous) ⚡ |
| ------------------- | ------------------------- | ------------------------------ |
| Priority / Nature   | Sequential (One by one)   | Concurrent (Parallel-like)     |
| Execution Flow      | Direct Line Flow          | Event Loop                     |
| Thread State        | Paused / Stuck (Frozen)   | Always Free & Running          |
| Processing          | Handled by Main Thread    | Offloaded to Libuv             |
| Performance         | Low Throughput (Slow)     | High Throughput (Fast)         |
| Resource Efficiency | Less Efficient            | More Efficient                 |
| I/O Handling        | Done by Main Thread       | Worker Pool / System Level I/O |
| Naming Convention   | Methods end with `Sync`   | Uses Callbacks / Promises      |
| Standard Pattern    | Simple & Linear           | Event-driven                   |
| Best Use Case       | Startup / Config Loading  | APIs / Servers / Real-time     |
| Production Ready    | Limited Use               | Highly Recommended             |

---

### ⚠️ The Danger Zone: Mixing Both

---

Never perform a Blocking operation after starting a Non-Blocking one on the same resource.

\***\*Bad Practice:\*\***

```JavaScript
fs.readFile('file.txt', (err, data) => { /* read */ });
fs.unlinkSync('file.txt'); // ❌ ERROR: Might delete before reading is finished!
```

\***\*Good Practice (Chaining):\*\***

```JavaScript
fs.readFile('file.txt', (err, data) => {
    fs.unlink('file.txt', (err) => { /* delete after read */ });
});

```

---

### 💡 Interviewer's Secret: CPU vs I/O

---

I/O Tasks (File, Network) are handled by Libuv threads. Node.js is great here.

CPU Tasks (Heavy Math, Image Processing) stay on the Main Thread. If you run a heavy loop, Node.js will still block even if you use "Async" syntax.
