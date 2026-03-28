import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { categoryLabels, categoryColors, tools, type ToolCategory } from '@/data/tools'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Focus trap and Escape key handling
  useEffect(() => {
    if (!isOpen) return

    // Focus the close button when drawer opens
    const drawer = drawerRef.current
    if (drawer) {
      const closeBtn = drawer.querySelector<HTMLElement>('[aria-label="Close menu"]')
      closeBtn?.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        triggerRef.current?.focus()
        return
      }

      if (e.key !== 'Tab' || !drawer) return

      const focusableElements = drawer.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length === 0) return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = document.getElementById('tool-search') as HTMLInputElement
    if (searchInput) {
      searchInput.value = e.target.value
      searchInput.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  const categories = Object.entries(categoryLabels) as [ToolCategory, string][]

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => { close(); triggerRef.current?.focus() }}
          />
          <div
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-[280px] bg-[var(--color-surface-alt)] border-l border-[var(--color-border)] z-50 overflow-y-auto animate-[slideIn_200ms_ease-out]"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="p-4">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => { close(); triggerRef.current?.focus() }}
                  className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" />
                  <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search tools..."
                    aria-label="Search tools"
                    className="w-full pl-8 pr-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Categories</div>
                <ul className="space-y-1">
                  {categories.map(([category, label]) => {
                    const count = tools.filter(t => t.category === category).length
                    return (
                      <li key={category}>
                        <a
                          href={`/#${category}`}
                          onClick={close}
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                        >
                          <span
                            className="w-2 h-2 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: categoryColors[category] }}
                          />
                          <span className="flex-1 font-medium">{label}</span>
                          <span className="text-xs text-[var(--color-text-subtle)]">{count}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="border-t border-[var(--color-border-subtle)] pt-4">
                <ul className="space-y-1">
                  <li><a href="/impressum" onClick={close} className="block px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Impressum</a></li>
                  <li><a href="/datenschutz" onClick={close} className="block px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
