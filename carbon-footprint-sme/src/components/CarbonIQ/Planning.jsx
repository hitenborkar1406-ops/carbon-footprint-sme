import { motion } from 'framer-motion';

const PHASES = [
  {
    phase: 1,
    badge: 'Phase 1',
    title: 'Quick Wins',
    subtitle: 'Start your sustainability journey',
    badgeColor: '#2ed573',
    gradient: 'linear-gradient(135deg, rgba(46, 213, 115, 0.1), rgba(38, 222, 129, 0.05))',
    cards: [
      { icon: 'ri-computer-line', title: 'Digital Hygiene', desc: 'Enforce "Sleep Mode" policies.', impact: 'low' },
      { icon: 'ri-recycle-line', title: 'Waste Audit', desc: 'Remove single-use plastics.', impact: 'med' },
    ],
  },
  {
    phase: 2,
    badge: 'Phase 2',
    title: 'Process',
    subtitle: 'Optimize your operations',
    badgeColor: '#1e90ff',
    gradient: 'linear-gradient(135deg, rgba(30, 144, 255, 0.1), rgba(0, 210, 255, 0.05))',
    cards: [
      { icon: 'ri-shopping-bag-3-line', title: 'Green Procurement', desc: 'Switch 30% supply chain.', impact: 'med' },
      { icon: 'ri-timer-flash-line', title: 'Shift Scheduling', desc: 'Optimize work weeks.', impact: 'high' },
    ],
  },
  {
    phase: 3,
    badge: 'Phase 3',
    title: 'Transform',
    subtitle: 'Make lasting impact',
    badgeColor: '#a55eea',
    gradient: 'linear-gradient(135deg, rgba(165, 94, 234, 0.1), rgba(253, 121, 168, 0.05))',
    cards: [
      { icon: 'ri-sun-foggy-line', title: 'Solar Install', desc: 'On-site energy generation.', impact: 'high' },
      { icon: 'ri-truck-line', title: 'EV Fleet', desc: 'Replace ICE logistics.', impact: 'max' },
    ],
  },
];

// Animation variants
const phaseBoxVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
};

export default function Planning() {
  return (
    <section id="planning" className="section-padding py-[120px] relative overflow-hidden">
      <div className="container max-w-[1000px] w-[90%] mx-auto">
        {/* Section Header */}
        <div className="section-header mb-16 text-center">
          <h2 className="text-3xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Practical Planning
          </h2>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Your sustainability journey, step by step
          </p>
        </div>

        {/* All 3 Phases as Separate Boxes */}
        <div className="phases-container space-y-12">
          {PHASES.map((phaseData) => (
            <motion.div
              key={phaseData.phase}
              className="phase-box"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={phaseBoxVariants}
              style={{
                background: phaseData.gradient,
                borderRadius: '24px',
                padding: '48px 32px',
                border: `2px solid ${phaseData.badgeColor}30`,
                boxShadow: `0 8px 32px ${phaseData.badgeColor}15`,
              }}
            >
              {/* Phase Header */}
              <div className="phase-header mb-8 text-center">
                <motion.span
                  className="inline-block px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3"
                  style={{
                    background: phaseData.badgeColor,
                    color: '#ffffff',
                  }}
                  variants={cardVariants}
                >
                  {phaseData.badge}
                </motion.span>
                <motion.h3
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--color-text-main)' }}
                  variants={cardVariants}
                >
                  {phaseData.title}
                </motion.h3>
                <motion.p
                  className="text-base"
                  style={{ color: 'var(--color-text-muted)' }}
                  variants={cardVariants}
                >
                  {phaseData.subtitle}
                </motion.p>
              </div>

              {/* Phase Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {phaseData.cards.map((card) => (
                  <motion.div
                    key={card.title}
                    className="plan-card p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{
                      background: 'var(--color-bg-panel)',
                      borderColor: phaseData.badgeColor + '40',
                      color: 'var(--color-text-main)',
                    }}
                    variants={cardVariants}
                  >
                    <div className="flex gap-4 items-start">
                      <div
                        className="p-icon w-12 h-12 grid place-items-center rounded-lg text-xl shrink-0"
                        style={{
                          background: `${phaseData.badgeColor}20`,
                          color: phaseData.badgeColor,
                        }}
                      >
                        <i className={card.icon} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold mb-2">{card.title}</h4>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                          {card.desc}
                        </p>

                        {/* Impact Meter */}
                        <div className="flex items-center gap-3">
                          <div
                            className="flex-1 h-2 rounded-full overflow-hidden"
                            style={{ background: 'var(--color-bg-input)' }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: card.impact === 'low' ? '30%' : card.impact === 'med' ? '60%' : card.impact === 'high' ? '85%' : '100%',
                                background: card.impact === 'low' ? '#2ed573' : card.impact === 'med' ? '#1e90ff' : card.impact === 'high' ? '#a55eea' : '#fc5c65',
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold uppercase" style={{ color: 'var(--color-text-muted)' }}>
                            {card.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Connector Arrow - Only show if not last phase */}
              {phaseData.phase < 3 && (
                <motion.div
                  className="flex justify-center mt-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-0.5 h-12"
                      style={{ background: `linear-gradient(180deg, ${phaseData.badgeColor}, ${PHASES[phaseData.phase].badgeColor})` }}
                    />
                    <div
                      className="w-10 h-10 rounded-full grid place-items-center"
                      style={{ background: PHASES[phaseData.phase].badgeColor, color: '#fff' }}
                    >
                      <i className="ri-arrow-down-line text-xl" />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Completion Message */}
        <motion.div
          className="mt-12 text-center p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(46, 213, 115, 0.1), rgba(165, 94, 234, 0.1))',
            border: '2px solid var(--color-primary)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <i className="ri-checkbox-circle-line text-5xl mb-3" style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-main)' }}>
            🎉 Your Sustainability Roadmap
          </h3>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Follow these three phases to transform your business into a sustainable operation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
