# iOS Test Setup Guide

This guide will help you set up iOS testing with WebDriverIO and Appium.

## Prerequisites

### 1. macOS Requirements
- **macOS**: Version 12.0 or higher
- **Xcode**: Latest version (download from App Store)
- **Command Line Tools**: Install via `xcode-select --install`

### 2. Install Appium and XCUITest Driver

```bash
# Install Appium globally
npm install -g appium

# Install XCUITest driver for iOS
appium driver install xcuitest

# Verify installation
appium driver list --installed
```

### 3. Additional Dependencies

```bash
# Install iOS deploy (for real devices)
npm install -g ios-deploy

# Install Carthage (dependency for WebDriverAgent)
brew install carthage

# Install Python dependencies for WDA
pip3 install pymobiledevice3
```

## Available iOS Simulators

Check your available iOS simulators:

```bash
# List all iOS simulators
xcrun simctl list devices available | grep iPhone

# Create a new simulator (if needed)
xcrun simctl create "iPhone 15 Pro Test" "iPhone 15 Pro" "iOS17.0"
```

### Current Available Simulators on Your System:
- iPhone 15 Pro
- iPhone 15 Pro Max
- iPhone 15
- iPhone 15 Plus
- iPhone SE (3rd generation)

## Getting an iOS App for Testing

### Option 1: WebDriverIO Demo App (Recommended for Testing)

Unfortunately, the iOS version of the WebDriverIO demo app is not easily downloadable. Instead, you have these options:

1. **Build from source**:
```bash
git clone https://github.com/webdriverio/native-demo-app.git
cd native-demo-app
npm install
cd ios
pod install
# Open in Xcode and build for simulator
open App.xcworkspace
```

### Option 2: Use Your Own iOS App

1. **Place your `.app` file** in `apps/ios/`:
   - For Simulator: `YourApp.app` (folder structure)
   - For Real Device: `YourApp.ipa` (archive file)

2. **Get app from build**:
   ```bash
   # After building in Xcode, find the .app in:
   ~/Library/Developer/Xcode/DerivedData/<YourProject>/Build/Products/Debug-iphonesimulator/YourApp.app
   
   # Copy to project
   cp -r ~/Library/Developer/Xcode/DerivedData/<YourProject>/Build/Products/Debug-iphonesimulator/YourApp.app apps/ios/
   ```

### Option 3: Use a Public Test App

