import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { categoryLabels, categoryColors, tools, type ToolCategory } from '@/data/tools'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const categories = Object.entries(categoryLabels) as [ToolCategory, string][]

  return (
    <>
      <button
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
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-[280px] bg-[var(--color-surface-alt)] border-l border-[var(--color-border)] z-50 overflow-y-auto"
               style={{ animation: 'slideIn 200ms ease-out' }}>
            <div className="p-4">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
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
                          onClick={() => setIsOpen(false)}
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
                  <li><a href="/impressum" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Impressum</a></li>
                  <li><a href="/datenschutz" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </>
      )}
    </>
  )
}
