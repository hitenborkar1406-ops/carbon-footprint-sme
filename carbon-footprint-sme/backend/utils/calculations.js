// Basic emission factors (can be refined)
const FACTORS = {
  electricity: 0.85, // kg CO2 per kWh
  travel: 0.21,      // kg CO2 per km (average vehicle)
  logistics: 0.5     // kg CO2 per kg goods
};

export const calculateFootprint = (data) => {
  const electricityCO2 = data.electricityKWh * FACTORS.electricity;
  const travelCO2 = data.travelKm * FACTORS.travel;
  const logisticsCO2 = data.logisticsKg * FACTORS.logistics;
  const totalCO2 = electricityCO2 + travelCO2 + logisticsCO2;

  // Simple reduction plan
  const reductionPlan = {
    electricity: {
      action: "Switch to renewable energy or optimize usage",
      potentialReduction: +(electricityCO2 * 0.3).toFixed(2),
      ROI: "Medium"
    },
    travel: {
      action: "Encourage remote work or use low-emission transport",
      potentialReduction: +(travelCO2 * 0.25).toFixed(2),
      ROI: "High"
    },
    logistics: {
      action: "Optimize supply chain and reduce packaging",
      potentialReduction: +(logisticsCO2 * 0.2).toFixed(2),
      ROI: "Medium"
    }
  };

  return { totalCO2: +totalCO2.toFixed(2), reductionPlan };
};
