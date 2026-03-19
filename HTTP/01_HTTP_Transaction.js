/**
 * ===============================================
 * 🌐 NODE.JS HTTP SERVER - COMPLETE ANATOMY
 * ===============================================
 * This file explains how an HTTP transaction works in Node.js.
 * Covers:
 * - Server creation
 * - Request handling
 * - Streams (data chunks)
 * - Headers & status codes
 * - Routing
 * - Error handling
 * ===============================================
 */

const http = require("node:http");

/**
 * =====================================================
 * 🚀 1. CREATE SERVER
 * =====================================================
 * - http.createServer() returns a server object
 * - It listens for incoming HTTP requests
 * - Callback runs on EVERY request
 */
const server = http.createServer((request, response) => {
  /**
   * =====================================================
   * 📌 2. REQUEST INFO (METHOD, URL, HEADERS)
   * =====================================================
   */
  const { method, url, headers } = request;
  const userAgent = headers["user-agent"];

  console.log(`📥 ${method} request received at ${url}`);
  console.log(`🖥️ User-Agent: ${userAgent}`);

  /**
   * =====================================================
   * ⚠️ 3. REQUEST ERROR HANDLING
   * =====================================================
   */
  request.on("error", (err) => {
    console.error("❌ Request Error:", err);
    response.statusCode = 400;
    response.end("Bad Request");
  });

  /**
   * =====================================================
   * 📦 4. HANDLE REQUEST BODY (STREAMS)
   * =====================================================
   * - Data comes in chunks (Buffer format)
   * - We collect chunks and combine later
   */
  let body = [];

  request.on("data", (chunk) => {
    body.push(chunk);
  });

  request.on("end", () => {
    /**
     * =====================================================
     * 🔄 5. CONVERT BUFFER → STRING
     * =====================================================
     */
    body = Buffer.concat(body).toString();

    /**
     * =====================================================
     * 🛣️ 6. ROUTING (URL + METHOD BASED)
     * =====================================================
     */

    /**
     * ☕ ROUTE 1: GET /coffee
     */
    if (url === "/coffee" && method === "GET") {
      response.writeHead(200, {
        "Content-Type": "text/plain",
      });

      response.end("Here is your coffee! ☕");
    } else if (url === "/echo" && method === "POST") {

    /**
     * 🔁 ROUTE 2: POST /echo
     */
      /**
       * ⚠️ RESPONSE ERROR HANDLING
       */
      response.on("error", (err) => {
        console.error("❌ Response Error:", err);
      });

      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");

      /**
       * 📤 SEND RESPONSE BACK
       */
      response.write("Echoing your data:\n");
      response.end(body);
    } else if (url === "/fast-echo" && method === "POST") {

    /**
     * ⚡ ROUTE 3: FAST ECHO (USING PIPE)
     */
      /**
       * 🔥 request.pipe(response)
       * - Automatically handles:
       *   ✔ data transfer
       *   ✔ stream ending
       *   ✔ backpressure
       */
      request.pipe(response);
    } else {

    /**
     * ❌ DEFAULT ROUTE (404)
     */
      response.statusCode = 404;
      response.end("Route Not Found ❌");
    }
  });
});

/**
 * =====================================================
 * ▶️ 7. START SERVER
 * =====================================================
 */
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
