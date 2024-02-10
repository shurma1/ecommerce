import {type ResolveOptions} from 'webpack';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';

export const buildResolvers = (): ResolveOptions => ({
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
        new TsconfigPathsPlugin()
    ]
});
