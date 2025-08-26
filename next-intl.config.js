/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
    localePath: "./src/translations",
  },
};

module.exports = nextConfig;
