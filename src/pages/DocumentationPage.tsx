import { Card } from '../components/Card';
import { useTranslation } from '../hooks/useTranslation';

export function DocumentationPage() {
  const t = useTranslation();

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
      <Card title="Lorem Ipsum" level={2}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </Card>
    </div>
  );
}
