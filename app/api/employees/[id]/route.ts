import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Employee from '../../../models/Employee';
import { ApiResponse, IEmployee } from '@/app/types';
import mongoose from 'mongoose';


 //Fetch a single employee by ID
 
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Connect to MongoDB
    await connectDB();

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid employee ID format',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Find employee by ID
    const employee = await Employee.findById(id);

    // Check if employee exists
    if (!employee) {
      const response: ApiResponse = {
        success: false,
        error: 'Employee not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Return success response
    const response: ApiResponse = {
      success: true,
      data: employee,
      message: 'Employee fetched successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error(`GET /api/employees/${id} error:`, error);

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch employee',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

 //Update an employee by ID

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Connect to MongoDB
    await connectDB();

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid employee ID format',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Parse request body
    const body: Partial<IEmployee> = await request.json();
    const { name, email, position, personalInfo, contacts, salary, address } = body;

    // Validate that at least one field is provided
    if (!name && !email && !position && !personalInfo && !contacts && !salary && !address) {
      const response: ApiResponse = {
        success: false,
        error: 'At least one field must be provided for update',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Build update object with only provided fields
    const updateData: Partial<IEmployee> = {};
    if (name) updateData.name = name.trim();
    if (email) {
      // Validate email format
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        const response: ApiResponse = {
          success: false,
          error: 'Invalid email format',
        };
        return NextResponse.json(response, { status: 400 });
      }

      // Check if email is already taken by another employee
      const existingEmployee = await Employee.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });
      if (existingEmployee) {
        const response: ApiResponse = {
          success: false,
          error: 'Email is already taken by another employee',
        };
        return NextResponse.json(response, { status: 409 });
      }

      updateData.email = email.trim().toLowerCase();
    }
    if (position) updateData.position = position.trim();
    if (personalInfo !== undefined) updateData.personalInfo = personalInfo;
    if (contacts !== undefined) updateData.contacts = contacts;
    if (salary !== undefined) updateData.salary = salary;
    if (address !== undefined) updateData.address = address;

    // Update employee and return updated document
    const employee = await Employee.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    );

    // Check if employee exists
    if (!employee) {
      const response: ApiResponse = {
        success: false,
        error: 'Employee not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Return success response
    const response: ApiResponse = {
      success: true,
      data: employee,
      message: 'Employee updated successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error(`PUT /api/employees/${id} error:`, error);

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
        error: 'Email is already taken by another employee',
      };
      return NextResponse.json(response, { status: 409 });
    }

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update employee',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

 //Delete an employee by ID

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Connect to MongoDB
    await connectDB();

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid employee ID format',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Delete employee by ID
    const employee = await Employee.findByIdAndDelete(id);

    // Check if employee exists
    if (!employee) {
      const response: ApiResponse = {
        success: false,
        error: 'Employee not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Return success response
    const response: ApiResponse = {
      success: true,
      data: employee,
      message: 'Employee deleted successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error(`DELETE /api/employees/${id} error:`, error);

    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete employee',
    };

    return NextResponse.json(response, { status: 500 });
  }
}