// UploadDocumentsScreen.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, CheckCircle } from 'lucide-react';
import ApplicationLayout from '@/Layouts/ApplicationLayout';
import OfferSubmited from './OfferSubmited';

const Documents = () => {
  const dispatch = useDispatch();
  const [isOfferSubmitted, setIsOfferSubmitted] = useState(false)
  const [files, setFiles] = useState({
    payslip: { name: 'Payslip.pdf', uploaded: true },
    idDocument: { name: 'my_id_final.pdf', uploaded: true },
  });

  const handleFileChange = (fileType, e) => {
    if (e.target.files.length > 0) {
      setFiles({
        ...files,
        [fileType]: {
          name: e.target.files[0].name,
          uploaded: true,
        },
      });
    }
  };

  const handleClearFile = (fileType) => {
    setFiles({
      ...files,
      [fileType]: {
        name: '',
        uploaded: false,
      },
    });
  };

  const handleNextClick = () => {
    setIsOfferSubmitted(true)
    console.log('Proceeding to next step...');
    // Navigate to next page logic
  };

  const handlePreviousClick = () => {
    console.log('Going back to previous step...');
    // Navigate to previous page logic
  };

  if(isOfferSubmitted){
    return <OfferSubmited />
  }

  return (
    <ApplicationLayout>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center">
            <div className="rounded-full bg-sky-500 p-1">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div className="h-0.5 w-20 bg-sky-500"></div>
            <div className="rounded-full bg-sky-500 p-1">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div className="h-0.5 w-20 bg-sky-500"></div>
            <div className="rounded-full bg-sky-500 p-1">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div className="h-0.5 w-20 bg-gray-300"></div>
            <div className="rounded-full border-2 border-orange-500 p-1">
              <div className="bg-sky-500 rounded-full h-4 w-4"></div>
            </div>
          </div>
        </div>

        {/* Upload Information Card */}
        <div className="bg-sky-50 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Upload documents</h1>
          <p className="text-gray-700">
            Kindly Upload the following documents:
            <br />
            - ID document of the contact person of the registered company
            <br />- CIPC documents of the business
          </p>
        </div>

        {/* Documents Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold text-center mb-6">Documents</h2>

          <div className="space-y-6 max-w-xl">
            {/* Latest Payslip */}
            <div>
              <label className="block text-gray-700 mb-2">
                Latest Payslip <span className="text-blue-500">*</span>
              </label>
              <div className="flex">
                <Input type="text" readOnly value={files.payslip.name} className="rounded-r-none py-3 border border-gray-300 bg-white" />
                <Button
                  variant="outline"
                  className="rounded-l-none border-l-0 px-3 border h-12 border-gray-300"
                  onClick={() => handleClearFile('payslip')}
                >
                  <X size={18} /> Clear
                </Button>
              </div>
            </div>

            {/* ID Document */}
            <div>
              <label className="block text-gray-700 mb-2">
                ID document <span className="text-blue-500">*</span>
              </label>
              <div className="flex">
                <Input type="text" readOnly value={files.idDocument.name} className="rounded-r-none border py-3 border-gray-300 bg-white" />
                <Button
                  variant="outline"
                  className="rounded-l-none border-l-0 px-3  h-12 border border-gray-300"
                  onClick={() => handleClearFile('idDocument')}
                >
                  <X size={18} /> Clear
                </Button>
              </div>
            </div>

            <div className="max-w-2xl flex gap-4 items-start justify-self-start">
              <Button variant="outline" onClick={handlePreviousClick} className="border min-w-28 border-gray-300">
                Previous
              </Button>

              <Button onClick={handleNextClick} className="bg-sky-500 min-w-28 hover:bg-sky-600 text-white">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default Documents;
