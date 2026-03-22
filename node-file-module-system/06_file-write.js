// ================================
// 📂 Node.js File System - Write & Append
// ================================

const fs = require("fs");

// File path
const filePath = "node-file-module-system/test.txt";

// ================================
// ✍️ 1. fs.writeFile() (Async)
// ================================

function writeFileAsync() {
  fs.writeFile(filePath, "This is Async Write Method\n", (err) => {
    if (err) {
      console.log("Error:", err);
      return;
    }

    console.log("✅ File written using async method");

    readFile();
  });
}

// ================================
// ⚡ 2. fs.writeFileSync() (Sync)
// ================================

function writeFileSyncMethod() {
  try {
    fs.writeFileSync(filePath, "This is Sync Write Method\n");
    console.log("✅ File written using sync method");

    readFile();
  } catch (err) {
    console.log("Error:", err);
  }
}

// ================================
// 🚀 3. fsPromises.writeFile() (Modern)
// ================================

async function writeFilePromise() {
  const fsPromises = require("node:fs/promises");

  try {
    await fsPromises.writeFile(filePath, "This is Promise Write Method\n");

    console.log("✅ File written using promise method");

    const data = await fsPromises.readFile(filePath, "utf-8");
    console.log("\n📄 File Content:\n", data);
  } catch (err) {
    console.log("Error:", err);
  }
}

// ================================
// 🔁 4. Append Data
// ================================

function appendData() {
  const content =
    "\nSuccess does not come in one day, but if you stay consistent daily, one day success will come.";

  fs.appendFile(filePath, content, (err) => {
    if (err) {
      console.log("Error:", err);
      return;
    }

    console.log("✅ Data appended successfully");

    readFile();
  });
}

// ================================
// 📖 Read File (Helper Function)
// ================================

function readFile() {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("Error:", err);
      return;
    }

    console.log("\n📄 File Content:\n");
    console.log(data);
  });
}

// ================================
// 🚀 Run Any One Function
// ================================

// writeFileAsync();
// writeFileSyncMethod();
// writeFilePromise();
appendData();
