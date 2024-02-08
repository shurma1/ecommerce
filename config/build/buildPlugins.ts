import {WebpackPluginInstance} from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {BuildOptions} from "./types/config";
export const buildPlugins = ({paths} : BuildOptions): WebpackPluginInstance[] => {

    return [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            template: paths.template
        }),
    ]
}