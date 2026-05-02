const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Answers a question based strictly on the provided context text.
 * Uses OpenAI GPT-4o-mini — fast and very cheap (~$0.01 per 100 questions)
 * @param {string} context  - The pasted text block
 * @param {string} question - The user's question
 * @returns {Promise<string>} The answer from the LLM
 */
async function answerQuestion(context, question) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a precise Q&A assistant. Your job is to answer questions strictly using only the provided context text.

Rules:
1. Answer ONLY using information explicitly stated in the provided context.
2. Do NOT use any outside knowledge or make assumptions beyond what is written.
3. If the answer cannot be found in the context, respond with exactly: "Not found in the provided text."
4. Keep answers concise and accurate.
5. Quote or reference relevant parts of the context when helpful.`,
      },
      {
        role: 'user',
        content: `Context:\n"""\n${context}\n"""\n\nQuestion: ${question}\n\nAnswer based only on the context above:`,
      },
    ],
    max_tokens: 1024,
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}

module.exports = { answerQuestion };
