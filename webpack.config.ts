import path from 'path';
import {type BuildEnv, type BuildPaths} from './config/build/types/config';
import {buildWebpackConfig} from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		build: path.resolve(__dirname, 'dist'),
		template: path.resolve(__dirname, 'public', 'index.html'),
	};

	const port = env.port || 3000;
	const mode = env.mode || 'development';

	const isDev = mode === 'development';

	return buildWebpackConfig({
		mode,
		paths,
		isDev,
		port,
	});
};
