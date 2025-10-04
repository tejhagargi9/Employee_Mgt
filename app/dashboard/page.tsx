'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, ArrowLeft, LogOut, User } from 'lucide-react';
import EmployeeTable from '@/components/EmployeeTable';
import AddEmployeeModal from '@/components/AddEmployeeModal';
import EditEmployeeModal from '@/components/EditEmployeeModal';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import Toast from '@/components/Toast';
import { IEmployee } from '@/app/types';

export default function DashboardPage() {
  const router = useRouter();

  // State management
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<IEmployee | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Toast state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  /**
    * Fetch employees from API
    */
   const fetchEmployees = useCallback(async (search: string = '') => {
     try {
       setLoading(true);
       const url = search
         ? `/api/employees?search=${encodeURIComponent(search)}`
         : '/api/employees';

       const response = await fetch(url);
       const data = await response.json();

       if (data.success) {
         setEmployees(data.data.employees);
       } else {
         showToast('Failed to fetch employees', 'error');
       }
     } catch (error) {
       console.error('Error fetching employees:', error);
       showToast('Error loading employees', 'error');
     } finally {
       setLoading(false);
     }
   }, []);

  // Fetch employees on mount and when search changes
  useEffect(() => {
    fetchEmployees(searchQuery);
  }, [searchQuery, fetchEmployees]);

  /**
   * Handle search input with debouncing
   */
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  /**
   * Handle adding new employee
   */
  const handleAddEmployee = () => {
    setShowAddModal(true);
  };

  /**
   * Handle edit employee
   */
  const handleEditEmployee = (employee: IEmployee) => {
    setEditingEmployee(employee);
  };

  /**
   * Handle delete employee
   */
  const handleDeleteEmployee = (employee: IEmployee) => {
    setDeletingEmployee(employee);
  };

  /**
   * Confirm delete employee
   */
  const confirmDelete = async () => {
    if (!deletingEmployee) return;

    try {
      const response = await fetch(`/api/employees/${deletingEmployee._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        showToast('Employee deleted successfully', 'success');
        fetchEmployees(searchQuery); // Refresh list
        setDeletingEmployee(null);
      } else {
        showToast(data.error || 'Failed to delete employee', 'error');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      showToast('Error deleting employee', 'error');
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  /**
    * Show toast notification
    */
   const showToast = (message: string, type: 'success' | 'error') => {
     setToast({ show: true, message, type });
   };

  /**
   * Handle successful employee creation
   */
  const handleEmployeeCreated = () => {
    setShowAddModal(false);
    fetchEmployees(searchQuery);
    showToast('Employee added successfully', 'success');
  };

  /**
   * Handle successful employee update
   */
  const handleEmployeeUpdated = () => {
    setEditingEmployee(null);
    fetchEmployees(searchQuery);
    showToast('Employee updated successfully', 'success');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="text-black dark:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Employee Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4" />
                  <span>Welcome, {user.name}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/update-password')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Add Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search employees by name, email, or position..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
            />
          </div>

          {/* Add Employee Button */}
          <Button
            onClick={handleAddEmployee}
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Employee Table */}
        <EmployeeTable
          employees={employees}
          loading={loading}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      </main>

      {/* Modals */}
      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleEmployeeCreated}
        onError={(message) => showToast(message, 'error')}
      />

      <EditEmployeeModal
        isOpen={!!editingEmployee}
        employee={editingEmployee}
        onClose={() => setEditingEmployee(null)}
        onSuccess={handleEmployeeUpdated}
        onError={(message) => showToast(message, 'error')}
      />

      <DeleteConfirmDialog
        isOpen={!!deletingEmployee}
        employeeName={deletingEmployee?.name || ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingEmployee(null)}
      />

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}