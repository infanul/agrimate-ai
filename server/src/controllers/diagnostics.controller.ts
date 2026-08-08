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
  confidenceScore: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  symptoms: string;
  chemicalTreatment: string;
  organicTreatment: string;
  preventiveSteps: string;
  scannedAt: string;
}

// Initial diagnostic scan history
let mockDiagnostics: DiagnosticRecord[] = [
  {
    id: 'diag-101',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    imageUrl:
      'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400',
    diseaseDetected: 'Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    confidenceScore: 97.4,
    severity: 'HIGH',
    symptoms:
      'Elliptical, grayish-green long lesions appearing on lower leaves, turning tan with dark margins as spore structures mature.',
    chemicalTreatment:
      'Apply an appropriate registered fungicide according to the product label and local agricultural guidance.',
    organicTreatment:
      'Use approved biological control products such as Trichoderma-based formulations where suitable.',
    preventiveSteps:
      'Implement crop rotation, use resistant varieties, and manage crop residue after harvest.',
    scannedAt: '2026-08-04 14:22',
  },
  {
    id: 'diag-102',
    farmId: 'farm-2',
    farmName: 'Sunrise Orchard',
    cropName: 'Tomato',
    imageUrl:
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?w=400',
    diseaseDetected: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    confidenceScore: 94.8,
    severity: 'MEDIUM',
    symptoms:
      'Concentric dark brown target-pattern rings on mature leaves with yellow halos expanding outward.',
    chemicalTreatment:
      'Use a locally registered fungicide according to its label and agricultural recommendations.',
    organicTreatment:
      'Use approved biological control products and remove heavily affected foliage when appropriate.',
    preventiveSteps:
      'Use drip irrigation, avoid prolonged leaf wetness, maintain good plant spacing, and remove infected plant debris.',
    scannedAt: '2026-08-02 09:15',
  },
  {
    id: 'diag-103',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    imageUrl:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
    diseaseDetected: 'Healthy Crop Foliage',
    scientificName: 'Zea mays',
    confidenceScore: 99.1,
    severity: 'LOW',
    symptoms:
      'Vibrant green foliage with no obvious lesion formation and generally uniform leaf appearance.',
    chemicalTreatment: 'No disease treatment required.',
    organicTreatment:
      'Continue normal soil and crop management practices.',
    preventiveSteps:
      'Continue soil moisture monitoring and balanced nutrient management.',
    scannedAt: '2026-07-29 11:40',
  },
];

// Prototype disease knowledgebase.
// This currently simulates AI classification using presetKey.
// A real TensorFlow model can be connected later.
const diseaseKnowledgebase: Record<
  string,
  Omit<DiagnosticRecord, 'id' | 'farmId' | 'farmName' | 'scannedAt'>
> = {
  CORN_LEAF_BLIGHT: {
    cropName: 'Corn (Maize)',
    imageUrl:
      'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400',
    diseaseDetected: 'Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    confidenceScore: 98.2,
    severity: 'HIGH',
    symptoms:
      'Long, cigar-shaped grayish-green lesions on leaves that can develop into tan necrotic tissue.',
    chemicalTreatment:
      'Use an appropriate registered fungicide according to the product label and local agricultural guidance.',
    organicTreatment:
      'Use approved Trichoderma-based biological control products where suitable.',
    preventiveSteps:
      'Use resistant varieties, rotate crops, and manage infected crop residue.',
  },

  TOMATO_EARLY_BLIGHT: {
    cropName: 'Tomato',
    imageUrl:
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?w=400',
    diseaseDetected: 'Tomato Early Blight',
    scientificName: 'Alternaria solani',
    confidenceScore: 96.5,
    severity: 'MEDIUM',
    symptoms:
      'Target-like brown spots with yellow chlorotic borders, commonly appearing on older leaves first.',
    chemicalTreatment:
      'Use an appropriate locally registered fungicide according to its label and agricultural guidance.',
    organicTreatment:
      'Use approved biological control products and maintain good sanitation practices.',
    preventiveSteps:
      'Avoid overhead irrigation, improve airflow, use mulch, and remove infected plant debris.',
  },

  SOYBEAN_RUST: {
    cropName: 'Soybean',
    imageUrl:
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400',
    diseaseDetected: 'Asian Soybean Rust',
    scientificName: 'Phakopsora pachyrhizi',
    confidenceScore: 95.1,
    severity: 'CRITICAL',
    symptoms:
      'Small reddish-brown lesions or pustules on leaves that can lead to premature leaf loss.',
    chemicalTreatment:
      'Use a locally registered fungicide according to the product label and local agricultural recommendations.',
    organicTreatment:
      'Use approved biological or cultural management methods where applicable.',
    preventiveSteps:
      'Monitor crops regularly, use recommended varieties, and follow local disease forecasting information.',
  },

  HEALTHY_MAIZE: {
    cropName: 'Corn (Maize)',
    imageUrl:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
    diseaseDetected: 'Healthy Crop (No Disease Detected)',
    scientificName: 'Zea mays',
    confidenceScore: 99.4,
    severity: 'LOW',
    symptoms:
      'Uniform green leaves with no obvious disease lesions or abnormal discoloration.',
    chemicalTreatment: 'None required.',
    organicTreatment:
      'Continue normal organic soil and crop management practices.',
    preventiveSteps:
      'Maintain appropriate soil moisture, balanced nutrition, crop monitoring, and field sanitation.',
  },
};

// Analyze crop image
export const analyzeImage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { presetKey, farmName, cropName } = req.body;

    const template =
      diseaseKnowledgebase[presetKey] ||
      diseaseKnowledgebase['CORN_LEAF_BLIGHT'];

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
      scannedAt: new Date()
        .toISOString()
        .replace('T', ' ')
        .slice(0, 16),
    };

    mockDiagnostics.unshift(newDiagnostic);

    return res.json({
      success: true,
      message: 'Crop diagnostic analysis completed.',
      data: newDiagnostic,
    });
  } catch (error) {
    console.error('Diagnostic analysis error:', error);

    return res.status(500).json({
      success: false,
      message: 'Diagnostic analysis failed.',
    });
  }
};

// Get diagnostic history
export const getDiagnosticHistory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    return res.json({
      success: true,
      count: mockDiagnostics.length,
      data: mockDiagnostics,
    });
  } catch (error) {
    console.error('Diagnostic history error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch diagnostic history.',
    });
  }
};

// Delete diagnostic record
export const deleteDiagnostic = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const originalLength = mockDiagnostics.length;

    mockDiagnostics = mockDiagnostics.filter(
      (diagnostic) => diagnostic.id !== id
    );

    if (mockDiagnostics.length === originalLength) {
      return res.status(404).json({
        success: false,
        message: 'Diagnostic record not found.',
      });
    }

    return res.json({
      success: true,
      message: 'Diagnostic record removed.',
    });
  } catch (error) {
    console.error('Delete diagnostic error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete diagnostic entry.',
    });
  }
};
