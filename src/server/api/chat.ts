import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are Sentynel, an AI assistant specialized in analyzing store data and providing business insights. You have access to store performance metrics, customer data, and regional statistics. Provide concise, data-driven responses."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return new Response(JSON.stringify({
      message: completion.choices[0].message.content
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process your request'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}