// next.config.js
import createNextIntlPlugin from "next-intl/plugin";

// Aponta para o arquivo de configuração
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl({
  reactStrictMode: true,
});
