import build from '../src/app'
// This file contains code that we reuse between our tests.

// Fill in this config with all the configurations
// needed for testing the application
async function config () {
  return {}
}

// Automatically build and tear down our instance
function buildTestInstance () {
  const app = build({});
  
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
}

export {
  config,
  buildTestInstance
}