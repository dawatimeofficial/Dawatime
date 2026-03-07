import mongoose from 'mongoose';

const historyEntrySchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  taken: { type: Boolean, default: true },
}, { _id: false });

const medicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, default: '8' },
  notes: { type: String, default: '' },
  member: { type: String, required: true },
  history: { type: [historyEntrySchema], default: [] },
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.userId;
      return ret;
    },
  },
});

export default mongoose.model('Medication', medicationSchema);
