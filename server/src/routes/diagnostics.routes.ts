import { Router } from 'express';
import {
  analyzeImage,
  getDiagnosticHistory,
  deleteDiagnostic,
} from '../controllers/diagnostics.controller';
import { authenticateJwt } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateJwt as any);

router.post('/analyze', analyzeImage as any);
router.get('/history', getDiagnosticHistory as any);
router.delete('/history/:id', deleteDiagnostic as any);

export default router;