'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Mail, MapPin, DollarSign, Calendar, Users } from 'lucide-react';
import { IEmployee } from '../app/types';

interface ViewProfileModalProps {
  isOpen: boolean;
  employee: IEmployee | null;
  onClose: () => void;
}

export default function ViewProfileModal({ isOpen, employee, onClose }: ViewProfileModalProps) {
  if (!employee) return null;

  const formatSalary = (salary: IEmployee['salary']) => {
    if (!salary?.amount) return 'Not specified';
    const currency = salary.currency || 'USD';
    const frequency = salary.frequency || 'monthly';
    return `${currency} ${salary.amount.toLocaleString()} / ${frequency}`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            {employee.name}'s Profile
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Complete employee information and details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                <span className="font-medium text-black dark:text-white">{employee.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                <span className="font-medium text-black dark:text-white">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Position:</span>
                <Badge variant="secondary">{employee.position}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Joined:</span>
                <span className="font-medium text-black dark:text-white">
                  {employee.createdAt ? formatDate(employee.createdAt.toString()) : 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Personal Information</h3>
            {employee.personalInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Date of Birth:</span>
                  <p className="font-medium text-black dark:text-white">
                    {formatDate(employee.personalInfo.dateOfBirth)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Gender:</span>
                  <p className="font-medium text-black dark:text-white capitalize">
                    {employee.personalInfo.gender || 'Not specified'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Nationality:</span>
                  <p className="font-medium text-black dark:text-white">
                    {employee.personalInfo.nationality || 'Not specified'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No personal information provided</p>
            )}
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Contact Information</h3>
            {employee.contacts ? (
              <div className="space-y-4">
                {employee.contacts.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                    <span className="font-medium text-black dark:text-white">{employee.contacts.phone}</span>
                  </div>
                )}
                {employee.contacts.emergencyContact && (
                  <div>
                    <h4 className="text-sm font-medium text-black dark:text-white mb-2">Emergency Contact</h4>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Name:</span>{' '}
                        <span className="font-medium text-black dark:text-white">
                          {employee.contacts.emergencyContact.name || 'Not specified'}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Phone:</span>{' '}
                        <span className="font-medium text-black dark:text-white">
                          {employee.contacts.emergencyContact.phone || 'Not specified'}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Relationship:</span>{' '}
                        <span className="font-medium text-black dark:text-white">
                          {employee.contacts.emergencyContact.relationship || 'Not specified'}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                {!employee.contacts.phone && !employee.contacts.emergencyContact && (
                  <p className="text-gray-500 dark:text-gray-400 italic">No contact information provided</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No contact information provided</p>
            )}
          </div>

          <Separator />

          {/* Salary Information */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Salary Information</h3>
            {employee.salary ? (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-black dark:text-white">{formatSalary(employee.salary)}</span>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No salary information provided</p>
            )}
          </div>

          <Separator />

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Address Information</h3>
            {employee.address ? (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <div className="space-y-1">
                  {employee.address.street && <p className="font-medium text-black dark:text-white">{employee.address.street}</p>}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {[employee.address.city, employee.address.state, employee.address.zipCode].filter(Boolean).join(', ')}
                  </p>
                  {employee.address.country && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{employee.address.country}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No address information provided</p>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={onClose}
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}