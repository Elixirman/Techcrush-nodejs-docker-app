const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const startTime = new Date();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from my Dockerized Node.js app!',
    hostname: os.hostname(),
    uptime_seconds: Math.floor((Date.now() - startTime.getTime()) / 1000),
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'nodejs-docker-demo',
    version: '1.0.0',
    node_version: process.version,
    platform: process.platform
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
