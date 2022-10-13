
FROM cypress/included:10.9.0
ARG NODE_VERSION="16.x"


COPY --chown=zap:zap --from=stackhawk/hawkscan /zap /zap

USER root

RUN apt-get update && \
    apt-get install -y openjdk-11-jdk simpleproxy

ENV PATH $JAVA_HOME/bin:/zap:$PATH

ENTRYPOINT ["shawk"]