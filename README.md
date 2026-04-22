# ToDo App

A full-stack task management application built to help users organize their daily routines efficiently.

## Features

- **Auth:** User registration and secure authentication.
- **Responsive UI:** Fully optimized for mobile, tablet, and desktop.
- **CRUD:** Create, Read, Update, and Delete tasks easily.

## Tech Stack

- **Frontend:** React + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL

## Key Node Modules

- **Backend:** `express`, `pg`, `jsonwebtoken`, `bcrypt`, `dotenv`, `zod`, `ts-node-dev`
- **Frontend:** `react`, `react-dom`, `typescript`

## Setup Instructions

### 1. Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file and add your database credentials:
   ```env
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_db
   JWT_SECRET=your_secret_key
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
