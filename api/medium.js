// API endpoint to fetch Medium blog posts
// This serverless function fetches from RSS2JSON API server-side to avoid CORS issues

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('Fetching Medium posts...');
    
    // Fetch from RSS2JSON API
    const cacheBuster = new Date().getTime();
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@sakthimurugan102003/feed&count=10&_=${cacheBuster}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );

    if (!response.ok) {
      console.error('RSS2JSON API error:', response.status);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data, posts count:', data.items?.length || 0);

    // Return the data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error.message,
      items: [] 
    });
  }
}
