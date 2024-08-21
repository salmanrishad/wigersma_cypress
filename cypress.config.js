const cypress = require("cypress");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video:false,
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: 'cypress/reports/mochawesome-report'
  },
  e2e: {
    baseUrl: 'http://20.52.5.183:4000/?sub_domain=customer',
  excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
  specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
  },
});
