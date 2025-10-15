#!/bin/bash

# Development startup script

echo "🚀 Starting SmartLink Development Servers..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start backend
echo "📡 Starting backend on port 5000..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend on port 5173..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers are running!"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

