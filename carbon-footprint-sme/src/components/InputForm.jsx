import { motion } from 'framer-motion'

const ELECTRICITY_FIELDS = [
  { key: 'electricityKwh', label: 'Electricity (kWh/year)', placeholder: 'e.g. 24000' },
  { key: 'gasKwh', label: 'Natural gas (kWh/year)', placeholder: 'e.g. 15000' },
]

const TRAVEL_FIELDS = [
  { key: 'carKm', label: 'Car (km/year)', placeholder: 'e.g. 12000', selectKey: 'carType', selectOptions: [
    { value: 'carPetrol', label: 'Petrol' },
    { value: 'carDiesel', label: 'Diesel' },
    { value: 'carElectric', label: 'Electric' },
  ]},
  { key: 'vanKm', label: 'Van (km/year)', placeholder: 'e.g. 8000' },
  { key: 'flightKm', label: 'Flights (km/year)', placeholder: 'e.g. 5000', selectKey: 'flightType', selectOptions: [
    { value: 'flightShort', label: 'Short haul' },
    { value: 'flightLong', label: 'Long haul' },
  ]},
  { key: 'trainKm', label: 'Train (km/year)', placeholder: 'e.g. 2000' },
]

const LOGISTICS_FIELDS = [
  { key: 'freightTonneKm', label: 'Freight (tonne-km/year)', placeholder: 'e.g. 50000', selectKey: 'freightMode', selectOptions: [
    { value: 'freightRoad', label: 'Road' },
    { value: 'freightSea', label: 'Sea' },
    { value: 'freightAir', label: 'Air' },
  ]},
]

function Section({ title, icon, children }) {
  return (
    <motion.section
      className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b from-lime to-cyan before:rounded-l"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#e8ecf4]">
        <span className="text-xl">{icon}</span>
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </motion.section>
  )
}

function Field({ footprint, field, index }) {
  const { inputs, updateInput } = footprint
  const hasSelect = field.selectKey && field.selectOptions
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <label className="text-xs font-semibold text-muted uppercase tracking-wider">{field.label}</label>
      <div className="flex gap-3 items-center">
        {hasSelect && (
          <select
            className="shrink-0 min-w-[120px] py-2.5 px-3 bg-elevated border border-border rounded-xl text-[#e8ecf4] text-[0.9rem]"
            value={inputs[field.selectKey]}
            onChange={(e) => updateInput(field.selectKey, e.target.value)}
          >
            {field.selectOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        )}
        <input
          type="number"
          className="flex-1 min-w-0 py-3 px-4 bg-elevated border border-border rounded-xl text-[#e8ecf4] text-base placeholder:text-muted/70 focus:outline-none focus:border-cyan focus:ring-[3px] focus:ring-glow-cyan"
          placeholder={field.placeholder}
          value={inputs[field.key] || ''}
          onChange={(e) => updateInput(field.key, e.target.value)}
          min="0"
          step="100"
        />
      </div>
    </motion.div>
  )
}

export default function InputForm({ footprint, onDone }) {
  return (
    <div className="flex flex-col gap-8">
      <Section title="Electricity & gas" icon="⚡">
        {ELECTRICITY_FIELDS.map((f, i) => (
          <Field key={f.key} footprint={footprint} field={f} index={i} />
        ))}
      </Section>
      <Section title="Travel" icon="🚗">
        {TRAVEL_FIELDS.map((f, i) => (
          <Field key={f.key} footprint={footprint} field={f} index={i + 2} />
        ))}
      </Section>
      <Section title="Logistics" icon="📦">
        {LOGISTICS_FIELDS.map((f, i) => (
          <Field key={f.key} footprint={footprint} field={f} index={i + 6} />
        ))}
      </Section>
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          type="button"
          className="py-3.5 px-7 rounded-xl text-base font-bold border-none bg-gradient-to-br from-lime to-[#9ae62e] text-deep shadow-[0_4px_20px_var(--color-glow-lime)] hover:shadow-[0_6px_28px_var(--color-glow-lime)] transition-shadow"
          onClick={onDone}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Generate footprint report
        </motion.button>
      </motion.div>
    </div>
  )
}
