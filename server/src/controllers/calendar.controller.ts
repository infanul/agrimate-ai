import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export interface CalendarEvent {
  id: string;
  farmId: string;
  farmName: string;
  cropName: string;
  stage: 'PLANNING' | 'SOIL_PREPARATION' | 'SOWING' | 'IRRIGATION' | 'FERTILIZATION' | 'PEST_MANAGEMENT' | 'HARVESTING';
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isReminderSet: boolean;
  reminderDate?: string;
}

// Initial mock crop calendar data for instant responsiveness
let mockEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    stage: 'SOIL_PREPARATION',
    title: 'Soil Aeration & Deep Tillage',
    description: 'Prepare 45 hectares in Sector 1 & 2 for upcoming spring corn sowing.',
    startDate: '2026-08-01',
    endDate: '2026-08-04',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    isReminderSet: true,
    reminderDate: '2026-08-01',
  },
  {
    id: 'evt-2',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    stage: 'SOWING',
    title: 'Precision Seed Sowing',
    description: 'Sow high-yield hybrid seed batch #C-804 at 75,000 seeds/ha depth.',
    startDate: '2026-08-05',
    endDate: '2026-08-08',
    status: 'IN_PROGRESS',
    priority: 'CRITICAL',
    isReminderSet: true,
    reminderDate: '2026-08-05',
  },
  {
    id: 'evt-3',
    farmId: 'farm-3',
    farmName: 'Riverbend Field',
    cropName: 'Wheat',
    stage: 'FERTILIZATION',
    title: 'Nitrogen Booster Spray (N-20)',
    description: 'Address Sector 3 nitrogen deficiency flagged by AI soil sensors.',
    startDate: '2026-08-06',
    endDate: '2026-08-07',
    status: 'SCHEDULED',
    priority: 'HIGH',
    isReminderSet: true,
    reminderDate: '2026-08-06',
  },
  {
    id: 'evt-4',
    farmId: 'farm-2',
    farmName: 'Sunrise Orchard',
    cropName: 'Soybeans',
    stage: 'PEST_MANAGEMENT',
    title: 'Fungicide Foliar Inspection',
    description: 'Inspect southern edge for early blight symptoms due to recent morning humidity.',
    startDate: '2026-08-10',
    endDate: '2026-08-11',
    status: 'SCHEDULED',
    priority: 'MEDIUM',
    isReminderSet: true,
    reminderDate: '2026-08-10',
  },
  {
    id: 'evt-5',
    farmId: 'farm-1',
    farmName: 'Green Valley Plot A',
    cropName: 'Corn (Maize)',
    stage: 'IRRIGATION',
    title: 'Automated Drip Cycle #1',
    description: 'Run 45-minute root hydration drip cycle before midday sun.',
    startDate: '2026-08-12',
    endDate: '2026-08-12',
    status: 'SCHEDULED',
    priority: 'MEDIUM',
    isReminderSet: true,
    reminderDate: '2026-08-12',
  },
  {
    id: 'evt-6',
    farmId: 'farm-4',
    farmName: 'Highland Vineyard',
    cropName: 'Grapes',
    stage: 'HARVESTING',
    title: 'Pre-Harvest Sugar Brix Testing',
    description: 'Measure refractometer sucrose levels across vineyard blocks A & B.',
    startDate: '2026-08-20',
    endDate: '2026-08-22',
    status: 'SCHEDULED',
    priority: 'HIGH',
    isReminderSet: true,
    reminderDate: '2026-08-20',
  },
];

export const getEvents = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { farmId, stage } = req.query;

    let filtered = [...mockEvents];
    if (farmId && typeof farmId === 'string') {
      filtered = filtered.filter((e) => e.farmId === farmId);
    }
    if (stage && typeof stage === 'string') {
      filtered = filtered.filter((e) => e.stage === stage);
    }

    return res.json({
      success: true,
      data: filtered,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch calendar events.' });
  }
};

