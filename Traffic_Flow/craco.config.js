const path = require("path");
const lessPlugin = require("craco-less");

module.exports = {
  // plugins
  plugins: [
    {
      plugin: lessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  // webpack setting
  webpack: {
    // set align
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Cross-Origin
  devServer: {
    proxy: {
      "/api": {
        // target: "https://test-api.juhaokanya.com/api",
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
