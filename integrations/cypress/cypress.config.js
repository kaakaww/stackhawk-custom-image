const { defineConfig } = require("cypress");
import * as dotenv from 'dotenv'
const parsedConfig = dotenv.config().parsed

module.exports = defineConfig({
  env: {
    "LOGIN_PASSWORD": parsedConfig["LOGIN_PASSWORD"],
    "LOGIN_USERNAME": parsedConfig["LOGIN_USERNAME"],
    "TOKEN_NAME": parsedConfig["TOKEN_NAME"],
    "TOKEN_VALUE": parsedConfig["TOKEN_VALUE"]
  },
  e2e: {
    port: 8999,
    experimentalStudio: true,
    baseUrl: "https://localhost:9000",
  },
});
