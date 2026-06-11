# WebDriverIO Mobile Test Automation Framework

[![Android Tests](https://github.com/carlos-cerv/webdriverio-appium/actions/workflows/android-tests.yml/badge.svg)](https://github.com/carlos-cerv/webdriverio-appium/actions/workflows/android-tests.yml)
[![iOS Tests](https://github.com/carlos-cerv/webdriverio-appium/actions/workflows/ios-tests.yml/badge.svg)](https://github.com/carlos-cerv/webdriverio-appium/actions/workflows/ios-tests.yml)
[![Quick CI](https://github.com/carlos-cerv/webdriverio-appium/actions/workflows/ci.yml/badge.svg)](https://github.com/carlos-cerv/webdriverio-appium/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![WebDriverIO](https://img.shields.io/badge/WebDriverIO-8.27-orange.svg)](https://webdriver.io/)
[![Appium](https://img.shields.io/badge/Appium-2.0-purple.svg)](https://appium.io/)

A comprehensive mobile test automation framework built with WebDriverIO, TypeScript, and Page Object Model (POM) pattern for iOS and Android testing.

## Features

- **Cross-Platform Support**: Test both iOS and Android applications
- **TypeScript**: Fully typed for better IDE support and code quality
- **Page Object Model**: Clean, maintainable test architecture
- **Reusable Utilities**: Gesture helpers, wait helpers, and device utilities
- **Allure Reporting**: Comprehensive test reports with screenshots
- **GitHub Actions CI/CD**: Automated testing for Android and iOS
- **ESLint Configuration**: Code quality and consistency enforcement
- **Comprehensive Documentation**: JSDoc comments throughout the codebase
- **Platform-Specific Screens**: Separate handling for Android and iOS

## Project Structure

```
webdriverio-appium/
├── .github/
│   └── workflows/              # GitHub Actions CI/CD workflows
│       ├── android-tests.yml   # Android automated tests
│       ├── ios-tests.yml       # iOS automated tests
│       ├── ci.yml              # Linting and type checking
│       └── README.md           # Workflows documentation
├── apps/
│   ├── android/                # Android APK files
│   └── ios/                    # iOS app files
├── docs/
│   └── IOS_SETUP.md           # Detailed iOS setup guide
├── scripts/
│   ├── check-ios-setup.sh     # iOS environment verification
│   └── setup-ios-app.sh       # iOS app setup helper
├── src/
│   ├── config/
│   │   └── app.config.ts          # App configuration (package names, bundle IDs)
│   ├── data/
│   │   └── testData.ts            # Test data (users, timeouts, etc.)
│   ├── screenobjects/
│   │   ├── BaseScreen.ts          # Base screen with common methods
│   │   ├── AndroidScreen.ts       # Android-specific methods
│   │   ├── IOSScreen.ts           # iOS-specific methods
│   │   ├── LoginScreen.ts         # Login page object
│   │   └── HomeScreen.ts          # Home page object
│   ├── tests/
│   │   └── demo-login.spec.ts     # Demo app login test cases
│   ├── utils/
│   │   ├── GestureHelper.ts       # Gesture utilities
│   │   ├── WaitHelper.ts          # Wait utilities
│   │   └── DeviceHelper.ts        # Device utilities
│   └── types/
│       └── wdio.d.ts              # TypeScript definitions
├── wdio.conf.ts                   # WebDriverIO configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Appium** (v2.0 or higher)
- **Android Studio** (for Android testing)
- **Xcode** (for iOS testing, macOS only)
- **Java JDK** (v11 or higher for Android)

### Install Appium

```bash
npm install -g appium
```

### Install Appium Drivers

```bash
# For Android
appium driver install uiautomator2

# For iOS (macOS only)
appium driver install xcuitest
```

## Installation

1. Clone the repository (or navigate to your project directory):

```bash
cd /Users/carlos.eduardo/webDriveriO
```

2. Install dependencies:

```bash
npm install
```

## Setup

### Android Setup

1. **Install Android Studio** and Android SDK
2. **Set environment variables**:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/emulator
```

3. **Create/Start an Android Emulator**:

```bash
# List available AVDs
emulator -list-avds

# Start emulator
emulator -avd <emulator_name>
```

4. **Place your APK** in `./apps/android/app-debug.apk`

5. **Update capabilities** in `wdio.conf.ts` or create a separate Android config

### iOS Setup (macOS only)

**Note:** iOS testing is now configured. See the complete setup guide: **[docs/IOS_SETUP.md](docs/IOS_SETUP.md)**

Quick setup:

1. **Install Xcode** from the App Store
2. **Install Xcode Command Line Tools**:

```bash
xcode-select --install
```

3. **Install Appium XCUITest driver**:

```bash
appium driver install xcuitest
```

4. **Install additional dependencies**:

```bash
npm install -g ios-deploy
brew install carthage
```

5. **Add your iOS app** to `apps/ios/YourApp.app`

6. **Update `wdio.ios.conf.ts`** with your app path and bundle ID

7. **Run iOS tests**:

```bash
npm run test:ios
```

> **Note**: The `wdio.ios.conf.ts` is fully configured with:
> - iPhone 15 Pro simulator (update to your preference)
> - iOS 17.0 platform version
> - XCUITest automation
> - WebDriverAgent configuration
> - Complete iOS-specific capabilities
> 
> See [docs/IOS_SETUP.md](docs/IOS_SETUP.md) for detailed instructions, WebDriverAgent setup, and troubleshooting.

## Configuration

### Configuration Files

The framework includes three configuration files:
- **`wdio.conf.ts`** - Main configuration with Android setup and demo app
- **`wdio.android.conf.ts`** - Android-specific configuration (extends main config)
- **`wdio.ios.conf.ts`** - iOS-specific configuration (extends main config)
- **`src/config/app.config.ts`** - App package details and bundle IDs

The framework is **pre-configured with WebDriverIO demo app**:
- Demo APK location: `apps/android/app-debug.apk`
- Package: `com.wdiodemoapp`
- Activity: `com.wdiodemoapp.MainActivity`

**To use your own app**, update:
1. `wdio.conf.ts` (or platform-specific config) - Change `appium:app` path
2. `src/config/app.config.ts` - Update `packageName`, `appActivity`, or `bundleId`
3. Create new page objects matching your app's screens
4. Update test data in `src/data/testData.ts`

## Running Tests

The framework includes a WebDriverIO demo app ready for testing.

### Prerequisites
1. **Start Android Emulator**
```bash
# List available emulators
emulator -list-avds

# Start an emulator (replace with your emulator name)
emulator -avd Pixel_4_API_30
```

2. **Demo APK is already included** at `apps/android/app-debug.apk`

### Run Tests

```bash
# Run demo tests (recommended for first time)
npm run test:demo

# Run all tests with default config
npm test

# Run Android tests with Android-specific config
npm run test:android

# Run iOS tests with iOS-specific config (requires iOS setup)
npm run test:ios

# Run specific test file
npx wdio run wdio.conf.ts --spec ./src/tests/demo-login.spec.ts

# Setup iOS app (displays setup instructions)
npm run setup:ios

# Check iOS environment setup
npm run check:ios
```

**Note**: Appium starts automatically via `@wdio/appium-service`. No manual start needed.

### Expected Results

When running `npm run test:demo`, you should see:
```
[PASS] should display login form
[PASS] should enter username successfully
[PASS] should enter password successfully
[PASS] should complete login flow

4 passing (15.6s)
Spec Files: 1 passed, 1 total (100% completed)
```

## Reports

### Generate Allure Report

After running tests, generate and open the Allure report:

```bash
# Generate and open report (single command)
npm run report

# Or manually:
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

The Allure report includes:
- Test execution timeline
- Test case details with steps
- Screenshots on failures
- Platform and device information
- Execution statistics and trends

## Writing Tests

### Example Test

Here's the actual test from `demo-login.spec.ts`:

```typescript
import { expect } from 'chai';
import LoginScreen from '../screenobjects/LoginScreen';
import { testData } from '../data/testData';

describe('WebDriverIO Demo App - Login Tests', function() {
    beforeEach(async function() {
        // Navigate to Login tab before each test
        await LoginScreen.navigateToLogin();
    });

    it('should display login form', async function() {
        const isDisplayed = await LoginScreen.isLoginFormDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it('should enter username successfully', async function() {
        await LoginScreen.enterUsername(testData.users.validUser.username);
        const username = await LoginScreen.getUsernameValue();
        expect(username).to.equal(testData.users.validUser.username);
    });

    it('should enter password successfully', async function() {
        await LoginScreen.enterPassword(testData.users.validUser.password);
        const password = await LoginScreen.getPasswordValue();
        expect(password).to.have.length.greaterThan(0);
    });

    it('should complete login flow', async function() {
        await LoginScreen.enterUsername(testData.users.validUser.username);
        await LoginScreen.enterPassword(testData.users.validUser.password);
        await LoginScreen.tapLoginButton();
        // Add assertions for successful login here
    });

    afterEach(async function() {
        if (this.currentTest?.state === 'failed') {
            await browser.takeScreenshot();
        }
    });
});
```

### Creating Page Objects

```typescript
import AndroidScreen from './AndroidScreen';
import IOSScreen from './IOSScreen';

class NewScreen {
    private androidScreen = new AndroidScreen();
    private iosScreen = new IOSScreen();

    private get screen() {
        return driver.isAndroid ? this.androidScreen : this.iosScreen;
    }

    // Define selectors
    private get androidSelectors() {
        return {
            element: '//android.widget.Button[@text="Click"]'
        };
    }

    private get iosSelectors() {
        return {
            element: '~click-button'
        };
    }

    private get selectors() {
        return driver.isAndroid ? this.androidSelectors : this.iosSelectors;
    }

    // Define actions
    async clickElement() {
        const element = await $(this.selectors.element);
        await this.screen.tap(element);
    }
}

export default new NewScreen();
```

## Utilities

### Gesture Helper

```typescript
import { GestureHelper } from '../utils/GestureHelper';

// Swipe up
await GestureHelper.swipeUp();

// Swipe on element
await GestureHelper.swipeOnElement(element, 'left');

// Long press
await GestureHelper.longPress(element, 2000);
```

### Wait Helper

```typescript
import { WaitHelper } from '../utils/WaitHelper';

// Wait for element
await WaitHelper.waitForDisplayed(element);

// Wait for condition
await WaitHelper.waitUntil(
    async () => await element.isDisplayed(),
    10000,
    'Element not displayed'
);
```

### Device Helper

```typescript
import { DeviceHelper } from '../utils/DeviceHelper';

// Check platform
if (DeviceHelper.isAndroid()) {
    // Android specific code
}

// Get orientation
const orientation = await DeviceHelper.getOrientation();

// Take screenshot
await DeviceHelper.takeScreenshot('screenshot-name');
```

## Code Quality

### Run Linter

```bash
npm run lint
```

### Fix Linting Issues

```bash
npm run lint:fix
```

## Troubleshooting

### Appium Server Not Starting

- Ensure no other process is using port 4723
- Try killing any existing Appium processes: `pkill -f appium`
- Check Appium is installed: `appium --version`

### Android Emulator Issues

- Ensure virtualization is enabled in BIOS/system settings
- Check Android SDK is properly installed: `adb devices`
- Verify ANDROID_HOME is set correctly: `echo $ANDROID_HOME`
- Start emulator manually before running tests
- Check emulator is responsive: `adb shell getprop sys.boot_completed`

### iOS Simulator Issues

- Ensure Xcode is properly installed
- Reset simulator: `xcrun simctl erase all`
- Rebuild WDA (WebDriverAgent) if needed
- Check simulator is running: `xcrun simctl list devices`

### Element Not Found Errors

- Verify selectors using **Appium Inspector**
- Increase wait timeouts in `testData.ts`
- Check if element is in a different context (webview vs native)
- Use `driver.pause(3000)` to visually debug element states

### Mobile Native vs Web Context Issues

- `waitForClickable()` is **not supported** in mobile native context - use `waitForDisplayed()` instead
- `driver.closeApp()` may not work with all drivers - test cleanup handled by session termination
- Check current context: `await driver.getContext()`

### TypeScript Compilation Errors

- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` includes mocha types
- Verify `@types/chai` and `@types/mocha` are in devDependencies

## CI/CD - GitHub Actions

The framework includes comprehensive GitHub Actions workflows for automated testing:

### Available Workflows

1. **Android Tests** (`.github/workflows/android-tests.yml`)
   - Runs on macOS with Android emulator (API 34)
   - Executes all Android tests automatically
   - Generates and publishes Allure reports to GitHub Pages
   - Uploads test artifacts (results, reports, screenshots)
   - Duration: ~10-15 minutes

2. **iOS Tests** (`.github/workflows/ios-tests.yml`)
   - Runs on macOS with iOS simulator
   - Executes all iOS tests automatically
   - Generates and publishes Allure reports to GitHub Pages
   - Uploads test artifacts (results, reports, screenshots)
   - Duration: ~8-12 minutes

3. **Quick CI** (`.github/workflows/ci.yml`)
   - Fast linting and TypeScript type checking
   - Runs on every push/PR
   - Duration: ~2-3 minutes

### GitHub Pages Reports

Allure reports are automatically published to GitHub Pages:
- **Android Reports**: `https://carlos-cerv.github.io/webdriverio-appium/android-reports`
- **iOS Reports**: `https://carlos-cerv.github.io/webdriverio-appium/ios-reports`

### Setup GitHub Actions

1. **Enable GitHub Pages** (for Allure reports):
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

2. **Workflows automatically run on**:
   - Push to `main` or `develop` branches
   - Pull requests to `main` or `develop`
   - Manual trigger (via Actions tab - workflow_dispatch)

3. **View results**:
   - Go to "Actions" tab in your repository
   - Click on any workflow run to see details
   - Download test artifacts (results, reports, screenshots)
   - View Allure reports on GitHub Pages

4. **Workflow Features**:
   - Automatic dependency installation
   - Environment setup (Android SDK, Xcode, Appium)
   - Test execution with proper error handling
   - Artifact retention (30 days for reports, 7 days for screenshots)
   - GitHub Pages deployment for persistent report hosting

### Customization

See [.github/workflows/README.md](.github/workflows/README.md) for:
- Changing Android versions
- Running multiple Android versions
- Adding notifications (Slack, email)
- Cost optimization tips
- Troubleshooting guide

## Documentation

The project includes comprehensive documentation:

- **JSDoc Comments**: All classes, methods, and functions are documented
- **Configuration Comments**: Detailed explanations in all config files
- **Type Definitions**: Custom TypeScript types with examples
- **Workflow Documentation**: Complete CI/CD setup guide in `.github/workflows/README.md`
- **iOS Setup Guide**: Detailed iOS configuration in `docs/IOS_SETUP.md`
- **Code Quality**: ESLint configuration with TypeScript support

## Best Practices

1. **Use Page Object Model**: Keep selectors and actions in page objects
2. **Wait Explicitly**: Always wait for elements before interacting
3. **Handle Both Platforms**: Use platform-specific logic when needed
4. **Reuse Utilities**: Leverage gesture, wait, and device helpers
5. **Meaningful Assertions**: Write clear, specific test assertions
6. **Clean Test Data**: Use test data files for reusable data
7. **Screenshots on Failure**: Automatically capture screenshots on test failures
8. **Descriptive Test Names**: Write clear, descriptive test case names
9. **Document Your Code**: Add JSDoc comments for new methods and classes
10. **Run Linter**: Use `npm run lint` before committing code

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linter and tests
4. Submit a pull request

## License

ISC

## Author

Carlos Eduardo Cervantes Arteaga

**Software Quality Engineer**

---
