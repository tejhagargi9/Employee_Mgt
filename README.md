# EmployeeTrack - Employee Management System

A modern, full-stack employee management system built with Next.js, featuring user authentication, secure API endpoints, and a responsive dashboard interface.

## 🚀 Features

- **User Authentication**: Secure signup, login, and password update functionality
- **Employee Management**: Add, edit, delete, and search employees
- **JWT Authentication**: Token-based authentication with secure API routes
- **Responsive Design**: Mobile-friendly interface with dark mode support
- **Real-time Search**: Instant employee search and filtering
- **Form Validation**: Client-side validation with Zod and React Hook Form
- **MongoDB Integration**: Robust database operations with Mongoose

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **UI Components**: Radix UI, Lucide Icons
- **Form Handling**: React Hook Form, Zod validation

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB (local installation or MongoDB Atlas cloud)

## ⚡ Quick Start

### 1. Clone and Install

```bash
# Navigate to the project directory
cd my-app

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/employeetrack
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employeetrack

# JWT Secret Key (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally and start the service
mongod

# Or using brew on macOS:
brew services start mongodb/brew/mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and add it to `.env.local`

### 4. Run the Application

```bash
# Start development server
npm run dev

# Or with Turbopack (faster)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage

### Authentication Flow
1. **Signup**: Create a new account at `/signup`
2. **Login**: Sign in at `/login` with your credentials
3. **Dashboard**: Access employee management at `/dashboard`
4. **Password Update**: Change password at `/update-password`

### Employee Management
- **View Employees**: Browse all employees with pagination
- **Search**: Use the search bar to find employees by name, email, or position
- **Add Employee**: Click "Add Employee" to create new records
- **Edit/Delete**: Use action buttons in the employee table

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/update-password` - Password update (requires auth)

### Employees
- `GET /api/employees` - Get all employees (with search/filtering)
- `POST /api/employees` - Create new employee
- `GET /api/employees/[id]` - Get employee by ID
- `PUT /api/employees/[id]` - Update employee
- `DELETE /api/employees/[id]` - Delete employee

## 🏗️ Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── signup/route.ts
│   │   │   └── update-password/route.ts
│   │   └── employees/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── dashboard/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── update-password/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── types/index.ts
├── components/
│   ├── ui/ (Radix UI components)
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── UpdatePasswordForm.tsx
│   ├── EmployeeTable.tsx
│   └── ... (other components)
├── lib/
│   └── mongodb.ts
├── models/
│   ├── User.ts
│   └── Employee.ts
└── public/
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Stateless authentication with expiration
- **Input Validation**: Server and client-side validation
- **CORS Protection**: API routes protected against unauthorized access
- **SQL Injection Prevention**: MongoDB with proper sanitization

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- **Railway**: Connect GitHub repo and add environment variables
- **Render**: Similar setup with environment configuration
- **Docker**: Use included Dockerfile for containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.
