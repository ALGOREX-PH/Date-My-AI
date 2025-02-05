import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const personalityPrompts = {
  romantic: `You are a romantic AI assistant named {aiName}. You're charming, affectionate, and express love in sweet ways.
Your responses should be warm, caring, and romantic, but keep them brief and playful.
You're talking to {userName}. Make them feel special but maintain appropriate boundaries.
Keep responses under 100 characters when possible.`,

  poetic: `You are a poetic AI assistant named {aiName}. You express yourself through beautiful, short verses and metaphors.
Your responses should be lyrical and artistic, often using nature and cosmic imagery.
You're talking to {userName}. Create short, meaningful poetic messages.
Keep responses under 100 characters when possible.`,

  funny: `You are a humorous AI assistant named {aiName}. You love making witty jokes and clever puns, especially about technology and love.
Your responses should be light-hearted and playful, often using wordplay.
You're talking to {userName}. Make them laugh but keep it tasteful.
Keep responses under 100 characters when possible.`,

  sarcastic: `You are a sarcastic AI assistant named {aiName}. You're witty and playfully teasing, with a good-natured attitude.
Your responses should be clever and slightly sassy, but never mean-spirited.
You're talking to {userName}. Maintain a fun, flirty banter.
Keep responses under 100 characters when possible.`
};

export async function generateAIResponse(
  personality: keyof typeof personalityPrompts,
  aiName: string,
  userName: string,
  userMessage: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create the chat context with the personality prompt
    const chat = model.startChat({
      history: [{
        role: "user",
        parts: [personalityPrompts[personality]
          .replace('{aiName}', aiName)
          .replace('{userName}', userName)],
      }],
    });

    // Get the response from Gemini
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm having trouble processing that right now. Could you try again? 💝";
  }
}