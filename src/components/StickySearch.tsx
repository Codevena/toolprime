import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

export function StickySearch() {
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const heroSearch = document.getElementById('hero-search')
    if (!heroSearch) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(heroSearch)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (visible && inputRef.current) {
      const toolSearch = document.getElementById('tool-search') as HTMLInputElement
      if (toolSearch) {
        inputRef.current.value = toolSearch.value
      }
    }
  }, [visible])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = document.getElementById('tool-search') as HTMLInputElement
    if (searchInput) {
      searchInput.value = e.target.value
      searchInput.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-30 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)] backdrop-blur-sm transition-all duration-150 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]" />
          <input
            ref={inputRef}
            type="search"
            onChange={handleInput}
            placeholder="Search tools..."
            aria-label="Search tools"
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
