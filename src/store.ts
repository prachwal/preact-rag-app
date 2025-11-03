import { signal } from "@preact/signals";

type themeType = 'dark' | 'light' | 'auto';

const themes: themeType[] = ['dark', 'light', 'auto'];

function getNextTheme(currentTheme: themeType): themeType {
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
}

type Store = {
  settings: typeof settings;
  setTheme: (theme: themeType) => void;
  nextTheme: () => void;
};

type StoreValue = {
  theme?: themeType;
};

const theme = localStorage.getItem('theme') as themeType || 'dark';

export const settings = signal<StoreValue>({ theme });

export function useStore() {
  return {
    settings,
    setTheme: (theme: themeType) => {
        setThemeValue(theme);
    },
    nextTheme: () => {
      const currentTheme = settings.value.theme || 'dark';
      const nextThemeValue = getNextTheme(currentTheme);
      setThemeValue(nextThemeValue);
      localStorage.setItem('theme', nextThemeValue);
    }
  } as Store;
}

function setThemeValue(theme: themeType) {
  settings.value = { ...settings.value, theme };
    if (settings.value.theme === 'auto') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', settings.value.theme?.toString() || 'dark')
    }  
  localStorage.setItem('theme', theme);
}

export default useStore;
