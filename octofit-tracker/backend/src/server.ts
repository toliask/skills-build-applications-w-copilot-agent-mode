import express from 'express';
import { connectDatabase } from './config/database.js';
import {
  activityRoutes,
  leaderboardRoutes,
  teamRoutes,
  userRoutes,
  workoutRoutes,
} from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const apiUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl });
});

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

connectDatabase().catch((error: unknown) => {
  console.error('Unable to connect to MongoDB:', error);
});

app.listen(port, () => {
  console.log(`OctoFit API listening on ${apiUrl}`);
});

export default app;