export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { farmId, farmName, cropName, stage, title, description, startDate, endDate, priority, template } = req.body;

    // If template requested, auto-generate standard 4-stage crop lifecycle
    if (template === 'CORN_120') {
      const generated: CalendarEvent[] = [
        {
          id: `evt-${Date.now()}-1`,
          farmId: farmId || 'farm-1',
          farmName: farmName || 'Green Valley Plot A',
          cropName: 'Corn (Maize)',
          stage: 'SOIL_PREPARATION',
          title: 'Lime & Organic Compost Application',
          description: 'Balance soil pH and enrich organic matter.',
          startDate: '2026-08-15',
          endDate: '2026-08-17',
          status: 'SCHEDULED',
          priority: 'MEDIUM',
          isReminderSet: true,
        },
        {
          id: `evt-${Date.now()}-2`,
          farmId: farmId || 'farm-1',
          farmName: farmName || 'Green Valley Plot A',
          cropName: 'Corn (Maize)',
          stage: 'SOWING',
          title: 'High-Density Corn Sowing',
          description: 'Sow seeds at optimal 5cm depth.',
          startDate: '2026-08-20',
          endDate: '2026-08-22',
          status: 'SCHEDULED',
          priority: 'HIGH',
          isReminderSet: true,
        },
        {
          id: `evt-${Date.now()}-3`,
          farmId: farmId || 'farm-1',
          farmName: farmName || 'Green Valley Plot A',
          cropName: 'Corn (Maize)',
          stage: 'FERTILIZATION',
          title: 'Mid-Season Top Dress Fertilizer',
          description: 'Apply nitrogen-rich fertilizer.',
          startDate: '2026-09-10',
          endDate: '2026-09-12',
          status: 'SCHEDULED',
          priority: 'HIGH',
          isReminderSet: true,
        },
        {
          id: `evt-${Date.now()}-4`,
          farmId: farmId || 'farm-1',
          farmName: farmName || 'Green Valley Plot A',
          cropName: 'Corn (Maize)',
          stage: 'HARVESTING',
          title: 'Combine Harvester Operations',
          description: 'Begin main corn harvest.',
          startDate: '2026-11-15',
          endDate: '2026-11-20',
          status: 'SCHEDULED',
          priority: 'CRITICAL',
          isReminderSet: true,
        },
      ];

      mockEvents.push(...generated);

      return res.status(201).json({
        success: true,
        message: 'Generated 120-Day Corn Cycle Schedule successfully.',
        data: generated,
      });
    }

    if (!title || !startDate) {
      return res.status(400).json({ success: false, message: 'Title and start date are required.' });
    }

    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      farmId: farmId || 'farm-1',
      farmName: farmName || 'Green Valley Plot A',
      cropName: cropName || 'Corn',
      stage: stage || 'SOIL_PREPARATION',
      title,
      description: description || '',
      startDate,
      endDate: endDate || startDate,
      status: 'SCHEDULED',
      priority: priority || 'MEDIUM',
      isReminderSet: true,
    };

    mockEvents.push(newEvent);

    return res.status(201).json({
      success: true,
      message: 'Crop event created successfully.',
      data: newEvent,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to create event.' });
  }
};

export const updateEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, title, stage, priority, startDate, endDate } = req.body;

    const eventIndex = mockEvents.findIndex((e) => e.id === id);
    if (eventIndex === -1) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    mockEvents[eventIndex] = {
      ...mockEvents[eventIndex],
      ...(status && { status }),
      ...(title && { title }),
      ...(stage && { stage }),
      ...(priority && { priority }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    return res.json({
      success: true,
      message: 'Event updated successfully.',
      data: mockEvents[eventIndex],
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update event.' });
  }
};

export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    mockEvents = mockEvents.filter((e) => e.id !== id);
    return res.json({ success: true, message: 'Event removed from calendar.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete event.' });
  }
};

export const getReminders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const activeReminders = mockEvents.filter(
      (e) => e.status === 'SCHEDULED' || e.status === 'IN_PROGRESS'
    );

    return res.json({
      success: true,
      count: activeReminders.length,
      data: activeReminders,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch reminders.' });
  }
};
