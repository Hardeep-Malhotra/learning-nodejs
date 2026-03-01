// ==============================================
// 📁 Node.js File System (Promise API) Notes
// File: file-system-notes.js
// ==============================================

// We are using modern Promise-based APIs
// So we import from "node:fs/promises"

import {
  writeFile,
  appendFile,
  readFile,
  mkdir,
  stat,
  unlink,
} from "node:fs/promises";

// ==============================================
// 🔹 1. Create File
// ==============================================
// Creates a new file or overwrites existing one

async function createFile(pathname, content) {
  try {
    await writeFile(pathname, content);
    console.log("✅ File created successfully");
  } catch (err) {
    console.error("❌ Error creating file:", err.message);
  }
}

// ==============================================
// 🔹 2. Append Content To File
// ==============================================
// Adds content at the end of file

async function appendToFile(pathname, content) {
  try {
    await appendFile(pathname, content);
    console.log("✅ Content appended successfully");
  } catch (err) {
    console.error("❌ Error appending file:", err.message);
  }
}

// ==============================================
// 🔹 3. Read File
// ==============================================
// Reads file content (must specify encoding)

async function readFileContent(pathname) {
  try {
    const data = await readFile(pathname, "utf-8");
    console.log("📖 File Content:\n", data);
  } catch (err) {
    console.error("❌ Error reading file:", err.message);
  }
}

// ==============================================
// 🔹 4. Get File Information
// ==============================================
// Returns metadata about file

async function getFileInfo(pathname) {
  try {
    const info = await stat(pathname);
    console.log("📊 File Info:");
    console.log("Size:", info.size, "bytes");
    console.log("Created:", info.birthtime);
    console.log("Modified:", info.mtime);
    console.log("Is File?", info.isFile());
  } catch (err) {
    console.error("❌ Error getting file info:", err.message);
  }
}

// ==============================================
// 🔹 5. Create Folder
// ==============================================
// recursive:true allows nested folders

async function createFolder(folderName) {
  try {
    await mkdir(folderName, { recursive: true });
    console.log("📁 Folder created successfully");
  } catch (err) {
    console.error("❌ Error creating folder:", err.message);
  }
}

// ==============================================
// 🔹 6. Delete File
// ==============================================
// Removes file permanently

async function deleteFile(pathname) {
  try {
    await unlink(pathname);
    console.log("🗑 File deleted successfully");
  } catch (err) {
    console.error("❌ Error deleting file:", err.message);
  }
}

// ==============================================
// 🚀 Demo Execution
// ==============================================

async function runDemo() {
  const filePath = "./newfile.txt";

  await createFile(filePath, "Hello Nodejs!\n");
  await appendToFile(filePath, "Hello Javascript!\n");

  await readFileContent(filePath);

  await getFileInfo(filePath);

  // Uncomment to delete file
  // await deleteFile(filePath);
}

runDemo();
