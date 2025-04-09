import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ApplicationLayout from '@/Layouts/ApplicationLayout';
import DefaultLayout from '@/Layouts/DefaultLayout';

const StatementsPage = () => {
  return (
    <DefaultLayout>
      {/* Main Content */}
      <div className="p-10 max-w-4xl mx-auto bg-white mt-20 rounded-md">
        <h1 className="text-2xl font-bold mb-6">Statements and Documents</h1>

        {/* Account Selection */}
        <div className="mb-6">
          <p className="mb-2 text-gray-700">Select an account</p>
          <Select defaultValue="loan">
            <SelectTrigger className="w-full max-w-xs border rounded-md py-2 px-3">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loan">Loan account</SelectItem>
              <SelectItem value="savings">Savings account</SelectItem>
              <SelectItem value="checking">Checking account</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="statements">
          <TabsList className="border-b w-full justify-start space-x-6 bg-transparent p-0">
            <TabsTrigger
              value="statements"
              className="py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:font-medium rounded-none px-0 hover:text-blue-600"
            >
              Statements
            </TabsTrigger>
            <TabsTrigger
              value="statement-enquiry"
              className="py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:font-medium rounded-none px-0 hover:text-blue-600"
            >
              Statement Enquiry
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:font-medium rounded-none px-0 hover:text-blue-600"
            >
              Documents
            </TabsTrigger>
          </TabsList>

          {/* Statements Content */}
          <TabsContent value="statements" className="mt-6">
            <div className="mb-4">
              <p className="font-medium">2024</p>
              <div className="h-px bg-gray-200 my-4 w-full"></div>
            </div>

            {/* Info Alert */}
            <Alert className="bg-blue-50 border-blue-100 rounded-md py-3 px-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="text-gray-500 h-5 w-5 mr-2 mt-0.5" />
                <AlertDescription className="text-gray-700">
                  Fees may be applicable on specific statements depending on your account type.
                </AlertDescription>
              </div>
            </Alert>

            {/* This would be where statement items are listed */}
            <div className="py-10 text-center text-gray-500">No statements available for the selected period.</div>
          </TabsContent>

          {/* Other Tab Contents */}
          <TabsContent value="statement-enquiry">
            <div className="py-10 text-center text-gray-500">Statement Enquiry content will appear here.</div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="py-10 text-center text-gray-500">Documents content will appear here.</div>
          </TabsContent>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default StatementsPage;
