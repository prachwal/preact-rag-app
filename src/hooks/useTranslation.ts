import { useCallback } from "preact/hooks";
import i18n from "../i18n";

export function useTranslation() {
  return useCallback((key: string, options?: any): string => {
    const result = i18n.t(key, options);
    return typeof result === "string" ? result : String(result);
  }, []);
}
