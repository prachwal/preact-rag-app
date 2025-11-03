import { Card } from '../components/Card';
import { useState, useEffect } from 'preact/hooks';
import i18n from '../i18n';

export function CounterPage() {
  const [counter, setCounter] = useState(0);
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
      <Card title={t('counter.title')} level={2}>
        <div class="counter-container">
          <button
            onClick={() => setCounter(counter - 1)}
            aria-label={t('counter.decrement')}
            class="btn btn-icon"
          >
            -
          </button>
          <span class="counter-display">{counter}</span>
          <button
            onClick={() => setCounter(counter + 1)}
            aria-label={t('counter.increment')}
            class="btn btn-icon"
          >
            +
          </button>
        </div>
      </Card>
    </div>
  );
}
