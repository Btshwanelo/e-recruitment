import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Bell } from 'lucide-react';

interface SubscribeAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { email: string; emailNotifications: boolean }) => void;
}

const SubscribeAlertsModal: React.FC<SubscribeAlertsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [email, setEmail] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailPattern.test(e.target.value) || e.target.value === '');
  };

  const handleSave = () => {
    // if (email.trim() === "" || !isValid) {
    //   setIsValid(false);
    //   return;
    // }
    // onSave({ email, emailNotifications });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-green-100 p-2 rounded-full">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Subscribe to Job Alerts</DialogTitle>
          </div>
          <p className="text-gray-500 text-sm mt-2">Get notified about new job opportunities that match your interests.</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className={`w-full ${!isValid ? "border-red-500" : "border-gray-300"}`}
            />
            {!isValid && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
            )}
          </div> */}

          <div className="flex items-center gap-4">
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="text-base font-normal">
                Get email notifications for jobs
              </Label>
              {/* <p className="text-gray-500 text-sm">
                Receive alerts for all new job postings
              </p> */}
            </div>
          </div>

          {/* <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
            <p>You can customize your alert preferences and unsubscribe at any time from your profile settings.</p>
          </div> */}
        </div>

        <DialogFooter className="sm:justify-between border-t border-gray-200 pt-4">
          <Button variant="outline" onClick={onClose} className="bg-white border border-gray-300 text-gray-700">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#005f33] hover:bg-[#0077b3] text-white">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeAlertsModal;
