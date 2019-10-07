/* eslint-disable no-param-reassign,max-len */
// const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
// const withCSS = require('@zeit/next-css');
// const withSass = require('@zeit/next-sass');
const webpack = require('webpack');


module.exports = {
  // cssModules: true,
  // cssLoaderOptions: {
  //   importLoaders: 1,
  //   localIdentName: '[name]__[local]___[hash:base64:5]',
  // },
  // postcssLoaderOptions: {},
  webpack: (config, { dev, buildId }) => {
    // if (dev) config.devtool = 'inline-source-map';
    // const port = process.env.PORT || (dev ? 5000 : 3000);
    config.node = { fs: 'empty' };
    config.module.exprContextCritical = false;
    // config.module.rules.push(
    //   {
    //     test: /\.(css|scss)/,
    //     use: ['emit-file-loader?name=dist/[path][name].[ext]'],
    //   },
    //   // {
    //   //   test: /\.css$/,
    //   //   use: ['babel-loader', 'raw-loader', 'postcss-loader'],
    //   // },
    //   {
    //     test: /\.css$/,
    //     use: ['raw-loader', 'postcss-loader'],
    //   },
    //   {
    //     test: /\.scss$/,
    //     use: [
    //       'raw-loader',
    //       'val-loader',
    //       {
    //         loader: 'skeleton-loader',
    //         options: {
    //           procedure: content => (
    //             `${content} \n${['module.exports = {',
    //               'stylesheet: module.exports.toString(),',
    //               'classNames: exports.locals',
    //               '}',
    //             ].join('')}`
    //           ),
    //         },
    //       },
    //       'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]',
    //       'postcss-loader',
    //       {
    //         loader: 'sass-loader',
    //         options: {
    //           includePaths: ['node_modules'],
    //         },
    //       },
    //
    //     ],
    //   }
    // );
    config.plugins.push(new webpack.DefinePlugin({
      // 'process.env.IP': JSON.stringify(ip.address()),
      'process.env.DB': JSON.stringify(process.env.DB),
      'process.env.buildEnvProd': JSON.stringify(process.env.buildEnvProd),
      'process.env.BUILD_ID': JSON.stringify(buildId),
      // 'process.env.localDB': JSON.stringify(process.env.buildEnvProd),
      // 'process.env.stagingDB': process.env.NODE_ENV === 'stagingDB',
      // 'process.env.PRODDB': process.env.NODE_ENV === 'prodDB',
      // 'process.env.STAGING_DOMAIN': JSON.stringify(`${STAGING_DOMAIN}:${port}`),
    }));

    if (!dev) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          verbose: true,
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/,
            },
          ],
        })
      );
    }

    config.module.rules.push(
      {
        test: /\.css/,
        use: 'raw-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'to-string-loader', // translates CSS into CommonJS
          // 'isomorphic-style-loader', // creates style nodes from JS strings
          {
            loader: 'css-loader',
            options: {
              modules: {
                // mode: 'local',
                localIdentName: '[name]__[local]___[hash:base64:5]',
                // context: path.resolve(__dirname, 'src'),
                // hashPrefix: 'my-custom-hash',
              },
              // modules: true,
              // importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              // localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    );


    // config.resolve.alias = {
    //   // TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
    //   // TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
    //   // TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
    //   // TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
    //   // ScrollToPlugin: path.resolve('node_modules', 'gsap/ScrollToPlugin.js'),
    //   // ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
    //   // 'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
    //   // 'jquery.scrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/jquery.ScrollMagic.js'),
    //   // 'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
    //   moment$: 'moment/moment.js',
    // };


    // console.log(JSON.stringify(config, null, 2));
    // console.log(webpack)

    // Important: return the modified config
    // config.module.rules.shift();
    // config.module.rules.shift();
    // config.performance.hints = error;

    // console.log(JSON.stringify(config, null, 2))

    // console.log(JSON.stringify(config.module.rules, null, 2))


    return config;
  },
  // webpackDevMiddleware: (config) => {
  //   console.log(config)
  //   return config
  // },
  exportPathMap() {
    return {
      '/doctor': { page: '/doctor', query: { doctorSlug: 'greg-burrell-md' } },
      '/styleguide': { page: '/styleguide', query: { } },
      '/v3/index': { page: '/v3', query: { } },
      '/v3/instant-care': { page: '/v3', query: { page: 'instant-care' } },
      '/v3/video-visit': { page: '/v3', query: { page: 'video-visit', virtual: 1 } },
      '/v3/urgent-care': { page: '/v3', query: { page: 'urgent-care' } },
      '/v3/urgent-care/team': { page: '/v3', query: { page: 'team' } },
      '/v3/primary-care': { page: '/v3', query: { page: 'primary-care' } },
      '/v3/locations': { page: '/v3', query: { page: 'locations' } },
      '/v3/carbon-financial-district': { page: '/v3', query: { page: 'location', locationSlug: 'carbon-financial-district' } },
      '/v3/r/urinary-tract-infection-uti-symptoms': { page: '/v3', query: { page: 'reason', reasonSlug: 'urinary-tract-infection-uti-symptoms' } },
      // '/v4/about': { page: '/v4/about' },
      // '/healthline-widget/abdominal-pain': { page: '/healthline-widget', query: { reasonSlug: 'abdominal-pain' } },

      // '/nextdoor': { page: '/nextdoor' },
      // '/flushot': { page: '/flushot' },
      // '/testpage': { page: '/testpage' },

    };
  },
};
