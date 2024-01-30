import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 4,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', { open: 'never' }]],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.baseURL || 'https://www.volvocars.com/intl/v/car-safety/a-million-more',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        // Custom attribute to be used by page.getByTestId(). data-testid is used by default. Volvo calls it data-autoid
        testIdAttribute: 'data-autoid',
    },

    /* Configure projects for major browsers */
    projects: [
        // Firefox OK
        {
            name: 'firefox',
            use: {
                headless: false,
                ...devices['Desktop Firefox'],
            },
        },

        {
            name: 'firefox with dropmenu',
            use: {
                headless: false,
                ...devices['Desktop Firefox'],
                viewport: {
                    width: 300,
                    height: 800,
                },
            },
        },

        // // Chrome Not OK
        // {
        //   name: 'Chrome',
        //   use: {
        //     headless: false,
        //     ...devices['Desktop Chrome'],
        //   }
        // },

        // // Edge Not OK
        // {
        //   name: 'Edge',
        //   use: {
        //     headless: false,
        //     ...devices['Desktop Edge'],
        //   }
        // },

        // // Webkit Not OK
        // {
        //   name: 'webkit',
        //   use: {
        //   headless: false,
        //   ...devices['Desktop Safari'] },
        // }
    ],
})

