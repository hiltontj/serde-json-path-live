module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const wasmExtRegexp = /\.wasm$/;
      webpackConfig.resolve.extensions.push(".wasm");

      webpackConfig.module.rules.forEach((rule) => {
        (rule.oneOf || []).forEach((oneOf) => {
          if (oneOf.type === "asset/resource") {
            oneOf.exclude.push(wasmExtRegexp);
          }
        });
      });

      webpackConfig.experiments = {
        syncWebAssembly: true,
      };

      return webpackConfig;
    },
  },
};
