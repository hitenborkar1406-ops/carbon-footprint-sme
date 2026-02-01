import mongoose from "mongoose";

const footprintSchema = mongoose.Schema(
  {
    companyName: { type: String, required: true },
    electricityKWh: { type: Number, required: true },
    travelKm: { type: Number, required: true },
    logisticsKg: { type: Number, required: true },
    totalCO2: { type: Number },
    reductionPlan: { type: Object }
  },
  { timestamps: true }
);

const Footprint = mongoose.model("Footprint", footprintSchema);

export default Footprint;
