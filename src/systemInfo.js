// ==========================================
// 🖥 BUILT-IN MODULE WRAPPER
// File: systemInfo.js
// ==========================================

import os from "node:os";

// Named export
export function showSystemInfo() {
  console.log("\n===== SYSTEM INFORMATION =====");

  console.log("Platform:", os.platform());
  console.log("Architecture:", os.arch());

  console.log("Total Memory (GB):", (os.totalmem() / 1024 ** 3).toFixed(2));

  console.log("Free Memory (MB):", (os.freemem() / 1024 ** 2).toFixed(2));

  console.log("CPU Cores:", os.cpus().length);

  console.log("System Uptime (Hours):", (os.uptime() / 3600).toFixed(2));

  console.log("User Info:", os.userInfo().username);

  console.log("Machine Type:", os.machine());
}
