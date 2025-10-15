#!/bin/bash

# MongoDB Startup Script for SmartLink (macOS Compatible)
# This starts MongoDB manually without using brew services

echo "🔧 Starting MongoDB manually..."

# Kill any existing mongod processes
pkill -f mongod 2>/dev/null
sleep 1

# Create data directory if it doesn't exist
mkdir -p ~/mongodb-data

# Start MongoDB in background (macOS compatible - no --fork)
mongod --dbpath ~/mongodb-data --logpath ~/mongodb-data/mongodb.log > /dev/null 2>&1 &

# Check if it started successfully
sleep 2
if pgrep -f mongod > /dev/null; then
    echo "✅ MongoDB is running!"
    echo "📁 Data directory: ~/mongodb-data"
    echo "📝 Log file: ~/mongodb-data/mongodb.log"
    echo ""
    echo "To stop MongoDB, run: ./stop-mongodb.sh"
else
    echo "❌ Failed to start MongoDB"
    echo "Check the log file: cat ~/mongodb-data/mongodb.log"
    exit 1
fi
