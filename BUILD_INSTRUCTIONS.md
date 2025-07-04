# 📱 OM MURUGAN AUTO WORKS - Mobile App Build Instructions

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- For Android: Android Studio
- For iOS: Xcode (macOS only)

### 1. Automated Build (Recommended)
```bash
# Make the build script executable
chmod +x mobile-build.sh

# Run the automated build script
./mobile-build.sh
```

### 2. Manual Build Steps

#### Install Dependencies
```bash
npm install
```

#### Build Web App
```bash
npm run build
```

#### Add Mobile Platforms
```bash
# Add Android platform
npx cap add android

# Add iOS platform (macOS only)
npx cap add ios
```

#### Sync Web App with Native Platforms
```bash
npx cap sync
```

## 📱 Running on Devices

### Android
1. Open Android Studio:
   ```bash
   npx cap open android
   ```
2. Connect your Android device or start an emulator
3. Click the "Run" button in Android Studio

### iOS (macOS only)
1. Open Xcode:
   ```bash
   npx cap open ios
   ```
2. Connect your iOS device or start a simulator
3. Click the "Play" button in Xcode

## 🔧 Development Mode

For development with live reload:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The mobile app will automatically connect to your local development server

3. Make changes to your code and see them reflected instantly on the device

## 🚀 Production Build

For production deployment:

1. Update `capacitor.config.ts` to remove the development server URL:
   ```typescript
   // Remove or comment out the server configuration
   // server: {
   //   url: 'https://your-dev-url.com',
   //   cleartext: true
   // },
   ```

2. Build and sync:
   ```bash
   npm run build
   npx cap sync
   ```

3. Open in native IDEs and build for distribution

## 📋 Features Included

### Mobile-Optimized Features
- ✅ Native splash screen
- ✅ Status bar customization
- ✅ Haptic feedback
- ✅ Network status monitoring
- ✅ Keyboard handling
- ✅ Safe area insets
- ✅ Touch-optimized UI components
- ✅ Bottom navigation for mobile
- ✅ Pull-to-refresh (where applicable)

### Business Features
- ✅ Customer management
- ✅ Vehicle tracking
- ✅ Invoice generation (GST & Non-GST)
- ✅ Service catalog
- ✅ Parts inventory
- ✅ Reports and analytics
- ✅ Vehicle search and service history

## 🛠️ Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clean and reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Sync Issues**
   ```bash
   # Clean Capacitor cache
   npx cap clean
   npx cap sync
   ```

3. **Android Build Issues**
   - Ensure Android SDK is properly installed
   - Check that ANDROID_HOME environment variable is set
   - Update Android Studio to the latest version

4. **iOS Build Issues**
   - Ensure Xcode is up to date
   - Check provisioning profiles and certificates
   - Clean build folder in Xcode (Product → Clean Build Folder)

### Logs and Debugging

#### Android Logs
```bash
# View Android logs
adb logcat

# Filter for your app
adb logcat | grep "OM MURUGAN"
```

#### iOS Logs
- Use Xcode's console
- Check device logs in Xcode (Window → Devices and Simulators)

## 📦 App Store Deployment

### Android (Google Play Store)
1. Generate signed APK/AAB in Android Studio
2. Upload to Google Play Console
3. Follow Google Play's review process

### iOS (Apple App Store)
1. Archive the app in Xcode
2. Upload to App Store Connect
3. Submit for Apple's review process

## 🔐 Security Notes

- The app uses Supabase for backend services
- All API keys are properly configured for production
- Row Level Security (RLS) is enabled for data protection
- HTTPS is enforced for all network communications

## 📞 Support

For technical support or questions about the mobile app:
- Check the troubleshooting section above
- Review Capacitor documentation: https://capacitorjs.com/docs
- Contact the development team

---

**Note**: This mobile app maintains all the functionality of the web version while providing a native mobile experience with optimized touch interactions, offline capabilities, and mobile-specific features.