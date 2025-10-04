import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { ApiResponse } from '../../../types/index';

/**
 * POST /api/auth/update-password
 * Update user password (requires authentication)
 * Headers: Authorization: Bearer <token>
 * Body: { currentPassword, newPassword }
 */
export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'Authorization token required',
      };
      return NextResponse.json(response, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Verify token
    let decoded: jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as jwt.JwtPayload;
    } catch (_error) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid or expired token',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Parse request body
    const { currentPassword, newPassword } = await request.json();

    // Validate required fields
    if (!currentPassword || !newPassword) {
      const response: ApiResponse = {
        success: false,
        error: 'Current password and new password are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Validate new password length
    if (newPassword.length < 6) {
      const response: ApiResponse = {
        success: false,
        error: 'New password must be at least 6 characters',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Find user by ID from token
    const user = await User.findById(decoded.userId);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: 'User not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      const response: ApiResponse = {
        success: false,
        error: 'Current password is incorrect',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    // Return success response
    const response: ApiResponse = {
      success: true,
      message: 'Password updated successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error('POST /api/auth/update-password error:', error);

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update password',
    };

    return NextResponse.json(response, { status: 500 });
  }
}