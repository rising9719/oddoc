const webpack = require('webpack');
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: {
        overrideCracoConfig: ({ cracoConfig }) => {
          if (typeof cracoConfig.eslint.enable !== 'undefined') {
            cracoConfig.disableEslint = !cracoConfig.eslint.enable;
          }
          delete cracoConfig.eslint;
          return cracoConfig;
        },
        overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
          const dfxJson = require(`${__dirname}/dfx.json`);

          if (typeof pluginOptions.disableEslint !== 'undefined' &&
            pluginOptions.disableEslint === true ) {
            webpackConfig.plugins = webpackConfig.plugins.filter(
              (instance) => instance.constructor.name !== 'ESLintWebpackPlugin');
          }
          const networkName = process.env["DFX_NETWORK"] || "local";
          const aliases = Object.entries(dfxJson.canisters).reduce((acc, [name, value]) => {
            const outputRoot = path.join(
              __dirname,
              ".dfx",
              networkName,
              `${dfxJson.defaults.build.output}`,
              name,
            );
            return {
              ...acc,
              ["dfx-generated/" + name]: path.join(outputRoot, name + ".js"),
            };
          }, {});

          
          // throw new Error('wdadaw');
          

          return {
            ...webpackConfig,
            mode: "development",
            devtool: "source-map",
            // index: path.join(__dirname, info.frontend.entrypoint).replace(/\.html$/, ".js"),
            plugins: [
              ...webpackConfig.plugins,
              new webpack.ProvidePlugin({
                // 'dfx-generated' : [path.resolve(path.join(__dirname, 'src/agent.js')), 'dfx-generated'],
              }),
            ],
            resolve: {
              ...webpackConfig.resolve,
              alias: { ...webpackConfig.resolve.alias, ...aliases },
              extensions: [...webpackConfig.resolve.extensions, '.tsx', '.ts', '.js'],
           
              plugins: [
                ...webpackConfig.resolve.plugins.filter((t) => {
                  // Removes ModuleScopePlugin
                  return !Object.keys(t).includes('appSrcs');
                }),
              ],
            },
          };
        },
      },
      options: {},
    },
  ],
};