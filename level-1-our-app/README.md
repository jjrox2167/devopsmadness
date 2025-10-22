# 🧩 Level 1 – Auth Quest

Welcome to **Level 1** of DevOps Madness: a simple full-stack authentication app built with [Next.js](https://nextjs.org/) (App Router), API routes, and Prisma + SQLite.


This level focuses on setting up a complete minimal app — frontend, backend, and database — that will serve as the foundation for future DevOps workflows (CI/CD, Docker, cloud deployment, etc.).

---

## 🚀 Features

- ✅ User Registration & Login
- ✅ Protected Dashboard
- ✅ Next.js App Router
- ✅ API routes for authentication
- ✅ SQLite coupled with Prisma ORM

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 
- **Backend**: Next.js API routes
- **Database**: SQLite (via Prisma)
- **Auth**: Basic email/password
- **Language**: TypeScript, TailwindCSS, HTML

---

## 🧪 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/devops-madness.git
cd devops-madness/level-1-auth-quest

2. Install dependencies
npm install

3. Set up environment variables

Create a .env file:

DATABASE_URL="file:./dev.db"
JWT_SECRET="your-random-secret"

4. Set up the database
npx prisma migrate dev --name init
npx prisma generate

5. Run the app
npm run dev


Then open http://localhost:3000

👤 User Authentication Flow

Register with email & password

Login with credentials

Redirected to a protected dashboard

Auth token stored in cookie/session

📚 Project Goals

Devops Engineering is the cross-road where the traditional SysAdmin or System Engineer meet the needs of Software Development. In order to understand what might be required from a DevOps Engineer, we must understand how someone from the software development team approach or encounter a scenario for the needs of a 'devops' practices.

Our goal is to 

Build an MVP 'full-stack' app from scratch.

Prepare a real-world scenario for the need of CI/CD through DevOps pipelines.

Provide a clean base to mimic the need of for containerization & deployment.

Deploy to infrastructure

Practice managing secrets/API Keys.

Monitoring and Observability when it comes to the application and system's performance.

🧠 Next Steps (Future Levels)

Dockerize the application for portfability, containerization, and deployment purposes.

Deploy to Infrastructure.

Add GitHub Actions for Contineous Intergration / Continuous Deployment.

Enable real-time logging & monitoring of Application and System performance.


📂 Related

This is Level 1 of the DevOps Madness project portfolio.
    please see level 2 next!