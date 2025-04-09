'use client';

import React from 'react';
import Header from './Header';
import PageHeader from './PageHeader';
import InfoBox from './InfoBox';
import FormSection from './FormSection';
import ActionButtons from './ActionButtons';
import Footer from './Footer';

const ApplicationForm: React.FC = () => {
  return (
    <section className="flex overflow-hidden relative flex-col items-center min-h-[1080px] min-w-80">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac847bb748d98c8a8ac64d7f423e92c85586a52a75ab27b37db645fdae964b7c?placeholderIfAbsent=true&apiKey=53c38ecfba4342d7a373232ca08317d5"
        className="object-cover absolute inset-0 size-full"
        alt="Background"
      />
      <Header />
      <main className="flex flex-col items-center w-full gap-2.5">
        <section className="relative px-16 py-6 mt-2.5 w-full max-w-screen-xl bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
          <PageHeader />
          <InfoBox />
        </section>

        <section className="flex overflow-hidden relative flex-col flex-1 justify-center items-start px-16 py-3 mt-2.5 w-full max-w-screen-xl bg-white rounded-xl max-md:px-5 max-md:max-w-full">
          <FormSection />
        </section>

        <ActionButtons />
      </main>
      <Footer />
    </section>
  );
};

export default ApplicationForm;
