import { Card } from '../components/Card';
import { useState } from 'preact/hooks';
import { useTranslation } from '../hooks/useTranslation';

export function CounterPage() {
  const [counter, setCounter] = useState(0);
  const t = useTranslation();

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
