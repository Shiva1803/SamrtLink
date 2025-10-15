#!/bin/bash

echo "🔧 Installing missing TypeScript types for bcrypt..."
cd /Users/HP/SamrtLink/backend
npm install --save-dev @types/bcrypt

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 The frontend should now reload automatically."
echo "   Check your browser at http://localhost:3000"
echo ""

