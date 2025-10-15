#!/bin/bash

# Restart Vite dev server with clean cache

echo "🧹 Cleaning Vite cache and restarting dev server..."

cd "$(dirname "$0")"

# Stop any running Vite process (optional)
# pkill -f "vite" 2>/dev/null || true

# Remove Vite cache
rm -rf node_modules/.vite
rm -rf .vite

echo "✅ Cache cleared!"
echo ""
echo "🚀 Starting dev server..."
echo ""

# Start dev server
npm run dev

