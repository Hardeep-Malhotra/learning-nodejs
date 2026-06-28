const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

// 1. File I/O Task (Thread pool use karega)
fs.readFile(__filename, () => {
  console.log(`📁 File Read Task finished in: ${Date.now() - start} ms`);
});

// 2. Crypto Tasks (Yeh bhi thread pool use karenge)
function doCryptoTask(id) {
  crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", () => {
    console.log(`🔑 Crypto Task ${id} finished in: ${Date.now() - start} ms`);
  });
}

// Humne 4 crypto tasks bhej diye (Saare 4 threads busy)
doCryptoTask(1);
doCryptoTask(2);
doCryptoTask(3);
doCryptoTask(4);
