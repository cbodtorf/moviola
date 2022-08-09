// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  },
  async rewrites() {
    return [
      {
        source: '/mp/lib.min.js',
        destination: 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'
      },
      {
        source: '/mp/lib.js',
        destination: 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.js'
      },
      {
        source: '/mp/decide',
        destination: 'https://decide.mixpanel.com/decide'
      },
      {
        source: '/mp/:slug',
        // use "api-eu.mixpanel.com" if you need to use EU servers
        destination: 'https://api.mixpanel.com/:slug'
      }
    ];
  }
};

module.exports = withNx(nextConfig);
