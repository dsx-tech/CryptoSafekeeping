module.exports = {
  presets: [
    '@quasar/babel-preset-app'
  ],
  env: {
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
}
