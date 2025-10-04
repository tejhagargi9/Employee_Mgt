import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { ApiResponse, IUser } from '../../../types/index';

/**
 * POST /api/auth/signup
 * Create a new user account
 * Body: { name, email, password }
 */
export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body: IUser = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      const response: ApiResponse = {
        success: false,
        error: 'Name, email, and password are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid email format',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if user with email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        error: 'User with this email already exists',
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create new user
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password, // Will be hashed by pre-save hook
    });

    // Return success response (exclude password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    const response: ApiResponse = {
      success: true,
      data: userResponse,
      message: 'User created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/auth/signup error:', error);

    // Handle Mongoose validation errors
    if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
      const response: ApiResponse = {
        success: false,
        error: Object.values((error as unknown as { errors: Record<string, { message: string }> }).errors)
          .map((err) => err.message)
          .join(', '),
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Handle duplicate key error
    if (error instanceof Error && 'code' in error && (error as unknown as { code: number }).code === 11000) {
      const response: ApiResponse = {
        success: false,
        error: 'User with this email already exists',
      };
      return NextResponse.json(response, { status: 409 });
    }

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };

    return NextResponse.json(response, { status: 500 });
  }
}