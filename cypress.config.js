const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1000,
  viewportWidth: 660,

  e2e: {
    baseUrl: 'http://localhost:3000', 
    setupNodeEvents(on, config) {
  
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
