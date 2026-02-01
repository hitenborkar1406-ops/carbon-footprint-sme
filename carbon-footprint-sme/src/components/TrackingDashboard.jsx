import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TrackingDashboard({ plan, footprint, completedActions = [], setCompletedActions }) {
  const isControlled = setCompletedActions != null
  const [localSelected, setLocalSelected] = useState({})

  const selected = useMemo(() => {
    if (isControlled) return completedActions.reduce((o, id) => ({ ...o, [id]: true }), {})
    return localSelected
  }, [isControlled, completedActions, localSelected])

  useEffect(() => {
    if (isControlled) return
    setLocalSelected(completedActions.reduce((o, id) => ({ ...o, [id]: true }), {}))
  }, []) // sync initial from props once when uncontrolled

  const toggle = (id) => {
    if (isControlled) {
      setCompletedActions((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      )
    } else {
      setLocalSelected((s) => ({ ...s, [id]: !s[id] }))
    }
  }

  const completed = Object.values(selected).filter(Boolean).length
  const totalActions = plan.length
  const kgSavedSoFar = plan.filter((a) => selected[a.id]).reduce((s, a) => s + a.kgSavedPerYear, 0)
  const projectedTotal = Math.max(0, footprint.totalAnnual - kgSavedSoFar)

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="grid grid-cols-3 gap-4 p-6 bg-card border border-border rounded-[20px] max-[600px]:grid-cols-1"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center py-2">
          <span className="font-mono block text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold leading-tight text-lime">{completed}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">actions completed</span>
        </div>
        <div className="text-center py-2">
          <span className="font-mono block text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold leading-tight text-cyan drop-shadow-[0_0_30px_var(--color-glow-cyan)]">{kgSavedSoFar.toLocaleString()}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">kg CO₂e saved/year</span>
        </div>
        <div className="text-center py-2">
          <span className="font-mono block text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold leading-tight text-lime">{projectedTotal.toLocaleString()}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">projected footprint</span>
        </div>
      </motion.div>

      <h3 className="text-lg font-bold text-[#e8ecf4]">Mark actions as done</h3>
      <p className="text-sm text-muted -mt-2">Tick when you've implemented an action. Your projected footprint updates in real time.</p>

      <ul className="list-none flex flex-col gap-3">
        {plan.map((action, i) => (
          <motion.li
            key={action.id}
            className={`flex items-center gap-4 py-4 px-5 bg-card border rounded-xl transition-colors ${
              selected[action.id] ? 'border-cyan/40 bg-cyan/10' : 'border-border'
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <button
              type="button"
              className={`shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors ${
                selected[action.id]
                  ? 'border-cyan bg-cyan'
                  : 'border-border bg-transparent hover:border-cyan'
              }`}
              onClick={() => toggle(action.id)}
              aria-pressed={selected[action.id]}
            >
              {selected[action.id] ? (
                <motion.span
                  className="text-deep text-sm font-extrabold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  ✓
                </motion.span>
              ) : (
                <span className="w-3 h-3 rounded-sm bg-transparent" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-[#e8ecf4] mb-0.5">{action.title}</h4>
              <p className="font-mono text-sm text-muted">
                Saves {action.kgSavedPerYear.toLocaleString()} kg CO₂e/year
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between text-sm font-semibold text-muted mb-2">
          <span>Roadmap progress</span>
          <span className="font-mono">{Math.round((completed / totalActions) * 100)}%</span>
        </div>
        <div className="h-2.5 bg-elevated rounded-[5px] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan to-lime rounded-[5px]"
            initial={{ width: 0 }}
            animate={{ width: `${(completed / totalActions) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>
    </div>
  )
}
