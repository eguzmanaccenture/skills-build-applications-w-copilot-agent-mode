import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiUrl: baseUrl });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const item = await User.create(req.body);
  res.status(201).json(item);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

app.post('/api/teams', async (req, res) => {
  const item = await Team.create(req.body);
  res.status(201).json(item);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('userId').lean();
  res.json(activities);
});

app.post('/api/activities', async (req, res) => {
  const item = await Activity.create(req.body);
  res.status(201).json(item);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('userId').lean();
  res.json(leaderboard);
});

app.post('/api/leaderboard', async (req, res) => {
  const item = await LeaderboardEntry.create(req.body);
  res.status(201).json(item);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

app.post('/api/workouts', async (req, res) => {
  const item = await Workout.create(req.body);
  res.status(201).json(item);
});

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
});
