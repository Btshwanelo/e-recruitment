import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleX, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ message }: any) => {
  const navigate = useNavigate();
  return (
    <div className="mt-30 bg-inherit max-w-4xl w-screen mx-auto flex items-center justify-center min-h-96">
      <Card className="shadow-none bg-inherit border-none">
        <CardContent className="pt-12 pb-8 px-10 flex flex-col items-center space-y-2">
          {/* Clock Icon */}
          {/* <div className="rounded-full p-2 border-2 border-zinc-200"> */}
          <CircleX className="w-12 h-12 text-red-500" />
          {/* </div> */}

          {/* Error Message */}
          <div className="text-center space-y-3 max-w-lg">
            <h2 className="text-xl font-semibold text-zinc-900">{message || 'Opps! Something went wrong'}</h2>
            <p className="text-md text-zinc-600">Please try again later, if issue persists please contact support at </p>
            <a href="mailto:support@xiquelgroup.com" className="text-blue-600 text-md hover:text-blue-700">
              support@xiquelgroup.com
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-2">
            {/* Back to Home Button */}
            <Button variant="outline" className="mt-6 min-w-28" onClick={() => window.location.reload()}>
              Refresh
            </Button>
            <Button variant="default" className="mt-6 min-w-28 text-white hover:bg-orange-700" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
