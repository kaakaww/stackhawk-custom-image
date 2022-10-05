FROM stackhawk/hawkscan

ARG NODE_VERSION="16.x"

WORKDIR /app

USER root

COPY . /app

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash && \
    apt-get install -y nodejs && \
    npm install --global newman && \
    apt-get purge --auto-remove && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
USER zap
