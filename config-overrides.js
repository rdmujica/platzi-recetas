const {
  defaultInjectConfig,
  rewireWorkboxInject,
  rewireWorkboxGenerate,
  defaultGenerateConfig
} = require("react-app-rewire-workbox");
const path = require("path");

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Generating Service Worker");
    const workboxInjectConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, "src", "custom-service-worker.js")
    };
    config = rewireWorkboxInject(workboxInjectConfig)(config, env);

    const workboxGenerateConfig = {
      navigateFallbackDenylist: defaultGenerateConfig.navigateFallbackBlacklist,
      swDest: "custom-service-worker.js"
    };
    config = rewireWorkboxGenerate(workboxGenerateConfig)(config, env);
  }

  return config;
};
