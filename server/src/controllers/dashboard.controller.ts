import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const getDashboardSummary = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const summaryData = {
      totalAcreage: 142.5,
      activeFarms: 4,
      overallSoilHealthIndex: 88, // out of 100
      pendingAdvisories: 3,
      recentCropHealth: [
        { id: 'farm-1', name: 'Green Valley Plot A', crop: 'Corn (Maize)', healthScore: 94, status: 'EXCELLENT', area: '45 Hectares' },
        { id: 'farm-2', name: 'Sunrise Orchard', crop: 'Soybeans', healthScore: 82, status: 'GOOD', area: '32 Hectares' },
        { id: 'farm-3', name: 'Riverbend Field', crop: 'Wheat', healthScore: 68, status: 'ATTENTION_NEEDED', area: '40 Hectares' },
        { id: 'farm-4', name: 'Highland Vineyard', crop: 'Grapes', healthScore: 91, status: 'EXCELLENT', area: '25.5 Hectares' },
      ],
      quickMetrics: {
        soilMoistureAvg: '34.2%',
        nitrogenLevelAvg: '48 mg/kg',
        phAvg: '6.8 (Optimal)',
        avgTemperature: '24.5°C',
      },
    };

    return res.json({
      success: true,
      data: summaryData,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard summary.',
    });
  }
};

export const getAIAdvisories = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const advisories = [
      {
        id: 'adv-101',
        title: 'Nitrogen Depletion Detected in Sector 3',
        category: 'FERTILIZATION',
        severity: 'HIGH',
        recommendation: 'Apply organic N-P-K (20-10-10) fertilizer within 48 hours to prevent corn yield degradation.',
        farmName: 'Riverbend Field',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'adv-102',
        title: 'Optimal Irrigation Window Identified',
        category: 'IRRIGATION',
        severity: 'LOW',
        recommendation: 'Schedule drip irrigation for 45 minutes at 06:00 AM tomorrow before high midday evaporation.',
        farmName: 'Green Valley Plot A',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'adv-103',
        title: 'Early Blight Fungus Risk (High Humidity Alert)',
        category: 'PEST_CONTROL',
        severity: 'MEDIUM',
        recommendation: 'Inspect leaves on southern edge of Sunrise Orchard. Apply bio-fungicide preventative spray if spots appear.',
        farmName: 'Sunrise Orchard',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
    ];

    return res.json({
      success: true,
      data: advisories,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch AI advisories.',
    });
  }
};
