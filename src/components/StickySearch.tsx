import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

export function StickySearch() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroSearch = document.getElementById('hero-search')
    if (!heroSearch) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(heroSearch)
    return () => observer.disconnect()
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = document.getElementById('tool-search') as HTMLInputElement
    if (searchInput) {
      searchInput.value = e.target.value
      searchInput.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-30 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)] backdrop-blur-sm"
         style={{ animation: 'fadeIn 150ms ease-out' }}>
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" />
          <input
            type="text"
            onChange={handleInput}
            placeholder="Search tools..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
          />
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
