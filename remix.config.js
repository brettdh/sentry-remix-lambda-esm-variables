/** @type {import('@remix-run/dev').AppConfig} */
export default {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{js,jsx,ts,tsx}"],
  publicPath: "/_static/build/",
  serverBuildPath: "server/index.mjs",
  serverModuleFormat: "esm",
  ...(process.env.NODE_ENV === "production"
    ? {
        server: "server.ts",
      }
    : {}),
};
