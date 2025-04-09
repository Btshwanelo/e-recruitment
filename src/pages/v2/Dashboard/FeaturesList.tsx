import React from 'react';

export function FeaturesList() {
  return (
    <section className="p-2.5 bg-white">
      <div className="flex gap-2 items-center px-0 py-2 mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Features</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <nav className="flex flex-col">
        <FeatureItem text="Log a case" url="/case" />
        <FeatureItem text="Account Details" url="/account" />
        <FeatureItem text="Statement and Documents" url="/statements" />
      </nav>
    </section>
  );
}

function FeatureItem({ text, url }: { text: string; url: string }) {
  return (
    <a href={url} className="flex justify-between items-center px-0 py-3 text-lg border-b border-solid border-b-gray-200 text-slate-600">
      <span>{text}</span>
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<svg id="I462:153232;1358:191665" layer-name="chevron-right" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="chevron-right"> <path d="M9 18L15 12L9 6" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
        }}
      />
    </a>
  );
}
