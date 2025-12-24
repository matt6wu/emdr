import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);

const distDir = path.resolve(__dirname, "../dist");
const hasDist = fs.existsSync(distDir);

app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

if (hasDist) {
  app.use(express.static(distDir));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.status(500).send("dist/ not found. Run 'npm run build' first.");
  });
}

const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "hello", message: "ws connected" }));
  ws.on("message", (data) => {
    ws.send(data);
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`server listening on http://${HOST}:${PORT}`);
});
