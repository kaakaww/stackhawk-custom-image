
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

This repo provides steps to create a custom docker image starting from stackhawk base image, and how to run it from a container. Typically a team may instead want to start from a different base image and add hawkscan as a third-party utility. See below for instructions.

## Introduction

In order to run your web application in a docker container, You will create a customized docker image.

This docker image includes instructions that install specific packages and copy the built application code into the docker container. Your docker container should include all software needed to run and test your application. This incudes:

* runtimes: such as nodejs or java
* build libraries: such as gcc or gradle
* runtime dependencies: such as drivers or browsers
* your built application source code.

### Adding HawkScan to your own docker image

To include hawkscan in your own base image, include in your `Dockerfile`:

```
# maintain the version of hawkscan you include as a seperate build argument
ARG HAWK_VERSION="2.9.0"

# create a /hawk directory, download and unzip hawkscan into there
RUN mkdir /hawk && curl -v https://download.stackhawk.com/hawk/cli/hawk-${HAWK_VERSION}.zip -o hawk-2.9.0.zip && unzip hawk-${HAWK_VERSION}.zip /hawk

# add the /hawk directory to the $PATH
ENV PATH $JAVA_HOME/bin:/hawk:$PATH
```

and then start hawkscan by calling `shawk`, or explicitly calling `hawk scan` passing any arguments.

Test your web applications with HawkScan to ship quality software with confidence.
