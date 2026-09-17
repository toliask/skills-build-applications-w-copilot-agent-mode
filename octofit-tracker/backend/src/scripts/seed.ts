import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya', email: 'maya@mergington.edu', name: 'Maya Chen', points: 420 },
      { username: 'jordan', email: 'jordan@mergington.edu', name: 'Jordan Smith', points: 365 },
      { username: 'sam', email: 'sam@mergington.edu', name: 'Sam Rivera', points: 310 },
      { username: 'riley', email: 'riley@mergington.edu', name: 'Riley Morgan', points: 275 },
    ]);

    const teams = await Team.create([
      { name: 'Summit Sprinters', members: [users[0]._id, users[1]._id], points: 785 },
      { name: 'Trail Blazers', members: [users[2]._id, users[3]._id], points: 585 },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { teamId: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { teamId: teams[1]._id } } },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'Running', duration: 32, distance: 5.2, points: 180 },
      { userId: users[1]._id, type: 'Strength Training', duration: 45, points: 155 },
      { userId: users[2]._id, type: 'Walking', duration: 50, distance: 4.1, points: 120 },
      { userId: users[3]._id, type: 'Running', duration: 28, distance: 4.4, points: 105 },
    ]);

    await Leaderboard.create(
      [...users]
        .sort((firstUser, secondUser) => secondUser.points - firstUser.points)
        .map((user, index) => ({
          userId: user._id,
          username: user.username,
          points: user.points,
          rank: index + 1,
        })),
    );

    await Workout.create([
      {
        title: 'Interval Run',
        type: 'Running',
        difficulty: 'Intermediate',
        duration: 30,
        description: 'Alternate one minute of fast running with two minutes of easy jogging.',
      },
      {
        title: 'Full Body Circuit',
        type: 'Strength Training',
        difficulty: 'Beginner',
        duration: 25,
        description: 'Build strength with squats, push-ups, lunges, and a short core set.',
      },
      {
        title: 'Recovery Walk',
        type: 'Walking',
        difficulty: 'Beginner',
        duration: 20,
        description: 'Take a relaxed walk and finish with gentle mobility stretches.',
      },
    ]);

    console.log('Seeded 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
