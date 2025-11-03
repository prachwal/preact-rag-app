import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
  en: {
    translation: {
      nav: {
        settings: 'Settings',
        counter: 'Counter',
        documentation: 'Documentation',
        theme: 'Theme',
        preferences: 'Preferences',
        gettingStarted: 'Getting Started',
        apiReference: 'API Reference',
      },
      settings: {
        title: 'Settings',
        currentMode: 'Current Mode',
        currentVariant: 'Current Variant',
        modeButton: 'Mode',
        variantButton: 'Variant',
      },
      counter: {
        title: 'Counter',
        increment: 'Increment counter',
        decrement: 'Decrement counter',
      },
      documentation: {
        title: 'Documentation',
        clickLogos: 'Click on the Vite and Preact logos to learn more',
        features: {
          hmr: '⚡ Lightning-fast HMR with Vite',
          themes: '🎨 Multiple color themes',
          responsive: '📱 Fully responsive design',
          wcag: '♿ WCAG AA compliant colors',
        },
      },
      footer: {
        builtWith: 'Built with',
        and: 'and',
        copyright: '© {{year}}',
        github: 'GitHub',
        docs: 'Preact Docs',
      },
      sidebar: {
        navigation: 'Navigation',
        info: 'Modern Preact application with theming support',
        collapse: 'Collapse sidebar',
        expand: 'Expand sidebar',
      },
    },
  },
  pl: {
    translation: {
      nav: {
        settings: 'Ustawienia',
        counter: 'Licznik',
        documentation: 'Dokumentacja',
        theme: 'Motyw',
        preferences: 'Preferencje',
        gettingStarted: 'Pierwsze kroki',
        apiReference: 'Dokumentacja API',
      },
      settings: {
        title: 'Ustawienia',
        currentMode: 'Obecny tryb',
        currentVariant: 'Obecny wariant',
        modeButton: 'Tryb',
        variantButton: 'Wariant',
      },
      counter: {
        title: 'Licznik',
        increment: 'Zwiększ licznik',
        decrement: 'Zmniejsz licznik',
      },
      documentation: {
        title: 'Dokumentacja',
        clickLogos: 'Kliknij na logo Vite i Preact aby dowiedzieć się więcej',
        features: {
          hmr: '⚡ Błyskawiczny HMR z Vite',
          themes: '🎨 Wiele motywów kolorystycznych',
          responsive: '📱 W pełni responsywny design',
          wcag: '♿ Kolory zgodne z WCAG AA',
        },
      },
      footer: {
        builtWith: 'Zbudowano z',
        and: 'i',
        copyright: '© {{year}}',
        github: 'GitHub',
        docs: 'Dokumentacja Preact',
      },
      sidebar: {
        navigation: 'Nawigacja',
        info: 'Nowoczesna aplikacja Preact z obsługą motywów',
        collapse: 'Zwiń pasek boczny',
        expand: 'Rozwiń pasek boczny',
      },
    },
  },
} as const;

i18n
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },
  });

export default i18n;
