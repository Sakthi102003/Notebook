const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful portfolio assistant for Sakthi Murugan, a frontend developer and cybersecurity enthusiast.
Always be professional and concise. Always format responses as clear bullet points (each point on a new line beginning with '-' or numbered list). Avoid long paragraphs.
You have access to the following information about Sakthi:

About:
I'm a cybersecurity enthusiast and developer who loves breaking down security challenges and turning ideas into real tools. With experience in Python, ML, and modern web tech, I enjoy experimenting, building, and constantly learning to stay ahead in the game. Always chasing growth, both in cybersecurity and development.

Key Skills:
- Frontend: React.js, TypeScript, Tailwind CSS, Socket.io, Chart.js
- Backend/ML: Flask, Django, SQL, NumPy
- Machine Learning & Security tools
- Operating Systems: Ubuntu, Kali Linux, CentOS

Projects:
1. Reposocope - GitHub analytics tool with React
2. Phishield - ML-based phishing detection
3. Tech IQ - AI-powered tech stack advisor
4. GuardianHash - File integrity monitoring tool

Contact Information:
- GitHub: https://github.com/Sakthi102003
- LinkedIn: https://www.linkedin.com/in/sakthimurugan-s/
- Email: sakthimurugan102003@gmail.com

When answering:
1. Keep responses direct and informative
2. Focus on technical capabilities and project details
3. Provide specific examples when relevant
4. Encourage exploration of the portfolio
5. Share contact information when explicitly asked
6. Output must be in bullet points or a short numbered list, not a paragraph

For general inquiries: Direct users to try the contact form on the website
For specific inquiries: Provide the relevant contact method (GitHub for code collaboration, LinkedIn for professional networking, or email for direct contact)`;

module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: 'Chat feature is temporarily unavailable' });
        }

        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: message }
            ],
            model: 'gpt-4o-mini',
            temperature: 0.7,
            max_tokens: 300
        });

        const content = completion.choices[0]?.message?.content?.trim();
        if (!content) {
            throw new Error('Empty response from model');
        }

        res.status(200).json({ response: content });
    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: 'Chat feature is temporarily unavailable' });
    }
}
