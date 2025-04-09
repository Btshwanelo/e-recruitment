import { X } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SaveApplicationModal from './ConfirmationModal ';

const ApplicationHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log('Application saved!');
    navigate('/dashboard');
    setIsModalOpen(false);
  };
  return (
    <header className="bg-white border-b border-gray-200 mb-1">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="text-blue-500 font-bold flex items-center">
            <span className="text-xl">RH</span>
            <span className="text-sm rotate-90 -mr-1">❯</span>
            <span className="text-gray-500 text-sm">Services</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center ml-4">
            <button className="p-1 cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <X size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      <SaveApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleSave} />
    </header>
  );
};

export default ApplicationHeader;
