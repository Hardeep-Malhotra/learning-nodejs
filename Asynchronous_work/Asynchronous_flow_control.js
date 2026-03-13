/**
 * TOPIC 1: SERIES EXECUTION (Sequential)
 * Logic: Step B starts only AFTER Step A finishes.
 * Use Case: Login flows, payment processing.
 */

/*
function getUser(id, callback) {
  setTimeout(() => {
    console.log("1. User Data retrieved successfully...");
    callback(null, { id: id, name: "Rahul" });
  }, 1000);
}

function validateSession(user, callback) {
  setTimeout(() => {
    console.log("2. Session is valid...");
    callback(null, true);
  }, 500);
}

// Execution
getUser(101, (err, user) => {
  if (err) return console.error(err);

  validateSession(user, (err, isValid) => {
    if (err) return console.error(err);
    console.log("DONE: User logged in safely!");
  });
});
*/

// -------------------------------------------------------------------------

/**
 * TOPIC 2: PRACTICAL FILE PROCESSING (Series Pattern)
 * Logic: Reading files one-by-one to avoid memory spikes.
 */

const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "images");

// Step 1: Read the directory (Asynchronous)
fs.readdir(folderPath, (err, files) => {
  if (err) {
    return console.error("Error: Folder not found!", err);
  }

  // Step 2: Filter only image files
  const images = files.filter(
    (file) => file.endsWith(".jpg") || file.endsWith(".png"),
  );

  console.log(`Total ${images.length} images found: `, images);

  // Step 3: Recursive function to process images in SERIES
  function processImage(index) {
    // Base case: Stop if we processed all images
    if (index >= images.length) {
      return console.log("\nStatus: All images processed successfully.");
    }

    const currentImage = images[index];
    const fullPath = path.join(folderPath, currentImage);

    // Read the file buffer
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        console.log(`Error reading ${currentImage}!`);
      } else {
        console.log(
          `[${index + 1}/${images.length}] Success: Read ${currentImage} (${data.length} bytes)`,
        );
      }

      // CONTROL FLOW: Move to the next image only after the current one is done
      processImage(index + 1);
    });
  }

  // Initial trigger
  if (images.length > 0) {
    processImage(0);
  } else {
    console.log("No images found in the directory.");
  }
});

// -------------------------------------------------------------------------

/**
 * TOPIC 3: THE EVENT LOOP (The "Magic")
 * Concept: Demonstrating why 'setTimeout 0' runs last.
 */

console.log("\n--- Event Loop Demonstration ---");
console.log("1. Script Started (Chef takes the order)");

// This task is moved to the "Callback Queue"
setTimeout(() => {
  console.log("3. Cleaning Kitchen (Executed after the main stack is empty)");
}, 0);

console.log("2. Food Packing (Chef continues working...)");

/* EXPECTED OUTPUT ORDER:
1. Script Started
2. Food Packing
3. Cleaning Kitchen
*/
