import { useState, useMemo } from 'react'
import { EMISSION_FACTORS } from '../data/emissionFactors'

const defaultInputs = {
  electricityKwh: 0,
  gasKwh: 0,
  carKm: 0,
  carType: 'carPetrol',
  vanKm: 0,
  flightKm: 0,
  flightType: 'flightShort',
  trainKm: 0,
  freightTonneKm: 0,
  freightMode: 'freightRoad',
}

function computeEmissions(inputs) {
  const e = EMISSION_FACTORS
  const electricity = (inputs.electricityKwh || 0) * e.electricity.kgPerKwh
  const gas = (inputs.gasKwh || 0) * e.gas.kgPerKwh
  const car = (inputs.carKm || 0) * (e[inputs.carType]?.kgPerKm ?? 0)
  const van = (inputs.vanKm || 0) * e.van.kgPerKm
  const flight = (inputs.flightKm || 0) * (e[inputs.flightType]?.kgPerKm ?? 0)
  const train = (inputs.trainKm || 0) * e.train.kgPerKm
  const freight = (inputs.freightTonneKm || 0) * (e[inputs.freightMode]?.kgPerTonneKm ?? 0)

  return {
    electricity: Math.round(electricity),
    gas: Math.round(gas),
    travel: Math.round(car + van + flight + train),
    logistics: Math.round(freight),
    total: Math.round(electricity + gas + car + van + flight + train + freight),
  }
}

export function useFootprint() {
  const [inputs, setInputs] = useState(defaultInputs)

  const emissions = useMemo(() => computeEmissions(inputs), [inputs])
  const totalAnnual = emissions.total

  const numericKeys = new Set([
    'electricityKwh', 'gasKwh', 'carKm', 'vanKm', 'flightKm', 'trainKm', 'freightTonneKm',
  ])
  const updateInput = (key, value) => {
    const next = numericKeys.has(key) ? (Number(value) || 0) : value
    setInputs((prev) => ({ ...prev, [key]: next }))
  }

  const reset = () => setInputs(defaultInputs)

  /** Load inputs from saved report (e.g. from backend). */
  const loadReport = (savedInputs) => {
    if (savedInputs && typeof savedInputs === 'object') {
      setInputs((prev) => ({ ...defaultInputs, ...savedInputs }))
    }
  }

  return {
    inputs,
    updateInput,
    emissions,
    totalAnnual,
    reset,
    loadReport,
  }
}
