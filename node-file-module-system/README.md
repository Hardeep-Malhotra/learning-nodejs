#  **1.📦 Node.js File Stats**

## 📌 Introduction

Every file in a system has some extra information about it.
This information is called **metadata**.

In Node.js, we can get this information using the **`fs.stat()`** method from the **fs module**.

👉 File stats give details like:

- File size
- File type (file or directory)
- Creation time
- Last modified time

---

## 🧠 What is Metadata?

👉 Metadata means **"data about data"**

Example:

- File content → "Hello bro" (actual data)
- File size, created time → metadata

---

## ⚡ Method 1: Async (Callback)

This is a non-blocking method (recommended for production).

```js
const fs = require("node:fs");

fs.stat("./test.txt", (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Is File:", stats.isFile());
  console.log("Is Directory:", stats.isDirectory());
  console.log("Size:", stats.size, "bytes");
});
```

---

## ⚡ Method 2: Sync (Blocking)

This method blocks the execution until the result is returned.

```js
const fs = require("node:fs");

try {
  const stats = fs.statSync("./test.txt");

  console.log(stats.isFile());
  console.log(stats.size);
} catch (err) {
  console.error(err);
}
```

⚠️ Avoid using this in production because it blocks the event loop.

---

## ⚡ Method 3: Promise (Modern Approach)

This is the modern and clean way using async/await.

```js
const fs = require("node:fs/promises");

async function example() {
  try {
    const stats = await fs.stat("./test.txt");

    console.log(stats.isFile());
    console.log(stats.isDirectory());
    console.log(stats.size);
  } catch (err) {
    console.log(err);
  }
}

example();
```

---

## 📊 Important Properties & Methods

| Method / Property        | Description                     |
| ------------------------ | ------------------------------- |
| `stats.isFile()`         | Checks if it is a file          |
| `stats.isDirectory()`    | Checks if it is a folder        |
| `stats.isSymbolicLink()` | Checks if it is a symbolic link |
| `stats.size`             | File size in bytes              |
| `stats.birthtime`        | File creation time              |
| `stats.mtime`            | Last modified time              |
| `stats.atime`            | Last accessed time              |

---

## 🔍 Example Output

```
Is File: true
Is Directory: false
Size: 1024 bytes
```

---

## ⚠️ Important Notes

- Always handle errors using `if (err)` or `try...catch`
- Use async methods in real applications
- Avoid sync methods in servers
- File stats do NOT give file content

---

## 🎯 Real-World Use Cases

- File upload validation (check size)
- File manager applications
- Logging systems
- Checking file type before processing

---

## 🧠 Key Difference

| Function        | Purpose              |
| --------------- | -------------------- |
| `fs.stat()`     | Get file information |
| `fs.readFile()` | Read file content    |

---

## 🚀 Conclusion

Node.js file stats help developers understand file properties without reading the actual file content.
Using async or promise-based methods ensures better performance in real-world applications.

---

## 📁 Suggested File Structure

```
node-file-module-system/
│
├── 01-file-stats.js
├── test.txt
└── README.md
```

---

## 💡 Pro Tip

👉 Always prefer:

- `fs.stat()` (callback)
- `fs.promises.stat()` (modern)

❌ Avoid:

- `fs.statSync()` in production

---

## 🔥 Now you are ready to use Node.js File Stats like a pro!

# **2.📦 Node.js File Paths**

## 📌 Introduction


Every file in a system has a **path**.

A path tells us **where a file is located** in the system.

👉 Example:

- Linux / macOS → `/users/joe/file.txt`
- Windows → `C:\users\joe\file.txt`

Because paths are different on different operating systems, Node.js provides a **built-in module called `path`** to handle them safely.

---

## 📥 Importing Path Module

```js
const path = require("node:path");
```

---

## 🧠 Why Use Path Module?

- Avoid OS-related path issues
- Work with file paths safely
- Extract useful information from paths
- Create dynamic file paths

---

## 📊 Getting Information from a Path

### Example Path:

```js
const filePath = "/users/joe/notes.txt";
```

---

### 🔹 1. `path.dirname()`

👉 Gets the folder (directory) name

```js
path.dirname(filePath);
// Output: /users/joe
```

---

### 🔹 2. `path.basename()`

👉 Gets the file name

```js
path.basename(filePath);
// Output: notes.txt
```

---

### 🔹 3. `path.extname()`

👉 Gets the file extension

```js
path.extname(filePath);
// Output: .txt
```

---

