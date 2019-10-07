module.exports = ({ file, env }) => ({
  plugins: {
    // 'postcss-import': { root: file.dirname },
    cssnano: {
      zindex: false,
      reduceIdents: false,
      discardUnused: false,
      mergeIdents: false,
      autoprefixer: false,
      normalizeTimingFunctions: false,
    },
  },
});
