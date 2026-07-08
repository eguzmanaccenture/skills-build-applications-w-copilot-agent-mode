import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Avery Chen',
        email: 'avery.chen@example.com',
        age: 29,
        fitnessGoal: 'Marathon training',
      },
      {
        name: 'Mina Patel',
        email: 'mina.patel@example.com',
        age: 34,
        fitnessGoal: 'Strength building',
      },
      {
        name: 'Jordan Kim',
        email: 'jordan.kim@example.com',
        age: 27,
        fitnessGoal: 'Mobility and endurance',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Momentum Squad',
        sport: 'Running',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Iron Circle',
        sport: 'CrossFit',
        members: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        type: 'run',
        duration: 35,
        distance: 7.2,
        userId: users[0]._id,
      },
      {
        type: 'strength',
        duration: 45,
        distance: 0,
        userId: users[1]._id,
      },
      {
        type: 'mobility',
        duration: 20,
        distance: 0,
        userId: users[2]._id,
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, score: 1420, rank: 1 },
      { userId: users[1]._id, score: 1280, rank: 2 },
      { userId: users[2]._id, score: 1165, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run',
        duration: 30,
        difficulty: 'medium',
        focus: 'endurance',
      },
      {
        title: 'Full Body Strength',
        duration: 45,
        difficulty: 'hard',
        focus: 'muscle gain',
      },
      {
        title: 'Morning Mobility',
        duration: 20,
        difficulty: 'easy',
        focus: 'recovery',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
