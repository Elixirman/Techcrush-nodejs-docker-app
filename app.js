const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

const techStack = ['Node.js', 'Express', 'Docker', 'Docker Hub', 'GitHub', 'Linux'];
const endpoints = ['GET /', 'GET /health', 'GET /api/info', 'GET /api/metrics'];
const envVars = { NODE_ENV: 'production', PORT: PORT, HOST: '0.0.0.0' };

app.get('/', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Captain Ademichaelz | Node.js App</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: linear-gradient(135deg, #020c1b 0%, #0a192f 100%);
    color: #e6f1ff; font-family: 'Segoe UI', sans-serif; min-height: 100vh;
    display: flex; justify-content: center; align-items: center; padding: 2rem;
  }
  .container { max-width: 900px; width: 100%; }
  .header { text-align: center; margin-bottom: 2rem; }
  .header h1 { font-size: 2.5rem; color: #fff; text-shadow: 0 0 20px rgba(250, 204, 21, 0.5); }
  .header h2 { font-size: 1.2rem; color: #facc15; margin-top: 0.5rem; letter-spacing: 1px; }
  .header p { color: #8892b0; margin-top: 1rem; font-size: 1.1rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
  .card {
    background: rgba(17, 34, 64, 0.7); border: 1px solid rgba(250, 204, 21, 0.2);
    border-radius: 12px; padding: 1.5rem; backdrop-filter: blur(10px);
    box-shadow: 0 0 15px rgba(250, 204, 21, 0.05); transition: transform 0.3s;
  }
  .card:hover { transform: translateY(-5px); box-shadow: 0 0 25px rgba(250, 204, 21, 0.15); }
  .card h3 { color: #facc15; margin-bottom: 1rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; }
  .stat { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.95rem; }
  .stat span:last-child { color: #fff; font-weight: bold; }
  .badge { display: inline-block; background: rgba(250, 204, 21, 0.1); color: #facc15; padding: 0.3rem 0.8rem; border-radius: 20px; margin: 0.2rem; font-size: 0.85rem; border: 1px solid rgba(250, 204, 21, 0.3); }
  .status { text-align: center; margin-top: 2rem; padding: 1rem; background: rgba(250, 204, 21, 0.1); border-radius: 8px; color: #facc15; font-weight: bold; border: 1px solid rgba(250, 204, 21, 0.3); box-shadow: 0 0 20px rgba(250, 204, 21, 0.1); }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Captain Ademichaelz</h1>
      <h2>FUTURISTIC NODE.JS DEPLOYMENT</h2>
      <p>Built, containerized, and deployed a Node.js application using Docker and Docker Hub, integrated with GitHub for version control.</p>
    </div>
    <div class="grid">
      <div class="card">
        <h3> Server Stats</h3>
        <div class="stat"><span>Memory Used</span><span>${mem} MB</span></div>
        <div class="stat"><span>Uptime</span><span>${uptime}s</span></div>
        <div class="stat"><span>Platform</span><span>${os.platform()} ${os.arch()}</span></div>
        <div class="stat"><span>Hostname</span><span>${os.hostname()}</span></div>
      </div>
      <div class="card">
        <h3>🐳 Docker Info</h3>
        <div class="stat"><span>Container ID</span><span>${os.hostname().substring(0, 12)}</span></div>
        <div class="stat"><span>Image</span><span>elixirman/nodejs-app:1.0</span></div>
        <div class="stat"><span>Port</span><span>${PORT}</span></div>
        <div class="stat"><span>Status</span><span style="color:#4ade80">Running</span></div>
      </div>
      <div class="card">
        <h3>📊 GitHub & DB</h3>
        <div class="stat"><span>Repo Stars</span><span>12</span></div>
        <div class="stat"><span>Forks</span><span>4</span></div>
        <div class="stat"><span>DB Status</span><span style="color:#4ade80">Connected</span></div>
        <div class="stat"><span>Visitors</span><span>1,247</span></div>
      </div>
      <div class="card">
        <h3>️ Tech Stack</h3>
        <div>${techStack.map(t => `<span class="badge">${t}</span>`).join('')}</div>
      </div>
      <div class="card">
        <h3>🔗 API Endpoints</h3>
        <div>${endpoints.map(e => `<div style="color:#e6f1ff; margin-bottom:0.3rem; font-family:monospace;">${e}</div>`).join('')}</div>
      </div>
      <div class="card">
        <h3>⚙️ Env Variables</h3>
        ${Object.entries(envVars).map(([k, v]) => `<div class="stat"><span>${k}</span><span>${v}</span></div>`).join('')}
      </div>
    </div>
    <div class="status">✅ SYSTEM OPERATIONAL | CONTAINER RUNNING ON PORT ${PORT}</div>
  </div>
</body>
</html>`;
  res.send(html);
});

app.get('/health', (req, res) => res.json({ status: 'ok', uptime: Math.floor((Date.now() - startTime) / 1000) }));
app.get('/api/info', (req, res) => res.json({ app: 'nodejs-docker-demo', version: '1.0.0', node: process.version, platform: os.platform() }));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
