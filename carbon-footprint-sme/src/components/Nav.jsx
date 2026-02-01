import { motion } from 'framer-motion'

const TABS = [
  { id: 'input', label: 'Input', short: 'In' },
  { id: 'report', label: 'Report', short: 'Rp' },
  { id: 'roadmap', label: 'Roadmap', short: 'Rd' },
  { id: 'tracking', label: 'Track', short: 'Tr' },
]

export default function Nav({ view, setView }) {
  return (
    <nav className="sticky top-0 z-[100] bg-deep/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1200px] mx-auto py-3 px-6 flex items-center justify-between gap-4">
        <motion.a
          href="#"
          className="flex items-baseline gap-1.5 no-underline font-extrabold text-lg tracking-wide text-[#e8ecf4]"
          onClick={(e) => { e.preventDefault(); setView('input') }}
        >
          <span className="gradient-text">CARBON</span>
          <span className="text-cyan font-bold">PULSE</span>
        </motion.a>
        <ul className="list-none flex gap-1">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <motion.button
                type="button"
                className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                  view === tab.id
                    ? 'text-lime bg-[var(--color-glow-lime)] border-lime/40'
                    : 'text-muted bg-transparent border-transparent hover:text-[#e8ecf4] hover:bg-elevated'
                }`}
                onClick={() => setView(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </motion.button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
