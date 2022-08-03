export const environment = {
  production: true,
  algolia: {
    appID: process.env.NX_ALGOLIA_APP_ID,
    adminKey: process.env.NX_ALGOLIA_ADMIN_API_KEY,
    indexName: process.env.NX_ALGOLIA_INDEX_NAME
  }
};
