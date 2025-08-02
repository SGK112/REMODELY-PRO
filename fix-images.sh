#!/bin/bash

# Fix broken Unsplash image URLs across the project
echo "Fixing broken Unsplash image URLs..."

# Replace the broken image ID with working ones
find . -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | grep -v node_modules | xargs sed -i '' 's/1556909195-4e5d4d6e4f6f/1556909114-f6e7ad7d3136/g'

echo "Fixed all broken image URLs!"
echo "Summary of changes:"
echo "- Replaced broken image photo-1556909195-4e5d4d6e4f6f with working photo-1556909114-f6e7ad7d3136"
