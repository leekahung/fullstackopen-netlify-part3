module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { esmodeules: true } }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