### 🔹 Get filename without extension

```js
path.basename(filePath, path.extname(filePath));
// Output: notes
```

---

## ⚡ Working with Paths

### 🔹 4. `path.join()`

👉 Joins multiple parts into a single path

```js
const fullPath = path.join("/", "users", "joe", "notes.txt");

console.log(fullPath);
// Output: /users/joe/notes.txt
```

📌 Automatically handles slashes correctly

---

### 🔹 5. `path.resolve()`

👉 Converts relative path to absolute path

```js
path.resolve("notes.txt");
// Output: /current/folder/notes.txt
```

---

### 🔹 Multiple arguments

```js
path.resolve("tmp", "notes.txt");
// Output: /current/folder/tmp/notes.txt
```

---

### 🔹 Absolute path case

```js
path.resolve("/etc", "notes.txt");
// Output: /etc/notes.txt
```

---

### 🔹 6. `path.normalize()`

👉 Cleans up messy paths

```js
path.normalize("/users/joe/..//test.txt");
// Output: /users/test.txt
```

---

## ⚠️ Important Note

❗ `resolve()` and `normalize()`:

- Do NOT check if the file exists
- Only calculate the path

---

## 📊 Summary Table

| Method        | Description       |
| ------------- | ----------------- |
| `dirname()`   | Get folder path   |
| `basename()`  | Get file name     |
| `extname()`   | Get extension     |
| `join()`      | Join paths safely |
| `resolve()`   | Get absolute path |
| `normalize()` | Clean path        |

---

## 🎯 Real-World Use Cases

- Creating file upload paths
- Building file systems
- Working with dynamic file locations
- Avoiding OS-specific bugs

---

## 📁 Example Code

```js
const path = require("node:path");

const filePath = "/users/joe/notes.txt";

console.log("Directory:", path.dirname(filePath));
console.log("File Name:", path.basename(filePath));
console.log("Extension:", path.extname(filePath));

const fullPath = path.join("/users", "joe", "docs", "file.txt");
console.log("Joined Path:", fullPath);

const absolutePath = path.resolve("file.txt");
console.log("Absolute Path:", absolutePath);

const cleanPath = path.normalize("/users/joe/..//test.txt");
console.log("Normalized Path:", cleanPath);
```

---

## 🚀 Conclusion

The `path` module helps developers work with file paths safely and efficiently across different operating systems.

👉 Always use `path.join()` instead of manually adding `/`
👉 Use `resolve()` for absolute paths
👉 Use `normalize()` to clean paths

---

## 📁 Suggested File Structure

```bash
node-file-module-system/
│
├── 02-file-paths.js
├── README.md
```

---

## 💡 Pro Tip

👉 Never write paths manually like:

```js
'/users/' + name + '/file.txt' ❌
```

👉 Always use:

```js
path.join('/users', name, 'file.txt') ✅
```

---

🔥 Now you can handle file paths like a pro in Node.js!

---
#  3.📦 Node.js Reading Files with Node.js

This guide explains different ways to read files in Node.js using the built-in **fs (File System)** module.

---

## 🚀 Methods Covered

1. fs.readFile() (Asynchronous - Callback)
2. fs.readFileSync() (Synchronous)
3. fsPromises.readFile() (Promise-based)
4. Streams (For large files)

---

# 🔥 1. fs.readFile() (Async - Callback)

The simplest way to read a file in Node.js is using `fs.readFile()`.

```js
const fs = require('node:fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```
**📌 Explanation:**

Asynchronous (non-blocking)

Uses a callback function

Does not stop execution of other code

---

# ⚡ 2. fs.readFileSync() (Sync - Blocking)

You can also read files synchronously using fs.readFileSync().

```js
const fs = require('node:fs');

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```
**📌 Explanation:**

Synchronous (blocking)

Stops execution until file is read

---

# 🚀 3. fsPromises.readFile() (Promise-based)

Modern approach using Promises and async/await.

```js
const fs = require('node:fs/promises');

async function example() {
  try {
    const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```
example();
**📌 Explanation:**

Uses async/await

Cleaner and more readable

Recommended for modern applications

---

**⚠️ Important Note**

All three methods:

`fs.readFile()`

`fs.readFileSync()`

`fsPromises.readFile()`


**👉 Load the entire file into memory.**

❌ Problem:

High memory usage

Slow performance for large files

---

# 🌊 4. Streams (Best for Large Files)

For large files, use streams to read data in chunks.

📥 Example: Download + Read File Using Streams

