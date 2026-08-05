import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export interface DiagnosticRecord {
  id: string;
  farmId: string;
  farmName: string;
  cropName: string;
  imageUrl: string;
  diseaseDetected: string;
  scientificName: string;
  confidenceScore: number; // e.g. 97.4
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  symptoms: string;
  chemicalTreatment: string;
  organicTreatment: string;
  preventiveSteps: string;
  scannedAt: string;
}

// Initial diagnostic scan history log
let mockDiagnostics: DiagnosticRecord[] = [
  {
    id: 'diag-101',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400',
    diseaseDetected: 'Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    confidenceScore: 97.4,
    severity: 'HIGH',
    symptoms: 'Elliptical, grayish-green long lesions appearing on lower leaves, turning tan with dark margins as spore structures mature.',
    chemicalTreatment: 'Apply azoxystrobin or propiconazole foliar fungicide (150 mL/ha) immediately during early tasseling.',
    organicTreatment: 'Spray copper octanoate bio-fungicide or neem oil extract (5 mL/L water) every 7 days.',
    preventiveSteps: 'Implement 2-year crop rotation with non-host legumes and plow crop residue post-harvest.',
    scannedAt: '2026-08-04 14:22',
  },
  {
    id: 'diag-102',
    farmId: 'farm-2',
    farmName: 'Sunrise Orchard',
    cropName: 'Tomato / Soybeans',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?w=400',
    diseaseDetected: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    confidenceScore: 94.8,
    severity: 'MEDIUM',
    symptoms: 'Concentric dark brown target-pattern rings on mature leaves, yellow halos expanding outwards.',
    chemicalTreatment: 'Apply Chlorothalonil or Mancozeb preventative spray at first sign of concentric spots.',
    organicTreatment: 'Apply Bacillus subtilis bio-fungicide soil drench and prune lowest 12 inches of infected foliage.',
    preventiveSteps: 'Ensure drip irrigation lines avoid wetting leaf canopy and maintain 60cm plant spacing for airflow.',
    scannedAt: '2026-08-02 09:15',
  },
  {
    id: 'diag-103',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
    diseaseDetected: 'Healthy Crop Foliage',
    scientificName: 'Zea mays (Optimal Health)',
    confidenceScore: 99.1,
    severity: 'LOW',
    symptoms: 'Vibrant green chlorophyll index, zero lesion formation, uniform leaf thickness and optimal vascular turgor.',
    chemicalTreatment: 'No chemical intervention required.',
    organicTreatment: 'Maintain standard compost tea soil conditioning.',
    preventiveSteps: 'Continue current soil moisture monitoring and nitrogen fertigation schedule.',
    scannedAt: '2026-07-29 11:40',
  },
];

// Sample Knowledgebase for TensorFlow inference classifier simulation
const diseaseKnowledgebase: Record<string, Omit<DiagnosticRecord, 'id' | 'farmId' | 'farmName' | 'scannedAt'>> = {
  CORN_LEAF_BLIGHT: {
    cropName: 'Corn (Maize)',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400',
    diseaseDetected: 'Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    confidenceScore: 98.2,
    severity: 'HIGH',
    symptoms: 'Long, cigar-shaped grayish-green lesions on leaves that dry into tan necrotic tissue.',
    chemicalTreatment: 'Foliar spray with Propiconazole (200 EC) or Strobilurin fungicides at 14-day intervals.',
    organicTreatment: 'Apply Trichoderma viride bio-control formulation (5g/L) to soil and foliar canopy.',
    preventiveSteps: 'Use resistant hybrid seed varieties and rotate fields with soybeans or alfalfa.',
  },
  TOMATO_EARLY_BLIGHT: {
    cropName: 'Tomato',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?w=400',
    diseaseDetected: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    confidenceScore: 96.5,
    severity: 'MEDIUM',
    symptoms: 'Target-like brown spots with yellow chlorotic borders on lower canopy leaves.',
    chemicalTreatment: 'Apply Copper Hydroxide or Difenoconazole fungicide solution.',
    organicTreatment: 'Foliar spray of Potassium Bicarbonate (4g/L) mixed with horticultural neem oil.',
    preventiveSteps: 'Stake vines off soil level, apply straw mulch, and avoid overhead sprinkler watering.',
  },
  SOYBEAN_RUST: {
    cropName: 'Soybean',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400',
    diseaseDetected: 'Asian Soybean Rust',
    scientificName: 'Phakopsora pachyrhizi',
    confidenceScore: 95.1,
    severity: 'CRITICAL',
    symptoms: 'Tiny reddish-brown pustules on underside of leaves, causing rapid defoliation and pod drop.',
    chemicalTreatment: 'Immediate application of Triazole + Strobilurin premix fungicide before 10% canopy infection.',
    organicTreatment: 'Apply sulfur-based dust or systemic bio-fungicides.',
    preventiveSteps: 'Monitor regional spore traps during flowering stage and plant early-maturing varieties.',
  },
  HEALTHY_MAIZE: {
    cropName: 'Corn (Maize)',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
    diseaseDetected: 'Healthy Crop (No Disease Detected)',
    scientificName: 'Zea mays (Optimal Phenotype)',
    confidenceScore: 99.4,
    severity: 'LOW',
    symptoms: 'Uniform dark green leaves, no spot or mildew formation, healthy stomatal conductance.',
    chemicalTreatment: 'None required.',
    organicTreatment: 'Maintain regular seaweed extract foliar spray for stress resilience.',
    preventiveSteps: 'Maintain current soil moisture and balanced NPK nutrient management.',
  },
};

export const analyzeImage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { presetKey, farmName, cropName } = req.body;

    const template = diseaseKnowledgebase[presetKey] || diseaseKnowledgebase['CORN_LEAF_BLIGHT'];

    const newDiagnostic: DiagnosticRecord = {
      id: `diag-${Date.now()}`,
      farmId: 'farm-1',
      farmName: farmName || 'Green Valley Plot A',
      cropName: cropName || template.cropName,
      imageUrl: template.imageUrl,
      diseaseDetected: template.diseaseDetected,
      scientificName: template.scientificName,
      confidenceScore: template.confidenceScore,
      severity: template.severity,
      symptoms: template.symptoms,
      chemicalTreatment: template.chemicalTreatment,
      organicTreatment: template.organicTreatment,
      preventiveSteps: template.preventiveSteps,
      scannedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    mockDiagnostics.unshift(newDiagnostic);

    return res.json({
      success: true,
      message: 'TensorFlow Vision Classification Complete.',
      data: newDiagnostic,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'TensorFlow analysis engine failed.' });
  }
};

export const getDiagnosticHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    return res.json({
      success: true,
      count: mockDiagnostics.length,
      data: mockDiagnostics,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch diagnostic history.' });
  }
};

export const deleteDiagnostic = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    mockDiagnostics = mockDiagnostics.filter((d) => d.id !== id);
    return res.json({ success: true, message: 'Diagnostic record removed.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete diagnostic entry.' });
  }
};
