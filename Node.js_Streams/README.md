# 🌊 Node.js Streams Mastery

Welcome to the **Node.js Streams** module.
This repository provides a deep understanding of how streams work in Node.js along with a **real-world Express.js implementation** for efficiently handling large files.

This is an essential concept for building **scalable backend systems** and is widely used in **file handling, APIs, and real-time data processing**.

---

## 📌 Introduction

Streams are one of the core concepts in Node.js used to handle **data flow efficiently**.

Instead of loading the entire file into memory (RAM), streams process data in **small chunks**, making applications:

* ⚡ Faster
* 💾 Memory-efficient
* 🚀 Scalable

---

## 🚀 Why Use Streams?

### ✅ Memory Efficiency

* No need to load entire file into RAM
* Ideal for large files (videos, logs, datasets)

### ✅ Time Efficiency

* Processing starts immediately as data arrives
* No waiting for full file loading

---

## 🛠️ Types of Streams in Node.js

Node.js provides **4 main types of streams**:

---

### 📥 1. Readable Streams

* Used to **read data**
* Acts as a data source

**Examples:**

* `fs.createReadStream()`
* `process.stdin`
* HTTP requests

**Events:**

* `data` → when chunk arrives
* `end` → when reading finishes

---

### 📤 2. Writable Streams

* Used to **write data**
* Acts as a destination

**Examples:**

* `fs.createWriteStream()`
* `process.stdout`
* HTTP response (`res`)

**Methods:**

* `.write(chunk)`
* `.end()`

---

### ↔️ 3. Duplex Streams

* Can **read and write** both

**Example:**

* `net.Socket`

👉 Used in network communication

---

### ⚙️ 4. Transform Streams

* Modify data while passing through

**Examples:**

* `zlib.createGzip()` (compression)
* `crypto.createCipher()` (encryption)

---

## 🌊 Core Concepts

### 🔹 Chunk

* Small piece of data being processed
* Default size ≈ 64KB

### 🔹 Buffer

* Temporary memory storage for chunks

### 🔹 highWaterMark

* Defines **maximum buffer size**
* Controls how much data is processed at once

---

## ⚠️ Backpressure (Important)

Backpressure occurs when:

👉 Readable stream sends data faster than Writable can handle

### 🔧 Solution:

Node.js automatically:

* Pauses reading
* Waits for `drain` event
* Resumes flow

---

## 💻 Basic Example (Pipe Method)

```js
const fs = require('node:fs');

const src = fs.createReadStream('./big_video.mp4');
const dest = fs.createWriteStream('./copy_video.mp4');

// Automatically handles chunks, buffering, and backpressure
src.pipe(dest);

dest.on('finish', () => console.log('File copied successfully!'));
```

---

## 📁 Project File

### 📄 `01_Readable_Stream.js`

This file demonstrates how to **stream large files efficiently using Express.js**.

---

## 💻 Code Implementation

```js
/**
 * Topic: Efficiently Streaming Large Files in Express.js
 * Concepts: Readable Streams, Chunks, Buffering, and Writable Responses
 */

const fs = require("node:fs");
const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  const fileReader = fs.createReadStream("./large_data.txt", {
    encoding: "utf-8",
    highWaterMark: 16 * 1024, // 16KB chunks
  });

  fileReader.on("data", (chunk) => {
    console.log(`Sending chunk of size: ${chunk.length} bytes`);

    const canContinue = res.write(chunk);

    // Handle backpressure
    if (!canContinue) {
      fileReader.pause();
      res.once("drain", () => {
        fileReader.resume();
      });
    }
  });

  fileReader.on("end", () => {
    console.log("Streaming completed");
    res.end("\n\n--- [END OF STREAM] ---");
  });

  fileReader.on("error", (err) => {
    console.error("Stream Error:", err.message);

    if (!res.headersSent) {
      res.status(500).send("Internal Server Error");
    } else {
      res.end();
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
```

---

## 🛠️ How to Run

### 1. Install Dependencies

```bash
npm install express
```

### 2. Run the Server

```bash
node 01_Readable_Stream.js
```

### 3. Open in Browser

```
http://localhost:3000
```

👉 Open **Network Tab** to observe:

* `Transfer-Encoding: chunked`

---

## 🎯 What You Learn

After completing this module, you will:

* Understand how streams work internally
* Handle large files efficiently
* Implement real-world streaming APIs
* Manage backpressure manually
* Build scalable backend systems

---

## 🧠 Summary Table

| Stream Type | Description    | Use Case                |
| ----------- | -------------- | ----------------------- |
| Readable    | Source of data | Reading files           |
| Writable    | Destination    | Writing files           |
| Duplex      | Read + Write   | Network sockets         |
| Transform   | Modify data    | Compression, encryption |

---

## 🚀 Final Note

Streams are a **must-know concept** for backend developers.

> "Process data smartly, not heavily."

Mastering streams will help you build **high-performance Node.js applications** 🚀

---

🔥 Built with dedication by CodeWithHardeep
