'use client';

import React, { useState } from 'react';
import InputField from './InputField';
import Checkbox from './Checkbox';

const FormSection: React.FC = () => {
  const [applicationType, setApplicationType] = useState<'individual' | 'business'>('individual');

  return (
    <div className="max-w-screen-sm w-[640px] max-md:max-w-full">
      <div className="flex overflow-hidden items-start max-w-full text-sm font-semibold leading-none rounded-lg border border-solid shadow-sm border-[color:var(--Colors-Border-border-primary,#D0D5DD)] text-slate-700 w-[393px]">
        <button
          className={`flex-1 shrink gap-2 self-stretch px-4 py-2 whitespace-nowrap bg-white border-r border-gray-300 basis-0 min-h-10 ${
            applicationType === 'individual' ? 'bg-gray-100' : ''
          }`}
          onClick={() => setApplicationType('individual')}
        >
          Individual
        </button>
        <button
          className={`flex-1 shrink gap-2 self-stretch px-4 py-2 bg-white border-r border-gray-300 basis-0 min-h-10 ${
            applicationType === 'business' ? 'bg-gray-100' : ''
          }`}
          onClick={() => setApplicationType('business')}
        >
          Business / Entity
        </button>
      </div>

      <div className="mt-6 w-full max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <InputField label="ID Number" value="9902020304089" required={true} hasInfoIcon={true} hasCheckIcon={true} />
        </div>

        <div className="flex flex-col items-start mt-6 w-full whitespace-nowrap max-md:max-w-full">
          <div className="max-w-full w-[480px]">
            <InputField label="Name" value="Thandiwe" required={true} />
          </div>
        </div>

        <div className="flex flex-col items-start mt-6 w-full whitespace-nowrap max-md:max-w-full">
          <div className="max-w-full w-[480px]">
            <InputField label="Surname" value="Nkosi" required={true} />
          </div>
        </div>

        <Checkbox label="I consent to having my academic record queried for this application" checked={true} />

        <Checkbox label="I consent to having my credit record queried for this application" checked={true} />

        <Checkbox label="Im not blacklisted or sequestrated or under debt review" checked={true} />
      </div>
    </div>
  );
};

export default FormSection;
