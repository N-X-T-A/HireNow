import React from "react";
import { useLanguage } from "../../hooks/useLanguage";

const StepperControl = ({ handleClick, currentStep, steps, isStepValid }) => {
  const { translations } = useLanguage();

  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* back button */}
      <button
        onClick={() => handleClick()}
        className={`bg-[#fffff] text-slate-400  uppercase py-2 px-4 rounded-xl font-semibold  border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-2oo ease-in-out ${currentStep == 1 ? "opacity-50 !cursor-not-allowed" : "cursor-pointer"}`}
      >
        {translations["back"]}
      </button>
      {/* next button */}
      <button
        onClick={() => handleClick("Tiếp theo")}
        className={`bg-[#1E90FF] text-white uppercase py-2 px-4 rounded-xl font-semibold 
          ${!isStepValid ? "opacity-50 !cursor-not-allowed" : "hover:bg-slate-700 hover:text-white cursor-pointer"}`}
        disabled={!isStepValid}
      >
        {currentStep == steps.length - 1
          ? `${translations["confirm"]}`
          : `${translations["next"]}`}
      </button>
    </div>
  );
};

export default StepperControl;
