import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

function createResourceRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request: Request, response: Response, next) => {
    try {
      const documents = await model.find().sort({ createdAt: -1 }).lean().exec();
      response.json(documents);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request: Request, response: Response, next) => {
    try {
      const document = await model.findById(request.params.id).lean().exec();
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request: Request, response: Response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (request: Request, response: Response, next) => {
    try {
      const document = await model
        .findByIdAndUpdate(request.params.id, request.body, {
          new: true,
          runValidators: true,
        })
        .lean()
        .exec();
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (request: Request, response: Response, next) => {
    try {
      const document = await model.findByIdAndDelete(request.params.id).lean().exec();
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export const userRoutes = createResourceRouter(User);
export const teamRoutes = createResourceRouter(Team);
export const activityRoutes = createResourceRouter(Activity);
export const leaderboardRoutes = createResourceRouter(Leaderboard);
export const workoutRoutes = createResourceRouter(Workout);
