const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// The question bank lives in ../content, outside the Expo project root.
config.watchFolders = [...(config.watchFolders ?? []), path.resolve(__dirname, "../content")];

module.exports = withNativeWind(config, { input: "./global.css" });
