import { memo } from "preact/compat"
import { useState } from "preact/hooks"

interface NavItem {
  href: string
  label: string
  icon: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    href: "#settings",
    label: "Settings",
    icon: "⚙️",
    children: [
      { href: "#settings-theme", label: "Theme", icon: "🎨" },
      { href: "#settings-preferences", label: "Preferences", icon: "📋" }
    ]
  },
  { href: "#counter", label: "Counter", icon: "🔢" },
  {
    href: "#documentation",
    label: "Documentation",
    icon: "📚",
    children: [
      { href: "#docs-getting-started", label: "Getting Started", icon: "🚀" },
      { href: "#docs-api", label: "API Reference", icon: "📖" }
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
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <span class={`toggle-icon ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded ? '◀' : '▶'}
          </span>
        </button>
        {isExpanded && <h2 class="sidebar-title">Navigation</h2>}
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
                  title={!isExpanded ? item.label : undefined}
                >
                  <span class="sidebar-icon">{item.icon}</span>
                  {isExpanded && <span class="sidebar-label">{item.label}</span>}
                </a>
                {item.children && isExpanded && (
                  <button
                    class="sidebar-expand-btn"
                    onClick={() => toggleItem(item.href)}
                    aria-label={`Toggle ${item.label} submenu`}
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
                        <span class="sidebar-label">{child.label}</span>
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
            Modern Preact application with theming support
          </p>
        </div>
      )}
    </aside>
  )
})
