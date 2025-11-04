import { useLocation } from 'preact-iso';
import { Card } from '../components/Card';
import { useTranslation } from '../hooks/useTranslation';

export function SubDocPage() {
  const location = useLocation();
  const t = useTranslation();
  const subpage = location.path.split('/').pop();

  const renderContent = () => {
    switch (subpage) {
      case 'getting-started':
        return (
          <Card title={t('nav.gettingStarted')} level={3}>
            <div class="doc-content">
              <h4>{t('doc.gettingStarted.title')}</h4>
              <p>{t('doc.gettingStarted.description')}</p>
              <div class="doc-placeholder">
                <p>🚀 Getting started guide content would go here</p>
              </div>
            </div>
          </Card>
        );
      case 'api':
        return (
          <Card title={t('nav.apiReference')} level={3}>
            <div class="doc-content">
              <h4>{t('doc.api.title')}</h4>
              <p>{t('doc.api.description')}</p>
              <div class="doc-placeholder">
                <p>📖 API reference content would go here</p>
              </div>
            </div>
          </Card>
        );
      default:
        return (
          <Card title={t('doc.subpageNotFound')} level={3}>
            <p>{t('doc.unknownSubpage')}: {subpage}</p>
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