Download a sample iOS app from:
- [Apple's Sample Apps](https://developer.apple.com/sample-code/)
- [Sauce Labs Sample Apps](https://github.com/saucelabs/sample-app-mobile)

```bash
# Example: Download Sauce Labs demo app
cd apps/ios
curl -L -o SauceLabs.ipa "https://github.com/saucelabs/sample-app-mobile/releases/download/2.7.1/iOS-Simulator-SauceLabs-Mobile-Sample-App.2.7.1.zip"
unzip iOS-Simulator-SauceLabs-Mobile-Sample-App.2.7.1.zip
```

## Configuration

### 1. Update `wdio.ios.conf.ts`

The configuration is already set up. Update these values:

```typescript
'appium:deviceName': 'iPhone 15 Pro',        // Choose from available simulators
'appium:platformVersion': '17.0',             // Match your iOS version
'appium:app': process.cwd() + '/apps/ios/YourApp.app', // Your app path
```

### 2. Update `src/config/app.config.ts`

```typescript
ios: {
    bundleId: 'com.yourcompany.yourapp',      // Your app's bundle ID
    appPath: process.cwd() + '/apps/ios/YourApp.app'
}
```

### 3. Find Your App's Bundle ID

```bash
# From .app file
/usr/libexec/PlistBuddy -c "Print CFBundleIdentifier" apps/ios/YourApp.app/Info.plist

# From installed app on simulator
xcrun simctl listapps booted | grep -i "yourapp" -A 5
```

## WebDriverAgent Setup

WebDriverAgent (WDA) is required for iOS automation. It's automatically managed by Appium, but you may need to configure it:

### First Time Setup

```bash
# Navigate to WDA in Appium
cd ~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent

# Open in Xcode
open WebDriverAgent.xcodeproj

# In Xcode:
# 1. Select WebDriverAgentRunner target
# 2. Go to "Signing & Capabilities"
# 3. Check "Automatically manage signing"
# 4. Select your Team (Apple Developer account)
# 5. Change bundle identifier if needed (e.g., com.yourname.WebDriverAgentRunner)
```

### Trust Developer Certificate (First Time Only)

After first WDA launch on simulator:
1. Open iOS Settings app on simulator
2. Go to: General → VPN & Device Management
3. Select your Developer App certificate
4. Tap "Trust"

## Running iOS Tests

### 1. Start a Simulator (Manual Method)

```bash
# Start specific simulator
xcrun simctl boot "iPhone 15 Pro"

# Open Simulator app
open -a Simulator
```

### 2. Run Tests

```bash
# Run iOS tests (Appium starts automatically)
npm run test:ios

# Run specific test file
npx wdio run wdio.ios.conf.ts --spec ./src/tests/demo-login.spec.ts
```

## Troubleshooting

### Issue: "xcodebuild failed with code 65"

**Solution**: WebDriverAgent signing issue
```bash
# Rebuild WDA
cd ~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent
xcodebuild clean build -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'platform=iOS Simulator,name=iPhone 15 Pro'
```

### Issue: "Could not find module 'XCTest'"

**Solution**: Command Line Tools not properly set
```bash
# Point to correct Xcode
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

# Verify
xcode-select -p
```

### Issue: Simulator Not Booting

**Solution**: Reset the simulator
```bash
# Shutdown all simulators
xcrun simctl shutdown all

# Erase specific simulator
xcrun simctl erase "iPhone 15 Pro"

# Boot again
xcrun simctl boot "iPhone 15 Pro"
```

### Issue: "WebDriverAgent failed to start"

**Solutions**:
1. **Check WDA signing**: Open WDA in Xcode and verify signing
2. **Use new WDA**: Set `'appium:useNewWDA': true` in capabilities
3. **Increase timeout**: Set `'appium:wdaLaunchTimeout': 180000`
4. **Check logs**: Review `appium.log` for detailed errors

### Issue: "App not found"

**Solution**: Verify app path
```bash
# Check if app exists
ls -la apps/ios/YourApp.app

# Verify app structure
ls -la apps/ios/YourApp.app/Info.plist

# Use absolute path in config
'appium:app': '/Users/carlos.eduardo/webDriveriO/apps/ios/YourApp.app'
```

### Issue: Real Device Testing

For real iOS devices, additional setup is required:
1. Apple Developer account (paid)
2. Provisioning profiles
3. App signing certificates
4. Device UDID registration

```bash
# Get device UDID
xcrun xctrace list devices

# Update capability
'appium:udid': 'your-device-udid-here'
```

## Verify iOS Setup

Run this checklist before executing tests:

```bash
# 1. Check Xcode installation
xcodebuild -version

# 2. Check simulators
xcrun simctl list devices | grep iPhone

# 3. Check Appium
appium --version

# 4. Check XCUITest driver
appium driver list --installed | grep xcuitest

# 5. Check app file
ls -la apps/ios/

# 6. Test WDA manually (optional)
cd ~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent
xcodebuild build-for-testing test-without-building -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'platform=iOS Simulator,name=iPhone 15 Pro'
```

## iOS-Specific Page Object Methods

When creating page objects for iOS, use iOS-specific selectors:

```typescript
// In IOSScreen.ts or your page object
private get iosSelectors() {
    return {
        // Accessibility ID (preferred)
        loginButton: '~login-button',
        
        // Predicate String
        usernameField: '-ios predicate string:name == "username" AND type == "XCUIElementTypeTextField"',
        
        // Class Chain
        submitButton: '-ios class chain:**/XCUIElementTypeButton[`name == "Submit"`]',
        
        // XPath (less preferred, slower)
        passwordField: '//XCUIElementTypeSecureTextField[@name="password"]'
    };
}
```

## Next Steps

1. [COMPLETE] Install Xcode and dependencies
2. [COMPLETE] Install Appium with XCUITest driver
3. [COMPLETE] Setup WebDriverAgent signing
4. [COMPLETE] Add your iOS app to `apps/ios/`
5. [COMPLETE] Update `wdio.ios.conf.ts` with correct app path and bundle ID
6. [COMPLETE] Create iOS-specific page objects (or update existing ones)
7. [COMPLETE] Run `npm run test:ios`

## Resources

- [Appium XCUITest Driver](https://appium.io/docs/en/drivers/ios-xcuitest/)
- [WebDriverIO iOS Setup](https://webdriver.io/docs/appium-setup/#ios-setup)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Appium Inspector](https://github.com/appium/appium-inspector) - For finding iOS element selectors

---

**Note**: iOS testing requires macOS. If you're not on macOS, consider using cloud-based device farms like:
- [Sauce Labs](https://saucelabs.com/)
- [BrowserStack](https://www.browserstack.com/)
- [AWS Device Farm](https://aws.amazon.com/device-farm/)
