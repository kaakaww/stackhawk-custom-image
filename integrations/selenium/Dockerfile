FROM stackhawk/hawkscan


USER root
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk simpleproxy && \
    curl -L https://github.com/mozilla/geckodriver/releases/download/v0.32.0/geckodriver-v0.32.0-linux64.tar.gz | tar xz -C /usr/local/bin && \
    apt-get purge -y ca-certificates curl

WORKDIR /hawk

ENV PATH $JAVA_HOME/bin:/zap:$PATH

ENTRYPOINT ["shawk"]
