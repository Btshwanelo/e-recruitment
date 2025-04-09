'use client';
import React, { useState } from 'react';

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <section className="flex items-center px-8 py-3 bg-white border-b border-solid border-b-gray-300 max-sm:flex-col max-sm:gap-4">
      <div className="flex flex-1 gap-4 items-center">
        <div className="flex justify-center items-center p-2.5 w-10 h-10 bg-white rounded-lg border border-gray-200 border-solid">
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="I490:162467;4893:410877;4041:412675" layer-name="info-circle" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="info-icon"> <g clip-path="url(#clip0_862_25889)"> <path d="M9.99935 13.3333V9.99996M9.99935 6.66663H10.0077M18.3327 9.99996C18.3327 14.6023 14.6017 18.3333 9.99935 18.3333C5.39698 18.3333 1.66602 14.6023 1.66602 9.99996C1.66602 5.39759 5.39698 1.66663 9.99935 1.66663C14.6017 1.66663 18.3327 5.39759 18.3327 9.99996Z" stroke="#344054" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_862_25889"> <rect width="20" height="20" fill="white"></rect> </clipPath> </defs> </svg>',
            }}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-slate-700">You may qualify for additional funding</h2>
          <p className="text-sm text-slate-600">
            based on your performance and repayment track record, your profile may be eligible for additional funding
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center max-sm:justify-between max-sm:w-full">
        <button className="px-3.5 py-2.5 text-sm font-semibold bg-white rounded-lg border border-gray-300 border-solid cursor-pointer text-slate-700">
          Learn more
        </button>
        <button className="px-3.5 py-2.5 text-sm font-semibold text-white bg-blue-400 rounded-lg cursor-pointer border-[none]">
          Apply
        </button>
        <button
          className="flex justify-center items-center p-2 w-9 h-9 cursor-pointer border-[none]"
          onClick={() => setIsVisible(false)}
          aria-label="Close notification"
        >
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="I490:162467;4893:410884;2763:420457" layer-name="x-close" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-icon"> <path d="M15 5L5 15M5 5L15 15" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
            }}
          />
        </button>
      </div>
    </section>
  );
}
