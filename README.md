# 🤖 Support AI Chatbot – Smart Conversational Assistant

An intelligent, LLM-based chatbot engineered to handle user queries with context awareness, memory, and dynamic interaction flow. Designed to assist users of a fictional SaaS product, this project offers structured conversation management, query understanding, and insightful analytics.

![Chatbot UI](https://github.com/user-attachments/assets/0013de1f-8904-4b84-80cd-7cd63a948286)

---

## ✨ Features

- 🧠 **Contextual AI Chatbot** built using LangGraph & LangChain  
- 🕓 **Session-aware Conversations** powered by Redis   
- 📂 **Document-Based Retrieval** using ChromaDB embeddings  
- ✅ **Response Quality Checks** to ensure answer relevance  
- ⚡ **Real-time Performance Insights** to track repeated questions, types, and more  
- 🚀 **Caching Layer with Redis** to optimize response times

---

## 🧰 Tech Stack and Technologies Used

- **Backend:** FastAPI, Python, LangChain, LangGraph, HuggingFace, LLM  
- **Storage:** Redis (chat history), ChromaDB (embeddings)  
- **Containerization:** Docker & Docker Compose (optional)  
- **Testing:** Postman

- **LangGraph** – Manages node-based flow execution
- **LangChain** – Orchestrates LLM-based workflows
- **ChromaDB** – Handles semantic search with vector embeddings
- **Redis** – Stores session-level chat history 

---

## ⚙️ Getting Started

### 🔄 Clone the Repository

```bash
git clone https://github.com/Anuragyadav1/vahan_ai-assignment
cd Vahan_AI_Assignment


##  Environment Setup
2. Environment Variables 
for backend folder `.env` file with the following variables:  

### Backend (`backend/.env`)
 
GROQ_API_KEY=<your groq api key>
LANGCHAIN_API_KEY=<your langchain api key>
LANGCHAIN_TRACING_V2=true
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com

3. command to start project

Frontend:
1. cd frontend
2. npm install
3. npm run dev

Backend:
1. cd backend
2. pip install -r requirements.txt
3. python main.py



```
## 🔧 Running Redis using Docker
To run this project, Redis is required. If you have Docker installed, follow these quick steps:

## 🚀 Start Redis with Docker

docker run -d -p 6379:6379 --name redis-server redis


---

## 🏗 Architecture Overview

This project uses a modular architecture powered by LangGraph, LangChain, Redis, and ChromaDB to build a context-aware conversational AI. The components interact to manage chat sessions, retrieve relevant information, and provide accurate responses.

---


## 🧩 LangGraph Nodes & Tools

- `grade_documents` – Assesses relevance of retrieved documents
- `support` – Fallback for insufficient information
- `agent` – Coordinates the flow and invokes retrieval logic
- `generate` – Crafts final chatbot responses
- `retriever_tool` – Retrieves documents from ChromaDB using embeddings

---

## 🗃 State & Session Management

The chatbot maintains a structured state using LangGraph, which stores:

- User queries
- AI-generated replies
- Relevant documents
- Previous session history

Redis stores session-specific chat logs identified via a session ID (stored in cookies). This allows the chatbot to maintain continuity across multiple queries from the same user.

---

## ⚙️ Workflow Breakdown

### 1️⃣ Session Management

- On each query, the backend checks for a session ID in headers.
- If missing, it generates a new session ID and sets it in cookies.
- This session ID is used to store/fetch user-specific chat history in Redis.

### 2️⃣ Chat History Retrieval

- Retrieves previous chat logs from Redis using the session ID.
- Merges past messages with the current query before sending it to LangGraph.

### 3️⃣ Query Flow Execution

- The `agent` node triggers the `retriever_tool` to fetch context from ChromaDB.
- Retrieved content is graded by the `grade_documents` node.
- Based on grading, either `generate` or `support` node is called.

---

## 📊 Analytics & Tracking

Analytics endpoint tracks usage data:

- **Total Questions Asked** – Increments with each new query
- **Type Categorization** – Classifies questions into categories (e.g., travel, support)
- **Repeat Detection** – Detects if a query was already asked
- **API Route:** `GET /analytics`


---




 
