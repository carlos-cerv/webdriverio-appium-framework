# iOS Application Files

## Important Notice
[NOTE] The files in this directory are placeholder text files, not actual iOS applications.

Files like `app.ipa`, `app.zip`, and `iOS-Simulator-NativeDemoApp-1.0.8.app.zip` contain only the text "Not Found" and cannot be used for testing.

## Current Status
You need to download the actual iOS application files from the official source.

## Setup Instructions

### Current Status
The files in this directory (app.ipa, app.zip, iOS-Simulator-NativeDemoApp-1.0.8.app.zip) are **placeholder text files** and cannot be used for testing.

### Option 1: WebDriverIO Demo App (Recommended for Testing)

#### Setup Instructions
1. **Download the actual iOS simulator app:**
   - Go to: https://github.com/webdriverio/native-demo-app/releases/latest
   - Download: `iOS-Simulator-NativeDemoApp-x.x.x.app.zip` (get the latest version)
   - Example: `iOS-Simulator-NativeDemoApp-0.4.0.app.zip`

2. **Extract the downloaded file:**
   ```bash
   cd apps/ios
   unzip ~/Downloads/iOS-Simulator-NativeDemoApp-0.4.0.app.zip
   ```
   This will create a `.app` bundle folder.

3. **Update `wdio.ios.conf.ts`:**
   - Uncomment the `'appium:app'` line
   - Update with the actual .app file name (e.g., `iOS-Simulator-NativeDemoApp-0.4.0.app`)
   - Comment out the `'appium:bundleId'` line

4. **Run iOS tests:**
   ```bash
   npm run test:ios
   ```

#### Quick Guide Command
```bash
npm run setup:ios
```
This displays setup instructions (does not download files automatically)

### Option 2: Your Own iOS App

#### For Simulator Testing
- Place your `.app` bundle (folder) here
- Update the path in `wdio.ios.conf.ts`

#### For Real Device Testing
- Place your `.ipa` file here
- Ensure proper code signing and provisioning profiles
- Update the path in `wdio.ios.conf.ts`

## File Types

- **`.app`** - iOS simulator build (folder structure)
  - Used for iOS Simulator testing
  - Obtained from Xcode build for Simulator
  
- **`.ipa`** - iOS device build (archive file)
  - Used for real device testing
  - Requires code signing and provisioning profiles

## Configuration

Update the app path in `wdio.ios.conf.ts`:

```typescript
'appium:app': process.cwd() + '/apps/ios/YOUR_APP_NAME.app'
```

Or use bundle ID if app is already installed:

```typescript
'appium:bundleId': 'com.yourcompany.yourapp'
```
