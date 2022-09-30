FROM stackhawk/hawkscan

ARG NODE_VERSION="16.x"

WORKDIR /app

USER root

COPY . /app

RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash
RUN apt-get install -y nodejs
RUN npm install --global newman
RUN which newman

USER zap
