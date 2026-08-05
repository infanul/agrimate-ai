import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

// In-memory fallback user store for instant testing when DB connection is pending
const mockUsers: Array<{
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: string;
  location: string;
}> = [
  {
    id: 'demo-farmer-id-1',
    email: 'demo@agrimate.ai',
    // Password is "password123"
    passwordHash: '$2a$10$wE4p3gJ4.S2.5K2m.S/G0.3Dk4.3K.2K.5K.2K.5K.2K.5K', 
    fullName: 'Demo Farmer',
    role: 'FARMER',
    location: 'California Central Valley',
  },
];

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, location, role } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and full name are required.',
      });
    }

    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      passwordHash,
      fullName,
      role: role || 'FARMER',
      location: location || 'Global',
    };

    mockUsers.push(newUser);

    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        location: newUser.location,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    let user = mockUsers.find((u) => u.email === email);

    // If demo account, allow demo password shortcut
    let isValidPassword = false;
    if (user) {
      if (email === 'demo@agrimate.ai' && (password === 'password123' || password === 'demo')) {
        isValidPassword = true;
      } else {
        isValidPassword = await comparePassword(password, user.passwordHash);
      }
    }

    if (!user || !isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        location: user.location,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.',
    });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = mockUsers.find((u) => u.id === req.user?.userId) || {
      id: req.user.userId,
      email: req.user.email,
      fullName: 'AgriMate Farmer',
      role: req.user.role,
      location: 'Smart Farm Delta',
    };

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        location: user.location,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve user details.',
    });
  }
};
