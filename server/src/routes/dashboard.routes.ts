import { Router } from 'express';
import { getDashboardSummary, getAIAdvisories } from '../controllers/dashboard.controller';
import { authenticateJwt } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateJwt as any);

router.get('/summary', getDashboardSummary as any);
router.get('/advisories', getAIAdvisories as any);

export default router;
