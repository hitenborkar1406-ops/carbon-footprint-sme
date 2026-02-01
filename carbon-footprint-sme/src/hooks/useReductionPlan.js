import { useMemo } from 'react'
import { REDUCTION_ACTIONS } from '../data/emissionFactors'

// Prioritise by: kg saved per £ spent (or kg saved if cost 0), then by kg saved
function scoreAction(action, footprint) {
  const kg = action.kgSavedPerYear
  const cost = action.cost || 1
  const roi = cost > 0 ? kg / cost : kg * 100
  const relevance = footprint.emissions[action.category] > 0 ? 1.5 : 1
  return roi * relevance
}

export function useReductionPlan(footprint) {
  const plan = useMemo(() => {
    const scored = REDUCTION_ACTIONS.map((a) => ({
      ...a,
      score: scoreAction(a, footprint),
      roiYears: a.cost > 0 ? (a.cost / (a.kgSavedPerYear * 0.05)).toFixed(1) : 0, // rough: £/tCO2 ~50
    }))
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, 6)
  }, [footprint.emissions])

  return plan
}
