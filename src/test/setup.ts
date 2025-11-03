import { expect, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/preact";
import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Mock window.innerWidth for mobile testing
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    value: 375, // Mobile width
  });

  const localStorageMock = {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
  };
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

afterEach(() => {
  cleanup();
});
