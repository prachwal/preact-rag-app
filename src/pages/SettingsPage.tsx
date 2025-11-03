import { Card } from '../components/Card';
import { useStore } from '../store';
import i18n from '../i18n';
import { useState, useEffect } from 'preact/hooks';

export function SettingsPage() {
  const { currentMode, currentVariant, nextMode, nextVariant } = useStore();
  const [t, setT] = useState(() => i18n.t.bind(i18n));

  useEffect(() => {
    const handleLanguageChange = () => {
      setT(() => i18n.t.bind(i18n));
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <div class="content-grid">
      <Card title={t('settings.title')} level={2}>
        <div class="settings-info">
          <p><strong>{t('settings.currentMode')}:</strong> {currentMode.value}</p>
          <p><strong>{t('settings.currentVariant')}:</strong> {currentVariant.value}</p>
        </div>
        <div class="button-group">
          <button
            onClick={nextMode}
            aria-label={`Switch to next mode, current is ${currentMode.value}`}
            class="btn btn-primary"
          >
            {t('settings.modeButton')}: {currentMode.value}
          </button>
          <button
            onClick={nextVariant}
            aria-label={`Switch to next variant, current is ${currentVariant.value}`}
            class="btn btn-secondary"
          >
            {t('settings.variantButton')}: {currentVariant.value}
          </button>
        </div>
      </Card>
    </div>
  );
}
