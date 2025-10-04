'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Loader2, Users } from 'lucide-react';
import { IEmployee } from '../app/types/index';

interface EmployeeTableProps {
  employees: IEmployee[];
  loading: boolean;
  onEdit: (employee: IEmployee) => void;
  onDelete: (employee: IEmployee) => void;
}

export default function EmployeeTable({ employees, loading, onEdit, onDelete }: EmployeeTableProps) {
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
        <p className="text-gray-500 dark:text-gray-400">Loading employees...</p>
      </div>
    );
  }

  // Empty state
  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <Users className="h-16 w-16 text-gray-400" />
        <h3 className="text-xl font-semibold text-black dark:text-white">No employees found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          Get started by adding your first employee or adjust your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900">
            <TableHead className="font-semibold text-black dark:text-white">Name</TableHead>
            <TableHead className="font-semibold text-black dark:text-white">Email</TableHead>
            <TableHead className="font-semibold text-black dark:text-white">Position</TableHead>
            <TableHead className="font-semibold text-black dark:text-white text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow 
              key={employee._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <TableCell className="font-medium text-black dark:text-white">
                {employee.name}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {employee.email}
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {employee.position}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(employee)}
                    className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(employee)}
                    className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}