import { useLocation } from 'preact-iso';
import { Card } from '../components/Card';
import { useTranslation } from '../hooks/useTranslation';

export function SubSettingsPage() {
  const location = useLocation();
  const t = useTranslation();
  const subpage = location.path.split('/').pop();

  const renderContent = () => {
    switch (subpage) {
      case 'theme':
        return (
          <Card title={t('nav.theme')} level={3}>
            <p>{t('settings.theme.description')}</p>
            <div class="settings-placeholder">
              <p>🎨 Theme settings would go here</p>
            </div>
          </Card>
        );
      case 'preferences':
        return (
          <Card title={t('nav.preferences')} level={3}>
            <p>{t('settings.preferences.description')}</p>
            <div class="settings-placeholder">
              <p>📋 Preferences settings would go here</p>
            </div>
          </Card>
        );
      default:
        return (
          <Card title={t('settings.subpageNotFound')} level={3}>
            <p>{t('settings.unknownSubpage')}: {subpage}</p>
          </Card>
        );
    }
  };

  return (
    <div class="content-grid">
      {renderContent()}
    </div>
  );
}