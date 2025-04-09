import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex relative flex-col justify-center self-stretch px-16 py-3 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="flex relative flex-col items-start self-stretch my-auto aspect-[1.875] w-[120px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/842f5142c1682206ca539b99432dd6bb01b4e5ec57fecfc4db430fdce7911780?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
            className="object-cover absolute inset-0 size-full"
            alt="Company logo"
          />
        </div>
        <div className="flex flex-col justify-center items-center self-stretch my-auto w-8 h-8 bg-white bg-opacity-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6dc46545f17a6c6bd9cb709d2b7a6934931e1930d4cddfa9497240ec83d49cb?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
            className="object-contain w-8 aspect-square"
            alt="Menu icon"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
