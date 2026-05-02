const express = require('express');
const router = express.Router();
const { answerQuestion } = require('../services/qa.service');
const { validateAskRequest } = require('../middleware/validation.middleware');

/**
 * POST /api/ask
 * Body: { context: string, question: string }
 * Returns: { answer: string }
 */
router.post('/ask', validateAskRequest, async (req, res, next) => {
  try {
    const { context, question } = req.body;

    console.log(`[Q&A] Question: "${question.substring(0, 80)}..."`);

    const answer = await answerQuestion(context, question);

    res.json({
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
  console.error('[Full Error]', error);  // Add this to see the REAL error
  if (error?.status === 401 || error?.message?.includes('API_KEY')) {
    return next({ status: 401, message: 'Invalid API key. Please check your GEMINI_API_KEY.' });
  }
  if (error?.status === 429) {
    return next({ status: 429, message: 'LLM rate limit reached. Please try again shortly.' });
  }
  next(error);
}
});

module.exports = router;
