// ==========================================
// 📦 Node.js Path Module (File Paths)
// ==========================================

// ------------------------------------------
// 🔹 Import Module
// ------------------------------------------
const path = require("node:path");

// ------------------------------------------
// 📁 Example File Path
// ------------------------------------------
const filePath = "/users/joe/notes.txt";

// ==========================================
// 📊 Get Information from Path
// ==========================================

console.log("📄 Path Information:");
console.log("----------------------------");

// Folder name
console.log("✔ Directory:", path.dirname(filePath));

// File name
console.log("✔ File Name:", path.basename(filePath));

// File extension
console.log("✔ Extension:", path.extname(filePath));

// File name without extension
console.log(
  "✔ File Name (No Ext):",
  path.basename(filePath, path.extname(filePath)),
);

// ==========================================
// ⚡ Working with Paths
// ==========================================

console.log("\n⚡ Path Operations:");
console.log("----------------------------");

// Join paths
const joinedPath = path.join("/", "users", "joe", "docs", "file.txt");
console.log("✔ Joined Path:", joinedPath);

// Resolve (absolute path)
const resolvedPath = path.resolve("file.txt");
console.log("✔ Resolved Path:", resolvedPath);

// Normalize (clean path)
const normalizedPath = path.normalize("/users/joe/..//test.txt");
console.log("✔ Normalized Path:", normalizedPath);

// ==========================================
// 🚀 Bonus: Cross Platform Safe Path
// ===========================================

const safePath = path.join("users", "hardeep", "project", "app.js");
console.log("\n✔ Safe Path (Cross Platform):", safePath);
