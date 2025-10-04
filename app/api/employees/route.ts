import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Employee from '../../models/Employee';
import { ApiResponse, IEmployee } from '../../types/index';

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Extract query parameters
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const position = searchParams.get('position') || '';
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Build query filter
    const filter: Record<string, unknown> = {};

    // Add search filter (case-insensitive regex search)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
      ];
    }

    // Add position filter (exact match)
    if (position) {
      filter.position = position;
    }

    // Fetch employees with filters, pagination, and sorting
    const employees = await Employee.find(filter)
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(limit)
      .skip(skip)
      .lean(); // Convert to plain JavaScript objects for better performance

    // Get total count for pagination
    const total = await Employee.countDocuments(filter);

    // Return success response
    const response: ApiResponse = {
      success: true,
      data: {
        employees,
        total,
        limit,
        skip,
      },
      message: 'Employees fetched successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error('GET /api/employees error:', error);

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch employees',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

//create employee

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body: IEmployee = await request.json();
    const { name, email, position } = body;

    // Validate required fields
    if (!name || !email || !position) {
      const response: ApiResponse = {
        success: false,
        error: 'Name, email, and position are required',
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

    // Check if employee with email already exists
    const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
    if (existingEmployee) {
      const response: ApiResponse = {
        success: false,
        error: 'Employee with this email already exists',
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Create new employee
    const employee = await Employee.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      position: position.trim(),
    });

    // Return success response
    const response: ApiResponse = {
      success: true,
      data: employee,
      message: 'Employee created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/employees error:', error);

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
        error: 'Employee with this email already exists',
      };
      return NextResponse.json(response, { status: 409 });
    }

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create employee',
    };

    return NextResponse.json(response, { status: 500 });
  }
}