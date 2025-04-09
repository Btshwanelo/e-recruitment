import React from 'react';

const PageHeader: React.FC = () => {
  return (
    <header className="w-full font-semibold max-md:max-w-full">
      <div className="flex flex-wrap gap-5 items-start w-full max-md:max-w-full">
        <h1 className="flex-1 shrink text-3xl leading-none text-gray-900 basis-0 min-w-80 max-md:max-w-full">
          Get started with your application
        </h1>
        <div className="flex gap-3 items-center text-sm leading-none text-sky-800">
          <button className="flex overflow-hidden gap-1 justify-center items-center self-stretch px-3.5 py-2.5 my-auto bg-white rounded-lg border border-solid shadow-sm border-[color:var(--Component-colors-Components-Buttons-Secondary-color-button-secondary-color-border,#7CD4FD)]">
            <span className="self-stretch px-0.5 my-auto">Save & Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
