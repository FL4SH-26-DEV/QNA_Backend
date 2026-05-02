/**
 * Validates the /api/ask request body.
 */
function validateAskRequest(req, res, next) {
  const { context, question } = req.body;

  if (!context || typeof context !== 'string' || context.trim().length === 0) {
    return res.status(400).json({ error: 'context is required and must be a non-empty string.' });
  }

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'question is required and must be a non-empty string.' });
  }

  if (context.trim().length < 10) {
    return res.status(400).json({ error: 'context is too short. Please provide meaningful text.' });
  }

  if (question.trim().length < 3) {
    return res.status(400).json({ error: 'question is too short.' });
  }

  // Sanitize — trim whitespace
  req.body.context = context.trim();
  req.body.question = question.trim();

  next();
}

module.exports = { validateAskRequest };
