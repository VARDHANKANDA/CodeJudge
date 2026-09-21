# CodeJudge - Production Online Judge & Competitive Programming Platform

CodeJudge is an enterprise-level Online Judge and Competitive Programming platform (similar to LeetCode and Codeforces) designed with a premium, luxury Indian-inspired dark theme.

## Architecture & Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Monaco Editor, Tailwind CSS, Recharts, Zustand, TanStack Query, Framer Motion.
- **Backend API**: NestJS, TypeScript, Prisma ORM, PostgreSQL, Passport JWT, Swagger UI.
- **Task Worker**: Node.js/TypeScript BullMQ queue worker parsing compiler executions.
- **Sandbox**: Isolated, non-networked Docker container configurations limiting execution memory (256MB) and CPU cores (0.5).
- **Reverse Proxy**: Nginx routing requests dynamically.

---

## Folder Structure

```
CodeJudge/
├── backend/                  # NestJS API application
│   ├── src/                  # Controllers, Modules, Services
│   ├── prisma/               # Schema and Seed configs
│   ├── Dockerfile
│   └── package.json
├── worker/                   # BullMQ Sandboxed execution worker
│   ├── src/                  # Queue listener and Docker runner
│   ├── Dockerfile.sandbox    # Multicompiler image (GCC, JDK, Py, Node, Go, Rust)
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # Next.js 15 Client app
│   ├── src/                  # App routes, Zustand stores, custom hooks
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml        # Services Orchestration
├── nginx.conf                # Nginx proxy mapping
└── README.md
```

---

## Quick Start Installation

### Prerequisites
- Node.js (v20+)
- Docker and Docker Compose
- PostgreSQL (if running locally without compose)
- Redis (if running locally without compose)

### Running with Docker Compose (Recommended)

1. Build the sandboxed execution image:
   ```bash
   docker build -t codejudge-sandbox:latest -f worker/Dockerfile.sandbox worker/
   ```

2. Spin up the application stack:
   ```bash
   docker compose up --build
   ```

3. Run database migrations and seed default problems:
   ```bash
   docker compose exec api npx prisma migrate dev --name init
   docker compose exec api npx prisma db seed
   ```

The application will be accessible at:
- Frontend Portal: [http://localhost](http://localhost)
- Backend API Docs: [http://localhost/api/docs](http://localhost/api/docs)
- Redis Port: `6379`
- PostgreSQL Port: `5432`

---

## Local Development (Without Docker Compose)

### 1. Database Setup
Ensure PostgreSQL and Redis are running locally. Configure `.env` in the `backend/` folder:
```
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/codejudge?schema=public
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=some-secret-123
JWT_REFRESH_SECRET=some-refresh-secret-456
```

Inside `backend/` run:
```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```

### 2. Sandbox Worker Setup
Inside `worker/` run:
```bash
# Build sandbox image
docker build -t codejudge-sandbox:latest -f Dockerfile.sandbox .

# Install dependencies and start worker
npm install
npm start
```

### 3. Frontend Setup
Inside `frontend/` run:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser.

---

## Supported Runtimes

| Language | Extension | Compile Command | Run Command |
| :--- | :--- | :--- | :--- |
| **C** | `.c` | `gcc -O2 solution.c -o solution` | `./solution` |
| **C++** | `.cpp` | `g++ -O3 solution.cpp -o solution` | `./solution` |
| **Java** | `.java` | `javac Solution.java` | `java Solution` |
| **Python** | `.py` | None (Interpreted) | `python3 solution.py` |
| **JavaScript** | `.js` | None (Interpreted) | `node solution.js` |
| **TypeScript** | `.ts` | `tsc solution.ts --target es2021` | `node solution.js` |
| **Go** | `.go` | `go build -o solution solution.go` | `./solution` |
| **Rust** | `.rs` | `rustc -O solution.rs -o solution` | `./solution` |

---

## Security & Hardening

- **JWT Secrets**: `JWT_SECRET` and `JWT_REFRESH_SECRET` are strictly required environment variables. Default fallback keys are prohibited.
- **Rate Limiting**: NestJS `@nestjs/throttler` protects authentication (`/api/auth/*`), code submission (`/api/submissions`), and AI assistant (`/api/ai/*`) endpoints against brute force and abuse.
- **Sandbox Isolation**:
  - Code runs inside isolated Docker containers with non-root user (`sandbox`).
  - Strict limits: `--memory=256m`, `--cpus=0.5`, `--pids-limit=32`, and `--network=none`.
  - Unique per-submission container naming prevents race conditions during timeout kills.
- **Points Idempotency**: Submission points are strictly awarded on the first accepted solution per problem, preventing duplicate point accumulation.

---

## Verification & Testing Checklist

- [x] Application builds without compilation errors across backend, worker, and frontend.
- [x] Insecure unauthenticated OAuth callback endpoint removed; strict JWT secrets enforced.
- [x] Sandboxed runner assigns unique container names and kills only targeted containers on timeout.
- [x] Point duplication on duplicate accepted submissions prevented.
- [x] Composite database indexes added to `Submission` and `AuditLog`.
- [x] Missing frontend routes (`/discussions`, `/profile`, `/auth/forgot-password`) implemented.
- [x] CI/CD workflow typo fixed and worker build steps added.
- [x] ACM-ICPC contest scoreboard penalty calculations tested.

