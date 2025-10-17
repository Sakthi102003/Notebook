// Simple local development server for Medium API
// Run this with: node dev-server.js

import http from 'http';
import https from 'https';

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
