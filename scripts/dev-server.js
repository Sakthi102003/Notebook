// Simple local development server for Medium API
// Run this with: node dev-server.js

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple local .env loaded mapped to process.env
try {
  const envFiles = ['../.env.local', '../.env'];
  for (const file of envFiles) {
    const envPath = path.resolve(__dirname, file);
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8');
      envFile.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
         if (match && !process.env[match[1].trim()]) {
           process.env[match[1].trim()] = match[2].trim();
         }
      });
      console.log(`Loaded environment variables from ${file}`);
    }
  }
} catch (e) {
  console.log("Could not load local .env:", e.message);
}

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url.startsWith('/api/medium')) {
    console.log('Fetching Medium posts...');
    
    const url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed&count=10&_=${Date.now()}`;
    
    https.get(url, (apiRes) => {
      let data = '';
      
      apiRes.on('data', (chunk) => {
        data += chunk;
      });
      
      apiRes.on('end', () => {
        console.log('Got Medium posts data');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }).on('error', (err) => {
      console.error('Error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'error', message: err.message, items: [] }));
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📡 Medium API endpoint: http://localhost:${PORT}/api/medium`);
});
