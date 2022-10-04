# Testing Integrations

These are demonstrations of industry recognized E2E testing tools used to automate browser testing. These E2E tests are all meant to be run against [https://github.com/kaakaww/javaspringvulny](https://github.com/kaakaww/javaspringvulny), an intentionally vulnerable web application.

All commands should be run from this directory.

## Cypress

Cypress is a frontend testing tool that automates testing web applications through a regular or headless browser.

More instructions for scanning

### Headed Testing

`npx cypress open`

### Headless Testing

`npm run ci-cypress`

### Scanning with HawkScan

Custom Scan Discovery Instructions

### Best Practices

* Cypress provides native support for typescript, which makes e2e testing and developing custom cypress commands easier
* identify your authentication strategy! Both HawkScan and Cypress require a developer to know or script the authProcess.

## Playwright

coming soon

## Selenium

coming soon