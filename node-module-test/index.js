// Executor module ko import kiya
const executor = require("./executer");

console.log("=== PROGRAM START ===");

// Humne executor ko bola: 'printer.js' waala module chalao aur naam do 'Rahul'
executor.runMyModule("printer", "Rahul");

console.log("\n=== PROGRAM END ===");
