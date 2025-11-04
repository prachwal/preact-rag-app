import { Card } from '../components/Card';
import { useStore } from '../store';
import { useTranslation } from '../hooks/useTranslation';

export function SettingsPage() {
  const { currentMode, currentVariant, nextMode, nextVariant } = useStore();
  const t = useTranslation();

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
