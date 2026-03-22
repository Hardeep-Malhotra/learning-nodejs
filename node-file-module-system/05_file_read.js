// ================================
// 🔥 1. fs.readFile() (Async Method)
// ================================

const fs = require("fs");

console.log("1 run");

fs.readFile("node-file-module-system/test.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error:", err);
    return;
  }

  console.log("2 run (File Data):", data);
});

console.log("3 run");

// Output:
// 1
// 3
// 2 (because async behavior)

// ================================
// ⚡ 2. fs.readFileSync() (Sync Method)
// ================================

const fs = require("fs");

console.log("1 run");

try {
  const fileData = fs.readFileSync(
    "node-file-module-system/test.txt",
    "utf-8"
  );

  console.log("2 run (File Data):", fileData);
} catch (error) {
  console.log("Error:", error);
}

console.log("3 run");

// Output:
// 1
// 2
// 3 (because sync behavior)

// ================================
// 🚀 3. fsPromises.readFile() (Modern Way)
// ================================

const fs = require("fs/promises");

console.log("1 run");

async function readFileAsync() {
  try {
    const data = await fs.readFile(
      "node-file-module-system/test.txt",
      "utf-8"
    );

    console.log("2 run (File Data):", data);
  } catch (err) {
    console.log("Error:", err);
  }
}

readFileAsync();

// console.log("3 run");

// Output:
// 1
// 3
// 2 (async with await)

// ================================
// 🌊 4. Stream (Best for Large Files)
// ================================

const fs = require("fs");

const readStream = fs.createReadStream("node-file-module-system/test.txt", {
  encoding: "utf-8",
});

readStream.on("data", (chunk) => {
  console.log("Chunk received:");
  console.log(chunk);
});

readStream.on("end", () => {
  console.log("Finished reading file ✅");
});

readStream.on("error", (err) => {
  console.log("Error:", err);
});
