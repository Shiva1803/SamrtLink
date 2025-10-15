#!/bin/bash

# Complete development environment startup script

echo "🚀 Starting SmartLink Development Environment"
echo "=============================================="
echo ""

# Step 1: Start MongoDB
echo "1️⃣  Starting MongoDB..."
./start-mongodb.sh
if [ $? -ne 0 ]; then
    echo "⚠️  Warning: MongoDB failed to start. Backend will run without database."
    echo ""
fi

# Step 2: Start Backend
echo ""
echo "2️⃣  Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to initialize
sleep 3

# Step 3: Start Frontend
echo ""
echo "3️⃣  Starting Frontend Server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=============================================="
echo "✅ Development Environment Started!"
echo ""
echo "📱 Frontend:  http://localhost:3001"
echo "🔧 Backend:   http://localhost:5001"
echo "🔍 Health:    http://localhost:5001/health"
echo ""
echo "Press Ctrl+C to stop all servers"
echo "=============================================="

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping all services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    ./stop-mongodb.sh
    exit 0
}

trap cleanup INT TERM

# Wait for processes
wait

