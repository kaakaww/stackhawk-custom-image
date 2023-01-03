
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

## Run HawkScan in a container

Containers are commonly used to host applications in a Continuous Integration / Continuous Delivery (CICD) pipeline. Running your containerized web application in a test environment will closely reflect how it will perform in production.

HawkScan is best implemented in the CICD pipeline, and testing your web application is much easier once your web application is containerized. A docker image includes instructions to copy your application code into the docker container and run it with required dependencies.

While this repo provides steps and examples to create a custom docker image _starting from the `stackhawk/hawkscan` base image_, typically instead you should _add HawkScan to your application's docker image_. Here are the steps to accomplish that:

* Add the [StackHawk CLI](https://docs.stackhawk.com/stackhawk-cli/) to your base image with the following additions to your dockerfile:

```dockerfile
# Update this value with your preferred version of HawkScan
ARG HAWKSCAN_VERSION="2.9.0"

# Download the version of HawkScan with curl
RUN curl -v https://download.stackhawk.com/hawk/cli/hawk-${HAWKSCAN_VERSION}.zip -o hawk-${HAWKSCAN_VERSION}.zip

# ... include your application content, runtime source, and stackhawk.yaml file

# start hawkscan from the scan hawk endpoint. Be
ENTRYPOINT ["hawk-${HAWKSCAN_VERSION}/shawk"]

```

* If HawkScan should to run alongside other third-party testing tools, be sure your StackHawk.yaml file is configured for [Custom Scan Discovery](https://docs.stackhawk.com/hawkscan/scan-discovery/custom.html) to run that tool as configured. Pay attention to https requirements.

* With new releases of HawkScan you can update the `HAWKSCAN_VERSION` for new scanner improvement capabilities.


