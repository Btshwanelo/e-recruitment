import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from './ui/button';

const DismissableAlerts = ({ alerts: initialAlerts }) => {
  const [alerts, setAlerts] = useState(initialAlerts);

  const dismissAlert = (index) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  if (!alerts?.length) return null;

  return (
    <div className="relative h-8 container mx-auto mt-1">
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          className={`
            absolute 
            w-full 
            transition-all 
            duration-300 
            ease-in-out
            rounded-none
            border-none
            py-2
            bg-blue-200
            ${index === 0 ? 'z-30' : ''}
            ${index === 1 ? 'z-20 translate-y-2 opacity-90 scale-[0.98]' : ''}
            ${index === 2 ? 'z-10 translate-y-4 opacity-80 scale-[0.96]' : ''}
            ${index > 2 ? 'hidden' : ''}
          `}
        >
          <AlertDescription className="pr-8">
            <div className="flex items-start justify-between">
              <span className="line-clamp-1 font-medium">{alert.message}</span>
              <button
                onClick={() => dismissAlert(index)}
                className="absolute right-2 top-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            {/* <Button
              href={alert.actionLink}
              className="block mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Take Action →
            </Button> */}
            {/* <a href={alert.actionLink} className="block mt-1 text-sm font-medium text-blue-600 hover:text-blue-800">
              Take Action →
            </a> */}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default DismissableAlerts;
