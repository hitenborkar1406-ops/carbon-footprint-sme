import Footprint from "../models/Footprint.js";
import { calculateFootprint } from "../utils/calculations.js";

// Create footprint and return report + plan
export const createFootprint = async (req, res) => {
  try {
    const { companyName, electricityKWh, travelKm, logisticsKg } = req.body;

    const { totalCO2, reductionPlan } = calculateFootprint({
      electricityKWh,
      travelKm,
      logisticsKg
    });

    const footprint = await Footprint.create({
      companyName,
      electricityKWh,
      travelKm,
      logisticsKg,
      totalCO2,
      reductionPlan
    });

    res.status(201).json({ footprint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all footprints (tracking)
export const getFootprints = async (req, res) => {
  try {
    const footprints = await Footprint.find().sort({ createdAt: -1 });
    res.json(footprints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
