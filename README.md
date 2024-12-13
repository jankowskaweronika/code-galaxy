🚀 CodeGalaxy

Your Journey to Programming Excellence

<div align="center">
Show Image
Modern Educational Platform Built with React & TypeScript

</div>
📚 Features
🔐 User Authentication

Email/Password registration and login
Google OAuth integration
Protected routes for authenticated users
Password reset functionality
User profile management

📖 Course Management

Browse available courses
Purchase courses
Track learning progress
Course content organized by topics
Difficulty levels and duration tracking

🎯 User Dashboard

Personal profile overview
Course progress tracking
Purchased courses management
User settings

💫 UI/UX

Responsive design supporting multiple screen sizes
Material-UI components
Consistent theming
Loading states and error handling
Search functionality for courses
Interactive navigation

🛠 Tech Stack
Core

⚛️ React 18
📘 TypeScript
🔥 Firebase (Authentication & Firestore)
🛣 React Router v6

UI Framework

🎨 Material-UI (MUI)
🧩 Custom components
📱 Responsive layouts
🎭 Custom theming

State Management

🔄 React Context API
🎣 Custom hooks for business logic

Development Tools

⚙️ Strict TypeScript configuration
🔍 ESLint
🔮 Modern JavaScript (ES2015+)

📁 Project Structure
Copysrc/
├── 📂 auth/ # Authentication context and protected routes
├── 📂 components/ # Reusable UI components
├── 📂 config/ # Firebase configuration
├── 📂 layouts/ # Page layout components
├── 📂 pages/ # Application pages
├── 📂 types/ # TypeScript type definitions
├── 📂 utils/ # Utility functions and services
└── 📂 hooks/ # Custom React hooks
🚀 Setup Instructions
1️⃣ Clone the repository
2️⃣ Install dependencies:
bashCopynpm install
3️⃣ Create a Firebase project and obtain configuration:

Go to Firebase Console
Create a new project
Enable Authentication (Email/Password and Google)
Enable Firestore
Copy your Firebase configuration

4️⃣ Create .env file in the root directory:
envCopyVITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
5️⃣ Start the development server:
bashCopynpm run dev
🏗 Key Components
Layouts

MainLayout: General page layout with navigation
AuthLayout: Layout for authentication pages
DashboardUserLayout: Dashboard layout with sidebar navigation
PageLayout: Generic page layout with customizable options

Authentication

AuthContext: Manages authentication state
ProtectedRoute: Route wrapper for authenticated access
Custom hooks for login/register functionality

Course Management

CourseCard: Display course information
CoursesGridLayout: Grid layout for course listing
courseService: Service for course-related operations

🔥 Firebase Structure
Authentication

Email/Password authentication
Google OAuth provider
User profile management

Firestore Collections

courses: Course information
users/{userId}/coursesProgress: User progress tracking

📝 Development Guidelines
TypeScript

Strict type checking enabled
Types defined using type keyword
Comprehensive type definitions for components

Component Structure

Functional components with TypeScript
Props interface definitions
Use of appropriate layouts
Error boundary implementation

State Management

Context API for global state
Local state with useState
Custom hooks for complex logic

🤝 Contributing

Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
