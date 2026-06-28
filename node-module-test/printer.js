// Kisi bhi tarah ka require('react') yahan se hata do bhai

function showDetails(userName) {
  console.log(`\n--- [Module Wrapper Proof for ${userName}] ---`);
  console.log(`Folder Path (__dirname): ${__dirname}`);
  console.log(`File Path (__filename): ${__filename}`);
  return `Kaam ho gaya, ${userName}!`;
}

module.exports = { showDetails };
