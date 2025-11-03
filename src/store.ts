import { signal } from "@preact/signals";

type Mode = 'dark' | 'light' | 'auto';
type Variant = 'standard' | 'sepia' | 'forest' | 'ocean';

const modes: Mode[] = ['dark', 'light', 'auto'];
const variants: Variant[] = ['standard', 'sepia', 'forest', 'ocean'];

function getNextMode(currentMode: Mode): Mode {
  const currentIndex = modes.indexOf(currentMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  return modes[nextIndex];
}

function getNextVariant(currentVariant: Variant): Variant {
  const currentIndex = variants.indexOf(currentVariant);
  const nextIndex = (currentIndex + 1) % variants.length;
  return variants[nextIndex];
}

type Store = {
  settings: typeof settings;
  setMode: (mode: Mode) => void;
  setVariant: (variant: Variant) => void;
  nextMode: () => void;
  nextVariant: () => void;
};

type StoreValue = {
  mode?: Mode;
  variant?: Variant;
};

const storedMode = localStorage.getItem('mode') as Mode || 'dark';
const storedVariant = localStorage.getItem('variant') as Variant || 'standard';

export const settings = signal<StoreValue>({ mode: storedMode, variant: storedVariant });

export function useStore() {
  return {
    settings,
    setMode: (mode: Mode) => {
      setModeValue(mode);
    },
    setVariant: (variant: Variant) => {
      setVariantValue(variant);
    },
    nextMode: () => {
      const currentMode = settings.value.mode || 'dark';
      const nextModeValue = getNextMode(currentMode);
      setModeValue(nextModeValue);
    },
    nextVariant: () => {
      const currentVariant = settings.value.variant || 'standard';
      const nextVariantValue = getNextVariant(currentVariant);
      setVariantValue(nextVariantValue);
    }
  } as Store;
}

function setModeValue(mode: Mode) {
  settings.value = { ...settings.value, mode };
  updateThemeAttributes();
  localStorage.setItem('mode', mode);
}

function setVariantValue(variant: Variant) {
  settings.value = { ...settings.value, variant };
  updateThemeAttributes();
  localStorage.setItem('variant', variant);
}

function updateThemeAttributes() {
  const mode = settings.value.mode || 'dark';
  const variant = settings.value.variant || 'standard';
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-mode');
    document.documentElement.setAttribute('data-variant', variant);
  } else {
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.setAttribute('data-variant', variant);
  }
}

// Initialize on load
updateThemeAttributes();

export default useStore;
