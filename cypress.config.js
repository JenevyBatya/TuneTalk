const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    supportFile: false,
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
  },
});