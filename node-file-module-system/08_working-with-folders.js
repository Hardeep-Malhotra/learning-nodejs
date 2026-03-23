// 📁 Working with Folders in Node.js

const fs = require("node:fs");
const path = require("path");

const folderPath = "./test-folder";

/* =========================================================
   1️⃣ Check if Folder Exists
   ========================================================= */
console.log("\n🔹 Checking Folder Existence...");

if (fs.existsSync(folderPath)) {
  console.log(`✅ Folder "${folderPath}" already exists.`);
} else {
  console.log(`❌ Folder "${folderPath}" does not exist.`);
}


/* =========================================================
   2️⃣ Create Folder
   ========================================================= */
console.log("\n🔹 Creating Folder...");

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
  console.log(`✅ Folder "${folderPath}" created successfully.`);
} else {
  console.log(`⚠️ Folder "${folderPath}" already exists.`);
}


/* =========================================================
   3️⃣ Read Folder Contents
   ========================================================= */
console.log("\n🔹 Reading Folder Contents...");

const contents = fs.readdirSync("./");
console.log("📂 Folder Contents:", contents);


/* =========================================================
   4️⃣ Get Full Paths
   ========================================================= */
console.log("\n🔹 Getting Full Paths...");

const fullPaths = contents.map((file) => {
  return path.join("./", file);
});

console.log("📌 Full Paths:", fullPaths);


/* =========================================================
   5️⃣ Filter Only Files (Exclude Folders)
   ========================================================= */
console.log("\n🔹 Filtering Only Files...");

const onlyFiles = fullPaths.filter((file) => {
  return fs.lstatSync(file).isFile();
});

console.log("📄 Only Files:", onlyFiles);


/* =========================================================
   6️⃣ Rename Folder
   ========================================================= */
// ⚠️ Uncomment to test

// console.log("\n🔹 Renaming Folder...");

// try {
//   fs.renameSync("./test-folder", "./renamed-folder");
//   console.log("✅ Folder renamed successfully.");
// } catch (err) {
//   console.error("❌ Error renaming folder:", err.message);
// }


/* =========================================================
   7️⃣ Delete Folder
   ========================================================= */
// ⚠️ Uncomment to test

// console.log("\n🔹 Deleting Folder...");

// try {
//   fs.rmSync("./renamed-folder", { recursive: true, force: true });
//   console.log("✅ Folder deleted successfully.");
// } catch (err) {
//   console.error("❌ Error deleting folder:", err.message);
// }