#!/bin/bash

# Comprehensive SmartLink startup with MongoDB verification

echo "🚀 Starting SmartLink Development Environment"
echo "=============================================="
echo ""

# Step 1: Check if MongoDB is running
echo "1️⃣  Checking MongoDB status..."
if pgrep -f mongod > /dev/null; then
    echo "✅ MongoDB is already running (PID: $(pgrep -f mongod))"
else
    echo "📦 MongoDB not running, starting it now..."
    ./start-mongodb.sh
    if [ $? -ne 0 ]; then
        echo "⚠️  Warning: MongoDB failed to start. Backend will run without database."
    fi
fi
echo ""

# Step 2: Start Backend
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
echo "📱 Frontend:  http://localhost:3000"
echo "🔧 Backend:   http://localhost:5001"
echo "🔍 Health:    http://localhost:5001/health"
echo "🗄️  MongoDB:   mongodb://localhost:27017"
echo ""
echo "Press Ctrl+C to stop all servers"
echo "=============================================="
echo ""

# Keep script running and handle cleanup
trap "echo ''; echo '🛑 Stopping all services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

wait

