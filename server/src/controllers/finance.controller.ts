import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export interface FinancialTransactionItem {
  id: string;
  farmId: string;
  farmName: string;
  cropName: string;
  type: 'INCOME' | 'EXPENSE';
  category: 'SEEDS' | 'FERTILIZER' | 'IRRIGATION_WATER' | 'PEST_CONTROL' | 'EQUIPMENT_FUEL' | 'LABOR' | 'EQUIPMENT_RENTAL' | 'CROP_SALES' | 'GOVT_SUBSIDY' | 'OTHER';
  title: string;
  amountUSD: number;
  date: string;
  notes?: string;
  receiptRef?: string;
}

let mockTransactions: FinancialTransactionItem[] = [
  {
    id: 'tx-101',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    type: 'INCOME',
    category: 'CROP_SALES',
    title: 'Corn Batch #1 Early Grain Sale',
    amountUSD: 42500,
    date: '2026-08-01',
    notes: 'Sold 85 metric tons at $500/ton to Midwestern Grain Elevator.',
    receiptRef: 'REC-2026-0801',
  },
  {
    id: 'tx-102',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    type: 'EXPENSE',
    category: 'FERTILIZER',
    title: 'N-P-K Organic Fertilizer Bulk Purchase',
    amountUSD: 8400,
    date: '2026-07-28',
    notes: '12 Tons of custom nitrogen blend for Sector 1 & 2.',
    receiptRef: 'INV-AGRI-4091',
  },
  {
    id: 'tx-103',
    farmId: 'farm-2',
    farmName: 'Sunrise Orchard',
    cropName: 'Soybeans',
    type: 'EXPENSE',
    category: 'SEEDS',
    title: 'Certified Non-GMO Soybean Seeds',
    amountUSD: 6200,
    date: '2026-07-20',
    notes: 'High-germination seed bags for 32 hectares.',
    receiptRef: 'INV-SEED-8812',
  },
  {
    id: 'tx-104',
    farmId: 'farm-3',
    farmName: 'Riverbend Field',
    cropName: 'Wheat',
    type: 'EXPENSE',
    category: 'EQUIPMENT_FUEL',
    title: 'Tractor & Harvester Diesel Fuel',
    amountUSD: 3100,
    date: '2026-07-15',
    notes: '1,000 Gallons ultra-low sulfur agricultural diesel.',
    receiptRef: 'REC-FUEL-5011',
  },
  {
    id: 'tx-105',
    farmId: 'farm-4',
    farmName: 'Highland Vineyard',
    cropName: 'Grapes',
    type: 'EXPENSE',
    category: 'LABOR',
    title: 'Seasonal Pruning & Canopy Management',
    amountUSD: 4800,
    date: '2026-07-10',
    notes: 'Contracted 6 field technicians for 4 days.',
    receiptRef: 'REC-PAY-0941',
  },
  {
    id: 'tx-106',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    type: 'INCOME',
    category: 'GOVT_SUBSIDY',
    title: 'Sustainable Water Conservation Grant',
    amountUSD: 7500,
    date: '2026-06-30',
    notes: 'USDA smart drip irrigation technology rebate.',
    receiptRef: 'GOV-REF-3321',
  },
  {
    id: 'tx-107',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    type: 'EXPENSE',
    category: 'IRRIGATION_WATER',
    title: 'Seasonal Water Rights & Drip Maintenance',
    amountUSD: 2400,
    date: '2026-06-18',
    notes: 'Canal water access fee & solenoid valve replacement.',
    receiptRef: 'REC-[#WATER-901]',
  },
];

export const getTransactions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { farmId, type, category } = req.query;

    let filtered = [...mockTransactions];
    if (farmId && typeof farmId === 'string') {
      filtered = filtered.filter((t) => t.farmId === farmId);
    }
    if (type && typeof type === 'string') {
      filtered = filtered.filter((t) => t.type === type);
    }
    if (category && typeof category === 'string') {
      filtered = filtered.filter((t) => t.category === category);
    }

    return res.json({
      success: true,
      data: filtered,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch financial transactions.' });
  }
};

export const createTransaction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { farmId, farmName, cropName, type, category, title, amountUSD, date, notes, receiptRef } = req.body;

    if (!title || !amountUSD || !date || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, amount, date, type, and category are required.',
      });
    }

    const newTx: FinancialTransactionItem = {
      id: `tx-${Date.now()}`,
      farmId: farmId || 'farm-1',
      farmName: farmName || 'Green Valley Plot A',
      cropName: cropName || 'Corn',
      type,
      category,
      title,
      amountUSD: Number(amountUSD),
      date,
      notes: notes || '',
      receiptRef: receiptRef || `REC-${Date.now().toString().slice(-6)}`,
    };

    mockTransactions.unshift(newTx);

    return res.status(201).json({
      success: true,
      message: 'Financial transaction logged successfully.',
      data: newTx,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to record transaction.' });
  }
};

export const deleteTransaction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    mockTransactions = mockTransactions.filter((t) => t.id !== id);
    return res.json({ success: true, message: 'Transaction record deleted.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete transaction.' });
  }
};

export const getFinanceSummary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const grossIncome = mockTransactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amountUSD, 0);

    const totalExpenses = mockTransactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amountUSD, 0);

    const netProfit = grossIncome - totalExpenses;
    const profitMargin = grossIncome > 0 ? ((netProfit / grossIncome) * 100).toFixed(1) : '0.0';
    const roiPercentage = totalExpenses > 0 ? (((grossIncome - totalExpenses) / totalExpenses) * 100).toFixed(1) : '0.0';

    // Category breakdown
    const categoryBreakdown = [
      { category: 'Fertilizers', amount: 8400, percentage: 33.7, color: '#10b981' },
      { category: 'Seeds', amount: 6200, percentage: 24.9, color: '#14b8a6' },
      { category: 'Labor', amount: 4800, percentage: 19.3, color: '#f59e0b font-semibold' },
      { category: 'Fuel & Diesel', amount: 3100, percentage: 12.4, color: '#38bdf8' },
      { category: 'Irrigation & Water', amount: 2400, percentage: 9.7, color: '#a855f7' },
    ];

    // Monthly Trend graph data
    const monthlyTrends = [
      { month: 'Apr', revenue: 12000, expenses: 8500 },
      { month: 'May', revenue: 15000, expenses: 9200 },
      { month: 'Jun', revenue: 22500, expenses: 11400 },
      { month: 'Jul', revenue: 31000, expenses: 14800 },
      { month: 'Aug', revenue: 50000, expenses: 24900 },
    ];

    return res.json({
      success: true,
      data: {
        grossIncome,
        totalExpenses,
        netProfit,
        profitMargin: `${profitMargin}%`,
        roiPercentage: `${roiPercentage}%`,
        categoryBreakdown,
        monthlyTrends,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to calculate financial summary.' });
  }
};
