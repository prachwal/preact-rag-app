import { Card } from '../components/Card';
import { useState, useEffect } from 'preact/hooks';
import i18n from '../i18n';

export function DocumentationPage() {
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
      <Card title={t('documentation.title')} level={2}>
        <p class="highlight-box">
          {t('documentation.clickLogos')}
        </p>
        <ul class="feature-list">
          <li>{t('documentation.features.hmr')}</li>
          <li>{t('documentation.features.themes')}</li>
          <li>{t('documentation.features.responsive')}</li>
          <li>{t('documentation.features.wcag')}</li>
        </ul>
      </Card>
    </div>
  );
}
