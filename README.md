# React-Calendar-Backend

To implement environment variables:

- Copy ***.env.template*** and rename to ***.env***
- Implement variables
    - Change connection chain from Mongo Atlas with your own data: user, password and database.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

## Deploy on Vercel

Import this repository as a Vercel project and keep the project root at this
directory. Vercel detects the Express app from `index.ts`; no build command is
required.

Add these environment variables in **Project Settings → Environment Variables**
for Production, Preview, and Development as needed:

- `DB_CNN`: MongoDB Atlas connection string.
- `JWT_SECRET_SEED`: a long, random secret used to sign JWTs.

`PORT` is only needed for local development; Vercel manages the port itself.
Ensure your MongoDB Atlas network access settings allow connections from your
Vercel deployment. For production, prefer Vercel Static IPs where available;
otherwise, follow Atlas's guidance for serverless deployments and use a
dedicated database user with a strong password.

This project was created using `bun init` in bun v1.4.2. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
