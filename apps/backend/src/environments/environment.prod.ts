export const environment = {
  production: true,
  algolia: {
    appID: process.env.ALGOLIA_APP_ID,
    adminKey: process.env.ALGOLIA_ADMIN_API_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME
  }
};
