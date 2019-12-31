const withOffline = require('next-offline')

const nextConfig = {
  // Add the homepage to the cache
  transformManifest: manifest =>
    ['/'].concat(Array.isArray(manifest) ? manifest : []),
  // Right now trying to generate in dev mode throws errors...I'm not sure exactly
  // what the issue is but since I have preview apps set up for this it's probably
  // ok to just rely on testing service workers in a demo environment for now.
  generateInDevMode: false,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}

module.exports = withOffline(nextConfig)
