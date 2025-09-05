// Updated to use secure serverless API instead of client-side OpenAI
export async function getChatResponse(userMessage: string): Promise<string> {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        return data.response || 'Sorry, I could not process your request.';
    } catch (error) {
        console.error('Chat API error:', error);
        throw new Error('Chat feature is temporarily unavailable');
    }
}
