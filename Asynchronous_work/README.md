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
