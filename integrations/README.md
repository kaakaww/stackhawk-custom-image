# Testing Integrations

These are demonstrations of common software testing tools used to automate browser testing and perform authentication.

All commands should be run from this directory;

## Cypress

### Headed Testing

`npx cypress open`

### Headless Testing

`npm run ci-cypress`

### Best Practices

* Cypress provides native support for typescript, which makes e2e testing and developing custom cypress commands easier
* identify your authentication strategy! Both HawkScan and Cypress require a developer to know or script the authProcess.

## Playwright

## Selenium