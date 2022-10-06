# Testing Integrations

These are demonstrations of industry recognized developer tools used to automate E2E browser testing. The E2E tests are all meant to be run against [**javaspringvulny**](https://github.com/kaakaww/javaspringvulny), an intentionally vulnerable web application, running on `https://localhost:9000`

See how these E2E testing tools can be combined with HawkScan with [Custom Scan Discovery](https://docs.stackhawk.com/hawkscan/scan-discovery/custom.html).

* [**Cypress**](https://github.com/stackhawk/stackhawk-custom-image/tree/main/integrations/cypress)
* [**Playwright**](https://github.com/stackhawk/stackhawk-custom-image/tree/main/integrations/playwright)

## Authentication

To perform E2E testing on an application, these testing tools will require scripted authentication into the application. HawkScan provides [common patterns for Authentication](https://docs.stackhawk.com/hawkscan/authenticated-scanning/), and **javaspringvulny** demonstrates multiple forms of authentication.

#### form authentication

Demonstrated on the `/login page` in JavaSpringVulny.

A common way to authenticate to a web application is by `POST`ing a username and password which can be verified by your server. Upon verification the server returns a cookie or token to the requesting client.

See [Form with Username + Password](https://docs.stackhawk.com/hawkscan/authenticated-scanning/form-based-authentication.html) for more information.

#### jwt token authentication

[Oauth 2.0 connections](https://oauth.net/2/) will require apikeys and bearer tokens passed into their request headers.

See [Cookie and Token](https://docs.stackhawk.com/hawkscan/authenticated-scanning/inject-cookies-and-tokens.html) for more information.