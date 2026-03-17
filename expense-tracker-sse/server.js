import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

const PORT = 3000;
const DB_PATH = "./db.json";
let count = 0;

// Helper: JSON file read karne ke liye
async function getDbData() {
    try {
        const data = await readFile(DB_PATH, "utf-8");
        return JSON.parse(data);
    } catch {
        return []; // Agar file nahi hai toh empty array return karo
    }
}

const server = createServer(async (req, res) => {
    const { url, method } = req;

    // --- 1. Server-Sent Events (SSE) ---
    if (url === "/events") {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        });

        const interval = setInterval(() => {
            res.write(`data: The Count is ${count++}\n\n`);
        }, 1000);

        req.on("close", () => clearInterval(interval));
        return;
    }

    // --- 2. Static Pages & API Routes ---
    switch (url) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            createReadStream("./index.html").pipe(res);
            break;

        case "/about":
            res.writeHead(200, { "Content-Type": "text/html" });
            createReadStream("./about.html").pipe(res);
            break;

        case "/expenss": // Note: Spelling 'expenses' check kar lena
            if (method === "GET") {
                const data = await readFile(DB_PATH, "utf-8").catch(() => "[]");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(data);
            } 
            else if (method === "POST") {
                let body = "";
                req.on("data", chunk => body += chunk);
                req.on("end", async () => {
                    try {
                        const dbData = await getDbData();
                        dbData.push(JSON.parse(body));
                        await writeFile(DB_PATH, JSON.stringify(dbData, null, 2));
                        
                        res.writeHead(201, { "Content-Type": "text/plain" });
                        res.end("Expense Saved Successfully");
                    } catch (err) {
                        res.writeHead(400).end("Invalid JSON");
                    }
                });
            }
            break;

        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Page Not Found</h1>");
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});