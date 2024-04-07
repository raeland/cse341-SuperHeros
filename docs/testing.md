# Local Testing with Jest

Our project uses [Jest](https://jestjs.io/) as the testing framework. The configuration for Jest is located in the `package.json` file under the `jest` key.

## Configuration

Here's a brief explanation of our Jest configuration:

- `"collectCoverage": true`: This tells Jest to collect code coverage information while running tests.
- `"coverageDirectory": "./coverage/"`: This is where Jest will output the coverage reports.
- `"coverageReporters": ["json", "lcov", "text"]`: These are the formats in which Jest will output the coverage reports.

- \_note that coverage reports will be ignored by GitHub.

## Running Tests

To run tests, use the following command in your terminal:

```bash
pnpm test
```

# GitHub Actions Workflow Configuration

The `test.yml` file is a GitHub Actions workflow configuration file. It automates the process of running tests whenever code is pushed to the repository or a pull request is created.

## Handling Test Failures

If a test fails during the execution of your GitHub Actions workflow, the workflow will stop and the failed run will be marked as a failure. This means that the job and the workflow run will both be marked as failed on GitHub.

You can see the details of the failure by following these steps:

1. Click on the "Actions" tab in your GitHub repository.
2. Click on the workflow run that failed.
3. This will show you a log of the workflow run, including the output of the tests that were run and any error messages that were produced.

## Pull Request Integration

If the workflow was triggered by a pull request, the status of the workflow run will also be shown on the pull request page. This can help you ensure that all tests pass before any code is merged into your main branch.

## Notifications

In addition, you can configure GitHub to send notifications when workflow runs fail. These notifications can be sent via email, web, or through the GitHub mobile app, depending on your personal settings.
