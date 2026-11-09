import { INSTAGRAM_URL, LINKEDIN_URL } from "../constants/social.js";
import about from "../content/about.json";
import contact from "../content/contact.json";
import modals from "../content/modals.json";
import pages from "../content/pages.json";
import testimonials from "../content/testimonials.json";
import trustedBy from "../content/trustedBy.json";
import ui from "../content/ui.json";

export const CONTENT = { ui, pages, about, trustedBy, modals, contact, testimonials };

function defaultVars() {
  return {
    year: String(new Date().getFullYear()),
    instagramUrl: INSTAGRAM_URL,
    linkedinUrl: LINKEDIN_URL,
    phoneDisplay: contact.phoneDisplay,
    phoneTel: contact.phoneTel,
    contactEmail: contact.email,
  };
}

function interpolate(str, vars) {
  if (typeof str !== "string") return str;
  let out = str;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(v ?? "");
  }
  return out;
}

/**
 * Tekst z plików w `src/content/*.json`.
 * Ścieżka: `ui.*`, `pages.*`, `about.*`, `trustedBy.*`, `contact.*` (telefon, e-mail, imię).
 * W stringach możesz użyć {{year}}, {{instagramUrl}}, {{linkedinUrl}}, {{phoneDisplay}}, {{phoneTel}}, {{contactEmail}} oraz własnych kluczy z `extra`.
 * W komponentach użyj `useContentStrings().t` (tryb „XD” pokazuje sam klucz).
 */
export function resolveT(path, extra = {}) {
  const [ns, ...restParts] = path.split(".");
  const root = CONTENT[ns];
  if (root == null) return path;
  const val = restParts.reduce((o, key) => (o == null ? undefined : o[key]), root);
  if (typeof val === "string") return interpolate(val, { ...defaultVars(), ...extra });
  return val;
}

/** Modal statyczny z `content/modals.json` (URL-e z social podstawiane). */
export function getStaticModal(key) {
  const entry = modals[key];
  if (!entry) return null;
  const vars = defaultVars();
  return {
    title: interpolate(entry.title, vars),
    bodyHtml: interpolate(entry.bodyHtml, vars),
  };
}
