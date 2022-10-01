<p align="center">
  <img src="https://images.ctfassets.net/nx13ojx82pll/1zPawvEGOq9zKX8PuVw0kB/e4a31b30fdb07b7e424277d7824d2ffe/stackhawk-long.png">
</p>

# HawkScan
StackHawk provides dynamic application vulnerability scanning from development to production.
- ⚡ Dynamic Application Scanning: Use HawkScan to find and fix security bugs in your web apps, before you push to production. Think of it as security integration testing. Get started with your first scan in minutes.

- 🦸 Built for Modern Dev Teams: Automate scans with Docker commands, manage configs via YAML, and add app scanning as a build stage. We're built for dev teams that care about security and quality.

- 🧰 Vulnerability Management: (coming soon!) Document for compliance. Prioritize and manage fixes with integrations to existing ticketing tools. Point in time assessments are a thing of the past - there is a better way.

# Introduction to the Dockerfile Command
A Dockerfile is a script that contains all commands for building a Docker image. The Dockerfile contains all instructions that will be used to create the Docker image with the 'docker build' command.

Before creating your first Dockerfile, you should familiar with the Dockerfile instruction. Use this [link](https://docs.docker.com/engine/reference/builder/) for more information.

Let's analyze the code snippet below that's provide in the Dockerfile in this directory:

```
FROM stackhawk/hawkscan

ARG NODE_VERSION="16.x"

WORKDIR /app

USER root

COPY . /app

RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash
RUN apt-get install -y nodejs
RUN npm install --global newman

USER zap
```

__FROM__

__FROM__ comand Set the base-image for the new image that you want to create. The __FROM__ instruction will initialize the new build-stage and must be located at the top of the Dockerfile.

__ARG__

The __ARG__ instruction is used to define a variable that can  be passed at the built-time. You can use this instruction in the docker 'build command' during the build time using the ```--build-arg variable=value``` option and can be passed through the Dockerfile. Also, multiple __ARG__ can be used in the Dockerfile.

__WORKDIR__

The __WORKDIR__ instruction is used to define the default working directory of your Docker image. You can add multiple __WORKDIR__ instruction in your Dockerfile, and if it doesn't exist, it will be created automatically.

__USER__

The __USER__ instruction is used to define the default user when running the image. The RUN, CMD, and ENTRYPOINT follow the __USER__ instruction in the Dockerfile.

__COPY__

__COPY__ is a Dockerfile instruction that let you copy files from a specific location into a Docker image.
__COPY__ takes in a src and destination. It only lets you copy in a local file or directory from your host (the machine building the Docker image) into the Docker image itself.

__RUN__

__RUN__ instruction is used to execute command during the build process of the docker image. You can install additional packages needed for your Docker images, which we did above in our Dockerfile to install _NodeJS_, _Newman_ using our base StackHawk image

For more instructions use the link provided above.
