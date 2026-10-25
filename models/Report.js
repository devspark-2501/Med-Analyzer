import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  tests: [
    {
      name: { type: String, required: true },
      value: { type: Number, required: true },
      unit: { type: String, required: true },
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      status: { type: String, default: 'Normal' }
    }
  ],
  flags: [String],
  dangerousCombinations: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);