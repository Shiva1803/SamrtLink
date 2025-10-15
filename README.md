# SmartLink

> A modern URL shortener and link management platform with AI-powered analytics

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/smartlink)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/smartlink.git
cd SamrtLink

# Install dependencies
npm install                    # Root dependencies
cd backend && npm install      # Backend dependencies
cd ../frontend && npm install  # Frontend dependencies

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start development servers
npm run dev                    # Or use individual commands below
```

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Backend API](#backend-api)
- [Frontend Architecture](#frontend-architecture)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Core Features
- **URL Shortening** - Create short, memorable links with custom aliases
- **QR Code Generation** - Auto-generate QR codes for all shortened links
- **Analytics Dashboard** - Track clicks, views, geographic data, and more
- **AI-Powered Insights** - Smart analytics using OpenAI/Groq
- **User Management** - Authentication, profiles, and team workspaces

### Advanced Features
- Link categorization and tagging
- Bulk link creation
- Device and browser tracking
- Referrer analytics
- Time-based statistics
- Public shareable profiles

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible components
- **GSAP & Motion** - Smooth animations
- **Recharts** - Data visualization

### Backend
- **Node.js & Express** - Server framework
- **TypeScript** - Type safety
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **LangChain** - AI integration
- **OpenAI/Groq** - Embeddings & AI features

## 📁 Project Structure

```
smartlink/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database & service configs
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Helper functions
│   │   └── server.ts       # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/               # React application
│   ├── src/
│   │   ├── config/        # API & app configuration
│   │   ├── lib/           # Core utilities & API client
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript types
│   │   ├── features/      # Feature modules with services
│   │   ├── components/    # UI components (organized)
│   │   └── pages/         # Page components (organized)
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
│
└── README.md              # This file
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- OpenAI or Groq API key (for AI features)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Configure Backend** (`backend/.env`)
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/smartlink
   JWT_SECRET=your-super-secret-jwt-key
   OPENAI_API_KEY=your-openai-api-key
   GROQ_API_KEY=your-groq-api-key
   FRONTEND_URL=http://localhost:5173
   ```

3. **Configure Frontend** (`frontend/.env`)
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend (port 5000)
   cd backend && npm run dev

   # Terminal 2 - Frontend (port 5173)
   cd frontend && npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 💻 Development

### Backend Structure

```
backend/src/
├── config/
│   ├── db.ts              # MongoDB connection
│   └── openai.ts          # AI service setup
├── models/
│   ├── User.ts            # User model
│   ├── Analytics.ts       # Analytics model
│   └── Embedding.ts       # Embeddings model
├── routes/
│   ├── auth.ts            # Authentication routes
│   ├── chat.ts            # AI chat routes
│   └── ingest.ts          # Data ingestion routes
├── utils/
│   └── jwt.ts             # JWT utilities
└── server.ts              # Express app setup
```

**Available Scripts:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run clean    # Clean build directory
```

### Frontend Architecture

The frontend follows a **feature-based architecture** for easy maintenance:

```
frontend/src/
├── config/                # Configuration
│   ├── api.config.ts     # All API endpoints
│   └── constants.ts      # App constants
│
├── lib/                  # Core utilities
│   ├── api.ts           # Centralized API client
│   └── utils.ts         # Helper functions
│
├── hooks/                # Custom React hooks
│   ├── useAuth.ts       # Authentication
│   ├── useLinks.ts      # Link management
│   └── useAnalytics.ts  # Analytics
│
├── features/             # Feature modules
│   ├── auth/services/   # Auth API calls
│   ├── links/services/  # Link API calls
│   └── analytics/services/
│
├── components/           # UI components
│   ├── common/          # Shared (Navigation, Footer)
│   ├── landing/         # Landing page
│   ├── dashboard/       # Dashboard
│   └── ui/              # Radix UI components
│
└── pages/                # Page components
    ├── public/          # Public pages
    ├── auth/            # Auth pages
    └── dashboard/       # Protected pages
```

**Available Scripts:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Using the API Client

**Option 1: Custom Hooks (Recommended)**
```typescript
import { useAuth } from '@/hooks/useAuth';
import { useLinks } from '@/hooks/useLinks';

function MyComponent() {
  const { user, signIn, logout } = useAuth();
  const { links, createLink, deleteLink } = useLinks();

  const handleLogin = async () => {
    await signIn({ email, password });
  };

  const handleCreateLink = async () => {
    await createLink({ originalUrl, customSlug });
  };
}
```

**Option 2: Direct Service Calls**
```typescript
import { authService } from '@/features/auth/services/auth.service';
import { linkService } from '@/features/links/services/link.service';

const response = await authService.signIn({ email, password });
const link = await linkService.createLink({ originalUrl });
```

## 🔌 Backend API

### Authentication Endpoints

```
POST   /api/auth/signin      Sign in user
POST   /api/auth/signup      Register new user
```

### Link Management (Coming Soon)

```
GET    /api/links            Get all user links
POST   /api/links/create     Create new short link
PUT    /api/links/:id        Update link
DELETE /api/links/:id        Delete link
```

### Analytics (Coming Soon)

```
GET    /api/analytics/:linkId    Get link analytics
GET    /api/analytics/dashboard  Get dashboard stats
```

### AI Features

```
POST   /api/chat             AI chat interface
POST   /api/ingest           Ingest data for embeddings
```

## 🎨 Frontend Pages

1. **Home** - Landing page with hero and features
2. **Features** - Detailed feature showcase
3. **Pricing** - Pricing plans
4. **About** - About the platform
5. **Contact** - Contact form
6. **Sign In** - User authentication
7. **Sign Up** - User registration
8. **Dashboard** - Main user dashboard
9. **Settings** - User settings
10. **Profile** - Public shareable profile

## 🚀 Deployment

### Backend Deployment

```bash
cd backend
npm run build
npm start
```

Set environment variables on your hosting platform:
- `MONGODB_URI` - Production MongoDB URL
- `JWT_SECRET` - Secure random string
- `OPENAI_API_KEY` / `GROQ_API_KEY` - AI service keys
- `FRONTEND_URL` - Production frontend URL

### Frontend Deployment

```bash
cd frontend
npm run build
```

Deploy the `dist/` folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

Update `VITE_API_URL` in production environment.

## 🔧 Configuration

### API Endpoints Configuration

Edit `frontend/src/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    SIGN_IN: '/api/auth/signin',
    SIGN_UP: '/api/auth/signup',
    // ... add your endpoints here
  }
};
```

### App Constants

Edit `frontend/src/config/constants.ts`:

```typescript
export const ROUTES = {
  HOME: 'home',
  FEATURES: 'features',
  // ... your routes
};
```

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

## 📦 Building for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Variables

### Backend Required Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `OPENAI_API_KEY` or `GROQ_API_KEY` - AI service key

### Frontend Required Variables
- `VITE_API_URL` - Backend API URL

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure network access for MongoDB Atlas

**Frontend API Errors:**
- Verify backend is running on correct port
- Check CORS settings in backend
- Confirm `VITE_API_URL` is correct

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `npm run clean`
- Check Node.js version (18+ required)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Attributions

- UI components from [shadcn/ui](https://ui.shadcn.com/) (MIT License)
- Images from [Unsplash](https://unsplash.com) (Unsplash License)
- Original design from [Minimalist SaaS Landing Page](https://www.figma.com/design/28WOPKgyyBFmQYFvAHVoDa/)

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ using React, Node.js, and MongoDB**

