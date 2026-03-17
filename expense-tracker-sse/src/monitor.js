import os from "node:os";
import chalk from "chalk";

// ================================
// 🔹 Calculate CPU Usage
// ================================
function calculateCPU(oldCpu, newCpu) {
  const oldTotal = Object.values(oldCpu.times).reduce((a, b) => a + b);
  const newTotal = Object.values(newCpu.times).reduce((a, b) => a + b);

  const totalDiff = newTotal - oldTotal;
  const idleDiff = newCpu.times.idle - oldCpu.times.idle;

  return ((totalDiff - idleDiff) / totalDiff) * 100;
}

// ================================
// 🔹 CPU Color Logic
// ================================
function colorCPU(usage) {
  if (usage < 40) return chalk.green(usage.toFixed(2) + " %");
  if (usage < 75) return chalk.yellow(usage.toFixed(2) + " %");
  return chalk.red.bold(usage.toFixed(2) + " %");
}

// ================================
// 🔹 Memory Color Logic
// ================================
function colorMemory(percent) {
  if (percent < 50) return chalk.green(percent.toFixed(2) + " %");
  if (percent < 80) return chalk.yellow(percent.toFixed(2) + " %");
  return chalk.red.bold(percent.toFixed(2) + " %");
}

// ================================
// 🔹 Memory Progress Bar
// ================================
function memoryBar(percent) {
  const totalBlocks = 20;
  const filledBlocks = Math.round((percent / 100) * totalBlocks);

  const bar =
    "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);

  if (percent < 50) return chalk.green(bar);
  if (percent < 80) return chalk.yellow(bar);
  return chalk.red(bar);
}

let oldCpus = os.cpus();

// ================================
// 🚀 Monitor Loop
// ================================
setInterval(() => {
  const newCpus = os.cpus();

  // Clear screen properly
  process.stdout.write("\x1Bc");

  console.log(
    chalk.bgMagenta.white.bold("        🚀 SYSTEM MONITOR        ")
  );
  console.log(chalk.gray("============================================\n"));

  // ================================
  // 🖥 CPU SECTION
  // ================================
  console.log(chalk.cyan.bold("🖥 CPU Usage:\n"));

  newCpus.forEach((cpu, i) => {
    const percent = calculateCPU(oldCpus[i], newCpus[i]);
    console.log(`Core ${chalk.white(i)} : ${colorCPU(percent)}`);
  });

  oldCpus = newCpus;

  // ================================
  // 🧠 MEMORY SECTION
  // ================================
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  const usedGB = usedMemory / (1024 ** 3);
  const totalGB = totalMemory / (1024 ** 3);
  const memoryPercent = (usedMemory / totalMemory) * 100;

  console.log("\n" + chalk.cyan.bold("🧠 Memory Usage:\n"));

  console.log(
    chalk[memoryPercent > 80 ? "redBright" : "greenBright"](
      `Used: ${usedGB.toFixed(2)} GB / ${totalGB.toFixed(2)} GB`
    )
  );

  console.log("Usage:", colorMemory(memoryPercent));
  console.log(memoryBar(memoryPercent));

  console.log("\n" + chalk.gray("Updated every 1 second..."));

}, 1000);