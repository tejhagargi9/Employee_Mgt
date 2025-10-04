'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  employeeName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({ isOpen, employeeName, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black dark:text-white">
            Delete Employee
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete <span className="font-semibold text-black dark:text-white">{employeeName}</span>? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-300 dark:border-gray-700 text-black dark:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}