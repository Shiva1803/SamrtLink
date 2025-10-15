#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting SmartLink Development Environment...${NC}"

# Check if MongoDB is needed
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${RED}⚠️  MongoDB not running. Please start MongoDB first.${NC}"
    echo -e "${BLUE}Run: brew services start mongodb-community${NC}"
fi

# Start backend
echo -e "${GREEN}📦 Starting Backend Server...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${GREEN}🎨 Starting Frontend Server...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo -e "${BLUE}✅ Development servers started!${NC}"
echo -e "${GREEN}Backend: http://localhost:5000${NC}"
echo -e "${GREEN}Frontend: http://localhost:3001${NC}"
echo ""
echo -e "${BLUE}Press Ctrl+C to stop all servers${NC}"

# Handle shutdown
trap "echo -e '${RED}Shutting down...${NC}'; kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM

# Wait for both processes
wait

