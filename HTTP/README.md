# 🌐 Anatomy of an HTTP Transaction (Node.js)

This guide explains how HTTP works in Node.js in a simple and clear way.
It helps you understand how a request comes to the server and how a response is sent back.

---

## **1. Create the Server: The Entry Point**

In Node.js, the http module is the foundation of all web activity. When you call http.createServer(), you are initializing a new instance of http.Server.

The Request Handler
The function passed to createServer is known as the Request Handler.

It is an EventEmitter: Specifically, it listens for the 'request' event.

It is Non-blocking: Node.js handles thousands of these connections concurrently without waiting for one to finish before starting the next.

```js
const http = require("node:http");

const server = http.createServer((request, response) => {
  // Every time a browser hits the server, this block executes.
});

// Port 3000 is our "address" on the machine.
server.listen(3000, () => {
  console.log("Server is alive!");
});
```

## **2. Request Info: Method, URL, and Headers**

When a request hits the server, the request object (an instance of IncomingMessage) contains metadata about the call.

Method: The HTTP verb `(GET, POST, PUT, DELETE)`. It tells the server the intent.

URL: The path `(e.g., /api/users)`. It tells the server the target.

Headers: A collection of key-value pairs. Node.js automatically converts all header names to lowercase **(e.g., User-Agent becomes user-agent)** to prevent casing bugs.

## **3. Request Body: The Stream Architecture**

This is where most beginners get confused. In Node.js, the request body doesn't just "appear" as a string. It is a Readable Stream.

**Why Streams?**

If a user uploads a 1GB file, Node.js doesn't wait for the whole file to arrive in RAM. It processes it in Chunks (usually 64KB buffers).

`'data'` event: Fired every time a new chunk arrives.

`'end'` event: Fired when the last chunk is received.

**Buffer:** Chunks arrive as binary data. We collect them in an array and use Buffer.concat() to stitch them back together.

```JavaScript
let body = [];
request.on('data', (chunk) => {
  body.push(chunk); // Storing binary pieces
}).on('end', () => {
  body = Buffer.concat(body).toString(); // Converting binary to text
});
```

---

## **4. Error Handling: Preventing the Crash**

Because Node.js is single-threaded, an unhandled error in a stream will throw an exception and kill the entire process.

Request Errors: Can happen if the client disconnects abruptly.

**Response Errors:** Can happen if the network fails while sending data back.

**Rule of Thumb:** Always attach an .on('error', ...) listener to both the request and response objects.

```js
request.on("error", (err) => {
  console.error(err);
});
```

---

## **5. Routing: The Logic Gate**

Routing is the process of mapping a specific URL + Method combination to a specific piece of code.

**Static Routing:** Exact matches (e.g., if (url === '/about')).

**Dynamic Routing:** Using regex or parameters (usually handled by frameworks like Express).

```js
if (request.method === 'GET' && request.url === '/home') // handle route
```

---

## **6. The Response: Status, Headers, and Body**

The response object is an instance of ServerResponse and a Writable Stream.

The Order Matters
In the HTTP protocol, the "Envelope" (Status and Headers) must be sent before the "Letter" (Body).

**Status Code:** 200 (Success), 404 (Not Found), 500 (Server Error).

**Headers:** Telling the browser what to expect (e.g., Content-Type: application/json).

**Body:** The actual data.

**writeHead vs setHeader**  
`res.setHeader():` Sets one header at a time.

`res.writeHead():` Sets the status code and all headers in one go. Once this is called, you cannot change the headers anymore.

---

## **7. Sending Data: write() and end()**

`res.write():` Can be called multiple times to send chunks of data to the client (Progressive loading).

## `res.end():` Signals to the server and the client that the response is complete. Every request must call res.end(), otherwise, the browser will hang forever.

## **8. The Power of pipe()**

The **pipe()** method is the most efficient way to move data from a source (Request) to a destination (Response).

```JavaScript
// Echo Server in one line
request.pipe(response);
What pipe() does for you:
```

Listens for 'data' and writes it to the response.

Handles Backpressure (pausing the read if the write is too slow).

Automatically calls res.end() when the request stream finishes.

---

## 🧠 Key Concepts

| Concept      | Meaning              |
| ------------ | -------------------- |
| Stream       | Data comes in parts  |
| Buffer       | Binary data          |
| EventEmitter | Handles events       |
| pipe()       | Direct data transfer |
| Routing      | URL-based logic      |

---

