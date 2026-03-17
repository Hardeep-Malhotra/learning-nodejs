// ==========================================
// NODE.JS PROCESS MODULE COMPLETE DEMO
// ==========================================

// 1️⃣ Command Line Argument
const name = process.argv[2] || "User";

// 2️⃣ Current Working Directory
console.log("Current Working Directory:", process.cwd());

// 3️⃣ Process ID
console.log("Process ID:", process.pid);

// 4️⃣ Platform Info
console.log("Platform:", process.platform);

// 5️⃣ Memory Usage
console.log("Memory Usage:", process.memoryUsage());

// 6️⃣ Environment Variable Example
console.log("Node Version from ENV:", process.env.NODE_ENV || "Not Set");

// 7️⃣ Greeting Logic
const hours = new Date().getHours();
console.log("Current Hour:", hours);

function getGreetings(hours) {
  if (hours < 5 || hours >= 19) {
    return "Good night";
  } else if (hours < 12) {
    return "Good morning";
  } else {
    return "Good evening";
  }
}

const greetings = getGreetings(hours);

console.log(`${greetings}, ${name}!`);

// 8️⃣ Exit Process Safely
process.exit(0);
