#!/bin/bash

# SmartLink Development Setup Script

echo "🚀 SmartLink Development Setup"
echo "================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js $(node --version) found"
echo ""

# Setup Backend
echo "📦 Setting up backend..."
cd backend

if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your actual credentials"
else
    echo ".env already exists"
fi

echo "Installing backend dependencies..."
npm install

cd ..
echo "✅ Backend setup complete"
echo ""

# Setup Frontend
echo "📦 Setting up frontend..."
cd frontend

if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
else
    echo ".env already exists"
fi

echo "Installing frontend dependencies..."
npm install

cd ..
echo "✅ Frontend setup complete"
echo ""

# Summary
echo "================================"
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB URI and API keys"
echo "2. Update frontend/.env if needed (default: http://localhost:5000)"
echo ""
echo "To start development:"
echo "  Terminal 1: cd backend && npm run dev"
echo "  Terminal 2: cd frontend && npm run dev"
echo ""
echo "📚 Documentation available in /docs directory"
echo "================================"

