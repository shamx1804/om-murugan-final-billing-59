#!/bin/bash

# Mobile App Build Script for OM MURUGAN AUTO WORKS
echo "🚗 Building OM MURUGAN AUTO WORKS Mobile App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the web app
echo "🔨 Building web application..."
npm run build

# Check if Capacitor CLI is installed
if ! command -v npx cap &> /dev/null; then
    echo "📱 Installing Capacitor CLI..."
    npm install -g @capacitor/cli
fi

# Add platforms if they don't exist
echo "📱 Setting up mobile platforms..."

# Add Android platform
if [ ! -d "android" ]; then
    echo "🤖 Adding Android platform..."
    npx cap add android
else
    echo "🤖 Android platform already exists"
fi

# Add iOS platform (only on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    if [ ! -d "ios" ]; then
        echo "🍎 Adding iOS platform..."
        npx cap add ios
    else
        echo "🍎 iOS platform already exists"
    fi
else
    echo "⚠️  iOS platform can only be added on macOS"
fi

# Sync the web app with native platforms
echo "🔄 Syncing web app with native platforms..."
npx cap sync

echo "✅ Mobile app setup complete!"
echo ""
echo "📱 Next steps:"
echo "1. For Android:"
echo "   - Open Android Studio: npx cap open android"
echo "   - Connect your Android device or start an emulator"
echo "   - Click 'Run' to install the app"
echo ""
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "2. For iOS:"
    echo "   - Open Xcode: npx cap open ios"
    echo "   - Connect your iOS device or start a simulator"
    echo "   - Click 'Play' to install the app"
    echo ""
fi
echo "🔧 For development with live reload:"
echo "   - Start dev server: npm run dev"
echo "   - The app will load from your local development server"
echo ""
echo "🚀 For production:"
echo "   - Update capacitor.config.ts to remove the server URL"
echo "   - Run: npm run build && npx cap sync"
echo "   - Build and distribute through app stores"