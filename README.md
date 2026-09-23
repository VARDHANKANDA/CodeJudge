<div align="center">

# ⚡ CodeJudge

**Enterprise-Grade Online Judge, Algorithmic Learning & Competitive Programming Platform**

[![CI/CD Pipeline](https://github.com/VARDHANKANDA/CodeJudge/actions/workflows/deploy.yml/badge.svg)](https://github.com/VARDHANKANDA/CodeJudge/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black?style=flat&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS%2010-E0234E?style=flat&logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Prisma-4169E1?style=flat&logo=postgresql)](https://www.prisma.io/)
[![BullMQ & Redis](https://img.shields.io/badge/Queue-BullMQ%20%26%20Redis-DC382D?style=flat&logo=redis)](https://bullmq.io/)
[![Docker](https://img.shields.io/badge/Sandbox-Docker%20Isolated-2496ED?style=flat&logo=docker)](https://www.docker.com/)

[🌐 Production App](https://code-judge-three.vercel.app) • [📖 Swagger API Docs](https://codejudge-backend-zh9l.onrender.com/api/docs) • [🚀 Backend Base](https://codejudge-backend-zh9l.onrender.com/api) • [📂 GitHub Repo](https://github.com/VARDHANKANDA/CodeJudge)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [How the Judging Pipeline Works](#-how-the-judging-pipeline-works)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Repository Structure](#-repository-structure)
- [Supported Languages & Runtimes](#-supported-languages--runtimes)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Option A: Docker Compose (Recommended)](#option-a-docker-compose-recommended)
  - [Option B: Local Step-by-Step Development](#option-b-local-step-by-step-development)
- [Environment Configuration](#-environment-configuration)
- [Sandbox Security & Isolation](#-sandbox-security--isolation)
- [Core Modules Breakdown](#-core-modules-breakdown)
  - [1. Problem Practice Catalog](#1-problem-practice-catalog)
  - [2. 7-Level Structured Roadmap](#2-7-level-structured-roadmap)
  - [3. Curated Practice Sheets](#3-curated-practice-sheets)
  - [4. Real-Time Contests & Leaderboard](#4-real-time-contests--leaderboard)
  - [5. Community Discussions & Forum](#5-community-discussions--forum)
  - [6. Admin & Quality Management](#6-admin--quality-management)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [CI/CD & Deployment](#-cicd--deployment)
- [Security Model](#-security-model)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CodeJudge** is a full-stack competitive programming and computer science learning platform built to provide instant code compilation, execution, and verification across 8 major programming languages.

Engineered with a **Next.js 15 App Router** frontend, a scalable **NestJS** backend API, and a distributed **BullMQ + Redis** asynchronous judging queue, CodeJudge executes user submissions inside hardened, non-networked Docker sandboxes with millisecond-level precision.

### What You Can Do on CodeJudge:
- **Solve 500+ Curated Problems:** Master algorithmic techniques from fundamental two-pointer scans to advanced Tarjan low-link graphs and bitmask dynamic programming.
- **Run & Submit with Monaco Editor:** Enjoy a native IDE experience with starter code templates, hotkeys, custom test case runners, and multi-language support.
- **Follow a 7-Level Roadmap:** Progress through 45 structured computer science topics featuring real-time mastery tracking.
- **Grind Curated Sheets:** Practice industry-standard problem sheets such as *Foundations Essential 75*, *Top Interview 150*, and *Hard Algorithmic Mastery*.
- **Compete in Real-Time Contests:** Participate in timed contests with automatic penalty tracking and live rank computation.
- **Collaborate in Discussion Threads:** Ask questions, post markdown solution walkthroughs, and engage with community comments and upvotes.
- **Manage Platform Quality (Admins):** Audit problem test coverage, inspect worker health, view security logs, and verify submissions in real time.

---

## ✨ Key Features

| Feature Area | Description |
| :--- | :--- |
| **Monaco IDE Workspace** | Full-featured code editor with syntax highlighting, automatic indentation, tabbed console output, and language templates for C, C++, Java, Python, JS, TS, Go, and Rust. |
| **Asynchronous Judge** | Distributed submission pipeline powered by BullMQ and Redis with real-time polling and deterministic verdicts. |
| **Hardened Sandboxing** | Isolated Docker containers running as a non-root `sandbox` user with `--network=none`, CPU throttling (0.5 cores), memory limits (256MB), and process count caps (32 PIDs). |
| **Comprehensive Content** | 500+ verified coding challenges with detailed constraints, progressive hints, multi-test suites (visible + hidden), and reference solution editorials. |
| **Progress & Analytics** | Point tracking with strict solve idempotency (no duplicate points for re-solving), total solved breakdowns by difficulty, and profile activity history. |
| **Contest Arena** | ICPC-style scoring with problem point weights, wrong submission time penalties, and live participant leaderboards. |
| **Community Forum** | Markdown-enabled discussion boards categorized by topic and problem with nested comment trees and like reactions. |
| **Role-Based Access Control (RBAC)** | Strict authorization guards differentiating `USER`, `PROBLEM_SETTER`, `CONTEST_MANAGER`, `MODERATOR`, and `ADMIN`. |

---

## ⚙️ How the Judging Pipeline Works

Submissions follow an asynchronous, fault-tolerant execution lifecycle:

```text
┌─────────────────────────┐
│     Next.js Client      │ ── 1. User writes code & clicks "Submit"
└────────────┬────────────┘
             │ (HTTP POST /api/submissions with JWT)
             ▼
┌─────────────────────────┐
│     NestJS API Node     │ ── 2. Validates request, records SUBMISSION (QUEUED) in PostgreSQL
└────────────┬────────────┘
             │
             ├──► [PostgreSQL] (Persists initial submission record)
             │
             ▼
┌─────────────────────────┐
│     Redis / BullMQ      │ ── 3. Pushes execution job to "judge" queue
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Worker (Node/TS Daemon)│ ── 4. Dequeues job, creates isolated temp directory
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Docker Isolated Sandbox │ ── 5. Compiles (if needed) & executes against test cases
│  (--network=none,       │       Measures execution time & memory via /usr/bin/time
│   --memory=256m,        │       Enforces strict per-testcase timeouts
│   --pids-limit=32)      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│    Verdict Evaluator    │ ── 6. Compares stdout with expected output:
└────────────┬────────────┘       • ACCEPTED
             │                    • WRONG_ANSWER
             │                    • COMPILATION_ERROR
             │                    • RUNTIME_ERROR
             │                    • TIME_LIMIT_EXCEEDED
             │                    • MEMORY_LIMIT_EXCEEDED
             ▼
┌─────────────────────────┐
│       PostgreSQL        │ ── 7. Updates submission verdict, awards points (if first AC),
└────────────┬────────────┘       updates ProblemSolver record and global leaderboard
             │
             ▼
┌─────────────────────────┐
│     Next.js Client      │ ── 8. Polls /api/submissions/:id and renders live testcase results
└─────────────────────────┘
```

---

## 🏗️ Architecture & Tech Stack

```text
                                  ┌─────────────────────────────┐
                                  │      Vercel / Browser       │
                                  │  Next.js 15 (React 19 / TS) │
                                  └──────────────┬──────────────┘
                                                 │ HTTPS / REST
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │     Render / API Server     │
                                  │   NestJS 10 + Swagger UI    │
                                  └──────┬───────────────┬──────┘
                                         │               │
                     ┌───────────────────┘               └───────────────────┐
                     ▼                                                       ▼
        ┌────────────────────────┐                              ┌────────────────────────┐
        │   Neon / PostgreSQL    │                              │     Render / Redis     │
        │  Prisma 5.14 ORM Layer │                              │  BullMQ Queue Manager  │
        └────────────────────────┘                              └────────────┬───────────┘
                                                                             │ Job Queue
                                                                             ▼
                                                                ┌────────────────────────┐
                                                                │  Execution Worker Node │
                                                                │  TypeScript Runner     │
                                                                └────────────┬───────────┘
                                                                             │ Docker Daemon
                                                                             ▼
                                                                ┌────────────────────────┐
                                                                │ Hardened Docker Sandbox│
                                                                │ (C, C++, Py, Java,     │
                                                                │  JS, TS, Go, Rust)     │
                                                                └────────────────────────┘
```

### Core Technologies

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Monaco Editor (`@monaco-editor/react`), Zustand, TanStack React Query, Framer Motion, Lucide Icons, Recharts.
- **Backend API:** NestJS 10, TypeScript, Prisma ORM, Passport.js (JWT & Refresh Token Rotation), Class-Validator, Throttler Rate Limiting, Swagger (OpenAPI 3.0).
- **Queue & Worker:** BullMQ, IORedis, Node.js child process orchestration, Docker Engine API.
- **Database:** PostgreSQL (Neon Serverless & Local PostgreSQL 15).
- **Execution Sandbox:** Ubuntu 22.04 base container with GCC/G++ 11, OpenJDK 17, Python 3.10, Node.js 20, Go 1.18, and Rustc.
- **DevOps & Infrastructure:** Docker Compose, Nginx, GitHub Actions CI/CD.

---

## 📁 Repository Structure

```
CodeJudge/
├── backend/                   # NestJS REST API Application
│   ├── prisma/                # Database schema, migrations, and seed scripts
│   │   ├── schema.prisma      # Unified database domain schema
│   │   ├── migrations/        # PostgreSQL SQL migration history
│   │   └── seed.ts            # Canonical database seeder
│   ├── src/                   # NestJS application source code
│   │   ├── admin/             # Platform metrics, user roles & audit logs
│   │   ├── ai/                # Optional Gemini AI assistance controller
│   │   ├── auth/              # JWT auth, refresh token rotation, login/register
│   │   ├── contests/          # Contest scheduling, registration & scoreboards
│   │   ├── discussions/       # Forum threads, comment nesting & likes
│   │   ├── prisma/            # Global Prisma database service provider
│   │   ├── problems/          # Problem catalog, filters, search & detail
│   │   ├── roadmap/           # 7-level learning roadmap & curated sheets
│   │   ├── submissions/       # Code submission dispatcher & status polling
│   │   └── users/             # User profiles, statistics & solver tracking
│   ├── package.json           # Backend dependencies and scripts
│   └── tsconfig.json          # Backend TypeScript compiler configuration
│
├── frontend/                  # Next.js 15 Client Web Application
│   ├── public/                # Static assets, icons, and favicon
│   ├── src/
│   │   ├── app/               # Next.js App Router pages & API clients
│   │   │   ├── admin/         # Admin management dashboard
│   │   │   ├── auth/          # Login, Register & Forgot Password pages
│   │   │   ├── contests/      # Contest list & live contest arena
│   │   │   ├── dashboard/     # User dashboard with progress metrics
│   │   │   ├── discussions/   # Community forum & thread view
│   │   │   ├── leaderboard/   # Global ranking scoreboard
│   │   │   ├── problems/      # Problem browser & Monaco code workspace
│   │   │   ├── profile/       # User profile details
│   │   │   ├── roadmap/       # 7-level interactive learning tree
│   │   │   └── sheets/        # Curated interview sheet tracker
│   │   ├── components/        # Reusable UI components (Navbar, Editor, etc.)
│   │   └── store/             # Client-side state stores (Zustand)
│   ├── package.json           # Frontend dependencies
│   └── tailwind.config.js     # Dark luxury design system configuration
│
├── worker/                    # BullMQ Sandboxed Execution Worker
│   ├── src/
│   │   ├── configs/           # Multi-language compiler & runtime flags
│   │   ├── index.ts           # BullMQ queue consumer entry point
│   │   └── sandbox.ts         # Docker container runner with process & memory caps
│   ├── Dockerfile.sandbox     # Multi-language compiler base image
│   ├── Dockerfile             # Worker container definition
│   └── package.json           # Worker dependencies
│
├── .github/workflows/         # CI/CD pipelines
│   └── deploy.yml             # Automated linting, type-checking, and build validation
├── docker-compose.yml         # Full-stack local multi-container orchestration
├── nginx.conf                 # Reverse proxy configuration
├── .env.example               # Environment variables template
└── README.md                  # Project documentation
```

---

## 💻 Supported Languages & Runtimes

CodeJudge provides native execution support for 8 major programming languages:

| Language | Extension | Compiler / Interpreter | Compilation Command | Run Command |
| :--- | :--- | :--- | :--- | :--- |
| **C** | `.c` | GCC 11.4 | `gcc -O2 solution.c -o solution` | `./solution` |
| **C++** | `.cpp` | G++ 11.4 (C++17) | `g++ -O3 solution.cpp -o solution` | `./solution` |
| **Java** | `.java` | OpenJDK 17 | `javac Solution.java` | `java Solution` |
| **Python** | `.py` | Python 3.10 | *None (Interpreted)* | `python3 solution.py` |
| **JavaScript** | `.js` | Node.js 20.x | *None (Interpreted)* | `node solution.js` |
| **TypeScript** | `.ts` | TypeScript 5.4 + Node | `tsc solution.ts --target es2021` | `node solution.js` |
| **Go** | `.go` | Go 1.18 | `go build -o solution solution.go` | `./solution` |
| **Rust** | `.rs` | Rustc (2021 Edition) | `rustc -O solution.rs -o solution` | `./solution` |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or higher
- **npm**: `v9.x` or higher
- **Docker & Docker Compose**: Installed and running daemon
- **Git**

---

### Option A: Docker Compose (Recommended)

The fastest way to launch the entire full-stack platform (PostgreSQL, Redis, NestJS API, BullMQ Worker, Next.js Frontend, and Nginx proxy):

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VARDHANKANDA/CodeJudge.git
   cd CodeJudge
   ```

2. **Build the sandboxed compiler image:**
   ```bash
   docker build -t codejudge-sandbox:latest -f worker/Dockerfile.sandbox worker/
   ```

3. **Launch the services:**
   ```bash
   docker compose up --build
   ```

4. **Initialize the database (in a new terminal window):**
   ```bash
   docker compose exec api npx prisma migrate dev --name init
   docker compose exec api npx prisma db seed
   ```

5. **Access the platform:**
   - **Frontend Web Portal:** [http://localhost](http://localhost) (or [http://localhost:3000](http://localhost:3000))
   - **Swagger API Documentation:** [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
   - **Backend API Base:** [http://localhost:5000/api](http://localhost:5000/api)

---

### Option B: Local Step-by-Step Development

If you prefer running services independently on your host machine:

#### 1. Start Infrastructure Services (PostgreSQL & Redis)
Ensure local PostgreSQL (port `5432`) and Redis (port `6379`) instances are running.

#### 2. Backend Setup
```bash
cd backend
cp ../.env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```
The NestJS API will start on `http://localhost:5000/api`.

#### 3. Worker Setup
```bash
cd ../worker
# Build the Docker sandbox image (required for isolated code runs)
docker build -t codejudge-sandbox:latest -f Dockerfile.sandbox .
npm install
npm start
```
The worker will connect to Redis and begin listening for incoming judge jobs.

#### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The Next.js client will start on [http://localhost:3000](http://localhost:3000).

---

## 🔐 Environment Configuration

Create a `.env` file in the root and respective subdirectories using the template below:

```ini
# ==========================================
# Database (PostgreSQL / Neon)
# ==========================================
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/codejudge?schema=public"

# ==========================================
# Cache & Message Broker (Redis)
# ==========================================
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASSWORD=""
# Optional full URI for cloud Redis (Render / Upstash):
# REDIS_URL="rediss://default:token@host:port"

# ==========================================
# Backend API (NestJS)
# ==========================================
PORT=5000
FRONTEND_URL="http://localhost:3000,https://code-judge-three.vercel.app"

# Security: Required Cryptographic JWT Secrets (Minimum 32 characters)
JWT_SECRET="your_super_secret_access_jwt_key_at_least_32_characters"
JWT_REFRESH_SECRET="your_super_secret_refresh_jwt_key_at_least_32_characters"

# Default Admin Bootstrap Credentials
ADMIN_EMAIL="admin@codejudge.com"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_secure_admin_password_here"

# Optional: Google Gemini AI API Key
GEMINI_API_KEY=""

# ==========================================
# Worker & Sandbox
# ==========================================
TEMP_DIR="/tmp/codejudge"

# ==========================================
# Frontend (Next.js)
# ==========================================
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

## 🛡️ Sandbox Security & Isolation

Security is paramount when executing untrusted user code. CodeJudge enforces multi-layer defense mechanisms:

1. **Network Denial (`--network=none`):**
   - Containers run with complete network isolation. Submitted code cannot access the internet, internal networks, cloud metadata services, or host endpoints.
2. **Resource Constraints:**
   - **CPU:** Limited to `0.5` cores per execution to prevent CPU exhaustion.
   - **Memory:** Capped at `256MB` (`--memory=256m`). Out-of-memory errors trigger an immediate `MEMORY_LIMIT_EXCEEDED` verdict without affecting other processes.
   - **Process Limit (`--pids-limit=32`):** Prevents fork bombs and unbounded thread creation.
3. **Non-Root Execution:**
   - Code executes under an unprivileged user (`sandbox` UID 1000) inside the container.
4. **Read-Only Mounting:**
   - During code execution, the source directory is mounted read-only (`:ro`), preventing disk tampering.
5. **Deterministic Cleanup & Timeout Killing:**
   - Each submission generates a unique container identifier (`codejudge-run-<subId>-<timestamp>`). If execution exceeds the problem timeout, the worker issues an isolated `docker kill` and removes the specific container without affecting concurrent jobs.

---

## 🧩 Core Modules Breakdown

### 1. Problem Practice Catalog
- **500+ Verified Challenges:** Categorized into Easy, Medium, and Hard across 12 distinct computer science domains.
- **Rich Problem Views:** Detailed markdown statements, input/output formats, constraints, progressive hints, and multi-language canonical reference solutions.
- **Live Search & Multi-Tag Filters:** Search by title, slug, topic, difficulty, and company tags.

### 2. 7-Level Structured Roadmap
A pedagogical curriculum covering 45 fundamental and advanced algorithmic milestones:
1. **Level 1 — Foundations:** Complexity Analysis, Contiguous Memory, Prefix Accumulation, String Manipulation.
2. **Level 2 — Core Data Structures:** Linked Lists, Stacks, Queues, Hash Tables, Binary Trees, Heaps.
3. **Level 3 — Core Algorithms:** Binary Search on Answer Spaces, Sliding Window, Two Pointers, Greedy Heuristics.
4. **Level 4 — Advanced Structures:** Disjoint Set Union (DSU), Segment Trees with Lazy Propagation, Fenwick Trees, Sparse Tables.
5. **Level 5 — Dynamic Programming:** 1D, 2D Grid, 0/1 Knapsack, Interval DP, Bitmask DP, Digit DP.
6. **Level 6 — Advanced Graph Algorithms:** Dijkstra, Bellman-Ford, Tarjan Bridges/SCC, Topological Sort DAG DP, Network Flows.
7. **Level 7 — Competitive Programming & Math:** Sieve of Eratosthenes, Binary Exponentiation, Modular Inverses, Combinatorics, Game Theory (Nim).

### 3. Curated Practice Sheets
- **Foundations Essential 75:** The essential 75 questions for technical coding interviews.
- **Top Interview 150 Master Sheet:** Comprehensive interview preparation covering all classic patterns.
- **Hard Tier Algorithmic Mastery:** High-difficulty challenges for competitive programming competitions.

### 4. Real-Time Contests & Leaderboard
- **Contest Life Cycle:** Automatically handles `UPCOMING`, `LIVE`, and `PAST` contests.
- **ICPC Scoring Engine:** Calculates live rankings based on accepted problems and cumulative time penalties (including incorrect submission penalties).

### 5. Community Discussions & Forum
- **Markdown Threads:** Users can author threads categorized into *General*, *Tutorial*, *Contests*, and *Help*.
- **Interactive Engagement:** Nested comment replies, solution sharing, and like tracking.

### 6. Admin & Quality Management
- **Dashboard Metrics:** Real-time problem inventory breakdown, submission volume, and verdict distributions.
- **System Health Monitor:** Uptime tracking, CPU core utilization, and memory telemetry.
- **Security Audit Trail:** IP address and user-agent logging on sensitive actions.

---

## 🧪 Testing & Quality Assurance

CodeJudge features automated test coverage across the stack:

```bash
# Run backend unit and integration tests
cd backend
npm run test

# Run end-to-end audit and regression suite
node scratch_audit.js

# Run frontend linting & static checks
cd ../frontend
npm run lint
```

### Production Release Verification
- ✅ **100% Database Integrity:** 519 / 519 problems verified with visible + hidden test suites.
- ✅ **Zero Points Duplication:** Solved problems award points exactly once per user account.
- ✅ **Token Refresh Safety:** Refresh token rotation includes unique UUID `jti` entropy to prevent sub-second hash collisions.
- ✅ **Automated Regression Suite:** All 32 production readiness gates verified.

---

## 🚢 CI/CD & Deployment

The repository includes a production-ready **GitHub Actions** workflow (`.github/workflows/deploy.yml`):

1. **Continuous Integration (on every Push & PR):**
   - Installs dependencies across `backend`, `worker`, and `frontend`.
   - Executes Prisma client generation and schema validation.
   - Compiles TypeScript for both backend and worker.
   - Runs NestJS unit tests.
   - Builds and optimizes Next.js static and dynamic routes.
2. **Container Image Verification (on main branch push):**
   - Builds `codejudge-sandbox:latest`, `codejudge-api:latest`, `codejudge-worker:latest`, and `codejudge-frontend:latest`.

---

## 🔒 Security Model

- **Authentication:** Stateless JSON Web Tokens (JWT) for access validation paired with database-backed Refresh Tokens for seamless session renewal.
- **Password Hashing:** Passwords are encrypted using `bcrypt` with salt rounds.
- **Rate Limiting:** Throttler guards limit authentication attempts and execution requests to prevent abuse.
- **SQL Injection Prevention:** All database operations utilize parameterized queries through Prisma ORM.
- **XSS Protection:** Markdown rendering sanitizes HTML input on both problem descriptions and user forum posts.

---

## 🤝 Contributing

Contributions are welcomed! Follow these steps to contribute:

1. **Fork the Repository**
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes:**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push to the Branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

Please ensure that your code builds cleanly (`npm run build`) and passes all existing tests prior to opening a PR.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for programmers, competitive coders, and algorithm enthusiasts.**

[Star on GitHub ⭐](https://github.com/VARDHANKANDA/CodeJudge) • [Report Bug 🐛](https://github.com/VARDHANKANDA/CodeJudge/issues) • [Request Feature 💡](https://github.com/VARDHANKANDA/CodeJudge/issues)

</div>
