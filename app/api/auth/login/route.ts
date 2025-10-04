import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { ApiResponse } from '../../../types/index';

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 * Body: { email, password }
 */
export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        error: 'Email and password are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid email or password',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid email or password',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Return success response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    const response: ApiResponse = {
      success: true,
      data: {
        user: userResponse,
        token,
      },
      message: 'Login successful',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error('POST /api/auth/login error:', error);

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed',
    };

    return NextResponse.json(response, { status: 500 });
  }
}