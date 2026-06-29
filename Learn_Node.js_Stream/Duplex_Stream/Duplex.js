/****************************************************************************************
 *                    Node.js Duplex Stream - Complete Notes
 *                  Beginner → Advanced → Interview Ready
 *
 * Author : Hardeep Singh
 ****************************************************************************************/

const { Duplex } = require("stream");

/****************************************************************************************
 * 📌 What is Duplex Stream?
 ****************************************************************************************/

/**
 * Definition:
 * -----------
 * A Duplex Stream is both a Readable Stream and a Writable Stream.
 *
 * It can:
 * ✔ Read Data
 * ✔ Write Data
 *
 * at the SAME TIME.
 *
 * Real Life Example:
 *
 * 📞 Phone Call
 *
 * You Speak  ---------> Friend
 * Friend Speaks ------> You
 *
 * Read + Write simultaneously.
 *
 * Examples:
 * ✔ TCP Socket
 * ✔ SSH
 * ✔ Chat Application
 * ✔ HTTP/2
 */

/****************************************************************************************
 * 📌 Creating a Custom Duplex Stream
 ****************************************************************************************/

const duplex = new Duplex({
  /**************************************************************************
   * read(size)
   *
   * Called whenever Node.js needs more data.
   **************************************************************************/

  read(size) {
    console.log("\n📖 read() called");

    this.push("Hello Hardeep\n");
    this.push("Welcome to Duplex Stream\n");

    // No more data
    this.push(null);
  },

  /**************************************************************************
   * write(chunk, encoding, callback)
   *
   * Called whenever someone writes data.
   **************************************************************************/

  write(chunk, encoding, callback) {
    console.log("\n✍ write() called");

    console.log("Received Data :");

    console.log(chunk.toString());

    callback();
  },
});

/****************************************************************************************
 * 📌 Reading Data
 ****************************************************************************************/

duplex.on("data", (chunk) => {
  console.log("\n📥 data Event");

  console.log(chunk.toString());
});

/****************************************************************************************
 * 📌 end Event
 ****************************************************************************************/

duplex.on("end", () => {
  console.log("\n✅ end Event");

  console.log("Readable Side Finished");
});

/****************************************************************************************
 * 📌 finish Event
 ****************************************************************************************/

duplex.on("finish", () => {
  console.log("\n✅ finish Event");

  console.log("Writable Side Finished");
});

/****************************************************************************************
 * 📌 close Event
 ****************************************************************************************/

duplex.on("close", () => {
  console.log("\n🔒 close Event");
});

/****************************************************************************************
 * 📌 error Event
 ****************************************************************************************/

duplex.on("error", (err) => {
  console.log(err.message);
});

/****************************************************************************************
 * 📌 Writing Data
 ****************************************************************************************/

duplex.write("Node.js\n");

duplex.write("Streams\n");

duplex.write("Interview Preparation\n");

/**
 * Stop Writing
 */

duplex.end();

/****************************************************************************************
 * 📌 Internal Working
 ****************************************************************************************/

/*

Writable Side

Application

        │

        ▼

write()

        │

        ▼

Duplex Stream

        │

        ▼

callback()

-----------------------------------------------

Readable Side

Duplex Stream

        │

        ▼

push()

        │

        ▼

data Event

        │

        ▼

Application

*/

/****************************************************************************************
 * 📌 Output
 ****************************************************************************************/

/*

✍ write() called
Node.js

✍ write() called
Streams

✍ write() called
Interview Preparation

📖 read() called

📥 data Event
Hello Hardeep

📥 data Event
Welcome to Duplex Stream

finish Event

end Event

close Event

*/

/****************************************************************************************
 * 📌 Interview Questions
 ****************************************************************************************/

/*

Q1. What is Duplex Stream?

Answer:
A Duplex Stream is both Readable and Writable.
It can read and write data simultaneously.

------------------------------------------------------

Q2. Which methods are mandatory?

✔ read()
✔ write()

------------------------------------------------------

Q3. What is push()?

Answer:
push() sends data from the readable side.

------------------------------------------------------

Q4. What is callback()?

Answer:
callback() tells Node.js that writing has completed.

------------------------------------------------------

Q5. Difference between Duplex and Transform?

Duplex
-------
Read + Write

Transform
----------
Read + Modify + Write

------------------------------------------------------

Q6. Real-world examples?

✔ TCP Socket
✔ SSH
✔ Chat Application
✔ HTTP/2

*/

/****************************************************************************************
 * 📌 Summary
 ****************************************************************************************/

/*

Readable Stream

↓

Read Only

----------------------------

Writable Stream

↓

Write Only

----------------------------

Duplex Stream

↓

Read + Write

----------------------------

Transform Stream

↓

Read + Modify + Write

*/
