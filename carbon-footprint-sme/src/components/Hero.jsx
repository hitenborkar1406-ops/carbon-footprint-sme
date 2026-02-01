import { motion } from 'framer-motion'

export default function Hero({ view, totalAnnual }) {
  return (
    <header className="py-8 pb-6 md:py-12 md:pb-8">
      <motion.div
        className="max-w-[800px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold leading-tight tracking-tight uppercase tracking-wide mb-2 text-[#e8ecf4]">
          {view === 'input' && (
            <>
              Estimate your <span className="gradient-text">carbon footprint</span>
            </>
          )}
          {view === 'report' && (
            <>
              Your footprint: <span className="font-mono text-[clamp(2rem,6vw,3.5rem)] text-lime drop-shadow-[0_0_40px_var(--color-glow-lime)]">{totalAnnual.toLocaleString()}</span> kg CO₂e/year
            </>
          )}
          {view === 'roadmap' && (
            <>
              Your <span className="gradient-text">reduction roadmap</span>
            </>
          )}
          {view === 'tracking' && (
            <>
              <span className="gradient-text">Track</span> progress
            </>
          )}
        </h1>
        <p className="text-base text-muted leading-relaxed max-w-[560px]">
          {view === 'input' && 'Enter your SME operations below. We will convert them into emissions and suggest actions with ROI.'}
          {view === 'report' && 'Breakdown by electricity, travel, and logistics. Use the roadmap for actionable steps.'}
          {view === 'roadmap' && 'Prioritised actions with estimated savings and payback. Start tracking to see impact.'}
          {view === 'tracking' && 'Monitor your reduction actions and projected savings over time.'}
        </p>
      </motion.div>
    </header>
  )
}
