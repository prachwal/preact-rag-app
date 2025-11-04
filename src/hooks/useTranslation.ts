import { useState, useEffect } from "preact/hooks";
import i18n from "../i18n";

export function useTranslation() {
  const [t, setT] = useState(() => i18n.t.bind(i18n));

  useEffect(() => {
    const handleLanguageChange = () => {
      setT(() => i18n.t.bind(i18n));
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return t;
}
