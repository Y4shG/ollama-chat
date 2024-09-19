# Ollama Chat App

This is a simple chat application built with [Next.js](https://nextjs.org/) and [Ngrok](https://ngrok.com/) to enable secure tunneling for local development. This app uses Ollama AI for real-time chat communication.

## Features

- Real-time chat interface
- Easy deployment with Next.js
- Secure tunnel for local development using Ngrok
- Integrated with Ollama API for intelligent chat responses

## Requirements

- Node.js (v14 or later)
- Ngrok (optional)
- Ollama [llama3.1](https://ollama.com/library/llama3.1)

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/heinhtoo/ollama-chat.git
cd ollama-chat
```

### 2. Install Dependencies

Before running the app, make sure to install the necessary packages:

```
npm install
```

### 3. Set Up Environment Variables

Create a .env.local file at the root of the project to configure your Ollama public api url

```
OLLAMA_BASEURL="http://localhost:11434/api"
```

### 4. Test the Application

Now you can start the development server:

```
npm run dev
```

### 5. Deploy the App (Optional)

Once development is complete, you can deploy your Next.js app to Vercel or any other preferred hosting service.

#### 5.1 Setting up Ngrok

To create a secure tunnel for local ollama model, run Ngrok on port 11434:

```
ngrok http 11434 --host-header="localhost:11434"
```

### 5.2 Overwrite the environment variable

Copy the forwarding URL provided by Ngrok and update environment variables in your production server

---

### Additional Resources

- Blog Post: [Deploy ollama chat app on Vercel](https://medium.com/@heinhtoo/deploy-ollama-chat-app-on-vercel-0e4850838ed2)
