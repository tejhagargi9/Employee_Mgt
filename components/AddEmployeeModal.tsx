'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function AddEmployeeModal({ isOpen, onClose, onSuccess, onError }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Reset form when modal closes
  const handleClose = () => {
    setFormData({ name: '', email: '', position: '' });
    setErrors({});
    onClose();
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    } else if (formData.position.trim().length < 2) {
      newErrors.position = 'Position must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        handleClose();
      } else {
        onError(data.error || 'Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      onError('Error adding employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">Add New Employee</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Fill in the details to add a new employee to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="text-black dark:text-white">
              Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`mt-1 ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-black text-black dark:text-white`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-black dark:text-white">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`mt-1 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-black text-black dark:text-white`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Position Field */}
          <div>
            <Label htmlFor="position" className="text-black dark:text-white">
              Position *
            </Label>
            <Input
              id="position"
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className={`mt-1 ${errors.position ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-black text-black dark:text-white`}
              placeholder="Software Engineer"
            />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="border-gray-300 dark:border-gray-700 text-black dark:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Employee'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}