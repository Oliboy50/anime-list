const env = require('./env');

module.exports = {
  env: {
    firebase_apiKey: process.env.FIREBASE_API_KEY || env.firebase_apiKey,
    firebase_authDomain: process.env.FIREBASE_AUTH_DOMAIN || env.firebase_authDomain,
    firebase_databaseURL: process.env.FIREBASE_DATABASE_URL || env.firebase_databaseURL,
    firebase_projectId: process.env.FIREBASE_PROJECT_ID || env.firebase_projectId,
    firebase_storageBucket: process.env.FIREBASE_STORAGE_BUCKET || env.firebase_storageBucket,
    firebase_messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || env.firebase_messagingSenderId,
  },
  head: {
    title: 'My Anime List',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My Anime List' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
    ],
  },
  css: [
    '@/assets/css/bulma/init.scss',
  ],
  loading: { color: '#3B8070' },
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false,
        },
      },
    },
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
