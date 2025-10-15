#!/bin/bash
# FINAL EXECUTION - Remove all redundant documentation

cd "$(dirname "$0")"

# Root level cleanup
rm -f QUICK_START.md SETUP_COMPLETE.md

# Remove entire docs directory
rm -rf docs/

# Frontend src - remove ALL markdown files
rm -f frontend/src/API_INTEGRATION_GUIDE.md
rm -f frontend/src/Attributions.md
rm -f frontend/src/COMPLETE_WEBSITE_OVERVIEW.md
rm -f frontend/src/CURRENT_STATUS.md
rm -f frontend/src/DASHBOARD_ACCESS_FIXED.md
rm -f frontend/src/DASHBOARD_FEATURES.md
rm -f frontend/src/DASHBOARD_NEW_DOCUMENTATION.md
rm -f frontend/src/DASHBOARD_REVAMP_SUMMARY.md
rm -f frontend/src/HOW_TO_ACCESS_NEW_DASHBOARD.md
rm -f frontend/src/IMPLEMENTATION_SUMMARY.md
rm -f frontend/src/NAVIGATION_GUIDE.md
rm -f frontend/src/NEW_DASHBOARD_SUMMARY.md
rm -f frontend/src/NEW_PAGES_SUMMARY.md
rm -f frontend/src/QUICK_REFERENCE.md
rm -rf frontend/src/guidelines/
rm -f frontend/src/.cleanup_marker

# Frontend root - remove redundant docs
rm -f frontend/FRONTEND_CLEAN_STRUCTURE.md
rm -f frontend/RESTRUCTURING_GUIDE.md
rm -f frontend/README_NEW.md
rm -f frontend/START_HERE.md
rm -f frontend/ARCHITECTURE.md

# Remove text files
rm -f frontend/STRUCTURE_DIAGRAM.txt
rm -f frontend/QUICK_REF.txt
rm -f frontend/COMPLETE.txt

# Backend
rm -f backend/README.md

# Old deprecated folders
rm -rf frontend/src/contexts/
rm -rf frontend/src/utils/

# Remove all redundant shell scripts
rm -f cleanup.sh cleanup-and-organize.sh organize.sh execute-cleanup.sh
rm -f cleanup-all-docs.sh execute-now.sh final-cleanup.sh cleanup-execute.sh
rm -f frontend/verify-structure.sh frontend/DONE.sh frontend/final-cleanup.sh

echo "✅ All redundant documentation removed!"

