'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${
          type === 'success'
            ? 'bg-white dark:bg-black border-green-500 dark:border-green-600'
            : 'bg-white dark:bg-black border-red-500 dark:border-red-600'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0" />
        )}
        <p className="text-sm font-medium text-black dark:text-white">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}