import React from 'react';

const ActionButtons: React.FC = () => {
  return (
    <section className="flex relative flex-wrap gap-2.5 gap-y-2.5 justify-between content-start items-start px-16 py-6 mt-2.5 w-full max-w-screen-xl text-base font-semibold text-white whitespace-nowrap bg-white rounded-2xl min-h-[92px] max-md:px-5 max-md:max-w-full">
      <button className="flex overflow-hidden gap-1.5 justify-center items-center px-5 py-3 bg-blue-400 rounded-lg border-2 border-solid shadow-sm border-[color:var(--Gradient-skeuemorphic-gradient-border,rgba(255,255,255,0.12))]">
        <span className="self-stretch px-0.5 my-auto">Next</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d309a7322726ac60d3e6fc0c9568e4f6e3104cb7760592810a7f8c96b7e1c12d?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          alt="Next arrow"
        />
      </button>
    </section>
  );
};

export default ActionButtons;
