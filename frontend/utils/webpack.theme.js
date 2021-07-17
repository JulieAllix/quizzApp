const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Ant = require("./theme/ant");

const antThemeVariables = {
    //'primary-color': themeConfig.color,
    "font-size-base": "15px",
    "heading-color": "rgba(0, 0, 0, 0.95)",
    "text-color": "rgba(0, 0, 0, 0.90)",
    "text-color-secondary": "rgba(0, 0, 0, .55)",
    "background-color-light": "#f2f2f2", // Antd default : #fafafa
    "border-color-base": "#9c9c9c", // Orig : bababa
    "border-color-split": "#cecece",
    "box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.25)", // major shadow for layers
};

module.exports = Ant.compileThemeVariables(antThemeVariables).then(
    () => {
        return {
            plugins: [new MiniCssExtractPlugin()],
            module: {
                rules: [
                    // Styles
                    {
                        test: /\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            //{
                            //    // Inject result in DOM
                            //    loader: "style-loader",
                            //},
                            {
                                // to convert the resulting CSS to Javascript to be bundled
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1,
                                    sourceMap:
                                        process.env.NODE_ENV !== "production",
                                },
                            },
                            {
                                // Convert SAAS to CSS
                                loader: "sass-loader",
                                options: {
                                    sourceMap:
                                        process.env.NODE_ENV !== "production",

                                },
                            },
                        ],
                    },
                    {
                        test: /\.less$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            //{
                            //    // Inject result in the DOM with <style> tags
                            //    loader: "style-loader",
                            //},
                            {
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1,
                                    sourceMap:
                                        process.env.NODE_ENV !== "production",

                                },
                            },
                            {
                                loader: "less-loader",
                                options: {
                                    lessOptions: {
                                        javascriptEnabled: true,
                                    },

                                    // TODO
                                    //prependData: JSON.stringify(antThemeVariables)
                                },
                            },
                        ],
                    },

                    // static assets
                    {
                        test: /\.png$/,
                        use: [
                            {
                                loader: "url-loader",
                                options: {
                                    limit: 10000,
                                    name: "img/[hash].[ext]",
                                },
                            },
                        ],
                    },
                    {
                        test: /\.jpg$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "img/[hash].[ext]",
                                },
                            },
                        ],
                    },
                    {
                        test: /\.gif$/,
                        use: "url-loader?limit=10000",
                    },

                    // If fonts/images size are lower than 10K, embbed them in the css file
                    {
                        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                        use: {
                            loader: "url-loader",
                            options: {
                                limit: 10000,
                                mimetype: "application/font-woff",
                                name: "fonts/[hash].woff",
                            },
                        },
                    },
                    {
                        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                        use: {
                            loader: "url-loader",
                            options: {
                                limit: 10000,
                                mimetype: "application/font-woff",
                                name: "fonts/[hash].woff2",
                            },
                        },
                    },
                    {
                        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                        use: {
                            loader: "url-loader",
                            options: {
                                limit: 10000,
                                mimetype: "application/octet-stream",
                                name: "fonts/[hash].ttf",
                            },
                        },
                    },
                    {
                        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                        use: {
                            loader: "url-loader",
                            options: {
                                name: "fonts/[hash].eot",
                            },
                        },
                    },
                ],
            },
        };
    }
);
