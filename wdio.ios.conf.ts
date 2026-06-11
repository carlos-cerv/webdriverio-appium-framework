/**
 * iOS Configuration for WebDriverIO
 * This configuration extends the base config with iOS-specific capabilities
 */

import type { Options } from '@wdio/types';
import { config as baseConfig } from './wdio.conf';

/**
 * Export iOS test runner configuration
 * Merges base configuration with iOS-specific settings
 */
export const config: Options.Testrunner = {
    ...baseConfig,
    
    // iOS-specific capabilities for test execution
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 15 Pro',
        'appium:platformVersion': '18.4', // Update to match your Xcode/Simulator version
        'appium:automationName': 'XCUITest',
        // iOS app configuration - use bundleId for CI/CD
        'appium:bundleId': 'com.wdiodemoapp',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300,
        'appium:autoAcceptAlerts': true,
        'appium:autoDismissAlerts': false,
        // Additional iOS-specific capabilities
        'appium:useNewWDA': true, // Set to true for better CI/CD compatibility
        'appium:wdaLaunchTimeout': 180000,
        'appium:wdaConnectionTimeout': 180000,
        'appium:showXcodeLog': true,
        // Appium will auto-detect the booted simulator
        'appium:usePrebuiltWDA': false,
        'appium:includeDeviceCapsToSessionInfo': true
    }],
    
    // iOS-specific service options
    services: [
        ['appium', {
            args: {
                relaxedSecurity: true,
                log: './appium.log'
            },
            logPath: './'
        }]
    ]
};
