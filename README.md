# CodeJudge

CodeJudge is an enterprise-grade online code execution and competitive programming platform. It provides automated code judging across multiple languages within isolated, secure Docker sandboxes, paired with a rich problem repository, curated practice sheets, a structured roadmap, contests, live leaderboards, and community discussions.

---

## Features

- **Online Code Judge**: Fast, accurate judging for user-submitted code with deterministic verdicts (`ACCEPTED`, `WRONG_ANSWER`, `TIME_LIMIT_EXCEEDED`, `MEMORY_LIMIT_EXCEEDED`, `COMPILATION_ERROR`, `RUNTIME_ERROR`).
- **Multi-Language Execution**: Native support for C, C++, Java, Python, JavaScript, TypeScript, Go, and Rust with custom boilerplate templates and starter code.
- **Hardened Docker Sandbox**: Secure, non-networked container isolation (`--network=none`, memory limits, CPU quotas, process PID caps, and non-root execution).
- **Problems & Practice Sheets**: Over 500+ verified algorithmic problems and structured practice sheets (including *Foundations 75*, *Top Interview 150*, and topic mastery sheets).
- **A2Z-Style Learning Roadmap**: Multi-level structured curriculum covering fundamental to advanced data structures and algorithms with real-time topic progress tracking.
- **Contests & Standings**: Timed live, upcoming, and past contests with ICPC-style scoring, penalty calculation, and real-time contest leaderboards.
- **Global Leaderboard & Points**: Real solve-based point accumulation with strict idempotency (first-solve awards, no duplicate scoring).
- **Discussions & Editorials**: Problem-linked forums, nested discussions, community comments, and reference editorial solutions.
- **Authentication & RBAC**: JWT-based authentication with secure refresh token rotation and role-based access control (`USER`, `PROBLEM_SETTER`, `ADMIN`).
- **Admin Control Center**: Quality management dashboard to audit test coverage, verify problem content, and manage users.

---

## Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router, React 19, Tailwind CSS, Monaco Editor, Lucide Icons, Zustand) |
| **Backend** | NestJS 10 (TypeScript, Fastify/Express, Passport JWT, Class Validator, Swagger) |
| **Database** | PostgreSQL 16 managed via Prisma ORM |
| **Queue** | BullMQ backed by Redis |
| **Worker Engine** | Node.js TypeScript background worker executing Docker sandboxes |
| **Sandbox** | Docker container (`codejudge-sandbox`) with GCC, Clang, JDK, Python, Node.js, Go, and Rust |
| **Deployment** | Vercel (Frontend), Render (Backend & PostgreSQL), Redis Cloud |

---

## Architecture

```mermaid
flowchart LR
    User([User Browser]) -->|HTTP / REST| Frontend[Next.js Frontend]
    Frontend -->|API Requests + JWT| Backend[NestJS API Server]
    Backend -->|CRUD & Relations| PostgreSQL[(PostgreSQL Database)]
    Backend -->|Enqueue Job| Redis[(Redis Queue / BullMQ)]
    Worker[Judge Worker] -->|Dequeue Job| Redis
    Worker -->|Execute Code| Docker[Docker Sandbox Container]
    Docker -->|Verdict & Metrics| Worker
    Worker -->|Update Submission & Points| PostgreSQL
```

---

## Repository Structure

```text
CodeJudge/
├── frontend/               # Next.js 15 App Router client
│   ├── src/app/            # Route handlers (problems, sheets, roadmap, contests, dashboard)
│   ├── src/components/     # UI components & Monaco code editor
│   └── src/lib/            # API client, store, and utilities
├── backend/                # NestJS 10 API server
│   ├── prisma/             # Prisma schema, migrations, and seed scripts
│   └── src/                # Modules (auth, problems, roadmap, contests, submissions, users)
├── worker/                 # BullMQ asynchronous judging worker
│   ├── src/configs/        # Language compiler & runtime definitions
│   └── src/sandbox.ts      # Docker execution sandbox & resource isolation
└── sandbox/                # Dockerfile for the multi-language execution container
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+ and **npm**
- **Docker** and **Docker Compose**
- **PostgreSQL** 16+
- **Redis** 7+

### 1. Clone the Repository

```bash
git clone https://github.com/VARDHANKANDA/CodeJudge.git
cd CodeJudge
```

### 2. Environment Variables

Create `.env` files in `backend/` and `frontend/`:

**Backend (`backend/.env`):**
```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/codejudge?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=15m
REFRESH_TOKEN_SECRET=your_refresh_secret_key_here
REFRESH_TOKEN_EXPIRATION=7d
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@codejudge.com
ADMIN_PASSWORD=change_this_admin_password
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 3. Database Migration & Seeding

```bash
cd backend
npm install
npx prisma db push
npm run prisma:seed
```

### 4. Build the Docker Sandbox Image

```bash
cd ../sandbox
docker build -t codejudge-sandbox .
```

### 5. Run the Services

**Terminal 1 (Backend API):**
```bash
cd backend
npm run start:dev
```

**Terminal 2 (Worker Judge):**
```bash
cd worker
npm install
npm run start:dev
```

**Terminal 3 (Frontend App):**
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access CodeJudge.

---

## Production Deployments

- **Frontend**: [https://code-judge-three.vercel.app](https://code-judge-three.vercel.app)
- **Backend API**: [https://codejudge-backend-zh9l.onrender.com/api](https://codejudge-backend-zh9l.onrender.com/api)
- **Swagger Documentation**: [https://codejudge-backend-zh9l.onrender.com/api/docs](https://codejudge-backend-zh9l.onrender.com/api/docs)

---

## License

This project is licensed under the MIT License.
