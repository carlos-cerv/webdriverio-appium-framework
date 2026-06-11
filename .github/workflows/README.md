# GitHub Actions Workflows

This directory contains CI/CD workflows for automated testing and reporting.

## Available Workflows

### 1. Android Tests (`android-tests.yml`)
Runs automated tests on Android emulator with Allure reporting.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual trigger via Actions tab

**What it does:**
- Sets up Android SDK and emulator (API 34)
- Installs dependencies with npm cache
- Starts Appium server automatically
- Runs Android test suite
- Generates Allure reports
- Uploads test artifacts (results, reports, screenshots)
- Publishes report to GitHub Pages

**Duration:** ~12-18 minutes

**Performance Optimizations:**
- npm cache enabled for faster installs
- 4 cores and 8GB RAM for emulator
- Hardware acceleration disabled in CI
- Global Appium installation for faster startup

---

### 2. iOS Tests (`ios-tests.yml`)
Runs automated tests on iOS simulator with Allure reporting.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual trigger via Actions tab

**What it does:**
- Sets up Xcode and iOS dependencies
- Installs Appium globally (faster than npx)
- Detects and boots available iOS simulator
- Starts Appium server with proper configuration
- Runs iOS test suite
- Generates Allure reports
- Uploads test artifacts (results, reports, screenshots)
- Publishes report to GitHub Pages

**Duration:** ~10-15 minutes

**Simulator Detection Logic:**
1. Looks for iPhone 15 Pro (preferred)
2. Falls back to iPhone 15 if available
3. Uses any available iPhone simulator as last resort

**Note:** iOS tests require the bundleId to be configured correctly in `wdio.ios.conf.ts`

---

### 3. Quick CI (`ci.yml`)
Fast linting and type checking for quick feedback.

**Triggers:**
- Push to any branch
- Pull requests

**What it does:**
- Runs ESLint code quality checks
- Performs TypeScript type checking (strict mode)
- Verifies build configuration

**Duration:** ~2-3 minutes

**GitHub Actions Features:**
- Node.js 20 LTS
- npm cache enabled for all workflows
- Latest action versions (v4)

---

## Configuration Requirements

### Prerequisites for Successful Runs

#### Android Tests
- APK file location: `apps/android/app-debug.apk`
- App package: `com.wdiodemoapp` (update in `wdio.conf.ts`)
- Emulator: Pixel 5 profile, API 34
- Java 17 (automatically installed via actions/setup-java)

#### iOS Tests
- App bundle ID: `com.wdiodemoapp` (update in `wdio.ios.conf.ts`)
- Simulator: iPhone 15 Pro or fallback to any iPhone
- Xcode Command Line Tools required (pre-installed on GitHub Actions macOS runners)
- Appium XCUITest driver (auto-installed)

---

## Environment Setup

### Local Testing Before CI/CD

1. **Verify all tools are installed:**
   ```bash
   node --version          # v20+
   npm --version           # v9+
   appium --version        # v2.0+
   ```

2. **Install dependencies:**
   ```bash
   npm ci                  # Use npm ci instead of npm install in CI
   ```

3. **Run linting checks:**
   ```bash
   npm run lint
   npx tsc --noEmit
   ```

4. **Test locally before pushing:**
   ```bash
   npm run test:demo       # Quick smoke test
   npm run test:android    # Full Android suite
   npm run test:ios        # Full iOS suite
   ```

---

## GitHub Pages Setup

### Enable GitHub Pages for Reports

1. **Go to repository Settings:**
   - Navigate to: Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Click Save

2. **View Generated Reports:**
   - Android: `https://username.github.io/repo-name/android-reports/`
   - iOS: `https://username.github.io/repo-name/ios-reports/`

### Report Features:
- Real-time test execution timeline
- Pass/fail statistics and trends
- Detailed test steps and logs
- Screenshots on failures
- Separate reports for each platform
- Historical data across runs

---

## Viewing Test Results

### Artifacts

After each workflow run, download artifacts:

1. Go to the Actions tab
2. Click on a specific workflow run
3. Scroll to "Artifacts" section
4. Download desired artifact

**Available Artifacts:**
- `android-test-artifacts` - Android test results and reports
- `ios-test-artifacts` - iOS test results and reports

### Allure Reports

The workflows automatically generate and publish Allure reports:
- HTML reports with interactive UI
- Test timeline and statistics
- Pass/fail analysis
- Failure screenshots and logs
- Available for 7 days (configurable via `retention-days`)

---

## Troubleshooting

### iOS Tests Failing

**Issue:** "Could not find module 'XCTest'"

**Solution:**
1. Verify Xcode is properly selected:
   ```bash
   xcode-select -p
   ```
2. Reset Xcode selection:
   ```bash
   sudo xcode-select --reset
   ```

### Android Emulator Issues

**Issue:** Emulator not booting

**Solution:**
1. Check available emulators:
   ```bash
   emulator -list-avds
   ```
2. Create a new emulator:
   ```bash
   avdmanager create avd -n Pixel5 -k "system-images;android;34;google_apis;arm64-v8a"
   ```

### TypeScript Compilation Errors

**Issue:** "Cannot find type definition for '@wdio/globals'"

