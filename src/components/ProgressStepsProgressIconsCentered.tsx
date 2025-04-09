import React from "react";
import ProgressStep from "./ProgressSteper";

const ProgressStepsProgressIconsCentered: React.FC = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="flex relative gap-4 justify-center items-start max-md:max-w-full">
        {/* Progress Lines */}
        <div className="flex absolute inset-x-40 z-0 flex-wrap h-0.5 min-w-60 top-[11px] w-[672px] max-md:max-w-full">
          <div className="flex shrink-0 max-w-full h-0.5 bg-sky-600 w-[336px]" />
          <div className="flex shrink-0 max-w-full h-0.5 bg-gray-200 w-[336px]" />
        </div>

        {/* Steps */}
        <ProgressStep status="completed" label="Sign Up" iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f7b50bb7a5618ab27efa839ecddf858e2df8db03?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5" />

        <ProgressStep status="active" label="Profile" />

        <ProgressStep status="pending" label="Application" />
      </div>
    </section>
  );
};

export default ProgressStepsProgressIconsCentered;
