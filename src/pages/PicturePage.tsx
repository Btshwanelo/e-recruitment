import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { ArrowLeft, X } from 'lucide-react';
import ApplicationHeader from '@/components/ApplicationHeader';

const SelfieVerificationPage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: 'user',
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImageSrc(null);
  };

  return (
    <div className="min-w-screen flex flex-col">
      <ApplicationHeader />
      {/* Close Button */}

      {/* Main Content */}
      <div className="w-full max-w-md mx-auto mt-8 pb-6">
        {/* Header */}
        <div className="bg-[#a0a0a1] text-center pb-6 pt-2 space-y-5 rounded-t-lg">
          <div className="flex justify-center gap-4">
            <ArrowLeft className="text-white" />
            <h2 className="text-lg font-semibold text-white">Verify your identity</h2>
          </div>
          <p className="text-sm text-white mt-1">Place your face in the Oval below</p>
        </div>

        {/* Camera / Image Container */}
        <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt="Captured selfie" className="w-full h-full object-cover" />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Action Button */}
        <div className="bg-[#a0a0a1] py-4 rounded-b-lg flex justify-center">
          {imageSrc ? (
            <div className="flex space-x-4">
              <button onClick={retake} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">
                Retake
              </button>
              <button className="px-6 py-2 bg-[#4087F3] text-white rounded-lg">Continue</button>
            </div>
          ) : (
            <button onClick={capture} className="w-16 h-16 bg-white rounded-full border-4 border-[#4087F3] focus:outline-none">
              <span className="sr-only">Capture selfie</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfieVerificationPage;
