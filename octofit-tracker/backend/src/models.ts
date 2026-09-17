import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    points: { type: Number, default: 0, min: 0 },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    distance: { type: Number, min: 0 },
    points: { type: Number, default: 0, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
