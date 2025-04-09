'use client';
import React from 'react';
import { Header } from './Header';
import { NotificationBanner } from './NotificationBanner';
import { AccountCard } from './AccountCard';
import { FeaturesList } from './FeaturesList';
import { TransactionsSection } from './TransactionsSection';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
      <div className="mx-auto min-h-screen my-0 bg-gray-100  min-w-[1280px] max-md:min-w-[auto]">
        <Header />
        <main className="px-16 py-4 m-4 container mx-auto bg-white rounded-xl max-md:p-4">
          <NotificationBanner />
          <section className="mt-5">
            <div className="flex gap-5 justify-between items-start mb-5 max-sm:flex-col">
              <div className="flex-1">
                <h1 className="mb-1 text-3xl font-semibold text-gray-900">Welcome Back, Thandiwe</h1>
                <p className="text-base text-slate-600">Manage your loan account here.</p>
              </div>
              <div className="flex-1 max-w-xs max-md:hidden">
                <div className="flex gap-2 items-center px-3.5 py-2.5 bg-white rounded-lg border border-gray-300 border-solid">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg id="I462:151858;3281:387615;3281:379964" layer-name="search-lg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="search-icon"> <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
                    }}
                  />
                  <input type="text" placeholder="Search" className="w-full text-base text-gray-500 border-[none]" />
                </div>
              </div>
            </div>
          </section>
          <div className="flex gap-2.5 max-md:flex-col">
            <aside className="w-[421px] max-md:p-0 max-md:w-full">
              <div className="flex gap-2 items-center px-0 py-2 mb-5">
                <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <AccountCard />
              <FeaturesList />
            </aside>
            <TransactionsSection />
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
