// Emission factors (kg CO2e per unit) — based on UK DEFRA 2024 & EPA
export const EMISSION_FACTORS = {
  electricity: {
    kgPerKwh: 0.207, // UK grid average 2024
    unit: 'kWh',
    label: 'Electricity',
  },
  gas: {
    kgPerKwh: 0.21,
    unit: 'kWh',
    label: 'Natural Gas',
  },
  carPetrol: {
    kgPerKm: 0.171,
    unit: 'km',
    label: 'Car (Petrol)',
  },
  carDiesel: {
    kgPerKm: 0.171,
    unit: 'km',
    label: 'Car (Diesel)',
  },
  carElectric: {
    kgPerKm: 0.053, // grid-charged
    unit: 'km',
    label: 'Car (Electric)',
  },
  van: {
    kgPerKm: 0.296,
    unit: 'km',
    label: 'Van (Diesel)',
  },
  flightShort: {
    kgPerKm: 0.255,
    unit: 'km',
    label: 'Flight (Short haul)',
  },
  flightLong: {
    kgPerKm: 0.195,
    unit: 'km',
    label: 'Flight (Long haul)',
  },
  train: {
    kgPerKm: 0.041,
    unit: 'km',
    label: 'Train',
  },
  freightRoad: {
    kgPerTonneKm: 0.096,
    unit: 'tonne-km',
    label: 'Road Freight',
  },
  freightSea: {
    kgPerTonneKm: 0.011,
    unit: 'tonne-km',
    label: 'Sea Freight',
  },
  freightAir: {
    kgPerTonneKm: 0.602,
    unit: 'tonne-km',
    label: 'Air Freight',
  },
};

// Reduction actions with typical savings & ROI (simplified)
export const REDUCTION_ACTIONS = [
  {
    id: 'led',
    category: 'electricity',
    title: 'Switch to LED lighting',
    description: 'Replace all office lighting with LEDs.',
    kgSavedPerYear: 2000,
    cost: 800,
    paybackMonths: 8,
    difficulty: 'easy',
  },
  {
    id: 'solar',
    category: 'electricity',
    title: 'Solar panels (partial)',
    description: 'Install rooftop solar for 30% of consumption.',
    kgSavedPerYear: 15000,
    cost: 25000,
    paybackMonths: 84,
    difficulty: 'hard',
  },
  {
    id: 'thermostat',
    category: 'electricity',
    title: 'Smart thermostat',
    description: 'Optimise heating/cooling schedules.',
    kgSavedPerYear: 1200,
    cost: 200,
    paybackMonths: 4,
    difficulty: 'easy',
  },
  {
    id: 'ev',
    category: 'travel',
    title: 'Switch 1 vehicle to EV',
    description: 'Replace one petrol/diesel car with electric.',
    kgSavedPerYear: 3500,
    cost: 35000,
    paybackMonths: 120,
    difficulty: 'medium',
  },
  {
    id: 'remote',
    category: 'travel',
    title: 'Hybrid/remote work policy',
    description: '2 days WFH = fewer commutes.',
    kgSavedPerYear: 2500,
    cost: 0,
    paybackMonths: 0,
    difficulty: 'easy',
  },
  {
    id: 'train',
    category: 'travel',
    title: 'Prefer train over short flights',
    description: 'Replace flights < 500km with rail.',
    kgSavedPerYear: 4000,
    cost: 0,
    paybackMonths: 0,
    difficulty: 'easy',
  },
  {
    id: 'consolidate',
    category: 'logistics',
    title: 'Consolidate shipments',
    description: 'Fewer, fuller deliveries instead of many small ones.',
    kgSavedPerYear: 8000,
    cost: 0,
    paybackMonths: 0,
    difficulty: 'medium',
  },
  {
    id: 'sea-over-air',
    category: 'logistics',
    title: 'Sea freight over air where possible',
    description: 'Shift non-urgent cargo from air to sea.',
    kgSavedPerYear: 50000,
    cost: 0,
    paybackMonths: 0,
    difficulty: 'medium',
  },
];
