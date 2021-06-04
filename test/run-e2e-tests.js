const cypress = require('cypress');

// Possible values: chrome, chromium, edge, electron firefox
const browser = process.argv[2] || 'chrome';

cypress.run({
  browser,
  spec: 'test/e2e/*.ts',
  config: {
    integrationFolder: 'test/e2e',
  },
});
