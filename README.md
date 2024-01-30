# Volvo Cars Playwright Test Automation Task

This project has 5 requirements:

1. Setup the solution and its Dockerized image
2. Programming Language - TypeScript
3. Parallel execution of tests
4. Reporting of the results
5. Documentation

## Setup the solution and its Dockerized image

### Project setup

-   Created a directory with `mkdir volvo-playwright-docker` then `cd volvo-playwright-docker`
-   Initialized the project with `npm init playwright@latest`. This runs scaffolding that creates the directory structure and test examples.
-   Page objects and components are kept in `./pom/components` and `./pom/pages` and tests in the `./tests` directory, respectively.
-   We are only testing the Safety web page: `https://www.volvocars.com/intl/v/car-safety/a-million-more`, this is set as the default BASE_URL value in `playwright.config.t`
    and `playwright.ci.config.ts`
-   This project implements one page and three components, with four test specifications.
-   Prior to running the tests the following must be run:
    ```bash
    npm i
    ```
    Additionally, you maybe have to run to install the Playwright browsers locally:
    ```bash
    npx playwright install
    ```
-   Tests are executed locally with:
    ```bash
    npm run pw
    ```

### Dockerization

-   To run in Docker we create a copy of `playwright.config.ts` called `playwright.ci.config.ts`, with the following changes of changes.

-   This contains modifications to the Playwright runner capabilites so that it runs a single instance as described in [Continous Integration](https://playwright.dev/docs/ci).

-   To run in headless mode nothing needs to be added as this is a default setting:

    ```typescript
    export default defineConfig({
      ...
      /* Retry on CI only */
      retries: process.env.CI ? 2 : 0,
      /* Opt out of parallel tests on CI. */
      workers: process.env.CI ? 1 : 4,
      // Increase overall timeout and expect wait for CI
        expect: { timeout: 20000 },
        timeout: 60000,

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
      ...
    ```

The following Dockerfile utilises [Dockerfile.jammy](https://github.com/microsoft/playwright/blob/main/utils/docker/Dockerfile.jammy) that can be used to run Playwright scripts in Docker environment. These image includes all the dependencies needed to run browsers in a Docker container, and also include the browsers themselves.

```Dockerfile
# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.39.0-jammy

# Set the work directory for the application
WORKDIR /testing

# COPY the needed files to the app folder in Docker image
COPY package*.json ./

RUN npm ci

COPY . .
```

It is built with:

```bash
docker build -t volvo-playwright .
```

Execute tests in Docker container

```bash
docker run --env-file local.env volvo-playwright npm run pw:ci
```

## Programming Language - TypeScript

This project is written in Typescript and uses ESLint and Prettier to check the code against defined practices and standards.

## Parallel execution of tests

Test parallelism is enabled by default in `playwright.config.ts` and `playwright.ci.config.ts`so no changes are necessary to the codebase:

```typescript
export default defineConfig({
...
/* Opt out of parallel tests on CI. */
workers: process.env.CI ? 1 : 4,
...
})
```

## Reporting of the results

The project currently uses the html reporter.

You will find all the configuration in the `playwright.config.ts` and `playwright.ci.config.ts` files:

```js
export default defineConfig({
...
/* Reporter to use. See https://playwright.dev/docs/test-reporters */
reporter: [['html', { open: 'never' }]],
...
})
```

On CI trace info is attached after the first retry but can be tested locally with:

```bash
npm run pw -- --trace on
```

Once the tests are complete the HTML report can be previewed with:

```bash
npx playwright show-report
```

## Documentation

The documentation is written in (this) README.md file. Leveraging markdown we can make a quick, formatted, easy-to-read and easy-to-maintain guide on how to run the tests.

