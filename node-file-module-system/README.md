# 📦 Node.js File Stats

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

🔥 Now you are ready to use Node.js File Stats like a pro!
