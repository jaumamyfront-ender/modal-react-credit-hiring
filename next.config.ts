import type { NextConfig } from "next";
const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate();
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;

// import type { NextConfig } from "next";
// import nextTranslate from "next-translate-plugin";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   // другие настройки
// };

// export default nextTranslate(nextConfig);

// /** @type {import('next').NextConfig} */

// const nextTranslate = require('next-translate-plugin')
// module.exports = nextTranslate()
