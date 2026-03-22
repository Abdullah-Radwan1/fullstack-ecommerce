import { getRequestConfig } from "next-intl/server";
import { defineRouting } from "next-intl/routing";
export default getRequestConfig(async ({ requestLocale }) => {
  // This automatically captures the locale from the URL (e.g., /en or /ar)
  let locale = await requestLocale;

  // Define your supported locales
  const locales = ["en", "ar"];

  // Fallback to English if the locale is missing or invalid
  if (!locale || !locales.includes(locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
