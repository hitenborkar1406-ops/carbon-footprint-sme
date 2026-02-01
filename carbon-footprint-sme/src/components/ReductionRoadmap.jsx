import { motion } from 'framer-motion'

const DIFFICULTY = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
const DIFF_COLOR = { easy: 'var(--color-lime)', medium: 'var(--color-amber)', hard: 'var(--color-coral)' }

export default function ReductionRoadmap({ plan, footprint, onTrack }) {
  const totalSavings = plan.reduce((s, a) => s + a.kgSavedPerYear, 0)
  const newTotal = Math.max(0, footprint.totalAnnual - totalSavings)

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="bg-card border border-border rounded-2xl py-5 px-6 flex flex-col gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center text-[0.95rem] text-muted">
          <span>Current footprint</span>
          <span className="font-mono">{footprint.totalAnnual.toLocaleString()} kg CO₂e/year</span>
        </div>
        <div className="flex justify-between items-center text-[0.95rem] text-[#e8ecf4] font-semibold">
          <span>If all actions taken</span>
          <span className="font-mono">{newTotal.toLocaleString()} kg CO₂e/year</span>
        </div>
        <div className="flex justify-between items-center text-[0.95rem] text-cyan font-bold">
          <span>Potential reduction</span>
          <span className="font-mono">−{totalSavings.toLocaleString()} kg CO₂e/year</span>
        </div>
      </motion.div>

      <h3 className="text-lg font-bold text-[#e8ecf4]">Prioritised actions (with ROI)</h3>
      <ul className="list-none flex flex-col gap-4">
        {plan.map((action, i) => (
          <motion.li
            key={action.id}
            className="bg-card border border-border rounded-2xl py-5 px-6 relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-cyan before:to-lime before:rounded-l before:opacity-80"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="shrink-0 w-7 h-7 flex items-center justify-center bg-glow-cyan/80 text-cyan rounded-lg text-sm font-bold">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold text-[#e8ecf4] mb-1">{action.title}</h4>
                <p className="text-sm text-muted leading-snug">{action.description}</p>
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wider shrink-0"
                style={{ color: DIFF_COLOR[action.difficulty] }}
              >
                {DIFFICULTY[action.difficulty]}
              </span>
            </div>
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">Saves</span>
                <span className="font-mono text-[0.95rem] text-lime">{action.kgSavedPerYear.toLocaleString()} kg/year</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">Cost</span>
                <span className="font-mono text-[0.95rem] text-lime">
                  {action.cost > 0 ? `£${action.cost.toLocaleString()}` : '£0'}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">Payback</span>
                <span className="font-mono text-[0.95rem] text-lime">
                  {action.paybackMonths > 0 ? `${action.paybackMonths} mo` : 'Immediate'}
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          type="button"
          className="py-3.5 px-7 rounded-xl text-base font-bold border-none bg-gradient-to-br from-lime to-[#9ae62e] text-deep shadow-[0_4px_20px_var(--color-glow-lime)] hover:shadow-[0_0_30px_var(--color-glow-cyan)] transition-shadow"
          onClick={onTrack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start tracking progress
        </motion.button>
      </motion.div>
    </div>
  )
}
