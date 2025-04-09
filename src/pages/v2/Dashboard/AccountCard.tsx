import React from 'react';

export function AccountCard() {
  return (
    <article className="px-6 py-2 mb-5 bg-white rounded-xl border border-gray-200 border-solid">
      <div className="flex gap-3 items-center mb-6">
        <div className="flex justify-center items-center w-12 h-12 bg-amber-100 rounded-full">
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="I462:160336;3465:403917" layer-name="wallet-03" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="wallet-icon"> <path d="M16.5 14H16.51M3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7L5 7C3.89543 7 3 6.10457 3 5ZM3 5C3 3.89543 3.89543 3 5 3H17M17 14C17 14.2761 16.7761 14.5 16.5 14.5C16.2239 14.5 16 14.2761 16 14C16 13.7239 16.2239 13.5 16.5 13.5C16.7761 13.5 17 13.7239 17 14Z" stroke="#DC6803" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
            }}
          />
        </div>
        <h3 className="flex-1 text-base font-semibold text-gray-900">Loan Account • 109826637</h3>
      </div>
      <div className="mb-5">
        <div className="text-4xl font-semibold tracking-tighter text-gray-900">
          <span>R</span>
          <span>1050000</span>
        </div>
        <div className="text-sm font-medium text-slate-600">Outstanding</div>
      </div>
      <div className="flex gap-2.5">
        <div className="flex-1">
          <div className="mb-1.5 text-sm text-gray-700">Installment Amount</div>
          <div className="text-base text-gray-500">R16666.67</div>
        </div>
        <div className="flex-1">
          <div className="mb-1.5 text-sm text-gray-700">Payment date</div>
          <div className="text-base text-gray-500">30th</div>
        </div>
      </div>
    </article>
  );
}
