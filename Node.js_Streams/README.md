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



# 📘 Understanding Node.js Writable Streams & Backpressure

## 🎯 Objective

The goal of this project is to understand how **Node.js manages memory efficiently** when writing a **large amount of data (large files)** to a file using streams.

---

## 🚀 Concept: Backpressure

When the **speed of writing data (write speed)** is slower than the **speed of generating data (process speed)**, extra data starts accumulating in **RAM (buffer)**.

👉 This situation is called **Backpressure**.

---

## 🛠️ Key Components Used

### 1. `writeStream.write(data)`

This function returns a boolean:

* ✅ `true` → Buffer has space, you can continue writing
* ❌ `false` → Buffer is full (High Water Mark limit reached), you must pause

---

### 2. `drain` Event

* When the buffer becomes full, Node.js continues writing data internally
* Once the buffer is completely emptied, the **`drain` event** is triggered

📌 **Important Note:**
`drain` is emitted **only when the buffer was previously full**

---

### 3. High Water Mark

* It is the default buffer size limit in streams
* Usually: **16KB for Writable Streams**
* If this limit is exceeded → backpressure is applied

---

## ⚙️ Logic Flow (How it Works)

1. 🔁 Start writing data using a loop
2. 🔍 After every `write()` call, check the return value
3. ⏸️ If `false` → pause writing
4. 👂 Wait for the `drain` event
5. ▶️ Once triggered → resume writing

---

## 📈 Why is Backpressure Important?

If you ignore backpressure and keep writing continuously:

* ❌ **Memory Crash** → `JavaScript heap out of memory`
* ❌ **System Slowdown / Hang**
* ❌ **Poor Performance**

---

## 💻 Example Code

```js
const fs = require('node:fs');

// Create a writable stream
const writeStream = fs.createWriteStream('output.txt', {
  encoding: 'utf-8',
});

let i = 0;
const maxIterations = 100000; // Large data to fill buffer

function writeData() {
  let canWrite = true;

  // Write until buffer is full or data ends
  while (i < maxIterations && canWrite) {
    const data = `Line number: ${i}\n`;

    canWrite = writeStream.write(data);
    i++;

    if (!canWrite) {
      // Buffer is full
      console.log('⚠️ Buffer is full at index:', i);

      // Wait for drain event, then resume
      writeStream.once('drain', () => {
        console.log('✅ Buffer drained! Resuming...');
        writeData();
      });
    }
  }

  // When all data is written
  if (i === maxIterations) {
    writeStream.end();
    console.log('🏁 All data written.');
  }
}

// Start writing
writeData();
```

---




# 📘 Node.js TCP Server & Client using Net Module (Duplex Streams)

## 🎯 Objective

The purpose of this project is to understand how **TCP communication works in Node.js** using the built-in **`net` module**, and how **Duplex Streams** allow both reading and writing of data.

---

## 🚀 Concept: Duplex Streams

A **Duplex Stream** is a stream that is both:

* 🔹 **Readable** → Can receive data
* 🔹 **Writable** → Can send data

👉 In this project, the **socket** is a duplex stream:

* Reads data from client/server
* Writes data to client/server

---

## 🛠️ Technologies Used

* Node.js
* `net` module (built-in TCP networking)

---

## 📡 How It Works

### 🔹 Server Side

* Creates a TCP server using `net.createServer()`
* Listens for incoming client connections
* Reads data sent by the client
* Sends responses using terminal input (`stdin`)
* Handles disconnection and errors

---

### 🔹 Client Side

* Connects to the server using `net.createConnection()`
* Sends an initial message to the server
* Listens for server responses
* Handles disconnection and errors

---

## ⚙️ Flow of Communication

1. Server starts and listens on port **3000**
2. Client connects to the server
3. Client sends a message → Server receives it
4. Server replies via terminal input → Client receives it
5. Both can communicate continuously (real-time)

---

## 💻 Server Code

