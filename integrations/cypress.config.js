const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    port: 8999,
    experimentalStudio: true,
    baseUrl: "https://localhost:9000",
  },
});
