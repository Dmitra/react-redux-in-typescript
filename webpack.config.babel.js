import path from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'

export function absolute (...args) {
  return path.join(__dirname, ...args)
}

module.exports = (env, argv) => {

  return {
    mode: process.env.BUILD,
    entry: {
      import: './boot/index',
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.BUILD !== 'production',
          },
        }],
      }, {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.BUILD !== 'production',
          },
        }, {
          loader: 'ts-loader',
        }],
      }, {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      }],
    },
    devServer: {
      hot: false,
      client: {
        overlay: false,
      },
      historyApiFallback: true,
    },
    resolve: {
      modules: [absolute('.'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      path: absolute('../dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    devtool: argv.mode === 'production' ? undefined : 'source-map',
    plugins: [
      new HtmlWebPackPlugin({
        template: './boot/index.html',
        filename: './index.html',
      }),
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asynchronous import,
        // e.g. via import(/* webpackMode: 'weak' */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),
    ],
  }
}