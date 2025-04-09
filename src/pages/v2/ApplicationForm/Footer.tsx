import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex overflow-hidden relative flex-col justify-center items-center self-stretch px-16 py-2 mt-2.5 w-full bg-gray-100 max-md:px-5 max-md:max-w-full">
      <div className="px-8 w-full max-w-screen-xl max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-6 justify-between items-center w-full max-md:max-w-full">
          <div className="flex relative flex-col items-start self-stretch my-auto aspect-[1.875] w-[120px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f5142c1682206ca539b99432dd6bb01b4e5ec57fecfc4db430fdce7911780?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
              className="object-cover absolute inset-0 size-full"
              alt="Company logo"
            />
          </div>
          <p className="self-stretch my-auto text-base text-gray-500">© 2024 Ezra 360 LMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
