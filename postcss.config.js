module.exports = (context) => ({
  plugins: {
    autoprefixer: {},
    '@fullhuman/postcss-purgecss':{
      content: ['./**/*.html']
    },
  },
});
