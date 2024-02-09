import {type Configuration} from 'webpack';
import {type BuildOptions} from './types/config';

import {buildDevServer} from './buildDevServer';
import {buildResolvers} from './buildResolvers';
import {buildLoaders} from './buildLoaders';
import {buildPlugins} from './buildPlugins';

export const buildWebpackConfig = (options: BuildOptions): Configuration => {
	const {mode, paths, isDev} = options;

	return {
		mode,
		entry: paths.entry,
		output: {
			path: paths.build,
			filename: 'bundle.[hash].js',
			clean: true,
		},
		plugins: buildPlugins(options),
		resolve: buildResolvers(),
		module: {
			rules: buildLoaders(options),
		},
		devtool: isDev ? 'inline-source-map' : undefined,
		devServer: isDev ? buildDevServer(options) : undefined,
	};
};
