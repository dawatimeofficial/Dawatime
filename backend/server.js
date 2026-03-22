import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import familyRoutes from './routes/familyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { startCronJobs } from './utils/cron.js';
import { sendPushNotification } from './utils/firebase.js';
import User from './models/User.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
startCronJobs();


app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DawaTime API is running');
});

// Test push notification route
app.get('/test', async (req, res) => {
  try {
    const user = await User.findOne({ fcmToken: { $exists: true, $ne: '' } });

    if (!user || !user.fcmToken) {
      console.log('❌ No user with FCM token found in database');
      return res.status(400).send('No FCM token found');
    }

    console.log(`📡 Sending test notification to ${user.email} (${user.fcmToken.substring(0, 10)}...)`);
    await sendPushNotification(user.fcmToken, 'Test Notification', 'DawaTime backend is working');

    console.log('✅ Test notification sent successfully');
    res.send('Notification sent');
  } catch (error) {
    console.error('❌ Failed to send test notification:', error);
    res.status(500).send('Failed to send notification');
  }
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
