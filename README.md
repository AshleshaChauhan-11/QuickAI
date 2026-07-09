# QuickAI 

> An AI-powered SaaS platform that helps users generate high-quality content, create AI images, edit images, and improve productivity using Google's Gemini AI.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Database-Neon-blue)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

QuickAI is a modern Full-Stack AI SaaS application that combines multiple AI-powered tools into one platform.

Instead of switching between different AI websites for writing, image generation, background removal, and resume reviews, QuickAI provides all these features under one dashboard.

---

# Features ✨

- 📝 AI Article Generator
- 💡 AI Blog Title Generator
- 🎨 AI Image Generator
- 🖼 Background Remover
- ✂ Object Remover
- 📄 AI Resume Review
- 🔐 Secure Authentication using Clerk
- 👑 Premium & Free User Plans
- 📊 User Dashboard
- 💾 History Storage
- ⚡ Fast REST APIs
- ☁ PostgreSQL Database (Neon)

---

# Tech Stack 🛠

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Clerk React

## Backend

- Node.js
- Express.js

## Authentication

- Clerk Authentication
- JWT Session Tokens

## Database

- PostgreSQL
- Neon Serverless

## AI

- Google Gemini API
- OpenAI Compatible SDK

---

# Project Structure 📂

```
QuickAI
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── configs
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Installation ⚙️

## Clone Repository

```bash
git clone https://github.com/AshleshaChauhan-11/QuickAI.git
```

Move inside the project

```bash
cd QuickAI
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

# Environment Variables 🔑

Create a `.env` file inside the **server** folder.

```env
PORT=3000

DATABASE_URL=your_neon_database_url

GEMINI_API_KEY=your_gemini_api_key

CLERK_SECRET_KEY=your_clerk_secret_key

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

# ▶ Running the Project

## Backend

```bash
cd server
npm run server
```

The backend runs on

```
http://localhost:3000
```

---

## Frontend

```bash
cd client
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# API Endpoints 📡

## Generate Article

```
POST /api/ai/generate-article
```

Body

```json
{
    "prompt": "Artificial Intelligence",
    "length":400
}
```

---

## Authentication 

Protected using Clerk JWT.

Header

```
Authorization: Bearer YOUR_TOKEN
```

---

# Database 🗄

The application stores

- User Details
- AI-Generated Content
- Prompt History
- User Plan
- Free Usage Count

Using PostgreSQL on Neon.

---

# Authentication Flow 🔒

```
User Login
      │
      ▼
Clerk
      │
      ▼
JWT Token
      │
      ▼
Express Middleware
      │
      ▼
Controllers
      │
      ▼
Database
```

---

# Future Improvements 🚀

- AI Chatbot
- PDF Summarizer
- AI Code Generator
- Voice Assistant
- Team Workspaces
- Payment Gateway
- Admin Dashboard
- Usage Analytics
- Prompt Library

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# Contributors 🤝

Built and Maintained By:

- **Rudra Kumar Jha**  (https://github.com/ftrudra7)
- **Ashlesha Chauhan** (https://github.com/AshleshaChauhan-11)

---

# Acknowledgements 🙏

Special thanks to the developers and maintainers of:

- Google Gemini API
- Clerk
- Neon PostgreSQL
- React
- Express.js
- Node.js
- Tailwind CSS

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
