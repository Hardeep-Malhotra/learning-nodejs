/****************************************************************************************
 *                     Node.js Transform Stream - Complete Notes
 *                      Beginner → Advanced → Production
 *
 * Author : Hardeep Singh
 * Notes  : ChatGPT
 ****************************************************************************************/

const fs = require("fs");
const { Transform } = require("stream");

/****************************************************************************************
 * 📌 Topic 1 : What is a Transform Stream?
 ****************************************************************************************/

/**
 * Definition
 * ----------
 * A Transform Stream is a special type of Duplex Stream.
 *
 * It can:
 * ✔ Read Data
 * ✔ Modify (Transform) Data
 * ✔ Write Data
 *
 * It performs all three operations at the same time.
 *
 * Flow:
 *
 * Input
 *   │
 *   ▼
 * Read Data
 *   │
 *   ▼
 * Modify Data
 *   │
 *   ▼
 * Output
 *
 * Real Life Examples
 * ------------------
 * ✔ Convert lowercase to uppercase
 * ✔ Compress files
 * ✔ Decompress files
 * ✔ Encrypt data
 * ✔ Decrypt data
 * ✔ Resize images
 * ✔ Modify CSV / JSON data
 */

/****************************************************************************************
 * 📌 Topic 2 : Creating a Simple Transform Stream
 ****************************************************************************************/

/**
 * First create a sample input file.
 */

fs.writeFileSync("input.txt", "hello this is a test file\n");

/****************************************************************************************
 * Transform Stream
 ****************************************************************************************/

const upperCaseTransform = new Transform({
  /**
   * transform()
   *
   * This method is called automatically
   * whenever a new chunk is received.
   */

  transform(chunk, encoding, callback) {
    /**
     * Convert Buffer into String
     */

    const text = chunk.toString();

    /**
     * Convert String into Uppercase
     */

    const upperText = text.toUpperCase();

    /**
     * Send transformed data
     * to the next stream.
     */

    callback(null, upperText);
  },
});

/****************************************************************************************
 * 📌 Topic 3 : Create Readable & Writable Streams
 ****************************************************************************************/

const readStream = fs.createReadStream("input.txt");

const writeStream = fs.createWriteStream("output-upper.txt");

/****************************************************************************************
 * 📌 Topic 4 : Connect Streams using pipe()
 ****************************************************************************************/

/**
 * Flow
 *
 * input.txt
 *      │
 *      ▼
 * Readable Stream
 *      │
 *      ▼
 * Transform Stream
 *      │
 *      ▼
 * Writable Stream
 *      │
 *      ▼
 * output-upper.txt
 */

readStream.pipe(upperCaseTransform).pipe(writeStream);

/****************************************************************************************
 * 📌 Topic 5 : finish Event
 ****************************************************************************************/

writeStream.on("finish", () => {
  console.log("✅ Transformation Completed\n");

  console.log("Output File:\n");

  console.log(fs.readFileSync("output-upper.txt", "utf8"));
});

/****************************************************************************************
 * 📌 Expected Output
 ****************************************************************************************/

/*

INPUT

hello this is a test file


↓

Transform Stream


↓

OUTPUT

HELLO THIS IS A TEST FILE

*/

/****************************************************************************************
 * 📌 Internal Working
 ****************************************************************************************/

/**

Readable Stream

        │

        ▼

Chunk

        │

        ▼

transform()

        │

        ▼

Modify Data

        │

        ▼

callback()

        │

        ▼

Writable Stream


*/

/****************************************************************************************
 * 📌 Interview Questions
 ****************************************************************************************/

/**

Q1. What is a Transform Stream?

Answer:

A Transform Stream is a special type of Duplex Stream
that can read, modify and write data.

------------------------------------------------------------

Q2. Which class is used?

Answer:

Transform

------------------------------------------------------------

Q3. Which method must be implemented?

Answer:

transform()

------------------------------------------------------------

Q4. What does callback() do?

Answer:

It sends the transformed data
to the next stream.

------------------------------------------------------------

Q5. Give real-world examples.

✔ Compression
✔ Encryption
✔ Uppercase Conversion
✔ Lowercase Conversion
✔ Image Processing
✔ CSV Processing

*/

/****************************************************************************************
 * 📌 Summary
 ****************************************************************************************/

/**

Transform Stream

↓

Reads Data

↓

Modifies Data

↓

Writes Data


Most Important Method

transform(chunk, encoding, callback)

*/
