import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronDown, User } from 'lucide-react';
import ApplicationLayout from '@/Layouts/ApplicationLayout';
import DefaultLayout from '@/Layouts/DefaultLayout';

const CasePage = () => {
  return (
    <DefaultLayout>
      {/* Main Content */}
      <main className="container mx-auto p-10 max-w-2xl bg-white h-full mt-20 rounded-md">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Log a case</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Your input is greatly valued and will be directed to the relevant municipal department for resolution.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Account Number */}
          <div className="space-y-2">
            <label htmlFor="account" className="block text-sm font-medium text-gray-700">
              Account number
            </label>
            <Input id="account" type="text" placeholder="" defaultValue="109826637" className="w-full border-gray-300 rounded" />
          </div>

          {/* Query Type */}
          <div className="space-y-2">
            <label htmlFor="query-type" className="block text-sm font-medium text-gray-700">
              Type of query
            </label>
            <Select>
              <SelectTrigger className="w-full border-gray-300 rounded">
                <SelectValue placeholder="Select a query type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billing">Billing Inquiry</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea id="description" placeholder="e.g Garsfontein" className="w-full min-h-32 border-gray-300 rounded" />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="w-full py-3 bg-primary  text-white font-medium rounded">
              Submit
            </Button>
          </div>
        </form>
      </main>
    </DefaultLayout>
  );
};

export default CasePage;
