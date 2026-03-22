import { getTranslations } from "next-intl/server";

export async function getServerTranslator(namespace?: string) {
  return namespace ? await getTranslations(namespace) : await getTranslations();
}

export async function translateServer(
  key: string,
  values?: Record<string, string | number | Date>,
) {
  const t = await getServerTranslator();
  return t(key, values);
}
