'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { IEmployee } from '../app/types/index';

// Dropdown options
const NATIONALITIES = [
  'American', 'British', 'Canadian', 'Indian', 'Australian', 'German', 'French', 'Chinese', 'Japanese', 'Korean', 'Brazilian', 'Mexican', 'Russian', 'Italian', 'Spanish', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Other'
];

const RELATIONSHIPS = [
  'Spouse', 'Parent', 'Child', 'Sibling', 'Grandparent', 'Grandchild', 'Aunt', 'Uncle', 'Cousin', 'Friend', 'Colleague', 'Other'
];

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'India', 'Australia', 'Germany', 'France', 'China', 'Japan', 'South Korea', 'Brazil', 'Mexico', 'Russia', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Other'
];

const STATES_BY_COUNTRY: Record<string, string[]> = {
  'United States': [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ],
  'Canada': [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
  ],
  'India': [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Puducherry', 'Chandigarh', 'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
  ],
  // Add more countries as needed
};

interface UpdateEmployeeModalProps {
  isOpen: boolean;
  employee: IEmployee | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function UpdateEmployeeModal({ isOpen, employee, onClose, onSuccess, onError }: UpdateEmployeeModalProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    personalInfo: {
      dateOfBirth: '',
      gender: '',
      nationality: '',
    },
    contacts: {
      phone: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: '',
      },
    },
    salary: {
      amount: '',
      currency: 'USD',
      frequency: 'monthly',
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Populate form when employee changes
  useEffect(() => {
    if (employee) {
      setFormData({
        personalInfo: {
          dateOfBirth: employee.personalInfo?.dateOfBirth || '',
          gender: employee.personalInfo?.gender || '',
          nationality: employee.personalInfo?.nationality || '',
        },
        contacts: {
          phone: employee.contacts?.phone || '',
          emergencyContact: {
            name: employee.contacts?.emergencyContact?.name || '',
            phone: employee.contacts?.emergencyContact?.phone || '',
            relationship: employee.contacts?.emergencyContact?.relationship || '',
          },
        },
        salary: {
          amount: employee.salary?.amount?.toString() || '',
          currency: employee.salary?.currency || 'USD',
          frequency: employee.salary?.frequency || 'monthly',
        },
        address: {
          street: employee.address?.street || '',
          city: employee.address?.city || '',
          state: employee.address?.state || '',
          zipCode: employee.address?.zipCode || '',
          country: employee.address?.country || '',
        },
      });
    }
  }, [employee]);

  // Reset form when modal closes
  const handleClose = () => {
    setErrors({});
    setActiveTab('personal');
    onClose();
  };

  // Handle form submission for current tab
  const handleSubmit = async () => {
    if (!employee) return;

    setLoading(true);
    setErrors({});

    try {
      let updateData: Partial<IEmployee> = {};

      switch (activeTab) {
        case 'personal':
          updateData.personalInfo = {
            dateOfBirth: formData.personalInfo.dateOfBirth || undefined,
            gender: formData.personalInfo.gender || undefined,
            nationality: formData.personalInfo.nationality || undefined,
          };
          break;
        case 'contacts':
          // Validate phone numbers
          const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
          if (formData.contacts.phone && !phoneRegex.test(formData.contacts.phone)) {
            setErrors({ phone: 'Please enter a valid phone number' });
            setLoading(false);
            return;
          }
          if (formData.contacts.emergencyContact.phone && !phoneRegex.test(formData.contacts.emergencyContact.phone)) {
            setErrors({ emergencyPhone: 'Please enter a valid emergency contact phone number' });
            setLoading(false);
            return;
          }
          updateData.contacts = {
            phone: formData.contacts.phone || undefined,
            emergencyContact: {
              name: formData.contacts.emergencyContact.name || undefined,
              phone: formData.contacts.emergencyContact.phone || undefined,
              relationship: formData.contacts.emergencyContact.relationship || undefined,
            },
          };
          break;
        case 'salary':
          updateData.salary = {
            amount: formData.salary.amount ? parseFloat(formData.salary.amount) : undefined,
            currency: formData.salary.currency,
            frequency: formData.salary.frequency as 'monthly' | 'yearly' | 'hourly',
          };
          break;
        case 'address':
          updateData.address = {
            street: formData.address.street || undefined,
            city: formData.address.city || undefined,
            state: formData.address.state || undefined,
            zipCode: formData.address.zipCode || undefined,
            country: formData.address.country || undefined,
          };
          break;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`/api/employees/${employee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        onError(data.error || `Failed to update ${activeTab} information`);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      onError(`Error updating ${activeTab} information`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">Update Employee Details</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Update {employee?.name}'s information across different categories.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth" className="text-black dark:text-white">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value }
                  })}
                  className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="gender" className="text-black dark:text-white">
                  Gender
                </Label>
                <Select
                  value={formData.personalInfo.gender}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, gender: value }
                  })}
                >
                  <SelectTrigger className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="nationality" className="text-black dark:text-white">
                  Nationality
                </Label>
                <Select
                  value={formData.personalInfo.nationality}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, nationality: value }
                  })}
                >
                  <SelectTrigger className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                    {NATIONALITIES.map((nat) => (
                      <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-black dark:text-white">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.contacts.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacts: { ...formData.contacts, phone: e.target.value }
                  })}
                  className={`mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
              </div>
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-black dark:text-white mb-3">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyName" className="text-black dark:text-white">
                      Name
                    </Label>
                    <Input
                      id="emergencyName"
                      type="text"
                      value={formData.contacts.emergencyContact.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: {
                          ...formData.contacts,
                          emergencyContact: { ...formData.contacts.emergencyContact, name: e.target.value }
                        }
                      })}
                      className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone" className="text-black dark:text-white">
                      Phone
                    </Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.contacts.emergencyContact.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: {
                          ...formData.contacts,
                          emergencyContact: { ...formData.contacts.emergencyContact, phone: e.target.value }
                        }
                      })}
                      className={`mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white ${errors.emergencyPhone ? 'border-red-500' : ''}`}
                      placeholder="+1 (555) 987-6543"
                    />
                    {errors.emergencyPhone && <span className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</span>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="emergencyRelationship" className="text-black dark:text-white">
                      Relationship
                    </Label>
                    <Select
                      value={formData.contacts.emergencyContact.relationship}
                      onValueChange={(value) => setFormData({
                        ...formData,
                        contacts: {
                          ...formData.contacts,
                          emergencyContact: { ...formData.contacts.emergencyContact, relationship: value }
                        }
                      })}
                    >
                      <SelectTrigger className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                        {RELATIONSHIPS.map((rel) => (
                          <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="salary" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="salaryAmount" className="text-black dark:text-white">
                  Amount
                </Label>
                <Input
                  id="salaryAmount"
                  type="number"
                  value={formData.salary.amount}
                  onChange={(e) => setFormData({
                    ...formData,
                    salary: { ...formData.salary, amount: e.target.value }
                  })}
                  className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
                  placeholder="50000"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="currency" className="text-black dark:text-white">
                  Currency
                </Label>
                <Select
                  value={formData.salary.currency}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    salary: { ...formData.salary, currency: value }
                  })}
                >
                  <SelectTrigger className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="frequency" className="text-black dark:text-white">
                  Frequency
                </Label>
                <Select
                  value={formData.salary.frequency}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    salary: { ...formData.salary, frequency: value }
                  })}
                >
                  <SelectTrigger className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="address" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="street" className="text-black dark:text-white">
                  Street Address
                </Label>
                <Input
                  id="street"
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value }
                  })}
                  className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-black dark:text-white">
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                  className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
                  placeholder="New York"
                />
              </div>
              <div>
                <Label htmlFor="country" className="text-black dark:text-white">
                  Country
                </Label>
                <Select
                  value={formData.address.country}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    address: { ...formData.address, country: value, state: '' } // Reset state when country changes
                  })}
                >
                  <SelectTrigger className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="state" className="text-black dark:text-white">
                  State/Province
                </Label>
                <Select
                  value={formData.address.state}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    address: { ...formData.address, state: value }
                  })}
                  disabled={!formData.address.country || !STATES_BY_COUNTRY[formData.address.country]}
                >
                  <SelectTrigger className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
                    <SelectValue placeholder="Select state/province" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
                    {formData.address.country && STATES_BY_COUNTRY[formData.address.country] &&
                      STATES_BY_COUNTRY[formData.address.country].map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-black dark:text-white">
                  ZIP/Postal Code
                </Label>
                <Input
                  id="zipCode"
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, zipCode: e.target.value }
                  })}
                  className="mt-1 border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
                  placeholder="10001"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
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
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              `Update ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}