# myFitness

A personal fitness tracking app built with Docker, Next.js, Prisma, and Better Auth.

## Getting Started

### Prerequisites

- Docker (main path)

> [!NOTE]
> For manual installation, you'll also need:

- Node.js 18+
- A PostgreSQL database

### 🐳 Docker Setup

1. **Set up environment variables**

```bash
cp .env.example .env
```

> [!IMPORTANT]
> Open `.env` and fill in `POSTGRES_PASSWORD` and `BETTER_AUTH_SECRET`.

2. **Start the app**

```bash
docker compose up
```

> [!NOTE]
> On first run, dependencies are installed and the database is migrated & seeded, it might take a minute. The base parametrized user can be found in `/prisma/seed.ts`. Sign up will be implemented in due time.

### Manual Setup

1. **Install dependencies**

```bash
   npm install
```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your values:

```bash
   cp .env.example .env
```

3. **Generate the Prisma client**

```bash
   npx prisma generate
```

4. **Run migrations**

```bash
   npx prisma migrate dev
```

5. **Seed the database**

```bash
   npx prisma db seed
```

6. **Start the dev server**

```bash
   npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
