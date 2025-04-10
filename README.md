# 🤖 Support AI Chatbot – Smart Conversational Assistant

An intelligent, LLM-based chatbot engineered to handle user queries with context awareness, memory, and dynamic interaction flow. Designed to assist users of a fictional SaaS product, this project offers structured conversation management, query understanding, and insightful analytics.

![Chatbot UI](https://github.com/user-attachments/assets/0013de1f-8904-4b84-80cd-7cd63a948286)

---

## ✨ Features

- 🧠 **Contextual AI Chatbot** built using LangGraph & LangChain  
- 🕓 **Session-aware Conversations** powered by Redis  
- 📊 **Analytics Dashboard** to monitor chatbot interactions  
- 📂 **Document-Based Retrieval** using ChromaDB embeddings  
- ✅ **Response Quality Checks** to ensure answer relevance  
- ⚡ **Real-time Performance Insights** to track repeated questions, types, and more  
- 🚀 **Caching Layer with Redis** to optimize response times

---

## 🧰 Tech Stack

- **Backend:** FastAPI, Python, LangChain, LangGraph, HuggingFace, LLM  
- **Storage:** Redis (chat history), ChromaDB (embeddings)  
- **Containerization:** Docker & Docker Compose (optional)  
- **Testing:** Postman  

---

## ⚙️ Getting Started

### 🔄 Clone the Repository

```bash
git clone https://github.com/Anuragyadav1/vahan_ai-assignment
cd Vahan_AI_Assignment


##  Environment Setup
2. Environment Variables 
for backend folder `.env` file with the following variables:  

### **Backend (`backend/.env`)**
 
```sh
GROQ_API_KEY=<your groq api key>
LANGCHAIN_API_KEY=<your langchain api key>
LANGCHAIN_TRACING_V2=true
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```
3. Finally run the command to start project
```sh
For Backend:
1. cd backend
2. pip install -r requirement.txt
3. python main.py
For Frontend:
1. cd frontend
2. npm i
3. npm run dev

```
### **Note:** 
I tried using Docker for this project, but the build process was taking too much time. Since I was running the backend in a Python environment, I had not stored any dependencies in a requirements.txt file. However, when I included Docker, I needed the requirements.txt file, so I generated it using the command: 
```sh
pip freeze > requirements.txt
```
This added all the dependencies from my Python environment, including some that were not used in the project. I manually removed the unnecessary dependencies, but some were still causing long build times in Docker.
Due to this, I decided not to use Docker for setting up the project.
### **🏗 Projects Architecture**
This project utilizes LangGraph, LangChain, and ChromaDB for handling text embeddings and managing conversational flow. Below is the architectural breakdown of how different components interact to process user queries efficiently.
## Components Used
-  **LangGraph :** Enables a structured flow of execution with four nodes and one tool.  
-  **ChromaDB :**  Stores text embeddings for retrieving relevant documents. 
-  **Redis :** Maintains session-based chat history for users. 
-  **Langchain :** Helps in orchestrating LLM-based workflows.

## Nodes & Tools in LangGraph
The project consists of the following four nodes and one tool:
- **grade_documents Node**
- **support Node**
- **agent Node**
- **generate Node**
- **retriever_tool (Tool for retrieving documents from ChromaDB)**
 ## State Management
 LangGraph is stateful, allowing the project to maintain conversation history efficiently. The state stores both human messages (user queries) and AI messages (chatbot responses).
Additionally, user sessions are managed, where both the user's question and the chatbot's response are stored in Redis. The key for each entry is the user's session ID, while the value contains the chat history (user queries and bot responses).
## Workflow Execution
**1. Session Management**

- **When a user submits a question, the backend checks if the request header contains a session ID.**
- **If no session ID is found, a new one is generated and stored in a cookie to ensure that future user queries contain the same session ID.**
- **This session ID helps in maintaining a continuous conversation by storing the chat history in Redis.**

**2. Retrieving Previous Chats**
- **When a query is received, the backend extracts the session ID from the headers.**
- **It then checks Redis to see if there is any existing chat history for that session.**
- **If chat history exists, it is added to the LangGraph state, along with the new user query.**

**3. Processing the Query Using LangGraph**
- **Once the question is added to the LangGraph state, the agent node is triggered.**
- **The agent node retrieves relevant documents using retriever_tool, which fetches embeddings from ChromaDB.**
- **These retrieved documents are also added to the LangGraph state.**
- **The agent node then calls the grade_documents node.**

**Document Grading & Query Analysis**
- **The grade_documents node evaluates whether the retrieved documents are relevant to the user's question.**
- **It also checks whether the user query is similar to previous chat history.**
- **If the query is relevant to chat history or retrieved documents, it proceeds to the generate node.**
- **If not, it is sent to the support node.**

**Handling Responses**
- **Support Node: If the chatbot does not have enough information to answer the query, the support node informs the user that it lacks relevant details and provides contact information for the support team.**
  
- **Generate Node: If the query is related to previous chat history or retrieved documents, the generate node formulates a response based on the chat history context and documents. The generated response is then delivered to the user.**
  

## Chatbot Analytics & Accuracy Tracking
The project includes an analytics route to track chatbot performance, including:
- **Total Questions Count:** Increment total_questions for every new user query.
- **Categorizing Questions:** Identify the type of question (e.g., travel, support, or others) and update question_types.
- **Detecting Repeat Questions:** Compare the current question with previous ones in the chat history and increment repeat_questions if a match is found..
- **API Endpoint:** Fetch Analytics data from this api (BaseUrl/analytics).





 
