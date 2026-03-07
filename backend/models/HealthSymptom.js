import mongoose from 'mongoose';

const healthSymptomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Symptom name is required'],
      trim: true,
    },
    severity: {
      type: String,
      trim: true,
      enum: ['mild', 'moderate', 'severe', 'other'],
    },
    description: {
      type: String,
      trim: true,
    },
    occurredAt: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    familyMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FamilyMember',
    },
  },
  { timestamps: true }
);

export default mongoose.model('HealthSymptom', healthSymptomSchema);
