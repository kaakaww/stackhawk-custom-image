
<p align="center">
  <img src="https://images.ctfassets.net/nx13ojx82pll/1zPawvEGOq9zKX8PuVw0kB/e4a31b30fdb07b7e424277d7824d2ffe/stackhawk-long.png">
</p>

# HawkScan
StackHawk provides dynamic application vulnerability scanning from development to production.
- ⚡ Dynamic Application Scanning: Use HawkScan to find and fix security bugs in your web apps, before you push to production. Think of it as security integration testing. Get started with your first scan in minutes.

- 🦸 Built for Modern Dev Teams: Automate scans with Docker commands, manage configs via YAML, and add app scanning as a build stage. We're built for dev teams that care about security and quality.

- 🧰 Vulnerability Management: Document for compliance. Prioritize and manage fixes with integrations to existing ticketing tools. Point in time assessments are a thing of the past - there is a better way.

# StackHawk Custom Image

This is a repository with examples of HawkScan used with other common software development tools, aka _devtools_, to help users customize their on StackHawk Docker images. This repo provides instructions to use HawkScan with:

* [Postman](https://github.com/kaakaww/stackhawk-custom-image/tree/main/postman-newman)
* [Cypress](https://github.com/kaakaww/stackhawk-custom-image/tree/main/integrations/cypress)
* [Playwright](https://github.com/kaakaww/stackhawk-custom-image/tree/main/integrations/playwright)
* [Selenium](https://github.com/kaakaww/stackhawk-custom-image/tree/main/integrations/selenium)

## Introduction

In order to run your application in a docker container, a customized docker image is created. This customized docker image includes instructions that install specific packages and copy the code into the docker container. This repo provides steps to create a custom docker image from stackhawk base image and how to run it as a container.
