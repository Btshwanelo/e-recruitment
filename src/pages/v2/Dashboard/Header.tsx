'use client';
import React from 'react';

export function Header() {
  return (
    <header className="flex justify-center items-center h-20 bg-white border-b border-solid border-b-gray-200">
      <div className="flex justify-between items-center px-8 py-0 w-full container max-md:px-4 max-md:py-0">
        <div className="flex gap-10 items-center">
          <div>
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <nav className="flex gap-8 items-center max-sm:hidden">
            <a href="#" className="gap-2 text-base font-semibold no-underline text-slate-600">
              Home
            </a>
            <button className="flex gap-2 items-center text-base font-semibold no-underline cursor-pointer text-slate-600">
              <span>Products</span>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg id="I462:151856;2812:399218;3468:468154" layer-name="chevron-down" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="chevron-icon"> <path d="M5 7.5L10 12.5L15 7.5" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
                }}
              />
            </button>
            <button className="flex gap-2 items-center text-base font-semibold no-underline cursor-pointer text-slate-600">
              <span>Cases</span>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg id="I462:151856;2812:399224;3468:468154" layer-name="chevron-down" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="chevron-icon"> <path d="M5 7.5L10 12.5L15 7.5" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
                }}
              />
            </button>
            <button className="px-4 py-2.5 text-base font-semibold text-sky-800 bg-white rounded-lg border border-orange-300 border-solid cursor-pointer">
              Apply
            </button>
          </nav>
        </div>
        <UserProfile />
      </div>
    </header>
  );
}

function UserProfile() {
  return (
    <div className="flex gap-2.5 items-center max-sm:gap-2">
      <div className="flex justify-center items-center w-8 h-8 bg-gray-100 rounded-full border-solid border-[0.5px] border-black border-opacity-10">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg id="I462:151856;1624:264738;1142:92902;1034:397" layer-name="user-01" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="user-icon"> <path d="M16.6673 17.5C16.6673 16.337 16.6673 15.7555 16.5238 15.2824C16.2006 14.217 15.3669 13.3834 14.3016 13.0602C13.8284 12.9167 13.247 12.9167 12.084 12.9167H7.91732C6.75435 12.9167 6.17286 12.9167 5.6997 13.0602C4.63436 13.3834 3.80068 14.217 3.47752 15.2824C3.33398 15.7555 3.33398 16.337 3.33398 17.5M13.7507 6.25C13.7507 8.32107 12.0717 10 10.0007 10C7.92958 10 6.25065 8.32107 6.25065 6.25C6.25065 4.17893 7.92958 2.5 10.0007 2.5C12.0717 2.5 13.7507 4.17893 13.7507 6.25Z" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-semibold text-slate-700">Thandiwe</div>
        <div className="text-xs text-slate-600">thandiwe.nkosi@gmail.com</div>
      </div>
    </div>
  );
}
