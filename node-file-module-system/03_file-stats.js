// ==========================================
// 📦 Node.js File Stats (3 Methods)
// ==========================================

// ------------------------------------------
// 🔹 Imports
// ------------------------------------------
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");

// ------------------------------------------
// 📁 File Path
// ------------------------------------------
const FILE_PATH = "node-file-module-system/test.txt";

// ==========================================
// ⚡ Method 1: Callback (Async)
// ==========================================
function getFileInfoCallback() {
  fs.stat(FILE_PATH, (err, stats) => {
    if (err) {
      console.error("❌ Callback Error:", err.message);
      return;
    }

    console.log("\n📌 Callback Method");
    console.log("----------------------------");
    console.log(`✔ Is File        : ${stats.isFile()}`);
    console.log(`✔ Is Directory   : ${stats.isDirectory()}`);
    console.log(`✔ Is Symbolic    : ${stats.isSymbolicLink()}`);
    console.log(`✔ Size           : ${stats.size} bytes`);
  });
}

// ==========================================
// ⚡ Method 2: Sync (Blocking)
// ==========================================
function getFileInfoSync() {
  try {
    const stats = fs.statSync(FILE_PATH);

    console.log("\n📌 Sync Method");
    console.log("----------------------------");
    console.log(`✔ Is File        : ${stats.isFile()}`);
    console.log(`✔ Is Directory   : ${stats.isDirectory()}`);
    console.log(`✔ Is Symbolic    : ${stats.isSymbolicLink()}`);
    console.log(`✔ Size           : ${stats.size} bytes`);
  } catch (error) {
    console.error("❌ Sync Error:", error.message);
  }
}

// ==========================================
// ⚡ Method 3: Promise (Modern)
// ==========================================
async function getFileInfoPromise() {
  try {
    const stats = await fsPromises.stat(FILE_PATH);

    console.log("\n📌 Promise Method");
    console.log("----------------------------");
    console.log(`✔ Is File        : ${stats.isFile()}`);
    console.log(`✔ Is Directory   : ${stats.isDirectory()}`);
    console.log(`✔ Is Symbolic    : ${stats.isSymbolicLink()}`);
    console.log(`✔ Size           : ${stats.size} bytes`);
  } catch (error) {
    console.error("❌ Promise Error:", error.message);
  }
}

// ==========================================
// 🚀 Run All Methods
// ==========================================
getFileInfoCallback();
getFileInfoSync();
getFileInfoPromise();
