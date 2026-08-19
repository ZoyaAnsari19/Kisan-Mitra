import type { Locale } from "./config";
import en from "./dictionaries/en.json";
import mr from "./dictionaries/mr.json";

/**
 * Server-side only. Nothing here may be imported from a Client Component —
 * doing so would ship every translation to the browser. The page and layout
 * that consume this are Server Components, so the dictionaries stay on the
 * server and only rendered HTML reaches the client.
 *
 * `en.json` is the source of truth for the shape of a dictionary. Every other
 * locale is assigned to that type below, so a missing or misspelled key in a
 * translation is a build-time error rather than an `undefined` on the page.
 */
export type Dictionary = typeof en;

const marathi: Dictionary = mr;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  mr: marathi,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
