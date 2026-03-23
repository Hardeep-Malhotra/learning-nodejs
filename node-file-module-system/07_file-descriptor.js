// ================================
// 📂 Node.js File Descriptor (fs.open)
// ================================

const fs = require("fs");
const fsPromises = require("node:fs/promises");

const filePath = "node-file-module-system/test.txt";

// ================================
// 🔥 1. fs.open() (Callback Method)
// ================================

function openFileCallback() {
  fs.open(filePath, "r+", (err, fd) => {
    if (err) {
      console.log("Error:", err);
      return;
    }

    console.log("📌 Callback FD:", fd);

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("Error:", err);
        return;
      }

      console.log("📄 File Data:\n", data);
    });

    // 👉 close file
    fs.close(fd, () => {
      console.log("✅ File closed (callback)");
    });
  });
}

// ================================
// ⚡ 2. fs.openSync() (Sync Method)
// ================================

function openFileSyncMethod() {
  try {
    const fd = fs.openSync(filePath, "r");

    console.log("📌 Sync FD:", fd);

    const data = fs.readFileSync(filePath, "utf-8");

    console.log("📄 File Data:\n", data);

    fs.closeSync(fd);
    console.log("✅ File closed (sync)");
  } catch (err) {
    console.log("Error:", err);
  }
}

// ================================
// 🚀 3. fsPromises.open() (Modern)
// ================================

async function openFilePromise() {
  let fileHandle;

  try {
    fileHandle = await fsPromises.open(filePath, "r");

    console.log("📌 Promise FD:", fileHandle.fd);

    const data = await fileHandle.readFile({ encoding: "utf-8" });

    console.log("📄 File Data:\n", data);
  } catch (err) {
    console.log("Error:", err);
  } finally {
    if (fileHandle) {
      await fileHandle.close(); // ✅ FIXED (call function)
      console.log("✅ File closed (promise)");
    }
  }
}

// ================================
// 🚀 Run Any One Method
// ================================

// openFileCallback();
// openFileSyncMethod();
openFilePromise();
