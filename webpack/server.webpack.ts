import * as webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import * as path from 'path';
import nodeExternals from 'webpack-node-externals';

import {
  commonConfig,
  serverSrcPath,
  serverBuildPath,
  isProd,
} from './common.webpack';

const entry = path.resolve(serverSrcPath, 'index.ts');

export default (): webpack.Configuration => {
  return webpackMerge(commonConfig(), {
    target: 'node14',
    entry,
    output: {
      path: serverBuildPath,
      publicPath: '/',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProd ? 'production' : 'development'
        ),
      }),
    ],
    externals: ['commonjs', nodeExternals()],
  });
};
