import { Router } from 'express';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getReminders,
} from '../controllers/calendar.controller';
import { authenticateJwt } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateJwt as any);

router.get('/events', getEvents as any);
router.post('/events', createEvent as any);
router.put('/events/:id', updateEvent as any);
router.delete('/events/:id', deleteEvent as any);
router.get('/reminders', getReminders as any);

export default router;
