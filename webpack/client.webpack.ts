import * as webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import * as path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import {
  commonConfig,
  clientSrcPath,
  clientBuildPath,
  isProd,
} from './common.webpack';

const entry = path.resolve(clientSrcPath, 'index.tsx');
const template = path.resolve(clientSrcPath, 'template.html');

export default (): webpack.Configuration => {
  return webpackMerge(commonConfig(), {
    target: 'web',
    entry,
    output: {
      path: clientBuildPath,
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template,
        minify: isProd,
      }),
      new webpack.CleanPlugin(),
    ],
  });
};
