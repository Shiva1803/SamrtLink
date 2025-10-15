#!/bin/bash

# Fix MongoDB setup for macOS
echo "🔧 Fixing MongoDB setup for macOS..."
echo ""

# Step 1: Make scripts executable
echo "1️⃣ Setting script permissions..."
chmod +x /Users/HP/SamrtLink/start-mongodb.sh
chmod +x /Users/HP/SamrtLink/stop-mongodb.sh
chmod +x /Users/HP/SamrtLink/start-all.sh
chmod +x /Users/HP/SamrtLink/CLEANUP_NOW.sh
chmod +x /Users/HP/SamrtLink/setup.sh
echo "✅ Scripts are now executable"
echo ""

# Step 2: Clean up any existing MongoDB processes
echo "2️⃣ Cleaning up existing MongoDB processes..."
pkill -f mongod 2>/dev/null
sleep 1
echo "✅ Cleanup complete"
echo ""

# Step 3: Create data directory
echo "3️⃣ Creating MongoDB data directory..."
mkdir -p ~/mongodb-data
echo "✅ Data directory created: ~/mongodb-data"
echo ""

# Step 4: Start MongoDB
echo "4️⃣ Starting MongoDB..."
mongod --dbpath ~/mongodb-data --logpath ~/mongodb-data/mongodb.log > /dev/null 2>&1 &

# Wait and check
sleep 3
if pgrep -f mongod > /dev/null; then
    echo "✅ MongoDB is running successfully!"
    echo ""
    echo "📊 MongoDB Status:"
    echo "   - Process ID: $(pgrep -f mongod)"
    echo "   - Data Directory: ~/mongodb-data"
    echo "   - Log File: ~/mongodb-data/mongodb.log"
    echo "   - Connection: mongodb://localhost:27017"
    echo ""
    echo "🎉 All fixed! You can now run: ./start-all.sh"
else
    echo "❌ MongoDB failed to start"
    echo ""
    echo "📝 Check the log for errors:"
    echo "   tail -20 ~/mongodb-data/mongodb.log"
    exit 1
fi

