# ContextIQ Backend — Node.js Q&A API

> Express-based backend that answers questions strictly from provided context using AI.

---

## 🎯 Project Overview

The backend processes user queries by:

- Receiving context and question from frontend
- Validating the input
- Sending a structured prompt to OpenAI
- Returning an answer derived strictly from the context

This layer ensures **accuracy, validation, and controlled AI behavior**.

---

## 🛠️ Tech Stack

| What | Technology |
|------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| AI | OpenAI GPT-4o-mini |
| Security | Helmet, CORS |
| Config | dotenv |

---

## 📁 Project Structure
src/
server.js # App setup and middleware
routes/
qa.routes.js # API routes
services/
qa.service.js # OpenAI logic
middleware/
validation.middleware.js # Input validation


---

## 🔄 Request Flow
Request → Validation → Prompt Creation → OpenAI Call → Response


---

## 💬 Prompt Strategy

To prevent hallucination, the backend uses a strict prompt structure:

### System Instruction
Answer ONLY using the provided context.
Do not use outside knowledge.
If not found, respond accordingly.


### User Input

This ensures the AI stays within the given text.

---

## 🔐 Key Features

- Input validation (context & question)
- Controlled AI prompt design
- Rate limiting for API protection
- Secure headers using Helmet
- CORS configuration
- Structured error handling

---

## 🎯 Responsibility

The backend is responsible for:

- Validating requests
- Handling business logic
- Communicating with AI services
- Returning structured responses