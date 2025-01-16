import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../constants/openai';

const openai = new OpenAI({
  apiKey: OPENAI_CONFIG.API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getChatResponse(message: string): Promise<string | null> {
  if (!OPENAI_CONFIG.API_KEY) {
    console.warn('OpenAI API key is not configured');
    return null;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.MODELS.DEFAULT,
      messages: [
        {
          role: "system",
          content: OPENAI_CONFIG.SYSTEM_PROMPTS.ASSISTANT
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
}