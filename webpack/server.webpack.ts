import * as webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import * as path from 'path';

import { commonConfig, serverSrcPath, serverBuildPath } from './common.webpack';

const entry = path.resolve(serverSrcPath, 'index.ts');

export default (): webpack.Configuration => {
  return webpackMerge(commonConfig(), {
    target: 'node14',
    entry,
    output: {
      path: serverBuildPath,
      publicPath: '/',
      filename: 'server.js',
    },
  });
};
