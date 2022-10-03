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
# Specify the parent image from which we build
FROM stackhawk/hawkscan

ARG NODE_VERSION="16.x"

# Set the working directory
WORKDIR /app

USER root

# Copy files from your host to your current working directory
COPY . /app


RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash && \
    apt-get install -y nodejs && \
    npm install --global newman
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

# Building a Docker Image

Build an image from a Dockerfile

```docker build [OPTIONS] PATH | URL | -```

The docker build command builds an image from a Dockerfile and a context. The build’s context is the set of files at a specified location PATH or URL. The PATH is a directory on your local filesystem. The URL is a Git repository location.
The build context is processed recursively. So, a PATH includes any subdirectories and the URL includes the repository and its submodules. This example shows a build command that uses the current directory (.) as build context.

Here is an example on how to build the above Dockerfile into an image with a "-t" tag flag "custom-stack-hawk:v1" using the current directory annotated by the "."

```docker build -t custom-stack-hawk:v1 .```

For more information on building a docker image please use this [link](https://docs.docker.com/engine/reference/builder/).

# Running the Docker image as a container

To run an image inside of a container, we use the docker run command. The docker run command requires one parameter and that is the image name. Let’s start our image and make sure it is running correctly. Execute the following command in your terminal.

Here is an example on how to run the image with built above

```docker run --rm -v $(pwd):/hawk:rw -e API_KEY=${HAWK_API_KEY} -t custom-stack-hawk:v1```

Where:

- -v $(pwd):/hawk to mount your working directory so HawkScan can find its configuration file.

- --rm to remove the container once the scan is complete.

- -e API_KEY to provide your StackHawk API key to HawkScan as the environment variable API_KEY, so it can send results back to the platform.

- -t to allocate a psuedo-TTY to HawkScan so it can print status messages to the console in real time.

For more information on how to run a StackHawk image as a container please follow this [link](https://docs.stackhawk.com/hawkscan/).

# Postman Config

To use Postman Scan Discovery in HawkScan, add the following settings to your stackhawk.yml file:

```
hawk:
  spider:
    base: false # disable the default base spider; optional
    postmanConfig:
      filePath: # file path of the Postman collection from the base directory
      apikey: # api key to authenticate the user with Postman
      collectionUID: # Id of the collection to be pulled from Postman
```

You must either provide a postmanConfig.filePath with a path to a Postman Collection, or specify the postmanConfig.apikey and postmanConfig.collectionUID with values for your collection from Postman API Network.

These settings can be configured under the hawk.spider.postmanConfig section of the stackhawk.yml file.

For more information on Postman Config use this [link](https://docs.stackhawk.com/hawkscan/scan-discovery/postman.html).

PS: Docker needs to have access to the filePath for it to work. Use this [link](https://docs.docker.com/storage/) for more info.



