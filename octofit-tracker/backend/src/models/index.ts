import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
  },
  { timestamps: true },
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sport: { type: String, required: true },
  },
  { timestamps: true },
);

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focus: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
