#!/bin/bash

# Stop MongoDB
echo "🛑 Stopping MongoDB..."
pkill -f mongod

if ! pgrep -f mongod > /dev/null; then
    echo "✅ MongoDB stopped successfully"
else
    echo "⚠️  MongoDB may still be running. Try: sudo pkill -9 mongod"
fi

