/**
 * ENTERPRISE NETWORK CONFIGURATION IN NODE.JS
 * -------------------------------------------
 * This guide covers how to make Node.js work inside corporate environments
 * using Proxies and Custom Certificate Authorities (CAs).
 */

const http = require("node:http");
const https = require("node:https");
const tls = require("node:tls");

/**
 * TOPIC 1: PROXY CONFIGURATION
 * ----------------------------
 * In enterprises, you can't hit the internet directly. You go through a Proxy.
 * Settings are usually provided via:
 * HTTP_PROXY, HTTPS_PROXY, and NO_PROXY.
 */

// --- Scenario A: Using Environment Variables (Node v22.21.0+) ---
// To enable this, you run your app with: NODE_USE_ENV_PROXY=1 node app.js
// Or use the flag: node --use-env-proxy app.js

// --- Scenario B: Configure Proxy Programmatically (Per Request) ---
// If you don't want to use global env variables, use an Agent.
const proxyAgent = new https.Agent({
  proxyEnv: { HTTPS_PROXY: "http://username:password@proxy.company.com:8080" },
});

function makeProxiedRequest() {
  https
    .request(
      {
        hostname: "www.google.com",
        port: 443,
        path: "/",
        agent: proxyAgent, // Using our specific proxy agent
      },
      (res) => {
        console.log("Status via Proxy:", res.statusCode);
      },
    )
    .end();
}

// --- Scenario C: Overriding Global Agents ---
// This forces ALL http/https requests to use the proxy (except fetch).
http.globalAgent = new http.Agent({
  proxyEnv: { HTTP_PROXY: "http://proxy.company.com:8080" },
});
https.globalAgent = new https.Agent({
  proxyEnv: { HTTPS_PROXY: "http://proxy.company.com:8080" },
});

/**
 * TOPIC 2: CERTIFICATE AUTHORITY (CA) CONFIGURATION
 * -------------------------------------------------
 * Node.js normally uses its own list of trusted CAs. In companies,
 * you need to trust "System CAs" or "Custom CA Files".
 */

// --- Scenario A: Trust System Store (Node v22.15.0+) ---
// Flag: node --use-system-ca app.js
// This makes Node.js trust certificates from Windows Cert Store / macOS Keychain.

// --- Scenario B: Add System CAs Programmatically ---
function setupSystemCAs() {
  const currentCerts = tls.getCACertificates("default");
  const systemCerts = tls.getCACertificates("system");

  // Combine Node's defaults with the OS's system certificates
  tls.setDefaultCACertificates([...currentCerts, ...systemCerts]);
  console.log("System CAs added to trust list.");
}

// --- Scenario C: Custom CA for Individual Requests ---
const specialCerts = [
  "-----BEGIN CERTIFICATE-----\n...MII... (Your Company Cert)\n-----END CERTIFICATE-----",
];

function makeSecureInternalRequest() {
  https.get(
    {
      hostname: "internal.company.com",
      ca: specialCerts, // Replaces default CAs with this one
    },
    (res) => {
      console.log("Internal Site Status:", res.statusCode);
    },
  );
}

/**
 * TOPIC 3: PROXY BYPASS (NO_PROXY)
 * -------------------------------
 * Sometimes you DON'T want a proxy (like for localhost).
 * NO_PROXY support includes:
 * '*'             - Bypass for everything
 * 'company.com'   - Exact match
 * '.company.com'  - Domain suffix match
 * '192.168.1.1'   - Exact IP
 */

console.log("Enterprise Network Module Loaded.");

// Exporting examples to try
module.exports = {
  makeProxiedRequest,
  setupSystemCAs,
  makeSecureInternalRequest,
};
