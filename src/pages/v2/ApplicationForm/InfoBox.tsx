'use client';

import React, { useState } from 'react';

const InfoBox: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="flex flex-col justify-center p-4 mt-8 w-full bg-gray-50 rounded-2xl min-w-80 max-md:max-w-full"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
        <h2 className="flex-1 shrink text-sm font-semibold leading-none text-gray-900 basis-0 min-w-60 max-md:max-w-full">
          Important Information About Our Integrated Verification Process
        </h2>
        <div className="pt-0.5 w-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/389bfa25ed4581375751ee38c62e380ef3f771b45b302219c4ad421f5e1039be?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
            className="object-contain w-6 aspect-square"
            alt="Expand icon"
          />
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 text-sm text-gray-700">
          {/* Content would be shown when expanded */}
          <p>Additional information about the verification process would appear here when expanded.</p>
        </div>
      )}
    </section>
  );
};

export default InfoBox;
