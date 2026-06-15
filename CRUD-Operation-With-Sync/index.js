// Importing the core File System module
const fs = require("fs");

const filePath = "./database.txt";

console.log("--- STARTING FILE SYSTEM CRUD OPERATIONS (SYNC) --- \n");

// ==========================================
// 1. CREATE OPERATION (fs.writeFileSync)
// ==========================================
// Description: Creates a new file and writes data to it.
// If the file already exists, it will overwrite the old content completely.

try {
  const initialData =
    "User ID: 101 \nName: Hardeep Singh \nRole: Backend Developer\n";
  fs.writeFileSync(filePath, initialData);
  console.log("✅ [CREATE]: File created and data written successfully!");
} catch (error) {
  console.error("❌ Error during CREATE operation:", error.message);
}

console.log("--------------------------------------------------\n");

// ==========================================
// 2. READ OPERATION (fs.readFileSync)
// ==========================================
// Description: Reads data from the specified file path.
// Note: We pass 'utf-8' as the second argument to encode the buffer into readable text.

try {
  console.log("📖 [READ]: Fetching current file data...");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  console.log("--- File Content Start ---");
  console.log(fileContent);
  console.log("--- File Content End ---");
} catch (error) {
  console.error("❌ Error during READ operation:", error.message);
}

console.log("--------------------------------------------------\n");

// ==========================================
// 3. UPDATE OPERATION (fs.appendFileSync)
// ==========================================
// Description: Appends/Adds new data to the end of the existing file content without overwriting it.

try {
  const updatedData = "Skills: Node.js, Express, JavaScript\nStatus: Active\n";
  fs.appendFileSync(filePath, updatedData);
  console.log("🔄 [UPDATE]: New data appended to the file successfully!");

  // Verification Read to see the updated data
  console.log("\n📖 Reading file again to verify updates:");
  const updatedContent = fs.readFileSync(filePath, "utf-8");
  console.log(updatedContent);
} catch (error) {
  console.error("❌ Error during UPDATE operation:", error.message);
}

console.log("--------------------------------------------------\n");

// ==========================================
// 4. DELETE OPERATION (fs.unlinkSync)
// ==========================================
// Description: Deletes/Removes the file permanently from the file system.
// Note: Uncomment the lines below when you want to test the delete operation.

/*
try {
    console.log("🗑️ [DELETE]: Removing the file from system...");
    fs.unlinkSync(filePath);
    console.log("💥 File deleted successfully!");
} catch (error) {
    console.error("❌ Error during DELETE operation:", error.message);
}
*/

console.log("--- CRUD OPERATIONS PROCESS COMPLETED ---");
