/* eslint global-require: off, import/no-extraneous-dependencies: off */

const developmentEnvironments = ['development', 'test']

module.exports = api => {
  const development = api.env(developmentEnvironments)

  return {
    presets: [
      // @babel/preset-env will automatically target our browserslist targets
      require('@babel/preset-env'),
      [require('@babel/preset-react'), { development }],
      require('@babel/preset-typescript'),
    ],
    plugins: [
      // Stage 1
      [require('@babel/plugin-proposal-optional-chaining'), { loose: false }],
      require('@babel/plugin-proposal-do-expressions'),
    ],
  }
}