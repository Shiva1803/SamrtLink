#!/bin/bash

# Complete Authentication Flow Fix Script
echo "🔧 Fixing SmartLink Authentication Issues"
echo "=========================================="
echo ""

# Step 1: Install missing backend dependencies
echo "1️⃣  Installing missing backend dependencies..."
cd /Users/HP/SamrtLink/backend
npm install @types/bcrypt qrcode @types/qrcode --save-dev
echo "✅ Dependencies installed"
echo ""

# Step 2: Restart backend server
echo "2️⃣  Backend needs to be restarted to apply fixes"
echo "   Please stop the current servers (Ctrl+C) and run: ./start-all.sh"
echo ""

echo "=========================================="
echo "✅ Setup complete!"
echo ""
echo "📋 What was fixed:"
echo "   1. Added detailed logging to auth endpoints"
echo "   2. Added MongoDB connection checks before saving users"
echo "   3. Updated dashboard to use real user data"
echo "   4. Fixed QR code generation endpoint"
echo ""
echo "🧪 To test the fix:"
echo "   1. Stop current servers (Ctrl+C)"
echo "   2. Run: ./start-all.sh"
echo "   3. Open http://localhost:3000"
echo "   4. Sign up with a new account"
echo "   5. Check MongoDB: mongosh smartlink --eval 'db.users.find().pretty()'"
echo ""

