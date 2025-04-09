import React from 'react';
import { X } from 'lucide-react';
import ApplicationLayout from '@/Layouts/ApplicationLayout';

const LoadingScreen = () => {
  return (
    <ApplicationLayout>
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">Hang Tight!</h1>
          <p className="text-gray-600">Please bear with us while we get everything ready.</p>
        </div>

        {/* Loading Spinner */}
        <div className="mt-12">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
    </ApplicationLayout>
  );
};

// Advanced version with SVG spinner that more closely matches the design
const LoadingScreenWithCustomSpinner = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-cyan-900 via-white to-cyan-900">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white">
        <div className="flex items-center">
          <img
            src="/images/Logo.svg"
            alt="RHS Services Logo"
            className="h-6"
          />
        </div>
        <button className="p-1">
          <X className="h-6 w-6 text-gray-700" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">Hang Tight!</h1>
          <p className="text-gray-600">Please bear with us while we get everything ready.</p>
        </div>

        {/* Custom Loading Spinner */}
        <div className="mt-12">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" stroke="#E5E7EB" strokeWidth="3" fill="none" />
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="157"
              strokeDashoffset="120"
              className="origin-center animate-spin"
              style={{
                transformOrigin: 'center',
                animation: 'spin 1.5s linear infinite',
              }}
            />
          </svg>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 border-t">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <img
              src="/images/Logo.svg"
              alt="RHS Services Logo"
              className="h-6"
            />
          </div>
          <div className="text-sm text-gray-500">© 2024 Ezra 360 LMS. All rights reserved.</div>
        </div>
      </footer>

      {/* CSS Animation for Spinner */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

// Custom version with the provided SVG spinner
const LoadingScreenExact = () => {
  return (
    <ApplicationLayout>
      {/* Main Content */}
      <main className="relative z-10 flex-grow min-h-[80vh] flex flex-col items-center content-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">Hang Tight!</h1>
          <p className="text-gray-600">Please bear with us while we get everything ready.</p>
        </div>

        {/* Custom SVG Loading Spinner */}
        <div className="mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 114 114" fill="none" className="spinner-animation">
            <circle cx="56.9998" cy="57" r="35.3863" transform="rotate(150 56.9998 57)" stroke="#067647" strokeWidth="1.2638" />
            <path
              d="M26.3415 74.7008C23.6286 76.267 22.6703 79.7664 24.5951 82.2378C27.9008 86.4823 32.0201 90.051 36.7313 92.724C43.0932 96.3336 50.3037 98.1788 57.6175 98.0688C64.9313 97.9589 72.083 95.8978 78.3336 92.0985C82.9623 89.2851 86.9725 85.5941 90.1491 81.2522C91.9988 78.724 90.9356 75.2551 88.1769 73.7711V73.7711C85.4182 72.2871 82.0162 73.3662 80.0359 75.7934C77.9074 78.4024 75.3423 80.6417 72.4416 82.4048C67.9173 85.1547 62.7408 86.6466 57.447 86.7262C52.1532 86.8057 46.9341 85.4702 42.3293 82.8575C39.3768 81.1824 36.7455 79.0212 34.5396 76.4774C32.4873 74.1108 29.0543 73.1345 26.3415 74.7008V74.7008Z"
              fill="#58B6E9"
            />
          </svg>
        </div>
      </main>

      {/* CSS Animation for Spinner */}
      <style jsx>{`
        .spinner-animation {
          animation: spin 8s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(370deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </ApplicationLayout>
  );
};

export { LoadingScreen, LoadingScreenWithCustomSpinner, LoadingScreenExact };
export default LoadingScreenExact;
