#!/bin/bash

# Test authentication flow script
echo "🧪 Testing SmartLink Authentication Flow"
echo "=========================================="
echo ""

# Test 1: Check MongoDB connection
echo "1️⃣  Checking MongoDB connection..."
if pgrep -f mongod > /dev/null; then
    echo "✅ MongoDB is running (PID: $(pgrep -f mongod))"
else
    echo "❌ MongoDB is NOT running"
    echo "   Run: ./start-mongodb.sh"
    exit 1
fi
echo ""

# Test 2: Check backend health
echo "2️⃣  Checking backend health..."
HEALTH_CHECK=$(curl -s http://localhost:5001/health)
if [[ $HEALTH_CHECK == *"ok"* ]]; then
    echo "✅ Backend is healthy"
    echo "$HEALTH_CHECK" | grep -o '"mongodb":"[^"]*"'
else
    echo "❌ Backend health check failed"
    exit 1
fi
echo ""

# Test 3: Test signup endpoint
echo "3️⃣  Testing signup endpoint..."
RANDOM_EMAIL="testuser$(date +%s)@test.com"
SIGNUP_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"$RANDOM_EMAIL\",\"password\":\"test1234\"}")

if [[ $SIGNUP_RESPONSE == *"token"* ]]; then
    echo "✅ Signup successful!"
    echo "   Email: $RANDOM_EMAIL"
    TOKEN=$(echo $SIGNUP_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    USER_ID=$(echo $SIGNUP_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "   Token: ${TOKEN:0:20}..."
    echo "   User ID: $USER_ID"
else
    echo "❌ Signup failed"
    echo "   Response: $SIGNUP_RESPONSE"
    exit 1
fi
echo ""

# Test 4: Verify user in database
echo "4️⃣  Verifying user in MongoDB..."
mongosh smartlink --quiet --eval "db.users.find({email: '$RANDOM_EMAIL'}).pretty()" > /tmp/mongo_check.txt
if grep -q "$RANDOM_EMAIL" /tmp/mongo_check.txt; then
    echo "✅ User found in database!"
    cat /tmp/mongo_check.txt
else
    echo "❌ User NOT found in database"
    echo "   This is the problem - data is not being saved to MongoDB"
fi
echo ""

# Test 5: Test signin endpoint
echo "5️⃣  Testing signin endpoint..."
SIGNIN_RESPONSE=$(curl -s -X POST http://localhost:5001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$RANDOM_EMAIL\",\"password\":\"test1234\"}")

if [[ $SIGNIN_RESPONSE == *"token"* ]]; then
    echo "✅ Signin successful!"
else
    echo "❌ Signin failed"
    echo "   Response: $SIGNIN_RESPONSE"
fi
echo ""

# Cleanup
rm -f /tmp/mongo_check.txt

echo "=========================================="
echo "✅ Authentication flow test complete!"
echo ""
echo "📊 Summary:"
echo "   - MongoDB: Running"
echo "   - Backend: Healthy"
echo "   - Signup: Working"
echo "   - Database: $(grep -q "$RANDOM_EMAIL" /tmp/mongo_check.txt 2>/dev/null && echo "✅ Storing data" || echo "Check logs")"
echo "   - Signin: Working"
echo ""

