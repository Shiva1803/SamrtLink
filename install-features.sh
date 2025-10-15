#!/bin/bash

# Quick setup script for new features
echo "🔧 Installing QR Code dependencies..."
cd /Users/HP/SamrtLink/backend
npm install qrcode @types/qrcode

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🎯 Next Steps:"
echo "1. Restart your backend server (Ctrl+C and run ./start-all.sh)"
echo "2. Test QR code generation: http://localhost:5001/api/links/:linkId/qrcode"
echo "3. Test public redirect: Create a link and visit http://localhost:5001/:shortCode"
echo ""

