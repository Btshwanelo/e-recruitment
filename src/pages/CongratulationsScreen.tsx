// CongratulationsScreen.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ApplicationLayout from '@/Layouts/ApplicationLayout';

const CongratulationsScreen = () => {
  const dispatch = useDispatch();
  //   const loanDetails = useSelector((state) => state.loanApplication.approvedLoan);

  const handleTakeOffer = () => {
    console.log('Taking up offer...');
    // Add your navigation or submission logic here
  };

  return (
    <ApplicationLayout>
      {/* Main Content */}
      <div className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Form */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-16">
            <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
            <p className="text-gray-700 mb-8">
              We are delighted to inform you that your loan has been approved! To facilitate the disbursement process, please provide the
              necessary pending documents, and let us know if you need any assistance
            </p>

            <div className="space-y-6">
              {/* Price of the loan */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Price of the loan <span className="text-blue-500">*</span>
                </label>
                <div className="flex">
                  <div className="bg-gray-50 border border-gray-300 text-gray-700 px-3 flex items-center rounded-l-md">R</div>
                  <Input type="text" className="bg-white border-l border-gray-100 rounded-l-none" defaultValue="1050000" />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Interest Rate <span className="text-blue-500">*</span>
                </label>
                <Input type="text" defaultValue="5%" className="bg-white border-l border-gray-100" />
              </div>

              {/* Deposit */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Deposit (optional) <span className="text-blue-500">*</span>
                </label>
                <div className="flex">
                  <div className="bg-gray-50 border border-gray-300 text-gray-700 px-3 flex items-center rounded-l-md">R</div>
                  <Input type="text" className="bg-white border-l border-gray-100 rounded-l-none" defaultValue="0" />
                </div>
              </div>

              {/* Payment term */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Payment term (years) <span className="text-blue-500">*</span>
                </label>
                <Select defaultValue="5">
                  <SelectTrigger className="w-full bg-white border-gray-100">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right Column - Donut Chart */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Donut Chart */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Light gray background circle */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f1f1" strokeWidth="15" />

                {/* Colored segments - Counterclockwise from the top */}
                {/* Capital Amount - Blue (60%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#0088CC"
                  strokeWidth="15"
                  strokeDasharray="150.8 251.2"
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />

                {/* Interest - Light Blue (25%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#45CCF5"
                  strokeWidth="15"
                  strokeDasharray="62.8 339.2"
                  strokeDashoffset="-150.8"
                  transform="rotate(-90 50 50)"
                />

                {/* Fees - Very Light Blue (9%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#ABE9FF"
                  strokeWidth="15"
                  strokeDasharray="25.1 376.9"
                  strokeDashoffset="-213.6"
                  transform="rotate(-90 50 50)"
                />

                {/* Insurance - Cyan (6%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth="15"
                  strokeDasharray="12.6 389.4"
                  strokeDashoffset="-238.7"
                  transform="rotate(-90 50 50)"
                />
              </svg>

              {/* Legend */}
              <div className="absolute top-0 -right-32 space-y-3">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#00D4FF] mr-2"></span>
                  <div className="text-sm">
                    <div>Insurance</div>
                    <div className="text-gray-500">R 15 000</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#0088CC] mr-2"></span>
                  <div className="text-sm">
                    <div>Capital Amount</div>
                    <div className="text-gray-500">R 1 000 000</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#45CCF5] mr-2"></span>
                  <div className="text-sm">
                    <div>Interest</div>
                    <div className="text-gray-500">R 50 000</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#ABE9FF] mr-2"></span>
                  <div className="text-sm">
                    <div>Fees</div>
                    <div className="text-gray-500">R32 000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 bg-orange-300 py-8 px-4 rounded-md text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to take the next step?</h2>
          <Button onClick={handleTakeOffer} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2">
            Take up offer
          </Button>
        </div>
      </div>

      {/* Footer */}
    </ApplicationLayout>
  );
};

export default CongratulationsScreen;
