# myFitness

A personal fitness tracking app built with Next.js, Prisma, and Better Auth.

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database

### Setup

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
