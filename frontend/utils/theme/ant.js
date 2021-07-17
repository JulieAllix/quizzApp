const fs = require("fs");
const less = require("less");
const ExtractVariablesPlugin = require("./extractVariablesLessPlugin");

/**
 * Return values of compiled Less variables from a compilable entry point.
 * @param {string} lessEntryPath - Root Less file from which to extract variables.
 * @param {Object} variableOverrides - Variable overrides of the appContent { '@var': 'value' } to use
 *   during compilation.
 * @return {Object} Object of the appContent { 'variable': 'value' }.
 */
const extractLessVariables = (lessEntryPath, variableOverrides = {}) => {
    const lessEntry = fs.readFileSync(lessEntryPath, "utf8");
    return new Promise(async (resolve, reject) => {
        try {
            await less.render(lessEntry, {
                filename: lessEntryPath,
                javascriptEnabled: true,
                modifyVars: variableOverrides,
                plugins: [
                    new ExtractVariablesPlugin({
                        callback: (variables) => resolve(variables),
                    }),
                ],
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Use SCSS theme file to seed a full set of Ant Design's theme variables returned in SCSS.
 * @return {string} A string representing an SCSS file containing all the theme and color
 *   variables used in Ant Design.
 */
module.exports = {
    compileThemeVariables: function (antThemeVariables) {
        const themeEntryPath = require.resolve(
            "antd/lib/style/themes/default.less"
        );

        const variableOverrides = {};
        Object.keys(antThemeVariables).forEach(function (sassVariableName) {
            const lessVariableName = sassVariableName.replace(/^\$/, "@");
            variableOverrides[lessVariableName] =
                antThemeVariables[sassVariableName];
        });

        return extractLessVariables(themeEntryPath, variableOverrides).then(
            function (variables) {
                let compiledVariables = Object.entries(variables)
                    .map(([name, value]) => `$${name}: ${value};\n`)
                    .join("");
                return compiledVariables;
            }
        );
    },
};
