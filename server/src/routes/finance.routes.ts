import { Router } from 'express';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getFinanceSummary,
} from '../controllers/finance.controller';
import { authenticateJwt } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateJwt as any);

router.get('/transactions', getTransactions as any);
router.post('/transactions', createTransaction as any);
router.delete('/transactions/:id', deleteTransaction as any);
router.get('/summary', getFinanceSummary as any);

export default router;
