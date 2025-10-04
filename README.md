# Employee Management System

A full-stack employee management application built with Next.js.

## Features

- User authentication with signup, login, and password update
- Employee management including add, view, edit, and delete operations
- Search and filter employees by name, email, or position
- Responsive design with dark mode support
- JWT-based secure authentication
- MongoDB database integration

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Next.js API Routes
- Database: MongoDB with Mongoose
- Authentication: JWT with bcryptjs
- UI Components: Shadcn UI (built on Radix UI)

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)

## Running the Project Locally

1. Navigate to the project directory:
   ```
   cd my-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file in the root directory with:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret-key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Demo

View the live application at [employee-mgt-three.vercel.app](https://employee-mgt-three.vercel.app).

## API Endpoints

### Authentication
- POST /api/auth/signup - User registration
- POST /api/auth/login - User login
- POST /api/auth/update-password - Password update

### Employees
- GET /api/employees - Get all employees
- POST /api/employees - Create new employee
- GET /api/employees/[id] - Get employee by ID
- PUT /api/employees/[id] - Update employee
- DELETE /api/employees/[id] - Delete employee


Open to contribute.

