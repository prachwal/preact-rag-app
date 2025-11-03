import { signal, computed, effect } from "@preact/signals";

type Mode = "dark" | "light" | "auto";
type Variant = "standard" | "sepia" | "forest" | "ocean";

const MODES: readonly Mode[] = ["dark", "light", "auto"] as const;
const VARIANTS: readonly Variant[] = [
  "standard",
  "sepia",
  "forest",
  "ocean",
] as const;

const STORAGE_KEYS = {
  MODE: "mode",
  VARIANT: "variant",
} as const;

function isValidMode(value: unknown): value is Mode {
  return typeof value === "string" && MODES.includes(value as Mode);
}

function isValidVariant(value: unknown): value is Variant {
  return typeof value === "string" && VARIANTS.includes(value as Variant);
}

function getStoredValue<T>(
  key: string,
  defaultValue: T,
  validator: (value: unknown) => value is T
): T {
  try {
    const item = localStorage.getItem(key);
    if (item && validator(item)) {
      return item;
    }
  } catch (error) {
    console.warn(`Failed to read ${key} from localStorage:`, error);
  }
  return defaultValue;
}

function setStoredValue(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to write ${key} to localStorage:`, error);
  }
}

function getNextInCycle<T>(array: readonly T[], current: T): T {
  const currentIndex = array.indexOf(current);
  const nextIndex = (currentIndex + 1) % array.length;
  return array[nextIndex];
}

interface StoreValue {
  mode: Mode;
  variant: Variant;
}

const initialMode = getStoredValue(STORAGE_KEYS.MODE, "dark", isValidMode);
const initialVariant = getStoredValue(
  STORAGE_KEYS.VARIANT,
  "standard",
  isValidVariant
);

export const settings = signal<StoreValue>({
  mode: initialMode,
  variant: initialVariant,
});

export const currentMode = computed(() => settings.value.mode);
export const currentVariant = computed(() => settings.value.variant);
export const effectiveMode = computed(() => {
  if (settings.value.mode === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return settings.value.mode;
});

function updateThemeAttributes(mode: Mode, variant: Variant): void {
  requestAnimationFrame(() => {
    const root = document.documentElement;

    if (mode === "auto") {
      root.removeAttribute("data-mode");
    } else {
      root.dataset.mode = mode;
    }

    root.dataset.variant = variant;
  });
}

effect(() => {
  const { mode, variant } = settings.value;
  updateThemeAttributes(mode, variant);
});

interface Store {
  settings: typeof settings;
  currentMode: typeof currentMode;
  currentVariant: typeof currentVariant;
  effectiveMode: typeof effectiveMode;
  setMode: (mode: Mode) => void;
  setVariant: (variant: Variant) => void;
  nextMode: () => void;
  nextVariant: () => void;
}

export function useStore(): Store {
  return {
    settings,
    currentMode,
    currentVariant,
    effectiveMode,

    setMode: (mode: Mode) => {
      if (!isValidMode(mode)) {
        console.warn(`Invalid mode: ${mode}`);
        return;
      }
      settings.value = { ...settings.value, mode };
      setStoredValue(STORAGE_KEYS.MODE, mode);
    },

    setVariant: (variant: Variant) => {
      if (!isValidVariant(variant)) {
        console.warn(`Invalid variant: ${variant}`);
        return;
      }
      settings.value = { ...settings.value, variant };
      setStoredValue(STORAGE_KEYS.VARIANT, variant);
    },

    nextMode: () => {
      const nextMode = getNextInCycle(MODES, settings.value.mode);
      settings.value = { ...settings.value, mode: nextMode };
      setStoredValue(STORAGE_KEYS.MODE, nextMode);
    },

    nextVariant: () => {
      const nextVariant = getNextInCycle(VARIANTS, settings.value.variant);
      settings.value = { ...settings.value, variant: nextVariant };
      setStoredValue(STORAGE_KEYS.VARIANT, nextVariant);
    },
  };
}

if (typeof window !== "undefined" && !import.meta.env?.TEST) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleSystemThemeChange = () => {
    if (settings.value.mode === "auto") {
      settings.value = { ...settings.value };
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleSystemThemeChange);
  } else {
    mediaQuery.addListener(handleSystemThemeChange);
  }
}

export default useStore;
