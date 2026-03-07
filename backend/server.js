import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import familyRoutes from './routes/familyRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();


app.use(cors())
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/family', familyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
