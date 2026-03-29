const fs = require('node:fs');

const writeStream = fs.createWriteStream('output.txt', {
  encoding: 'utf-8',
});

let i = 0;
const maxIterations = 100000; // Zyada data taaki buffer bhar sake

function writeData() {
  let canWrite = true;

  // Jab tak buffer mein jagah hai aur humara data baki hai
  while (i < maxIterations && canWrite) {
    const data = `Line number: ${i}\n`;
    
    canWrite = writeStream.write(data);
    i++;

    if (!canWrite) {
      // Buffer bhar gaya!
      console.log('⚠️ Buffer is full at index:', i);
      
      // 'drain' event ka wait karein, phir wapis start karein
      writeStream.once('drain', () => {
        console.log('✅ Buffer drained! Resuming...');
        writeData(); 
      });
    }
  }

  if (i === maxIterations) {
    writeStream.end();
    console.log('🏁 All data written.');
  }
}

writeData();