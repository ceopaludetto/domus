const path = require("path");

require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [require.resolve("@domus/settings/server")],
  parserOptions: { project: path.resolve(__dirname, "tsconfig.json") },
};
