import { memo } from "preact/compat"

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer class="app-footer">
      <div class="footer-content">
        <p class="footer-text">
          Built with <span class="footer-highlight">Vite</span> and <span class="footer-highlight">Preact</span>
        </p>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a
            href="https://github.com/vitejs/vite"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            GitHub
          </a>
          <span class="footer-separator">•</span>
          <a
            href="https://preactjs.com"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            Preact Docs
          </a>
        </nav>
        <p class="footer-copyright">© {currentYear}</p>
      </div>
    </footer>
  )
})
