export const LANGUAGE_CODES = ['EN', 'DE', 'IT', 'FR', 'ES', 'SQ', 'GSW', 'PT'] as const;

export type Language = (typeof LANGUAGE_CODES)[number];
export type LanguageShortCode = 'EN' | 'DE' | 'IT' | 'FR' | 'ES' | 'SQ' | 'AG' | 'PT';
export type HtmlLanguageTag = 'en' | 'de' | 'it' | 'fr' | 'es' | 'sq' | 'gsw-CH' | 'pt-PT';

export interface LanguageOption {
  code: Language;
  shortCode: LanguageShortCode;
  htmlLang: HtmlLanguageTag;
  name: string;
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'EN', shortCode: 'EN', htmlLang: 'en', name: 'English' },
  { code: 'DE', shortCode: 'DE', htmlLang: 'de', name: 'Deutsch' },
  { code: 'IT', shortCode: 'IT', htmlLang: 'it', name: 'Italiano' },
  { code: 'FR', shortCode: 'FR', htmlLang: 'fr', name: 'Français' },
  { code: 'ES', shortCode: 'ES', htmlLang: 'es', name: 'Español' },
  { code: 'SQ', shortCode: 'SQ', htmlLang: 'sq', name: 'Shqip' },
  { code: 'GSW', shortCode: 'AG', htmlLang: 'gsw-CH', name: 'Aargauer Dütsch' },
  { code: 'PT', shortCode: 'PT', htmlLang: 'pt-PT', name: 'Português' }
];

export const DEFAULT_LANGUAGE: Language = 'EN';
export const LANGUAGE_STORAGE_KEY = 'preferredLanguage';
export const PORTFOLIO_LANGUAGE_CHANGE_EVENT = 'portfolio-language-change';

export interface NavigationLabels {
  next: string;
  previous: string;
  backToTop: string;
  backToStart: string;
}

export const NAVIGATION_LABELS: Record<Language, NavigationLabels> = {
  EN: { next: 'Next section', previous: 'Previous section', backToTop: 'Back to top', backToStart: 'Back to landing page' },
  DE: { next: 'Nächster Abschnitt', previous: 'Vorheriger Abschnitt', backToTop: 'Nach oben', backToStart: 'Zurück zur Startseite' },
  IT: { next: 'Sezione successiva', previous: 'Sezione precedente', backToTop: 'Torna in alto', backToStart: 'Torna alla pagina iniziale' },
  FR: { next: 'Section suivante', previous: 'Section précédente', backToTop: 'Retour en haut', backToStart: 'Retour à la page d’accueil' },
  ES: { next: 'Sección siguiente', previous: 'Sección anterior', backToTop: 'Volver arriba', backToStart: 'Volver a la página de inicio' },
  SQ: { next: 'Seksioni tjetër', previous: 'Seksioni i mëparshëm', backToTop: 'Kthehu lart', backToStart: 'Kthehu në faqen hyrëse' },
  GSW: { next: 'Zum nöchschte Abschnitt', previous: 'Zum vorherige Abschnitt', backToTop: 'Ganz ufe', backToStart: 'Zrugg uf d Startsiite' },
  PT: { next: 'Secção seguinte', previous: 'Secção anterior', backToTop: 'Voltar ao início', backToStart: 'Voltar à página inicial' }
};

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && LANGUAGE_CODES.some(code => code === value);
}

export function getLanguageOption(language: Language): LanguageOption {
  return LANGUAGE_OPTIONS.find(option => option.code === language) ?? LANGUAGE_OPTIONS[0];
}
