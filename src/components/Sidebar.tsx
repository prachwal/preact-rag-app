import { memo } from "preact/compat"
import { useState, useEffect } from "preact/hooks"
import i18n from "../i18n"

interface NavItem {
  href: string
  label: string
  labelKey: string
  icon: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    href: "/settings",
    label: "Settings",
    labelKey: "nav.settings",
    icon: "⚙️",
    children: [
      { href: "/settings/theme", label: "Theme", labelKey: "nav.theme", icon: "🎨" },
      { href: "/settings/preferences", label: "Preferences", labelKey: "nav.preferences", icon: "📋" }
    ]
  },
  { href: "/counter", label: "Counter", labelKey: "nav.counter", icon: "🔢" },
  {
    href: "/documentation",
    label: "Documentation",
    labelKey: "nav.documentation",
    icon: "📚",
    children: [
      { href: "/documentation/getting-started", label: "Getting Started", labelKey: "nav.gettingStarted", icon: "🚀" },
      { href: "/documentation/api", label: "API Reference", labelKey: "nav.apiReference", icon: "📖" }
    ]
  },
]

interface SidebarProps {
  isOpen: boolean
  isExpanded: boolean
  onClose: () => void
  onToggleExpanded: () => void
}

export const Sidebar = memo(function Sidebar({ isOpen, isExpanded, onClose, onToggleExpanded }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [t, setT] = useState(() => i18n.t.bind(i18n))

  useEffect(() => {
    const handleLanguageChange = () => {
      setT(() => i18n.t.bind(i18n))
    }
    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  const toggleItem = (href: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(href)) {
      newExpanded.delete(href)
    } else {
      newExpanded.add(href)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <aside
      class={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
      role="complementary"
      aria-label="Sidebar navigation"
    >
      <div class="sidebar-header">
        <button
          class="sidebar-toggle desktop-only"
          onClick={onToggleExpanded}
          aria-label={isExpanded ? t('sidebar.collapse') : t('sidebar.expand')}
          title={isExpanded ? t('sidebar.collapse') : t('sidebar.expand')}
        >
          <span class={`toggle-icon ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded ? '◀' : '▶'}
          </span>
        </button>
        {isExpanded && <h2 class="sidebar-title">{t('sidebar.navigation')}</h2>}
      </div>

      <nav class="sidebar-nav">
        <ul class="sidebar-list">
          {navigation.map((item) => (
            <li key={item.href} class="sidebar-item">
              <div class="sidebar-item-wrapper">
                <a
                  href={item.href}
                  class="sidebar-link"
                  onClick={onClose}
                  title={!isExpanded ? t(item.labelKey) : undefined}
                >
                  <span class="sidebar-icon">{item.icon}</span>
                  {isExpanded && <span class="sidebar-label">{t(item.labelKey)}</span>}
                </a>
                {item.children && isExpanded && (
                  <button
                    class="sidebar-expand-btn"
                    onClick={() => toggleItem(item.href)}
                    aria-label={`Toggle ${t(item.labelKey)} submenu`}
                    aria-expanded={expandedItems.has(item.href)}
                  >
                    <span class={`expand-icon ${expandedItems.has(item.href) ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </button>
                )}
              </div>
              {item.children && isExpanded && expandedItems.has(item.href) && (
                <ul class="sidebar-submenu">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <a
                        href={child.href}
                        class="sidebar-link sidebar-link-child"
                        onClick={onClose}
                      >
                        <span class="sidebar-icon">{child.icon}</span>
                        <span class="sidebar-label">{t(child.labelKey)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {isExpanded && (
        <div class="sidebar-footer">
          <p class="sidebar-info">
            {t('sidebar.info')}
          </p>
        </div>
      )}
    </aside>
  )
})
