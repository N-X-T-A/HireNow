import React from "react";
import "../steps/stepsRespond.css";
import { useLanguage } from "../../hooks/useLanguage";

const Final = () => {
  const { translations } = useLanguage();

  return (
    <div className="relative flex flex-col items-center">
      <img className="w-[50%]" src="/src/assets/login/done.gif" alt="" />
      <p className="final-p-respond absolute bottom-0 font-bold text-green-600 text-[20px] uppercase">
        {translations["congratulations"]}
      </p>
      <p className="final-des-respond absolute bottom-[-30px] font-bold text-gray-600 text-[13px]">
        {translations["accountCreatedSuccess"]}
      </p>
    </div>
  );
};

export default Final;
