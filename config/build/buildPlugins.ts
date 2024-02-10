import type {WebpackPluginInstance} from 'webpack';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {type BuildOptions} from './types/config';
export const buildPlugins = ({paths, isDev}: BuildOptions): WebpackPluginInstance[] => {
    const plugins: WebpackPluginInstance[] = [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: paths.template,
        })
    ];

    if(isDev) plugins.push(new webpack.HotModuleReplacementPlugin());

    return plugins;
};
