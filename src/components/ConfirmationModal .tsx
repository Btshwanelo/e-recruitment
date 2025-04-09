import React from 'react';
import { X, Check, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Reusable Modal Component
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  confirmButtonColor = 'bg-primary', // Orange color from the design
  icon = 'check', // Default icon is check
}) => {
  const renderIcon = () => {
    if (icon === 'check') {
      return (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        </div>
      );
    }
    // Add more icon options as needed
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/1" />
      <DialogContent className="max-w-[400px] p-0 rounded-lg overflow-hidden bg-white ">
        <div className="">
          {/* Close Button */}
          {/* <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button> */}

          <div className="p-6">
            {/* Icon */}
            <div className="flex justify-start mb-4">{renderIcon()}</div>

            {/* Content */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 py-2 px-2 border border-primary bg-white text-primary  rounded-md hover:bg-gray-50"
              >
                {cancelText}
              </Button>
              <Button onClick={onConfirm} className={`flex-1 py-2 px-2 text-white rounded-md ${confirmButtonColor}`}>
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Example usage component
const SaveApplicationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Save Application"
      description="You're about to save this loan application and exit, you can continue anytime after saving"
      cancelText="Cancel"
      confirmText="Confirm"
    />
  );
};

export default SaveApplicationModal;
