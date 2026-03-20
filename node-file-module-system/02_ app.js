// ==========================================
// 🚀 MAIN APPLICATION FILE
// File: app.js
// ==========================================

// ------------------------------
// 🔹 Default + Named Import
// ------------------------------
import getGreeting, { sayGoodbye, getTimeOfDay } from "./greeting.js";

// ------------------------------
// 🔹 Namespace Import Example
// ------------------------------
import * as system from "../src/systemInfo.js";

// ------------------------------
// 🔹 Command Line Argument
// ------------------------------
const name = process.argv[2] || "User";

// ------------------------------
// 🔹 Greeting Logic
// ------------------------------
const hour = new Date().getHours();

console.log("\n===== GREETING SECTION =====");

console.log(`${getGreeting(hour)}, ${name}!`);
console.log("Time of Day:", getTimeOfDay(hour));
console.log(sayGoodbye());

// ------------------------------
// 🔹 Using Namespace Import
// ------------------------------
system.showSystemInfo();