```js
import fs from 'fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';

const fileUrl = 'https://www.gutenberg.org/files/2701/2701-0.txt';
const outputFilePath = path.join(process.cwd(), 'moby.md');

async function downloadFile(url, outputPath) {
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    await response.body?.cancel();
    throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
  }

  const fileStream = fs.createWriteStream(outputPath);

  console.log(`Downloading file from ${url} to ${outputPath}`);

  await pipeline(response.body, fileStream);

  console.log('File downloaded successfully');
}

async function readFile(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  try {
    for await (const chunk of readStream) {
      console.log('--- File chunk start ---');
      console.log(chunk);
      console.log('--- File chunk end ---');
    }

    console.log('Finished reading the file.');
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

try {
  await downloadFile(fileUrl, outputFilePath);
  await readFile(outputFilePath);
} catch (error) {
  console.error(`Error: ${error.message}`);
}

```
**📌 Explanation:**

Uses streams to handle large files

Reads file in chunks instead of loading full file

Efficient and memory-friendly

---

## 🧠 Summary

| Method                 | Type             | Best Use           |
|----------------------|------------------|--------------------|
| fs.readFile          | Async            | General use        |
| fs.readFileSync      | Sync             | Small scripts      |
| fsPromises.readFile  | Async (Modern)   | Production apps    |
| Streams              | Chunk-based      | Large files        |
---
# 4.✍️ Node.js File System (fs) - Writing Files (In-Depth Guide)

This project provides a detailed explanation of how to write and append data to files in Node.js using the built-in **fs (File System)** module.

---

# 📚 Introduction to File System (fs)

Node.js provides a core module called **fs (File System)** that allows interaction with the file system of the operating system.

Using this module, we can:
- Create files
- Read files
- Write data to files
- Append data
- Delete files

👉 It is one of the most important modules in Node.js backend development.

---

# ✍️ Writing Files in Node.js

Writing a file means storing data into a file. Node.js provides multiple methods to perform this operation.

---

# 🔥 1. fs.writeFile() (Asynchronous Method)

## 📌 Theory

- `fs.writeFile()` is an **asynchronous (non-blocking)** function.
- It writes data to a file **without blocking the execution** of other code.
- It uses a **callback function** to handle success or error.

👉 Node.js continues executing the next lines of code while writing happens in the background.

---

## ⚙️ Working

1. File path is provided
2. Data is passed
3. Node.js sends request to OS
4. Callback is executed after completion

---

## 📌 Behavior

- If file exists → content is **overwritten**
- If file does not exist → new file is **created**

---

## 💻 Example

```js
fs.writeFile("test.txt", "Hello World", (err) => {
  if (err) {
    console.log(err);
  }
});
```
---
# ⚡ 2. fs.writeFileSync() (Synchronous Method)
📌 Theory
`fs.writeFileSync()` is a synchronous (blocking) function.
It blocks the execution until file writing is completed.

👉 No other code runs until this operation finishes.

**⚠️ Drawbacks**

Slows down application

Blocks event loop

Not recommended in servers
```js
💻 Example
fs.writeFileSync("test.txt", "Hello Sync");
```
---
# 🚀 3. fsPromises.writeFile() (Modern Approach)
**📌 Theory**

This method is part of **fs/promises** module.
It uses Promises and **async/await.**
Provides cleaner and more readable code.

👉 It is the recommended approach in modern Node.js applications.

```js
💻 Example
const fs = require("fs/promises");

await fs.writeFile("test.txt", "Hello Promise");
```
---

**⚠️ Important Concept: Overwriting**

All write methods:

**`fs.writeFile()`**

**`fs.writeFileSync()`**

**`fsPromises.writeFile()`**


👉 Overwrite existing content by default
---


# 4.✍️ Appending Data to Files
**📌 Theory**

Appending means adding new data to the end of a file without deleting existing content.

👉 Useful for logs, notes, and history tracking.

🔁 `fs.appendFile() (Asynchronous)`
```js
💻 Example
fs.appendFile("test.txt", "\nNew Line", (err) => {
  if (err) console.log(err);
});
🚀 fsPromises.appendFile() (Modern)
const fs = require("fs/promises");

await fs.appendFile("test.txt", "\nNew Line");
```
---
## ⚖️ Write vs Append (Important Difference)

| Operation  | Behavior                |
|------------|------------------------|
| writeFile  | Replaces old content   |
| appendFile | Adds new content       |

---

### 🧠 Key Takeaways### 
---
**Use fs.writeFile() for basic async tasks**