**Solution:**
1. Ensure tsconfig.json has correct types:
   ```json
   "types": ["node", "@wdio/globals", "mocha"]
   ```
2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### ESLint Warnings

**Issue:** "TypeScript version not officially supported"

**Solution:**
- Update to compatible TypeScript version:
  ```bash
  npm install typescript@5.3.3 --save-dev
  ```

---

## Performance Tips

### Reducing Workflow Duration

1. **Use npm cache:**
   - Automatically enabled in workflows
   - Saves ~2-3 minutes per run

2. **Parallel execution:**
   - CI/CD workflow runs independently for faster feedback
   - Platform-specific tests (Android/iOS) run on dedicated runners

3. **Optimize test suites:**
   - Use `test:demo` for quick validation
   - Run full suites only on main branches

### Cost Optimization

- GitHub Actions: 2,000 free minutes/month for public repos
- Current framework: ~20-30 minutes per full run
- Estimate: ~60-90 runs/month within free tier
- Consider: Split into minimal required tests per branch

---

## Next Steps

1. Commit changes: `git commit -am "Update workflows for CI/CD"`
2. Push to main/develop
3. Monitor Actions tab for first run
4. Download and review test artifacts
5. Configure GitHub Pages for reports
6. Share report links with team



---

## Manual Workflow Trigger

You can manually trigger Android or iOS tests:

1. Go to Actions tab
2. Select the workflow (Android Tests or iOS Tests)
3. Click "Run workflow"
4. Select branch and click "Run workflow"

---

## Configuration

### Customizing Android Version

Edit `android-tests.yml`:

```yaml
# Change API level
sdkmanager "system-images;android-33;google_apis;x86_64"  # API 33 instead of 34

# Update AVD creation
avdmanager create avd -n test_emulator -k "system-images;android-33;google_apis;x86_64"
```

### Customizing iOS Simulator

Edit `ios-tests.yml`:

```yaml
# Change simulator
grep "iPhone 14" instead of "iPhone 15 Pro"
```

### Customizing Xcode Version

Edit `ios-tests.yml`:

```yaml
# Change Xcode version
sudo xcode-select -s /Applications/Xcode_14.3.app/Contents/Developer
```

---

## Running Multiple Android Versions

To test against multiple Android versions, add a matrix strategy:

```yaml
strategy:
  matrix:
    android-api: [30, 33, 34]
steps:
  - name: Install Android SDK components
    run: |
      sdkmanager "system-images;android-${{ matrix.android-api }};google_apis;x86_64"
```

---

## Cost Optimization

### GitHub Actions Minutes
- **Public repositories:** Unlimited for public repos
- **Private repositories:** 2,000 minutes/month free, then paid

### Tips to reduce minutes:
1. Use caching (already configured)
2. Run only on `main` and `develop` branches
3. Use `workflow_dispatch` for manual runs
4. Skip tests for documentation changes:

```yaml
on:
  push:
    branches: [ main, develop ]
    paths-ignore:
      - '**.md'
      - 'docs/**'
```

---

## Troubleshooting

### Android Emulator Issues

**Problem:** Emulator doesn't start or times out

**Solutions:**
- Increase boot timeout in workflow
- Use different Android API level
- Use different system image (e.g., `default` instead of `google_apis`)

**Problem:** Tests fail due to emulator instability

**Solutions:**
- Add more wait time after boot: `sleep 30`
- Disable animations: `settings put global window_animation_scale 0`

### iOS Simulator Issues

**Problem:** Simulator not found

**Solutions:**
- Check available simulators: `xcrun simctl list devices`
- Use different device name in workflow
- Update Xcode version

**Problem:** WebDriverAgent build fails

**Solutions:**
- Ensure Appium XCUITest driver is installed
- Check Xcode command line tools: `xcode-select --install`

### Allure Report Issues

**Problem:** Report not generated

**Solutions:**
- Check if `allure-results/` has files
- Ensure `allure-commandline` is installed
- Run `npm run report` locally first

**Problem:** GitHub Pages not showing reports

**Solutions:**
- Enable GitHub Pages in repository settings
- Check `gh-pages` branch exists
- Wait a few minutes for deployment

---

## Adding Slack Notifications

Add to any workflow:

```yaml
- name: Slack Notification
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Test execution completed'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## Adding Email Notifications

GitHub automatically sends emails on workflow failures. To customize:

1. Go to Settings → Notifications
2. Configure "Actions" notifications
3. Choose when to receive emails

---

## Best Practices

### Recommended Practices

- Use caching for dependencies (`cache: 'npm'`)
- Upload artifacts for debugging
- Use `continue-on-error: true` for tests (to generate reports even on failure)
- Keep artifact retention reasonable (7-30 days)
- Use `if: always()` for report generation

### Practices to Avoid

- Run heavy tests on every commit to feature branches
- Store sensitive data in workflows (use GitHub Secrets)
- Upload large artifacts (>100MB) regularly
- Keep artifacts forever (costs storage)

---

## Security Notes

- Never commit API keys or credentials
- Use GitHub Secrets for sensitive data
- Keep workflows in `.github/workflows/` directory
- Review PRs that modify workflows carefully

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [WebDriverIO CI Integration](https://webdriver.io/docs/ci/)
- [Appium CI Setup](https://appium.io/docs/en/writing-running-appium/ci/)
