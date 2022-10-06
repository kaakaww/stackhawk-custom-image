## [Playwright](https://www.playwright.dev/)

![Playwright](../images/playwright-banner.png)

Playwright is a frontend testing tool that automates the testing of web applications through the browser executables bundled with Playwright. Playwright test specs will execute as javascript running in the web application, selecting and testing elements on the page.

At StackHawk, _we like Playwright_, and encourage it's use for teams with complex browser requirements, or with established CI/CD pipelines that can support custom images, so they can take full advantage of Playwright.

Follow the [Playwright guide for getting started](https://playwright.dev/docs/intro).

### Testing

> Ensure javaspringvulny is running on `https://localhost:9000`

> Playwright requires first running `npx playwright install` to install browsers.

Headed: `npx playwright test -c playwright/out --config=playwright/playwright.config.ts --headed`

Headless: `npx playwright test -c playwright/out --config=playwright/playwright.config.ts`

Specific test: `npx playwright test specific.spec.ts -c playwright/out --config=playwright/playwright.config.ts`

> Note that the `-c playwright/out --config=playwright/playwright.config.ts` are required due to the structure of this directory.
 
### Adding Custom Authentication

Playwright gives the full javascript ecosystem to the developer, and encourages the creation of helper classes for testing.  [Custom commands](https://github.com/stackhawk/stackhawk-custom-image/blob/main/integrations/playwright/playwrightPage.ts) can be added to the helper class.

### Scanning with HawkScan

See the docs for using [Playwright tests with Custom Scan Discovery](https://docs.stackhawk.com/hawkscan/scan-discovery/custom.html). You can use the sample [playwright-stackhawk.yml](https://github.com/stackhawk/stackhawk-custom-image/blob/main/integrations/playwright/playwright-stackhawk.yml) file for an example of scanning a web application with it.

### Playwright Best Practices

* Playwright encourages creating an extension of the Page class with [test-fixtures](https://playwright.dev/docs/test-fixtures), that will use the resources and details of the tested page to perform custom commands. This is demonstrated with the [PlayWrightPage](https://github.com/stackhawk/stackhawk-custom-image/blob/main/integrations/playwright/playwrightPage.ts)

* [Official Docker Images](https://playwright.dev/docs/docker)

* https://playwright.dev/docs/selectors#best-practices