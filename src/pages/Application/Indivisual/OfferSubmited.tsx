import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicationLayout from '@/Layouts/ApplicationLayout';

const LoanApplicationSuccess = ({ applicationId, amount }: { applicationId?: string, amount?: string }) => {
  const navigate = useNavigate();
  

  return (
    <ApplicationLayout>
    <div className="mt-8 b max-w-4xl w-screen mx-auto flex items-center justify-center min-h-96">
      <Card className="border-none bg-inherit shadow-none">
        <CardContent className="pt-12 pb-10 px-10 flex flex-col items-center space-y-6">
          {/* Success Icon */}
          <div className="rounded-lg p-4">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </div>

          {/* Success Message */}
          <div className="text-center space-y-4 max-w-lg">
            <h2 className="text-2xl font-bold text-primary font-serif">Thank you</h2>
            <h3 className="text-xl font-semibold text-gray-800">Your Loan Application Was Submitted</h3>
            
            {applicationId && (
              <p className="text-md text-gray-600">
                Application ID: <span className="font-medium">{applicationId}</span>
              </p>
            )}
            
            {amount && (
              <p className="text-lg font-medium text-gray-800 mt-2">
                Approved amount: <span className="text-green-700">${amount}</span>
              </p>
            )}
            
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-md text-gray-700">
                We've sent all the details to your email. Our team will contact you soon with next steps.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-3 w-full max-w-xs">
            <Button 
              variant="default" 
              className="mt-4 bg-primary  text-white font-medium py-6" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            
          </div>
          
          {/* <p className="text-sm text-gray-500">
            Questions? Contact us at{' '}
            <a href="mailto:support@xiquelgroup.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@xiquelgroup.com
            </a>
          </p> */}
        </CardContent>
      </Card>
    </div>
    </ApplicationLayout>
  );
};

export default LoanApplicationSuccess;