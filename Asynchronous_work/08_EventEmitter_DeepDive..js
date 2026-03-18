/**
 * 📡 TOPIC: NODE.JS EVENT EMITTER (The Radio System)
 * -----------------------------------------------
 * Logic: 
 * 1. .on()     -> Continuous listening (Har baar chalega)
 * 2. .once()   -> Single-time listening (Sirf ek baar)
 * 3. .emit()   -> Triggering the event (Kaam shuru/khatam karna)
 * 4. .off()    -> Removing a listener (Listening band karna)
 */

const EventEmitter = require("node:events");
const myEmitter = new EventEmitter();

console.log("--- 🚀 EventEmitter System Initialized ---\n");

// ---------------------------------------------------------
// ✅ 1. .on() - Continuous Listener (Multiple Events)
// ---------------------------------------------------------
myEmitter.on("commitComplete", (id, message) => {
  console.log(`✅ Event Received: #${id} | Message: "${message}"`);
});

// ---------------------------------------------------------
// ✅ 2. .once() - One-Time Listener
// Ye sirf pehli baar chalega, uske baad khud delete ho jayega.
// ---------------------------------------------------------
myEmitter.once("login", (email, password) => {
  console.log(`🔑 [ONCE] User Logged In: ${email} (Password: ${password})`);
});

// ---------------------------------------------------------
// ✅ 3. .off() / .removeListener() - Stopping a Listener
// ---------------------------------------------------------
const tempCallback = () => {
  console.log("⚠️ This is a temporary alert!");
};

myEmitter.on("tempEvent", tempCallback);


// --- TRIGGERING EVENTS (The Race) ---

// Testing .once() -> Sirf pehla wala chalega
myEmitter.emit("login", "hardeep@microsoft.com", "12345678");
myEmitter.emit("login", "hack@microsoft.com", "00000000"); // No Output

// Testing .on() -> Alag-alag time par chalenge
console.log("\nStarting AI Commit Process...");

setTimeout(() => {
  myEmitter.emit("commitComplete", 12936, "feat: logic_1");
}, 1000);

setTimeout(() => {
  myEmitter.emit("commitComplete", 123473, "feat: logic_2");
}, 2000);

// Testing .off()
console.log("\nTesting Temporary Event...");
myEmitter.emit("tempEvent"); // Chalega

myEmitter.off("tempEvent", tempCallback); // Listener removed
myEmitter.emit("tempEvent"); // No Output (Successfully removed)

// ---------------------------------------------------------
// ✅ 4. .removeAllListeners() - Total Cleanup
// ---------------------------------------------------------
setTimeout(() => {
  console.log("\n--- 🧹 Cleaning up all listeners ---");
  myEmitter.removeAllListeners("commitComplete");
  
  // Ab ye emit nahi hoga kyunki listener remove ho chuka hai
  myEmitter.emit("commitComplete", 124436, "feat: logic_3"); 
  
  console.log("🏁 End of EventEmitter Demo.");
}, 3000);