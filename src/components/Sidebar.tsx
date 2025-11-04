import { memo } from "preact/compat"
import { useState } from "preact/hooks"
import { useTranslation } from "../hooks/useTranslation"

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

const STORAGE_KEY_EXPANDED = "sidebar-expanded-items";

function getStoredExpanded(): Set<string> {
  try {
    const item = localStorage.getItem(STORAGE_KEY_EXPANDED);
    if (item) {
      const parsed = JSON.parse(item);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch (error) {
    console.warn("Failed to read expanded items from localStorage:", error);
  }
  return new Set();
}

function setStoredExpanded(expanded: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY_EXPANDED, JSON.stringify([...expanded]));
  } catch (error) {
    console.warn("Failed to write expanded items to localStorage:", error);
  }
}

const SubMenuPopover = memo(function SubMenuPopover({
  item,
  onClose,
  t,
  position
}: {
  item: NavItem;
  onClose: () => void;
  t: (key: string) => string;
  position: { top: number; left: number };
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        class="submenu-popover-backdrop"
        onClick={onClose}
      />
      <div
        class="submenu-popover"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`
        }}
      >
        <div class="submenu-popover-header">{t(item.labelKey)}</div>
        <ul class="submenu-popover-list">
          {item.children?.map((child) => (
            <li key={child.href}>
              <a
                href={child.href}
                class="submenu-popover-link"
                onClick={onClose}
              >
                <span class="sidebar-icon">{child.icon}</span>
                <span class="sidebar-label">{t(child.labelKey)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});

interface SidebarProps {
  isOpen: boolean
  isExpanded: boolean
  onClose: () => void
  onToggleExpanded: () => void
}

export const Sidebar = memo(function Sidebar({ isOpen, isExpanded, onClose, onToggleExpanded }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(getStoredExpanded())
  const [popoverItem, setPopoverItem] = useState<string | null>(null)
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | null>(null)
  const t = useTranslation()

  const toggleItem = (href: string, hasChildren: boolean, event?: Event) => {
    if (!isExpanded && hasChildren) {
      if (event?.currentTarget) {
        const target = event.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        setPopoverPosition({
          top: rect.top + window.scrollY, // Uwzględnij scroll
          left: rect.right + 12 // 12px odstęp
        });
      }
      setPopoverItem(popoverItem === href ? null : href);
      return;
    }

    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(href)) {
      newExpanded.delete(href)
    } else {
      newExpanded.add(href)
    }
    setExpandedItems(newExpanded)
    setStoredExpanded(newExpanded)
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
            <li key={item.href} class={`sidebar-item ${item.children ? 'sidebar-item-with-children' : ''}`}>
              <div class="sidebar-item-wrapper">
                <a
                  href={item.href}
                  class="sidebar-link"
                  onClick={(e) => {
                    if (item.children && !isExpanded) {
                      e.preventDefault();
                      toggleItem(item.href, true, e);
                    } else {
                      onClose();
                    }
                  }}
                  title={!isExpanded ? t(item.labelKey) : undefined}
                >
                  <span class="sidebar-icon">{item.icon}</span>
                  {isExpanded && <span class="sidebar-label">{t(item.labelKey)}</span>}
                </a>

                {/* Popover dla collapsed mode */}
                {!isExpanded && popoverItem === item.href && item.children && popoverPosition && (
                  <SubMenuPopover
                    item={item}
                    onClose={() => setPopoverItem(null)}
                    t={t}
                    position={popoverPosition}
                  />
                )}
                {item.children && isExpanded && (
                  <button
                    class="sidebar-expand-btn"
                    onClick={() => toggleItem(item.href, !!item.children)}
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
                        title={!isExpanded ? t(child.labelKey) : undefined}
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
