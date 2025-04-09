import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, CircleCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FocusedNavbar from './FocusedNavbar';
import Navbar from './Navbar';

interface SuccessPageProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

const SuccessPage = ({ description, title, action, secondaryAction }: SuccessPageProps) => {
  return (
    <div>
      <Navbar />

      <div className="mt-30 flex items-center justify-center mt-20">
        <Card className=" shadow-none border-none">
          <CardContent className="pt-12 pb-8 px-10 flex flex-col items-center space-y-4">
            {/* Success Icon */}

            {/* <div className="rounded-full p-2 border-2 border-zinc-200"> */}
            <CircleCheck className="h-12 w-12 text-green-500" />
            {/* </div> */}

            {/* Success Message */}
            <div className="text-center max-w-xl space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
              <p className="text-md text-zinc-600">{description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              {action && (
                <Button variant="outline" className="px-8" onClick={action.onClick}>
                  {action.label}
                </Button>
              )}
              {secondaryAction && (
                <Button className="bg-orange-500 hover:bg-orange-600 px-8" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;
