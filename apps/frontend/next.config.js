// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const path = require('path');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    appID: process.env.NX_ALGOLIA_APP_ID,
    apiKey: process.env.NX_ALGOLIA_PUBLIC_API_KEY,
    indexName: process.env.NX_ALGOLIA_INDEX_NAME,
    url: process.env.NX_URL
  },
  // See: https://github.com/nrwl/nx/issues/9017
  // https://nextjs.org/docs/advanced-features/output-file-tracing
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};

module.exports = withNx(nextConfig);
