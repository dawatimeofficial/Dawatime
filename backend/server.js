import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import familyRoutes from './routes/familyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { startCronJobs } from './utils/cron.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
startCronJobs();


app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DawaTime API is running');
});

// Auth endpoints (both supported)
app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/users', userRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