# **🌐 Enterprise Network Configuration in Node.js**

## This guide explains how to configure Node.js applications to operate effectively within restricted corporate environments, handling Proxies and Custom Certificate Authorities (CAs).

## **📑 Table of Contents**

Overview

Proxy Configuration

Environment Variables

Command Line Flags

Programmatic Setup

Proxy Bypass (NO_PROXY)

Certificate Authority (CA) Configuration

System CA Trust

Extra CA Certificates

Programmatic CA Management

Summary Table

---

## **🏛️ Overview**

In enterprise settings, applications don't have direct internet access. They must navigate:

**Corporate Proxies:** Middleman servers for security and monitoring.

**Private CAs:** Internal SSL/TLS certificates that Node.js doesn't trust by default.

**Node.js (v22.21.0+ and v24+)** now provides built-in support to handle these without third-party libraries like https-proxy-agent.

---

## **🔌 Proxy Configuration**

### **🌍 Environment Variables**

Node.js can automatically pick up system proxy settings if enabled.

Setup (POSIX/Bash):

```Bash
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NODE_USE_ENV_PROXY=1
```

`node app.js`

🚩 Command Line Flags
Alternatively, enable it per execution:

```Bash
node --use-env-proxy app.js
```

💻 Programmatic Setup (Code Level)
If you need specific proxies for specific requests, use the agent option:

```JavaScript
const https = require('node:https');

const agent = new https.Agent({
  proxyEnv: { HTTPS_PROXY: 'http://username:password@proxy.company.com:8080' },
});
https.request({ hostname: 'external.com', agent }, (res) => { ... });
```

---

### **🚫 Proxy Bypass (NO_PROXY)**

---

Use `NO_PROXY` to define addresses that should not go through the proxy (e.g., internal tools or localhost).

| Syntax          | Description                                                      | Example Match                        |
| --------------- | ---------------------------------------------------------------- | ------------------------------------ |
| \*              | Bypass everything. No proxy will be used for any host.           | google.com, internal.sitecompany.com |
| google.com      | Exact hostname. Only this specific domain will be bypassed.      | google.com                           |
| .company.com    | Domain suffix. All subdomains of this domain will be bypassed.   | api.company.com, mail.company.com    |
| \*.company.com  | Wildcard match. Same as suffix match, applies to all subdomains. | dev.company.com                      |
| 192.168.1.1     | Exact IP address. Only this specific IP will be bypassed.        | 192.168.1.1                          |
| 192.168.1.1-100 | IP range. All IPs within this range will be bypassed.            | 192.168.1.50                         |
| localhost       | Local machine. Requests to your own computer.                    | 127.0.0.1, localhost                 |

---

## **🔐 Certificate Authority (CA) Configuration**

By default, Node.js uses its own bundled root CAs. Corporate "Self-signed" certificates will trigger the error:
Error: self signed certificate in certificate chain

---

## **🛡️ System CA Trust**

Trust certificates already installed in your OS (Windows Cert Store / macOS Keychain):

---

# Environment Variable

NODE_USE_SYSTEM_CA=1 node app.js

---

# Flag

node --use-system-ca app.js

## **📁 Extra CA Certificates**

If you have a specific .pem file from your IT department:

```Bash
export NODE_EXTRA_CA_CERTS=/path/to/company-ca-bundle.pem
node app.js
```

## **⚙️ Programmatic CA Management**

You can merge system certificates with Node's defaults in your code:

```JavaScript
const tls = require('node:tls');
const currentCerts = tls.getCACertificates('default');
const systemCerts = tls.getCACertificates('system');

tls.setDefaultCACertificates([...currentCerts, ...systemCerts]);
```

---

## 📊 Summary Table

| Requirement      | Variable / Flag      | Purpose                                                             |
| ---------------- | -------------------- | ------------------------------------------------------------------- |
| Use Proxy        | NODE_USE_ENV_PROXY=1 | Route traffic through `HTTP_PROXY`.                                 |
| Trust OS Store   | --use-system-ca      | Fix "Self-signed certificate" errors using OS trusted certificates. |
| Bypass Proxy     | NO_PROXY             | Direct connection for internal/local hosts (skip proxy).            |
| Custom Cert File | NODE_EXTRA_CA_CERTS  | Load additional `.pem` certificate files.                           |

---

#### **🚀 Key Takeaway**

---

When working in a corporate environment, Node.js v22+ makes life easier by allowing system-wide proxy and certificate integration without extra dependencies.
