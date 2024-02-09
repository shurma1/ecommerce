import {type WebpackPluginInstance} from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {type BuildOptions} from './types/config';
export const buildPlugins = ({paths}: BuildOptions): WebpackPluginInstance[] => [
	new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
	}),
	new HtmlWebpackPlugin({
		template: paths.template,
	}),
];
