// Dashboard.jsx
import { useState } from 'react';
import { Bell, ChevronRight, Info, Search, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { applicationResume, setResumeApplication, updateApplication } from '@/slices/loanSlice';
import useProfile from '@/hooks/useProfile';
import DefaultLayout from '@/Layouts/DefaultLayout';

const DashboardPage = () => {
  const [showFundingNotice, setShowFundingNotice] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileDetails = useProfile();
  const handleResume = () => {
    dispatch(
      updateApplication({
        currentStep: 0,
        isNewApplication: false,
        isExistingApplication: false,
        isResumeApplication: true,
        currentApplicationId: '48cf70a9-bc5d-4eec-96ee-030761ff2d56',
      })
    );
    navigate('/application');
  };
  return (
    <DefaultLayout>
      {/* Main Content */}
      <main className="px-16 py-8  m-4 container mx-auto bg-white rounded-xl max-md:p-4">
        {/* Funding Notice */}
        {showFundingNotice && (
          <div className="bg-white p-4  border-b border-gray-200 mb-6 flex items-center justify-between">
            <div className="flex items-start md:items-center">
              <div className="p-2 bg-gray-100 rounded-full mr-4">
                <Info size={20} className="text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">You may qualify for additional funding</h3>
                <p className="text-gray-600 text-sm">
                  based on your performance and repayment track record, your profile may be eligible for additional funding
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="border border-gray-300 px-4 py-2 rounded-md text-sm">Learn more</button>
              <button onClick={() => navigate('/application')} className="bg-primary text-white px-4 py-2 rounded-md text-sm">
                Apply
              </button>
              <button onClick={() => setShowFundingNotice(false)} className="p-1">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome Back,{' '}
              <span className="text-gray-800">
                {profileDetails.profileDetails.Name} {profileDetails.profileDetails.Surname}
              </span>
            </h1>
            <p className="text-gray-600">Manage your loan account here.</p>
          </div>
          <div className="w-full max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Account Details and Transactions */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Account Details Column */}
          <div className="w-full md:w-1/3 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Account Details</h2>
              <div onClick={()=>navigate('/saved-applications')} className="bg-white p-4 cursor-pointer rounded-md border border-gray-200 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center mr-3">
                      <span className="text-yellow-500">📄</span>
                    </div>
                    <span className="font-medium">Loan Account • - - - </span>
                  </div>
                  <button>⋮</button>
                </div>
                <div className="mb-4">
                  <h3 className="text-3xl font-bold">R _ _ _ _</h3>
                  {/* <p className="text-gray-600">Outstanding</p> */}
                </div>
                {/* <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-500">Installment Amount</p>
                    <p className="font-medium">R16666.67</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment date</p>
                    <p className="font-medium">30th</p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Features</h2>
              <div className="space-y-2">
                <div
                  onClick={() => navigate('/case')}
                  className="bg-white p-4 cursor-pointer rounded-md border border-gray-200 flex justify-between items-center"
                >
                  <span className="text-gray-700">Log a case</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
                <div
                  onClick={() => navigate('/account')}
                  className="bg-white p-4 cursor-pointer rounded-md border border-gray-200 flex justify-between items-center"
                >
                  <span className="text-gray-700">Account Details</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
                <div
                  onClick={() => navigate('/statements')}
                  className="bg-white p-4 cursor-pointer rounded-md border border-gray-200 flex justify-between items-center"
                >
                  <span className="text-gray-700">Statement and Documents</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Column */}
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Transactions</h2>
              <Button onClick={() => navigate('/statements')} variant={'ghost'} className="text-primary cursor-pointer flex items-center">
                Statements <ChevronRight size={16} />
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4 bg-inherit  justify-start">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white rounded-none min-w-28 pb-2"
                >
                  All transactions
                </TabsTrigger>
                <TabsTrigger
                  value="failed"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white rounded-none min-w-28 pb-2"
                >
                  failed
                </TabsTrigger>
                <TabsTrigger
                  value="once-off"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white rounded-none min-w-28 pb-2"
                >
                  Once-off
                </TabsTrigger>
              </TabsList>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                {/* <table className="w-full text-sm rounded-lg">
                  <thead className="bg-[#F9FAFB] ">
                    <tr className="border-b border-gray-200 ">
                      <th className="p-4 text-left font-medium text-[#475467]">Date</th>
                      <th className="p-4 text-left font-medium text-[#475467]">
                        Description <span>↓</span>
                      </th>
                      <th className="p-4 text-right font-medium text-[#475467]">
                        Amount <Info size={14} className="inline ml-1" />
                      </th>
                      <th className="p-4 text-right font-medium text-[#475467]">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-4">30/09/2024</td>
                      <td className="p-4">Repayment dbt order</td>
                      <td className="p-4 text-right text-green-600">16666.67</td>
                      <td className="p-4 text-right">1050000</td>
                    </tr>
                    <tr>
                      <td className="p-4">31/10/2024</td>
                      <td className="p-4">Repayment dbt order</td>
                      <td className="p-4 text-right text-green-600">16666.67</td>
                      <td className="p-4 text-right">1050000</td>
                    </tr>
                  </tbody>
                </table> */}
                No active Loan
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default DashboardPage;
