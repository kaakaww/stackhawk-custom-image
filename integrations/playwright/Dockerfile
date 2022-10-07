# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal
 
WORKDIR /app

USER root

COPY . /app
 
RUN apt-get update && \
    # Get the needed libraries to run Playwright
    apt-get install -y curl && \
    apt-get -y install curl libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev && \
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash && \
    apt-get purge --auto-remove && \
    apt-get clean && \
    npm install

FROM stackhawk/hawkscan

USER zap
WORKDIR /app