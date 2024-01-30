import { defineConfig, devices } from '@playwright/test'

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
    workers: process.env.CI ? 4 : 4,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['github'], ['html', { open: 'never' }], ['junit']],
    // Increase overall timeout and expect wait for CI
    expect: { timeout: 15000 },
    timeout: 30000,

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.baseURL || 'https://www.volvocars.com/intl/v/car-safety/a-million-more',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        // Custom attribute to be used by page.getByTestId(). data-testid is used by default. Volvo calls it data-autoid
        testIdAttribute: 'data-autoid',

        video: {
          mode: 'retain-on-failure',
          size: { width: 640, height: 480 }
        }
    },

    /* Configure projects for major browsers */
    projects: [
        // Firefox OK
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        {
            name: 'firefox-dropdown-menus',
            use: {
                ...devices['Desktop Firefox'],
                viewport: {
                    width: 200,
                    height: 600,
                },
            },
        },
    ],
})