**Use fsPromises.writeFile() for modern apps**

**Avoid writeFileSync() in production**

**Use appendFile() to preserve data**

**Understand overwrite vs append clearly**


---


# **5.📂 Node.js File Descriptor (fs.open) - In-Depth Guide**

This document provides a complete and detailed explanation of **File Descriptors** in Node.js, including how to open, read, and close files using different methods.

---

# 📚 What is a File Descriptor?

A **File Descriptor (fd)** is a **numeric identifier** assigned by the operating system when a file is opened.

👉 It acts as a **reference or handle** to an open file.

👉 Every open file in the system is tracked using a unique file descriptor.

---

## 🧠 Simple Understanding

- File = resource (like a document 📄)
- File Descriptor = ID number (like a token 🎫)

👉 Without a file descriptor, the system cannot access or manage the file.

---

# 🔢 Standard File Descriptors

| FD Number | Description |
|----------|------------|
| 0        | Standard Input (stdin) |
| 1        | Standard Output (stdout) |
| 2        | Standard Error (stderr) |
| 3+       | User opened files |

---

# 🔥 Why File Descriptors are Important?

- Used by OS to manage files efficiently
- Enables low-level file operations
- Required for advanced file handling (streams, buffers)
- Helps in resource management

---

# 📂 Opening Files in Node.js

Before performing any operation, a file must be opened using the `fs.open()` method.

---

# 🔥 1. fs.open() (Callback Method)

## 📌 Theory

- Asynchronous (non-blocking)
- Returns file descriptor via callback
- Uses flags to define mode

---

## 💻 Example

```js
const fs = require("fs");

fs.open("test.txt", "r", (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("File Descriptor:", fd);
});
```
---

# ⚡ 2. fs.openSync() (Synchronous Method)


## 📌 Theory
Blocking method

Returns file descriptor directly

```js
💻 Example
const fs = require("fs");

const fd = fs.openSync("test.txt", "r");
console.log("FD:", fd);

```
---
# 🚀 3. fsPromises.open() (Modern Approach)
## 📌 Theory

Promise-based

Uses async/await

Returns a FileHandle object

```js
💻 Example
const fs = require("fs/promises");

async function openFile() {
  const fileHandle = await fs.open("test.txt", "r");

  console.log("FD:", fileHandle.fd);

  await fileHandle.close();
}

openFile();

```
---
# 🧠 FileHandle Object

When using `fsPromises.open()`, Node.js returns a FileHandle object.

---
## 👉 It contains:

`.fd → file descriptor number`

`.readFile() → read file`

`.writeFile() → write file`

`.close() → close file`

---
## ⚠️ Closing Files (Very Important)

After using a file descriptor, it must be closed.

```js
💻 Example
await fileHandle.close();
```
---
## ❗ Why Close File?
Prevent memory leaks

Avoid file locking issues

Free system resources

----
## 🔁 File Open Flags

Flags define how a file is opened.

| Flag | Description                      | File Created |
|------|----------------------------------|--------------|
| r    | Read only                        | ❌           |
| r+   | Read + Write                     | ❌           |
| w+   | Read + Write (overwrite)         | ✅           |
| a    | Append                           | ✅           |
| a+   | Append + Read                    | ✅           |


----

## 🔄 File Operation Flow
1. Open file → fs.open()
2. Get file descriptor (fd)
3. Perform operations (read/write)
4. Close file → fs.close()

---
## 📊 Callback vs Sync vs Promise

| Method            | Type  | Return Value        |
|------------------|------|---------------------|
| fs.open          | Async | fd (callback)       |
| fs.openSync      | Sync  | fd (direct)         |
| fsPromises.open  | Async | FileHandle object   |

---
## 🧠 Key Concepts

- File Descriptor is a numeric identifier  
- Required for low-level file operations  
- Returned when a file is opened  
- Must be closed after use  
- Used internally by Node.js and the operating system  

---

## ⚠️ Important Notes

- Always handle errors properly  
- Always close files after usage  
- Prefer async/await for modern applications  
- Avoid synchronous methods in production  

---

## 🎯 Real Use Cases

- File streaming  
- Log management systems  
- Large file processing  
- System-level programming  

---

## 🧠 Summary

- File Descriptor = unique ID of a file  
- `fs.open()` → returns file descriptor (fd)  
- `fsPromises.open()` → returns FileHandle object  
- File descriptor is used to control file operations  
- Closing the file using `close()` is mandatory  