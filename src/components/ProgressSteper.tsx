import React from "react";

type StepStatus = "completed" | "active" | "pending";

interface ProgressStepProps {
  status: StepStatus;
  label: string;
  iconSrc?: string;
}

const ProgressStep: React.FC<ProgressStepProps> = ({
  status,
  label,
  iconSrc,
}) => {
  return (
    <section className="flex z-0 flex-col w-80 min-w-60">
      {status === "completed" && iconSrc && (
        <img
          src={iconSrc}
          className="object-contain self-center w-6 rounded-full aspect-square"
          alt={`${label} completed`}
        />
      )}

      {status === "active" && (
        <div className="flex overflow-hidden flex-col justify-center items-center self-center w-6 h-6 bg-sky-50 rounded-full shadow-sm">
          <div className="flex flex-col justify-center items-center px-0.5 w-full h-6 bg-sky-600 rounded-xl">
            <div className="flex shrink-0 w-full h-2 bg-white rounded-full" />
          </div>
        </div>
      )}

      {status === "pending" && (
       <div className="flex overflow-hidden flex-col justify-center items-center self-center w-6 h-6 bg-sky-50 rounded-full shadow-sm">
       <div className="flex flex-col justify-center items-center px-0.5 w-full h-6 bg-sky-600 rounded-xl">
         <div className="flex shrink-0 w-full h-2 bg-white rounded-full" />
       </div>
     </div>
      )}

      <div
        className={`mt-3 w-full text-sm font-semibold leading-none text-center whitespace-nowrap ${
          status === "active" ? "text-sky-700" : "text-slate-700"
        }`}
      >
        {label}
      </div>
    </section>
  );
};

export default ProgressStep;
