const webpack = require('webpack');

let appConfig = null;
try {
  appConfig = require('./config.js');
} catch (e) {
  console.warn('No config file, using environment variables')
}

const CONFIG_KEYS = {
  'process.env.API_KEY': 'API_KEY',
  'process.env.AUTH_DOMAIN': 'AUTH_DOMAIN',
  'process.env.DATABASE_URL': 'DATABASE_URL',
  'process.env.WEATHER_API_KEY': 'WEATHER_API_KEY',
};

function formatEnviroVarValue(value) {
  return `'${value}'`;
}

function map(obj, transformation) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = transformation(obj[key]);
    }
  }
  return obj;
}

function getConfigurationValue(label) {
  if (appConfig) {
    return formatEnviroVarValue(appConfig[label]);
  }
  return formatEnviroVarValue(process.env[label]);
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'ttf-loader',
            options: {
              name: './font/[hash].[ext]',
            },
          },
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|svg|)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(map(CONFIG_KEYS, getConfigurationValue)),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
  },
};