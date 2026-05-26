# Athena AI — Intelligent Placement Management Platform

<div align="center">
  <img src="logo.png" width="300" />
</div>

<p align="center">
  <strong>
    An AI-powered campus placement ecosystem built with React, FastAPI, PostgreSQL, OpenAI, LangChain, LangGraph, and pgvector.
  </strong>
</p>

<p align="center">
  Intelligent recruitment • Resume analysis • RAG-powered job matching • Career guidance • Multi-agent workflows
</p>

---

# Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [System Architecture](#system-architecture)
* [Tech Stack](#tech-stack)
* [AI Agent Architecture](#ai-agent-architecture)
* [RAG Pipeline](#rag-pipeline)
* [AI Workflow Pipeline](#ai-workflow-pipeline)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [API Overview](#api-overview)
* [Role-Based Access Control](#role-based-access-control)
* [Roadmap](#roadmap)
* [License](#license)

---

# Overview

Athena AI is a production-grade, AI-powered placement management platform designed to automate and intelligently streamline campus recruitment workflows.

The platform combines modern full-stack engineering with advanced AI agent systems to deliver intelligent resume analysis, contextual job matching, interview preparation, and personalized career guidance.

Athena AI serves three primary user groups:

| Role              | Capabilities                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| Student           | Build profiles, upload resumes, apply for jobs, receive AI-driven career guidance      |
| Recruiter         | Post jobs, review applications, schedule interviews, track candidates                  |
| Placement Officer | Manage placement workflows, oversee recruitment activity, analyze placement statistics |

Athena AI goes beyond a traditional placement portal by integrating:

* Autonomous AI agents
* Retrieval-Augmented Generation (RAG)
* Vector similarity search
* Multi-agent orchestration
* Workflow automation
* Intelligent recommendations

---

# Key Features

## Core Platform

* Student profile management
* Resume upload and storage
* Recruiter and company onboarding
* Job posting and application tracking
* Interview scheduling system
* Placement analytics dashboard
* Role-based access control (RBAC)
* JWT authentication and authorization
* RESTful API architecture
* Responsive dashboard interface

---

## AI-Powered Features

### Resume Analysis Agent

* Extracts technical skills and technologies
* Evaluates ATS compatibility
* Detects formatting issues
* Generates improvement suggestions
* Produces structured resume feedback

### Job Matching Agent

* Uses vector similarity search with pgvector
* Matches resumes against job descriptions
* Computes compatibility scores
* Identifies missing skills and gaps
* Recommends best-fit opportunities

### Interview Preparation Agent

* Generates technical interview questions
* Creates HR and behavioral questions
* Supports mock interview workflows
* Maintains conversational context
* Suggests preparation strategies

### Career Guidance Agent

* Analyzes student skill profiles
* Recommends career paths
* Generates personalized learning roadmaps
* Identifies industry-relevant technologies
* Suggests certifications and learning resources

---

# System Architecture

Athena AI follows a modular, layered architecture with clear separation of concerns across frontend, backend, database, and AI orchestration layers.

```text
                    +----------------------------+
                    |       React Frontend       |
                    |  Dashboards / Forms / UI   |
                    +-------------+--------------+
                                  |
                                  | REST API (HTTPS)
                                  v
                    +----------------------------+
                    |      FastAPI Backend       |
                    | Auth / APIs / Business     |
                    | Logic / Workflow Engine    |
                    +---------+---------+--------+
                              |         |
              +---------------+         +----------------+
              |                                            |
              v                                            v

    +----------------------+            +--------------------------------+
    |    PostgreSQL DB     |            |     AI Orchestration Layer     |
    | Users / Jobs /       |            |   LangChain + LangGraph Hub    |
    | Applications / RAG   |            +---------+----------+-----------+
    +----------+-----------+                      |          |
               |                                  |          |
               |                                  |          |
               v                                  v          v

      +----------------+              +----------------+  +----------------+
      |   pgvector     |              | Resume Agent   |  | Job Match      |
      | Vector Search  |              +----------------+  | Agent          |
      +----------------+              | Interview Agent|  +----------------+
                                      +----------------+
                                      | Career Agent   |
                                      +----------------+
```

---

# Tech Stack

# Frontend

| Technology        | Purpose                             |
| ----------------- | ----------------------------------- |
| React 18          | Component-based frontend framework  |
| React Router v6   | Client-side routing                 |
| Axios             | API communication                   |
| Redux Toolkit     | Global state management             |
| Tailwind CSS      | Utility-first styling               |
| Framer Motion     | Advanced animations and transitions |
| React Icons       | Modern icon library                 |
| React Three Fiber | Interactive 3D visuals              |
| shadcn/ui         | Accessible reusable UI components   |
| Recharts          | Analytics and data visualization    |

---

# Backend

| Technology       | Purpose                                   |
| ---------------- | ----------------------------------------- |
| FastAPI          | High-performance Python backend framework |
| Pydantic v2      | Data validation and serialization         |
| SQLAlchemy       | ORM for database operations               |
| Alembic          | Database migrations                       |
| Python-Jose      | JWT authentication                        |
| Passlib + Bcrypt | Password hashing                          |
| Uvicorn          | ASGI server                               |
| Redis            | Caching and async coordination            |
| Celery           | Background task processing                |

---

# Database

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| PostgreSQL 15  | Primary relational database      |
| pgvector       | Vector similarity search         |
| SQLAlchemy ORM | ORM layer                        |
| Alembic        | Schema versioning and migrations |

---

# AI and Agent Stack

| Technology                        | Role                         | Purpose                                        |
| --------------------------------- | ---------------------------- | ---------------------------------------------- |
| OpenAI API (GPT-4.1 / GPT-4o)     | Foundation LLM               | Powers all AI agents and intelligent workflows |
| LangChain                         | AI orchestration framework   | Chains, prompts, tools, memory, workflows      |
| LangGraph                         | Stateful agent orchestration | Multi-agent routing and workflow execution     |
| LangChain Agents (ReAct)          | Agent reasoning              | Enables reasoning + tool execution loops       |
| LangChain Tools                   | Agent capabilities           | Resume parsing, querying, skill analysis       |
| Pydantic                          | Structured outputs           | Enforces JSON response schemas                 |
| asyncio / FastAPI BackgroundTasks | Async execution              | Non-blocking AI task execution                 |

---

# RAG and Vector Stack

| Technology                     | Role                  | Purpose                                            |
| ------------------------------ | --------------------- | -------------------------------------------------- |
| pgvector                       | Vector database       | Stores embeddings directly inside PostgreSQL       |
| LangChain PGVector             | Vector integration    | Handles retrieval and similarity search            |
| OpenAI Embeddings API          | Embedding model       | Converts resumes and jobs into dense vectors       |
| RecursiveCharacterTextSplitter | Chunking              | Splits large documents into semantic chunks        |
| VectorStoreRetriever           | Retrieval             | Retrieves relevant context using similarity search |
| RetrievalQA / RAG Chain        | RAG pipeline          | Injects retrieved context into prompts             |
| ChromaDB                       | Development vector DB | Lightweight local vector storage for development   |

---

# Document Processing Stack

| Technology  | Purpose             |
| ----------- | ------------------- |
| pdfplumber  | PDF resume parsing  |
| PyPDF2      | PDF text extraction |
| python-docx | DOCX parsing        |
| aiofiles    | Async file handling |

---

# DevOps and Infrastructure

| Technology     | Purpose                              |
| -------------- | ------------------------------------ |
| Docker         | Containerization                     |
| Docker Compose | Multi-container orchestration        |
| Nginx          | Reverse proxy and production serving |
| GitHub Actions | CI/CD pipelines                      |
| Redis          | Distributed caching                  |
| Celery Workers | Background AI job execution          |

---

# AI Agent Architecture

Each AI agent is modular and independently orchestrated through the AI workflow engine.

---

## Resume Analysis Agent

### Trigger

Student uploads or updates a resume.

### Technologies Used

* OpenAI API
* LangChain
* Pydantic
* pdfplumber
* python-docx

### Responsibilities

* Parse resume content
* Extract technical skills
* Detect ATS weaknesses
* Analyze formatting quality
* Generate actionable recommendations

### Output

Structured feedback report with:

* ATS score
* Skill tags
* Improvement suggestions
* Resume insights

---

## Job Matching Agent

### Trigger

Student uploads a resume or browses jobs.

### Technologies Used

* OpenAI Embeddings API
* pgvector
* LangChain
* PostgreSQL

### Responsibilities

* Convert resumes and jobs into embeddings
* Compute cosine similarity scores
* Rank matching opportunities
* Identify skill gaps

### Output

Ranked job recommendations with compatibility scores.

---

## Interview Preparation Agent

### Trigger

Student requests interview preparation.

### Technologies Used

* OpenAI API
* LangChain ReAct Agents
* LangGraph

### Responsibilities

* Generate technical interview questions
* Create behavioral questions
* Simulate mock interviews
* Maintain conversational state
* Suggest preparation areas

### Output

Personalized interview preparation guide.

---

## Career Guidance Agent

### Trigger

Student requests career guidance.

### Technologies Used

* OpenAI API
* LangChain
* Pydantic

### Responsibilities

* Analyze skill profiles
* Recommend career paths
* Generate learning roadmaps
* Suggest certifications and tools

### Output

Personalized career development roadmap.

---

# RAG Pipeline

```text
Raw Resume / Job Description
              |
              v
Document Parsing
(pdfplumber / python-docx)
              |
              v
Text Chunking
(RecursiveCharacterTextSplitter)
              |
              v
OpenAI Embeddings API
              |
              v
pgvector (PostgreSQL)
(Vector Storage)
              |
              v
User Query
              |
              v
Similarity Search
(Cosine Distance)
              |
              v
Top-K Relevant Chunks Retrieved
              |
              v
Retrieved Context Injected into Prompt
              |
              v
OpenAI GPT Generates Final Response
```

---

# AI Workflow Pipeline

```text
+-----------------------------------+
|      Student Uploads Resume       |
+----------------+------------------+
                 |
                 v
+-----------------------------------+
|      Resume Analysis Agent        |
+----------------+------------------+
                 |
                 v
+-----------------------------------+
|    Skill Extraction and Scoring   |
+----------------+------------------+
                 |
                 v
+-----------------------------------+
|       Job Matching Agent          |
+----------------+------------------+
                 |
                 v
+-----------------------------------+
|   Interview Preparation Agent     |
+----------------+------------------+
                 |
                 v
+-----------------------------------+
|      Career Guidance Agent        |
+-----------------------------------+
```

---

# Project Structure

```text
athena-ai/
|
+-- frontend/
|   +-- public/
|   +-- src/
|   |   +-- components/
|   |   +-- pages/
|   |   |   +-- student/
|   |   |   +-- recruiter/
|   |   |   +-- admin/
|   |   +-- hooks/
|   |   +-- context/
|   |   +-- services/
|   |   +-- utils/
|   |   +-- store/
|   |   +-- App.jsx
|   +-- package.json
|   +-- .env
|
+-- backend/
|   +-- app/
|   |   +-- api/
|   |   |   +-- routes/
|   |   +-- core/
|   |   +-- db/
|   |   +-- models/
|   |   +-- schemas/
|   |   +-- services/
|   |   +-- agents/
|   |   |   +-- orchestrator.py
|   |   |   +-- resume_agent.py
|   |   |   +-- job_match_agent.py
|   |   |   +-- interview_agent.py
|   |   |   +-- career_agent.py
|   |   +-- workers/
|   |   +-- main.py
|   +-- alembic/
|   +-- requirements.txt
|   +-- .env
|
+-- docker-compose.yml
+-- README.md
+-- .gitignore
```

---

# Getting Started

# Prerequisites

* Node.js v18+
* Python 3.10+
* PostgreSQL 15+
* Redis
* Docker and Docker Compose

Enable pgvector inside PostgreSQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

---

# Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

alembic upgrade head

uvicorn app.main:app --reload
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Docker Setup

```bash
docker-compose up --build
```

---

# Environment Variables

# Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/athena_ai

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

OPENAI_API_KEY=your_openai_api_key

REDIS_URL=redis://localhost:6379

UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=10
```

---

# Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

# API Overview

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| POST   | `/auth/register`          | Register user           |
| POST   | `/auth/login`             | Login and receive JWT   |
| GET    | `/students/me`            | Get student profile     |
| PUT    | `/students/me`            | Update student profile  |
| POST   | `/resumes/upload`         | Upload resume           |
| GET    | `/resumes/feedback`       | Get AI feedback         |
| GET    | `/jobs`                   | Fetch jobs              |
| POST   | `/applications`           | Apply for job           |
| GET    | `/applications/me`        | View applications       |
| POST   | `/agents/interview-prep`  | Generate interview prep |
| POST   | `/agents/career-guidance` | Generate career roadmap |
| GET    | `/analytics/placements`   | Placement analytics     |

---

# Role-Based Access Control

| Feature             | Student | Recruiter | Admin |
| ------------------- | ------- | --------- | ----- |
| Manage Profile      | Yes     | Yes       | Yes   |
| Upload Resume       | Yes     | No        | Yes   |
| Apply for Jobs      | Yes     | No        | Yes   |
| Access AI Agents    | Yes     | No        | Yes   |
| Post Jobs           | No      | Yes       | Yes   |
| Review Applications | No      | Yes       | Yes   |
| Schedule Interviews | No      | Yes       | Yes   |
| Manage Users        | No      | No        | Yes   |
| Placement Analytics | No      | No        | Yes   |

---

<div align="center">

### Built with React, FastAPI, PostgreSQL, OpenAI API, LangChain, LangGraph, and pgvector.

</div>