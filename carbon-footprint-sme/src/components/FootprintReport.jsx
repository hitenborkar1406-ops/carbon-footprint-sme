import { motion } from 'framer-motion'

const BREAKDOWN = [
  { key: 'electricity', label: 'Electricity', color: 'var(--color-amber)' },
  { key: 'gas', label: 'Gas', color: 'var(--color-coral)' },
  { key: 'travel', label: 'Travel', color: 'var(--color-cyan)' },
  { key: 'logistics', label: 'Logistics', color: 'var(--color-lime)' },
]

export default function FootprintReport({ footprint, onSeeRoadmap }) {
  const { emissions, totalAnnual } = footprint
  const maxVal = Math.max(totalAnnual, 1)

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="bg-gradient-to-br from-card to-elevated border border-border rounded-3xl p-8 text-center relative overflow-hidden before:content-[''] before:absolute before:top-[-50%] before:left-[-50%] before:w-[200%] before:h-[200%] before:bg-[radial-gradient(circle_at_50%_50%,var(--color-glow-lime),transparent_50%)] before:opacity-15 before:pointer-events-none"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      >
        <div className="text-sm font-semibold uppercase tracking-widest text-muted mb-2">Total annual footprint</div>
        <div className="font-mono text-[clamp(2.5rem,8vw,4rem)] font-extrabold leading-tight text-lime drop-shadow-[0_0_60px_var(--color-glow-lime)]">
          {totalAnnual.toLocaleString()} <span className="text-[0.45em] font-semibold text-muted ml-0.5">kg CO₂e</span>
        </div>
        <div className="text-base text-muted mt-2">≈ {(totalAnnual / 1000).toFixed(1)} tonnes CO₂e / year</div>
      </motion.div>

      <motion.div
        className="bg-card border border-border rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-base font-bold mb-5 text-[#e8ecf4]">Breakdown by category</h3>
        <div className="flex flex-col gap-4">
          {BREAKDOWN.map((item, i) => {
            const val = emissions[item.key] || 0
            const pct = (val / maxVal) * 100
            return (
              <motion.div
                key={item.key}
                className="grid grid-cols-[100px_1fr_90px] items-center gap-4 max-[500px]:grid-cols-1 max-[500px]:gap-1.5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className="flex items-center gap-2 text-[0.9rem] font-semibold text-[#e8ecf4]">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </div>
                <div className="h-3 bg-elevated rounded-md overflow-hidden">
                  <motion.div
                    className="h-full rounded-md min-w-[4px]"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                  />
                </div>
                <div className="font-mono text-sm text-muted text-right max-[500px]:text-left max-[500px]:pl-5">{val.toLocaleString()} kg</div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          type="button"
          className="py-3.5 px-7 rounded-xl text-base font-bold border-none bg-gradient-to-br from-lime to-[#9ae62e] text-deep shadow-[0_4px_20px_var(--color-glow-lime)] hover:shadow-[0_0_30px_var(--color-glow-cyan)] transition-shadow"
          onClick={onSeeRoadmap}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get reduction roadmap with ROI
        </motion.button>
      </motion.div>
    </div>
  )
}
