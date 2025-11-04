import { memo } from "preact/compat"
import { useTranslation } from "../hooks/useTranslation"

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslation()

  return (
    <footer class="app-footer">
      <div class="footer-content">
        <p class="footer-text">
          {t('footer.builtWith')} <span class="footer-highlight">Vite</span> {t('footer.and')} <span class="footer-highlight">Preact</span>
        </p>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a
            href="https://github.com/vitejs/vite"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            {t('footer.github')}
          </a>
          <span class="footer-separator">•</span>
          <a
            href="https://preactjs.com"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            {t('footer.docs')}
          </a>
        </nav>
        <p class="footer-copyright">{t('footer.copyright', { year: currentYear })}</p>
      </div>
    </footer>
  )
})
