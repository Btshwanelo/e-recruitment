'use client';
import React, { useState } from 'react';

type TabType = 'all' | 'failed' | 'once-off';

export function TransactionsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <section className="flex-1 px-8 py-0 max-md:p-0 max-md:w-full">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-2 items-center px-0 py-2 mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <button className="flex gap-1 items-center px-3 py-2 text-sm font-semibold text-blue-400 cursor-pointer border-[none]">
          <span>Statements</span>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="I462:155249;3468:420431" layer-name="chevron-right" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="chevron-right"> <path d="M7.5 15L12.5 10L7.5 5" stroke="#026AA2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
            }}
          />
        </button>
      </div>
      <div className="flex gap-1 items-center mb-5">
        <TabButton label="All transactions" isActive={activeTab === 'all'} onClick={() => setActiveTab('all')} />
        <TabButton label="failed" isActive={activeTab === 'failed'} onClick={() => setActiveTab('failed')} />
        <TabButton label="Once-off" isActive={activeTab === 'once-off'} onClick={() => setActiveTab('once-off')} />
      </div>
      <TransactionsTable />
    </section>
  );
}

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      className={`px-3 py-2 text-sm font-semibold cursor-pointer border-[none] ${isActive ? 'text-blue-500' : 'text-gray-500'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function TransactionsTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 border-solid">
      <div className="grid bg-gray-50 border-b border-solid border-b-gray-200 grid-cols-[auto_1fr_auto_auto] max-sm:gap-2 max-sm:grid-cols-[1fr_1fr]">
        <div className="flex gap-1 items-center px-6 py-3 text-xs font-medium text-slate-600 max-sm:px-4 max-sm:py-3">
          <input type="checkbox" aria-label="Select all transactions" />
          <span>Date</span>
        </div>
        <div className="flex gap-1 items-center px-6 py-3 text-xs font-medium text-slate-600 max-sm:px-4 max-sm:py-3">
          <span>Description</span>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="I462:154555;1224:5575;1224:4551;1221:106890" layer-name="arrow-down" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="sort-icon"> <path d="M8.00065 3.33337V12.6667M8.00065 12.6667L12.6673 8.00004M8.00065 12.6667L3.33398 8.00004" stroke="#475467" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
            }}
          />
        </div>
        <div className="flex gap-1 items-center px-6 py-3 text-xs font-medium text-slate-600 max-sm:px-4 max-sm:py-3">
          <span>Amount</span>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="I462:154555;1224:5797;1224:4551;1221:106791;1054:3" layer-name="help-circle" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="help-icon"> <g clip-path="url(#clip0_862_41040)"> <path d="M6.06065 6.00004C6.21739 5.55449 6.52675 5.17878 6.93395 4.93946C7.34116 4.70015 7.81991 4.61267 8.28544 4.69252C8.75096 4.77236 9.1732 5.01439 9.47737 5.37573C9.78154 5.73706 9.94802 6.19439 9.94732 6.66671C9.94732 8.00004 7.94732 8.66671 7.94732 8.66671M8.00065 11.3334H8.00732M14.6673 8.00004C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8.00004C1.33398 4.31814 4.31875 1.33337 8.00065 1.33337C11.6826 1.33337 14.6673 4.31814 14.6673 8.00004Z" stroke="#98A2B3" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_862_41040"> <rect width="16" height="16" fill="white"></rect> </clipPath> </defs> </svg>',
            }}
          />
        </div>
        <div className="gap-1 px-6 py-3 text-xs font-medium text-slate-600 max-sm:px-4 max-sm:py-3">Balance</div>
      </div>
      <div>
        <TransactionRow date="30/09/2024" description="Repayment dbt order" amount="16666.67" balance="1050000" />
        <TransactionRow date="31/10/2024" description="Repayment dbt order" amount="16666.67" balance="1050000" />
      </div>
    </div>
  );
}

function TransactionRow({ date, description, amount, balance }: { date: string; description: string; amount: string; balance: string }) {
  return (
    <div className="grid border-b border-solid border-b-gray-200 grid-cols-[auto_1fr_auto_auto] max-sm:gap-2 max-sm:grid-cols-[1fr_1fr]">
      <div className="px-6 py-4 text-sm text-gray-900 max-sm:px-4 max-sm:py-3">{date}</div>
      <div className="px-6 py-4 text-sm text-gray-900 max-sm:px-4 max-sm:py-3">{description}</div>
      <div className="px-6 py-4 text-sm text-gray-900 max-sm:px-4 max-sm:py-3">{amount}</div>
      <div className="px-6 py-4 text-sm text-gray-900 max-sm:px-4 max-sm:py-3">{balance}</div>
    </div>
  );
}
