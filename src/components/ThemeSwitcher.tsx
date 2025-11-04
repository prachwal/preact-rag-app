import { memo } from "preact/compat"
import { useState, useRef, useEffect } from "preact/hooks"
import { useStore } from "../store"

type Mode = "dark" | "light" | "auto"
type Variant = "standard" | "sepia" | "forest" | "ocean"

const MODES: { value: Mode; label: string; icon: string }[] = [
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'auto', label: 'Auto', icon: '🔄' },
]

const VARIANTS: { value: Variant; label: string; icon: string }[] = [
  { value: 'standard', label: 'Standard', icon: '🎨' },
  { value: 'sepia', label: 'Sepia', icon: '📜' },
  { value: 'forest', label: 'Forest', icon: '🌲' },
  { value: 'ocean', label: 'Ocean', icon: '🌊' },
]

export const ThemeSwitcher = memo(function ThemeSwitcher() {
  const { currentMode, currentVariant, setMode, setVariant } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'mode' | 'variant'>('mode')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen])

  const currentModeObj = MODES.find(m => m.value === currentMode.value) || MODES[0]

  return (
    <div class="theme-switcher" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        class="theme-switcher-button"
        aria-label="Change theme"
        aria-expanded={isOpen}
      >
        <span class="theme-icon">{currentModeObj.icon}</span>
        <span class="theme-label">{currentModeObj.label}</span>
        <span class={`theme-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div class="theme-dropdown">
          <div class="theme-tabs">
            <button
              class={`theme-tab ${activeTab === 'mode' ? 'active' : ''}`}
              onClick={() => setActiveTab('mode')}
            >
              Mode
            </button>
            <button
              class={`theme-tab ${activeTab === 'variant' ? 'active' : ''}`}
              onClick={() => setActiveTab('variant')}
            >
              Variant
            </button>
          </div>

          {activeTab === 'mode' && (
            <div class="theme-options">
              {MODES.map(mode => (
                <button
                  key={mode.value}
                  class={`theme-option ${currentMode.value === mode.value ? 'active' : ''}`}
                  onClick={() => {
                    setMode(mode.value)
                    setIsOpen(false)
                  }}
                  aria-label={`Select ${mode.label} mode`}
                >
                  <span class="theme-option-icon">{mode.icon}</span>
                  <span class="theme-option-label">{mode.label}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'variant' && (
            <div class="theme-options">
              {VARIANTS.map(variant => (
                <button
                  key={variant.value}
                  class={`theme-option ${currentVariant.value === variant.value ? 'active' : ''}`}
                  onClick={() => {
                    setVariant(variant.value)
                    setIsOpen(false)
                  }}
                  aria-label={`Select ${variant.label} variant`}
                >
                  <span class="theme-option-icon">{variant.icon}</span>
                  <span class="theme-option-label">{variant.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
})
