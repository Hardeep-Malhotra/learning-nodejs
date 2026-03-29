const fs = require("node:fs");

const zlib = require("node:zlib");

const readableStream = fs.createReadStream("input.txt.");

const gzip = zlib.createGzip();

const writableStream = fs.createWriteStream("input.txt.gz");

readableStream
  .pipe(gzip)
  .pipe(writableStream)
  .on("finish", () => {
    console.log("File successfully compressed");
  });
