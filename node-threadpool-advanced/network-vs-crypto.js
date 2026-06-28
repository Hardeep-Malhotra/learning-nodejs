// Thread Pool size ko default (4) par hi rehne dete hain
const crypto = require("crypto");
const https = require("https");

const start = Date.now();

// 1. Network Task (Yeh OS Kernel me jaega, Thread Pool me NAHI)
function makeNetworkRequest(id) {
  https.get("https://www.google.com", (res) => {
    res.on("data", () => {});
    res.on("end", () => {
      console.log(
        `🌐 Network Request ${id} finished in: ${Date.now() - start} ms`,
      );
    });
  });
}

// 2. Crypto Task (Yeh Libuv ke Thread Pool me jaega)
function doCryptoTask(id) {
  crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
    console.log(`🔑 Crypto Task ${id} finished in: ${Date.now() - start} ms`);
  });
}

console.log("=== ADVANCED TEST START ===");

// Humne 6 network requests ek saath bheji
makeNetworkRequest(1);
makeNetworkRequest(2);
makeNetworkRequest(3);
makeNetworkRequest(4);
makeNetworkRequest(5);
makeNetworkRequest(6);

// Aur saath me 2 crypto tasks bhi bhej diye
doCryptoTask(1);
doCryptoTask(2);