```js id="server001"
const net = require('node:net');

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('--- New Client Connected ---');

  // READABLE: Receive data from client
  socket.on('data', (data) => {
    console.log('\nClient says:', data.toString().trim());
    process.stdout.write('Your Reply: ');
  });

  // WRITABLE: Send data to client via terminal input
  process.stdout.write('Your Reply: ');
  process.stdin.pipe(socket);

  // Handle client disconnection
  socket.on('end', () => {
    console.log('\n--- Client Disconnected ---');
  });

  // Error handling
  socket.on('error', (err) => {
    console.log('Socket Error:', err.message);
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});
```

---

## 💻 Client Code

```js id="client001"
const net = require('node:net');

// Connect to server
const client = net.createConnection({ port: 3000 }, () => {
  console.log('✅ Connected to Server!');
  
  // Send initial message
  client.write('Hello from Hardeep!');
});

// Receive data from server
client.on('data', (data) => {
  console.log('\nServer replied:', data.toString().trim());
});

// Handle disconnection
client.on('end', () => {
  console.log('❌ Disconnected from server');
});

// Error handling
client.on('error', (err) => {
  console.error('Connection Error:', err.message);
});
```

---

## ▶️ How to Run

### 1️⃣ Start Server

```bash
node server.js
```

### 2️⃣ Start Client (in another terminal)

```bash
node client.js
```

---

## 📈 Key Learnings

* Understanding **TCP communication** in Node.js
* Working with **Duplex Streams**
* Difference between **Readable & Writable streams**
* Real-time communication between server and client
* Handling **events** like `data`, `end`, and `error`

---

## 🧠 Summary

* `net` module helps build low-level network applications
* `socket` acts as a **Duplex Stream**
* You can both **read and write data simultaneously**
* Useful for building **chat apps, real-time systems, and custom protocols**

---


# 📘 Node.js Transform Stream Example (Uppercase Converter)

## 🎯 Objective

The goal of this project is to understand how **Transform Streams** work in Node.js by converting user input into **uppercase text in real-time**.

---

## 🚀 Concept: Transform Stream

A **Transform Stream** is a special type of stream that is:

* 🔹 **Readable** → Outputs data
* 🔹 **Writable** → Receives data
* 🔹 **Transforms Data** → Modifies the input before passing it forward

👉 It acts like a **middle layer** in a pipeline:

```
Input → Transform → Output
```

---

## 🛠️ Key Idea

* Input is taken from **`process.stdin`**
* Data passes through a **Transform Stream**
* Output is shown in **`process.stdout`**
* The stream converts all text to **UPPERCASE**

---

## ⚙️ How It Works

1. User types something in the terminal
2. Input goes into the Transform stream
3. `transform()` function modifies the data
4. Output is displayed in uppercase

---

## 💻 Code Example

```js id="transform001"
const { Transform } = require('node:stream');

// Create a Transform Stream
const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    const upperData = chunk.toString().toUpperCase();

    // Send transformed data forward
    callback(null, upperData);
  }
});

console.log("Type something to see the magic of Transform Stream:");


// Pipe input → transform → output
process.stdin
  .pipe(upperCaseTr)
  .pipe(process.stdout);
```

---

## ▶️ How to Run

```bash id="run001"
node app.js
```

👉 Then type anything in the terminal — it will instantly convert to **UPPERCASE**.

---

## 📈 Key Learnings

* Understanding **Transform Streams** in Node.js
* How `.pipe()` creates a data pipeline
* Real-time data transformation
* Difference between:

  * Readable Stream
  * Writable Stream
  * Transform Stream

---

## 🧠 Summary

* Transform streams modify data **on the fly**
* They are both **readable and writable**
* Useful for:

  * Data processing
  * Compression
  * Encryption
  * Formatting

---

## 🚀 Future Improvements

* Add lowercase → uppercase toggle
* Add file transformation support
* Build a text formatter CLI tool
* Chain multiple transform streams

---



## 🚀 Future Improvements

* Add multiple client support
* Build a simple chat application
* Add username system
* Implement message broadcasting

---

## 🧠 Summary

* Node.js streams are designed for **efficient memory handling**
* The return value of `write()` is **very important**
* Always handle the `drain` event for large data
* Backpressure handling is essential for **production-level applications**

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
