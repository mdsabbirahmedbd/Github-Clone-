# 🐙 MyGit — GitHub Clone

> A full-stack GitHub clone with a **custom CLI version control tool**, built with MERN Stack + Supabase. Developers can push/pull code via terminal commands just like real Git.

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47a248?logo=mongodb)](https://mongodb.com)
[![Supabase](https://img.shields.io/badge/Supabase-Storage-3ecf8e?logo=supabase)](https://supabase.com)

---

## ✨ Features

- 🔐 **Authentication** — Google OAuth + Email/Password via Supabase Auth
- 📁 **Repository Management** — Create, browse, and manage public/private repos
- 💻 **Custom CLI Tool** — `mygit init`, `add`, `commit`, `push`
- ☁️ **Cloud Storage** — Files stored in Supabase Storage (S3-compatible)
- 👀 **Code Viewer** — Syntax-highlighted file viewer with commit history
- 📝 **Social Posts** — Share links, projects, and thoughts with the community
- 👥 **Follow System** — Follow/unfollow other developers
- 🔍 **Search** — Search public repositories
- 📊 **User Profile** — GitHub-style profile with repos, posts, followers

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Tailwind CSS, DaisyUI, TanStack Query |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Auth** | Supabase Auth (Google OAuth + Email) |
| **Storage** | Supabase Storage (S3-compatible object storage) |
| **CLI** | Node.js, Yargs |
| **State** | TanStack Query (React Query) |

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| Frontend | [Vercel Link](#) |
| Backend API | [Render Link](#) |

---

## 📁 Project Structure

```
github-clone/
├── backend/                  # Express API + CLI tool
│   ├── config/               # DB + Supabase config
│   ├── controllers/          # API+CLI controllers
│   ├── middleware/            # Auth middleware
│   ├── models/               # MongoDB schemas
│   ├── Routes/               # Express routes
│   ├── index.js              # CLI entry point
│   └── server.js             # Express server
│
└── frontend/                 # React application
    └── src/
        ├── components/       # Reusable UI components
        ├── context/          # Auth context
        ├── Hooks/            # Custom hooks
        ├── pages/            # Page components
        └── providers/        # Auth provider
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Supabase account

### 1. Clone the repository

```bash
git clone https://github.com/mdsabbirahmedbd/Github-Clone-.git
cd github-clone
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/github-clone
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PROJECT_URL=https://xxxxxxxx.supabase.co
SUPABASE_KEY=your_publishable_key
API_URL=http://localhost:3000
```

Run the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_KEY=your_publishable_key
VITE_API_URL=http://localhost:3000/api
```

Run the app:

```bash
npm run dev
```

---

## 💻 CLI Tool — mygit

### Install globally

```bash
cd backend
npm install -g .
```

This enables the `mygit` command anywhere on your system.

> **IF NOT WORK IN Windows :** `npm link` OR `node index.js` 

### CLI Commands

```bash
# Initialize a new repository
mygit init

# Add files to staging
mygit add index.js    # only allow single file storage perpas

# Commit staged files
mygit commit "first commit"

# Create a remote repository
mygit remote  url/reponame   # if you create a repo in frontend give you a url/reponame

# Push to Supabase Storage
mygit push
```


## 🔄 How It Works

### Authentication Flow
```
Supabase Signup/Login
        ↓
onAuthStateChange fires
        ↓
Backend /api/users/create → MongoDB save
        ↓
JWT Cookie set → Dashboard access
```

### CLI Push Flow
```
mygit add app.js
        ↓
Files → .myGit/staging/

mygit commit "message"
        ↓
Hash compare (no duplicate commits)
Staging → .myGit/commits/{uuid}/

mygit push
        ↓
Supabase Storage upload
Path: {userId}/{repoName}/{commitId}/{file}
```

### File Viewing Flow
```
Frontend → Supabase Storage list
        ↓
Commit history dropdown
        ↓
File tabs → Syntax highlighted code viewer
```


### Supabase Setup
```
Authentication → Providers →
  Email: Enable ✅
  Google: Enable + Client ID + Secret ✅

Storage → New Bucket →
  Name: commits
  Public: ON ✅

Authentication → URL Configuration →
  Site URL: https://your-vercel-app.vercel.app
  Redirect URLs: https://your-vercel-app.vercel.app/auth/callback
```


## 📸 Screenshots

| Page | Description |
|---|---|
| Home | Landing page |
| Dashboard | Blog posts + create form |
| Repositories | Public repos with search |
| Profile | GitHub-style user profile |
| Repo View | Syntax-highlighted code viewer |
| CLI Setup | Terminal commands guide |

---

## 🧑‍💻 Resume Highlights

```
• Built a custom Git-like CLI tool (mygit) with init, add, commit, push, pull commands
• Implemented S3-compatible object storage using Supabase Storage
• Full-stack MERN application with JWT + Supabase OAuth authentication
• Real-time follow/unfollow system with TanStack Query state management
• Syntax-highlighted code viewer with commit history navigation
• Deployed on Vercel (frontend) + Render (backend) + MongoDB Atlas
```

---

## 👨‍💻 Author
**Sabbir Ahmed**
[![LinkedIn](https://www.linkedin.com/in/sabbirahmed-dev/)
[![GitHub](https://github.com/mdsabbirahmedbd)
