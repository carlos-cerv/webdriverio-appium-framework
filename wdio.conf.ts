/**
 * WebDriverIO Configuration File
 * Main configuration for mobile test automation with Appium
 * Supports both Android and iOS platforms
 * @see https://webdriver.io/docs/configurationfile
 */

import type { Options } from '@wdio/types';

/**
 * Test runner configuration
 * Defines all settings for test execution including capabilities, timeouts, and hooks
 */
export const config: Options.Testrunner = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // Use local runner for test execution
    runner: 'local',
    // Auto-compile TypeScript files during test execution
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },

    //
    // ==================
    // Specify Test Files
    // ==================
    // Pattern to locate all test spec files
    specs: [
        './src/tests/**/*.spec.ts'
    ],
    // Files to exclude from test execution
    exclude: [],

    //
    // ============
    // Capabilities
    // ============
    // Maximum number of parallel test sessions
    maxInstances: 1,
    // Device capabilities for Android testing
    capabilities: [{
        platformName: 'Android',
        // Android device name (emulator or real device)
        'appium:deviceName': 'emulator-5554',
        // Android OS version
        'appium:platformVersion': '16.0',
        // Automation framework for Android
        'appium:automationName': 'UiAutomator2',
        // Path to the Android application package (APK) - use relative path for CI/CD
        'appium:app': process.env.CI ? './apps/android/app-debug.apk' : process.cwd() + '/apps/android/app-debug.apk',
        // Android app package identifier
        'appium:appPackage': 'com.wdiodemoapp',
        // Main activity to launch
        'appium:appActivity': 'com.wdiodemoapp.MainActivity',
        // Automatically grant app permissions
        'appium:autoGrantPermissions': true,
        // Don't reset app state between sessions
        'appium:noReset': false,
        // Don't perform full app reset
        'appium:fullReset': false,
        // Command timeout in seconds (prevent session timeout)
        'appium:newCommandTimeout': 300,
        // Network timeout
        'appium:connectHardwareBackButton': true,
        // Enable video recording
        'appium:recordVideo': false
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    // Logging level (trace | debug | info | warn | error | silent)
    logLevel: 'info',
    // Stop test execution after first failure (0 = run all tests)
    bail: 0,
    // Default timeout for waitFor* commands in milliseconds
    waitforTimeout: 30000,
    // Timeout for Appium server connection attempts
    connectionRetryTimeout: 120000,
    // Number of connection retry attempts
    connectionRetryCount: 3,
    
    //
    // ===================
    // Services & Plugins
    // ===================
    // Appium service - automatically starts and stops Appium server
    services: ['appium'],
    
    // Appium server port
    port: 4723,
    
    // Test framework to use (mocha | jasmine | cucumber)
    framework: 'mocha',
    
    // Test reporters for output formatting
    reporters: [
        'spec',  // Console output with test results
        ['allure', {  // Allure reporter for detailed HTML reports
            outputDir: './allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    // Mocha framework options
    mochaOpts: {
        ui: 'bdd',  // BDD-style test syntax (describe, it)
        timeout: 60000  // Test timeout in milliseconds
    },

    //
    // ==============
    // Lifecycle Hooks
    // ==============
    /**
     * Hook: Executed once before all workers get launched
     * Use for global test preparation tasks
     */
    onPrepare: function () {
        console.log('Starting test execution...');
    },
    
    /**
     * Hook: Executed before a worker process is spawned
     * Use for worker-specific initialization or environment setup
     */
    onWorkerStart: function () {
        console.log('Worker started');
    },
    
    /**
     * Hook: Executed after a worker process has exited
     * Use for worker-specific cleanup tasks
     */
    onWorkerEnd: function () {
        console.log('Worker ended');
    },
    
    /**
     * Hook: Executed before initializing the webdriver session
     * Use to manipulate configurations based on capability or spec
     */
    beforeSession: function () {
        console.log('Before session');
    },
    
    /**
     * Hook: Executed before test execution begins
     * Global variables like 'browser' are accessible here
     * Perfect place to define custom commands
     */
    before: async function () {
        // Set implicit timeout if needed
        // await browser.setTimeout({ 'implicit': 10000 });
    },
    /**
     * Hook: Executed before a test suite starts
     * Use for suite-level setup tasks
     */
    beforeSuite: function () {
        console.log('Before suite');
    },
    
    /**
     * Hook: Executed before a hook within the suite starts
     * Runs before beforeEach/afterEach in Mocha
     */
    beforeHook: function () {
        // Add custom logic before hooks
    },
    
    /**
     * Hook: Executed after a hook within the suite ends
     * Runs after beforeEach/afterEach in Mocha
     */
    afterHook: function () {
        // Add custom logic after hooks
    },
    
    /**
     * Hook: Executed before each test starts
     * Use for test-level setup and initialization
     */
    beforeTest: function () {
        console.log('Starting test');
    },
    
    /**
     * Hook: Executed before a WebDriver command
     * Use for command logging or modification
     */
    beforeCommand: function () {
        // Add custom logic before commands
    },
    
    /**
     * Hook: Executed after a WebDriver command
     * Use for command result logging or validation
     */
    afterCommand: function () {
        // Add custom logic after commands
    },
    /**
     * Hook: Executed after each test completes
     * Use for test cleanup and failure handling
     * @param {object}  test             - Test object with metadata
     * @param {object}  context          - Test execution context
     * @param {Error}   result.error     - Error object if test failed
     * @param {*}       result.result    - Test function return value
     * @param {number}  result.duration  - Test execution duration
     * @param {boolean} result.passed    - Test pass/fail status
     * @param {object}  result.retries   - Retry information
     */
    afterTest: async function (test, context, { error }) {
        if (error) {
            // Screenshot capture is handled in test file afterEach hook
        }
    },
    
    /**
     * Hook: Executed after a test suite ends
     * Use for suite-level cleanup tasks
     */
    afterSuite: function () {
        console.log('After suite');
    },
    
    /**
     * Hook: Executed after all tests complete
     * Global variables are still accessible for cleanup
     */
    after: function () {
        console.log('After all tests');
    },
    
    /**
     * Hook: Executed after terminating the webdriver session
     * Use for session cleanup and resource disposal
     */
    afterSession: function () {
        console.log('After session');
    },
    
    /**
     * Hook: Executed after all workers shut down
     * Final cleanup before process exit
     * Errors here will fail the test run
     */
    onComplete: function () {
        console.log('Test execution completed');
    },
};
