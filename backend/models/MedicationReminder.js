import mongoose from 'mongoose';

const medicationReminderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Medication name is required'],
      trim: true,
    },
    dosage: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      trim: true,
      enum: ['once', 'twice', 'three times', 'four times', 'as needed', 'other'],
    },
    times: [{
      type: String,
      trim: true,
    }],
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    familyMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FamilyMember',
    },
  },
  { timestamps: true }
);

export default mongoose.model('MedicationReminder', medicationReminderSchema);
