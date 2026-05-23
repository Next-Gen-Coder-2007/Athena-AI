# Athena AI — Intelligent Placement Management Platform

An AI-agent powered campus placement ecosystem built with React, FastAPI, PostgreSQL, and autonomous multi-agent workflows for intelligent recruitment, resume analysis, and career guidance.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [AI Agent Architecture](#ai-agent-architecture)
- [AI Workflow Pipeline](#ai-workflow-pipeline)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Role-Based Access Control](#role-based-access-control)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Athena AI is a production-grade, full-stack placement management platform that combines traditional software engineering with modern AI agent systems to automate and intelligently streamline campus recruitment workflows.

The platform serves three primary user groups:

| Role | Capabilities |
|---|---|
| Student | Build profiles, upload resumes, apply to jobs, get AI-driven career guidance |
| Recruiter | Post jobs, review applications, schedule interviews, track candidates |
| Placement Officer | Manage the placement lifecycle, generate analytics, oversee the entire process |

Athena AI moves beyond a traditional placement portal. It is an intelligent ecosystem capable of autonomous decision-making, contextual recommendations, and workflow automation.

---

## Key Features

### Core Platform

- Student profile and resume management
- Company and recruiter onboarding
- Job posting, browsing, and application tracking
- Interview scheduling and calendar management
- Placement analytics and reporting dashboards
- Role-based access control (Student / Recruiter / Admin)
- Secure JWT-based authentication

### AI-Powered Intelligence

- Resume Analysis Agent — Extracts skills, evaluates ATS compatibility, and provides actionable feedback
- Job Matching Agent — Scores student-job compatibility and surfaces the best opportunities
- Interview Preparation Agent — Generates tailored technical and HR interview questions
- Career Guidance Agent — Recommends learning roadmaps, identifies skill gaps, and suggests career paths

---

## System Architecture

Athena AI is designed as a modular, layered architecture with clear separation of concerns across the frontend, backend, database, and AI agent layers.

```
                    +---------------------------+
                    |      React Frontend        |
                    |  (UI / Dashboards / Forms) |
                    +-------------+-------------+
                                  |  REST API (HTTPS)
                                  v
                    +---------------------------+
                    |     FastAPI Backend        |
                    |  (Auth / Business Logic /  |
                    |   API Routes / Orchestrat) |
                    +--------+----------+--------+
                             |          |
               +-------------+          +---------------+
               |                                        |
               v                                        v
  +-------------------------+          +-------------------------------+
  |     PostgreSQL DB        |          |         AI Agent Hub          |
  |  (Users / Jobs /         |          |  (Orchestration Layer)        |
  |   Applications /         |          +-------+----------+-----------+
  |   Analytics)             |                  |          |
  +-------------------------+         +---------+          +----------+
                                      |                               |
               +-----------------------+------------------+           |
               v                       v                  v           v
  +-------------------+   +-------------------+  +-------------+  +-------------+
  |   Resume Agent    |   |  Interview Agent  |  | Career Agent|  | Job Match   |
  |                   |   |                   |  |             |  |   Agent     |
  +-------------------+   +-------------------+  +-------------+  +-------------+
```

### Layer Responsibilities

#### Frontend Layer (React)

The frontend handles all user-facing interactions and is responsible for:

- Rendering dynamic dashboards for students, recruiters, and admins
- Handling authentication flows (login, registration, JWT token management)
- Communicating with the backend via REST APIs
- Data visualization for placement analytics
- Responsive, role-aware UI components

#### Backend Layer (FastAPI)

The backend is the central application server and handles:

- Exposing secure REST API endpoints
- Authentication and authorization (JWT + RBAC)
- Core business logic (placement workflows, applications, scheduling)
- Database operations via ORM
- AI agent orchestration — triggering and managing agent workflows
- File management for resumes and documents

#### Database Layer (PostgreSQL)

The relational database is the single source of truth for all persistent data:

- User accounts and roles
- Student profiles and resumes
- Company and recruiter information
- Job postings and applications
- Interview schedules
- Placement analytics and outcomes

#### AI Agent Hub

An orchestration layer that manages multiple specialized AI agents:

- Receives tasks from the backend
- Routes requests to the appropriate agent
- Aggregates and returns structured results
- Supports both synchronous and asynchronous agent workflows

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | Component-based UI framework |
| React Router v6 | Client-side routing and navigation |
| Axios | HTTP client for API communication |
| Redux Toolkit | Global state management |
| Recharts | Data visualization and analytics charts |
| Tailwind CSS | Utility-first styling framework |

### Backend

| Technology | Purpose |
|---|---|
| FastAPI | High-performance Python REST API framework |
| Pydantic v2 | Data validation and schema definition |
| SQLAlchemy | ORM for database interactions |
| Alembic | Database schema migrations |
| Python-Jose | JWT token creation and validation |
| Passlib + Bcrypt | Password hashing and security |
| Uvicorn | ASGI server for running FastAPI |

### Database

| Technology | Purpose |
|---|---|
| PostgreSQL 15 | Primary relational database for all application data |
| SQLAlchemy ORM | Object-relational mapping layer |
| Alembic | Schema versioning and migration management |
| pgvector | PostgreSQL extension that adds a vector column type, enabling similarity search directly inside PostgreSQL without a separate vector database service |

### AI and Agent Stack

This is the core intelligence layer of the platform. Each component has a specific role in enabling autonomous agent behavior.

| Technology | Role | Purpose |
|---|---|---|
| Anthropic Claude API (claude-sonnet-4-20250514) | Foundation LLM | Powers all agents — resume analysis, job matching, interview prep, and career guidance. Handles reasoning, text generation, and structured output. |
| LangChain | Agent orchestration framework | Manages agent chains, prompt templating, tool usage, memory, and multi-step reasoning workflows. |
| LangChain Agents (ReAct) | Agent reasoning pattern | Implements the Reason + Act loop so agents can plan, use tools, observe results, and iterate before producing a final output. |
| LangChain Tools | Agent capabilities | Custom tools given to each agent — e.g., a resume parser tool, a job database query tool, a skill-gap calculator tool. |
| LangChain Memory (ConversationBufferMemory) | Conversational state | Maintains session context for multi-turn interactions such as mock interviews and career guidance sessions. |
| PyPDF2 / pdfplumber | Resume parsing | Extracts raw text from uploaded PDF resumes before passing content to the Resume Analysis Agent. |
| python-docx | Resume parsing | Extracts raw text from DOCX resume files. |
| Pydantic | Structured agent output | Enforces strict output schemas on agent responses so the backend can reliably parse and store AI-generated data. |
| asyncio / FastAPI BackgroundTasks | Async agent execution | Runs long-running agent pipelines (e.g., full resume analysis) asynchronously without blocking the API response. |

### RAG and Vector Stack

RAG (Retrieval-Augmented Generation) is how the agents retrieve relevant, grounded context before generating a response. Instead of relying solely on the LLM's training data, agents first retrieve the most relevant chunks from the vector store and pass them into the prompt alongside the user query. This makes responses accurate, specific, and grounded in real data from the platform.

| Technology | Role | Purpose |
|---|---|---|
| pgvector | Vector store | PostgreSQL extension used as the primary vector database. Stores embeddings for resumes, job descriptions, and skill profiles directly inside the existing PostgreSQL instance. No separate vector DB service required. |
| LangChain PGVector | Vector store integration | LangChain's built-in connector for pgvector. Handles embedding storage, retrieval, and similarity search queries through a clean interface. |
| OpenAI API | Embedding model | Generates dense vector embeddings from resume text and job descriptions. These embeddings are stored in pgvector for similarity search. |
| LangChain RecursiveCharacterTextSplitter | Document chunking | Splits long resume and job description text into smaller overlapping chunks before embedding. This ensures vectors represent focused, semantically meaningful segments rather than entire documents. |
| LangChain VectorStoreRetriever | RAG retrieval | Queries pgvector using the embedded user query and retrieves the top-K most similar chunks to inject as context into the agent prompt. |
| LangChain RetrievalQA / RAG Chain | RAG pipeline | Combines the retriever and the LLM into a single chain. Retrieved context is automatically formatted and injected into the prompt before Claude generates the final response. |
| ChromaDB | Development vector store | Lightweight in-process vector database used during local development and testing. Can be swapped for pgvector in production with no changes to the agent logic. |

### RAG Pipeline Flow

```
Raw Text Input (resume or job description)
            |
            v
RecursiveCharacterTextSplitter
(split into overlapping chunks of ~500 tokens)
            |
            v
Embedding Model (Claude / text-embedding)
(each chunk converted to a dense vector)
            |
            v
pgvector (PostgreSQL)
(vectors stored with metadata: source, student_id, job_id)
            |
            v
Query arrives (e.g. "find jobs matching this student's profile")
            |
            v
Query embedded -> cosine similarity search in pgvector
            |
            v
Top-K most relevant chunks retrieved
            |
            v
Retrieved chunks + original query injected into Claude prompt
            |
            v
Claude generates a grounded, context-aware response
```

### Infrastructure and DevOps

| Technology | Purpose |
|---|---|
| Docker | Containerized application packaging |
| Docker Compose | Multi-service local development orchestration |
| Nginx | Reverse proxy and static file serving (production) |
| GitHub Actions | CI/CD pipeline for automated testing and deployment |

---

## AI Agent Architecture

Each AI agent is a self-contained module with a clearly defined responsibility. Agents are triggered by the backend orchestration layer based on user actions or scheduled workflows.

---

### Resume Analysis Agent

**Trigger:** Student uploads or updates a resume.

**Tech used:** pdfplumber / python-docx, LangChain, Claude API, Pydantic output parser

**Responsibilities:**

- Parse and extract text content from PDF or DOCX resumes
- Identify and categorize technical skills, tools, and technologies
- Evaluate ATS (Applicant Tracking System) keyword compatibility
- Detect formatting issues and structural weaknesses
- Generate actionable, prioritized improvement recommendations

**Output:** Structured feedback report with skill tags, ATS score, and improvement suggestions.

---

### Job Matching Agent

**Trigger:** Student submits a resume or browses job listings.

**Tech used:** FAISS, text embeddings, LangChain, Claude API

**Responsibilities:**

- Embed student skills and job descriptions into vector space
- Compute cosine similarity scores between student profile and each job
- Rank and surface the most relevant job opportunities
- Highlight skill gaps preventing a stronger match

**Output:** Ranked list of job matches with compatibility scores and gap analysis.

---

### Interview Preparation Agent

**Trigger:** Student applies for a job or requests interview prep.

**Tech used:** LangChain ReAct Agent, LangChain Memory, Claude API

**Responsibilities:**

- Analyze the target job description and required skills
- Generate role-specific technical interview questions
- Create HR and behavioral interview question sets using the STAR method
- Maintain conversational memory for multi-turn mock interview sessions
- Suggest preparation resources and focus areas

**Output:** Customized question bank and preparation guide tailored to the target role.

---

### Career Guidance Agent

**Trigger:** Student requests career advice or completes a profile.

**Tech used:** LangChain, Claude API, Pydantic output parser

**Responsibilities:**

- Analyze the student's current skill set and experience level
- Recommend suitable career paths and specializations
- Identify skill gaps relative to target roles
- Generate step-by-step learning roadmaps
- Suggest relevant technologies, certifications, and tools

**Output:** Personalized career roadmap with learning priorities and resource recommendations.

---

## AI Workflow Pipeline

When a student uploads their resume, the following automated pipeline executes:

```
+------------------------------------+
|      Student Uploads Resume        |
+----------------+-------------------+
                 |
                 v
+------------------------------------+
|      Resume Analysis Agent         |  Parses content, extracts skills, evaluates ATS score
+----------------+-------------------+
                 |
                 v
+------------------------------------+
|   Skill Extraction and Scoring     |  Categorizes skills, identifies strengths and gaps
+----------------+-------------------+
                 |
                 v
+------------------------------------+
|       Job Matching Agent           |  Embeds skills, computes similarity with job postings
+----------------+-------------------+
                 |
                 v
+------------------------------------+
|   Interview Preparation Agent      |  Generates questions tailored to matched roles
+----------------+-------------------+
                 |
                 v
+------------------------------------+
|      Career Guidance Agent         |  Delivers personalized roadmap and recommendations
+------------------------------------+
```

Each step feeds structured data into the next, forming a cohesive end-to-end intelligence layer that operates with minimal manual intervention.

---

## Project Structure

```
athena-ai/
|
+-- frontend/                        # React frontend application
|   +-- public/
|   +-- src/
|   |   +-- components/              # Reusable UI components
|   |   +-- pages/                   # Route-level page components
|   |   |   +-- student/             # Student-specific pages
|   |   |   +-- recruiter/           # Recruiter-specific pages
|   |   |   +-- admin/               # Admin/placement officer pages
|   |   +-- context/                 # React Context providers
|   |   +-- hooks/                   # Custom React hooks
|   |   +-- services/                # Axios API service modules
|   |   +-- utils/                   # Utility functions
|   |   +-- App.jsx
|   +-- .env
|   +-- package.json
|
+-- backend/                         # FastAPI backend application
|   +-- app/
|   |   +-- api/                     # API route definitions
|   |   |   +-- routes/
|   |   |       +-- auth.py
|   |   |       +-- students.py
|   |   |       +-- recruiters.py
|   |   |       +-- jobs.py
|   |   |       +-- applications.py
|   |   |       +-- interviews.py
|   |   |       +-- analytics.py
|   |   +-- core/                    # Core config, security, dependencies
|   |   |   +-- config.py
|   |   |   +-- security.py
|   |   |   +-- dependencies.py
|   |   +-- db/                      # Database setup and session management
|   |   |   +-- base.py
|   |   |   +-- session.py
|   |   +-- models/                  # SQLAlchemy ORM models
|   |   +-- schemas/                 # Pydantic request/response schemas
|   |   +-- services/                # Business logic services
|   |   +-- agents/                  # AI agent modules
|   |       +-- orchestrator.py      # Agent hub and workflow manager
|   |       +-- resume_agent.py
|   |       +-- job_match_agent.py
|   |       +-- interview_agent.py
|   |       +-- career_agent.py
|   +-- alembic/                     # Database migration files
|   +-- .env
|   +-- requirements.txt
|   +-- main.py
|
+-- docker-compose.yml
+-- .gitignore
+-- README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- PostgreSQL 15+ with the pgvector extension installed
- Docker and Docker Compose (recommended)

To enable pgvector, run this once inside your PostgreSQL instance:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### Python Dependencies (requirements.txt)

```
# Web framework
fastapi
uvicorn
pydantic[email]

# Database
sqlalchemy
alembic
psycopg2-binary
pgvector

# Auth
python-jose[cryptography]
passlib[bcrypt]

# AI and agents
anthropic
langchain
langchain-anthropic
langchain-community
langchain-core

# RAG and vector
chromadb

# Document parsing
pdfplumber
python-docx

# Utilities
python-multipart
python-dotenv
aiofiles
```

---

### Option 1: Run with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/your-username/athena-ai.git
cd athena-ai

# Configure environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start all services
docker-compose up --build
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Swagger API Docs: http://localhost:8000/docs

---

### Option 2: Manual Setup

#### Backend

```bash
cd backend

python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

alembic upgrade head

uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/athena_ai

# Authentication
SECRET_KEY=your_super_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# AI API
ANTHROPIC_API_KEY=your_anthropic_api_key

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=10
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

## API Overview

The backend exposes a versioned REST API under `/api/v1/`. Full interactive documentation is available via Swagger UI at `/docs`.

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Authenticate and receive JWT token |
| GET | /students/me | Get authenticated student profile |
| PUT | /students/me | Update student profile |
| POST | /resumes/upload | Upload resume and trigger AI analysis |
| GET | /resumes/feedback | Retrieve AI resume feedback |
| GET | /jobs/ | List all available job postings |
| POST | /applications/ | Apply for a job |
| GET | /applications/me | Get student application history |
| POST | /interviews/schedule | Schedule an interview |
| GET | /analytics/placements | Get placement statistics (admin only) |
| POST | /agents/career-guidance | Trigger career guidance agent |
| POST | /agents/interview-prep | Trigger interview preparation agent |

---

## Role-Based Access Control

| Feature | Student | Recruiter | Admin |
|---|---|---|---|
| View and update own profile | Yes | Yes | Yes |
| Upload and manage resume | Yes | No | Yes |
| Apply to jobs | Yes | No | Yes |
| Access AI agents | Yes | No | Yes |
| Post job listings | No | Yes | Yes |
| Review applications | No | Yes | Yes |
| Schedule interviews | No | Yes | Yes |
| View all student profiles | No | No | Yes |
| Manage users and roles | No | No | Yes |
| View placement analytics | No | No | Yes |

---

## Roadmap

- [x] Core placement portal functionality
- [x] Role-based access control
- [x] Resume upload and storage
- [x] AI resume analysis agent
- [x] Job matching agent with vector similarity
- [x] Interview preparation agent with memory
- [x] Career guidance agent
- [ ] Real-time notifications via WebSockets
- [ ] Email notification system
- [ ] Advanced placement analytics dashboard
- [ ] Recruiter messaging system
- [ ] Mobile-responsive PWA
- [ ] Multi-institution support
- [ ] Resume builder tool
- [ ] AI-powered voice mock interview

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow conventional commit standards and ensure your code is well documented.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Built with React, FastAPI, PostgreSQL, LangChain, and the Anthropic Claude API.