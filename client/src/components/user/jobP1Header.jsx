import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SparklesIcon } from "@heroicons/react/24/solid";
import {
  faMagnifyingGlass,
  faLocationDot,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
const JobP1Header = () => {
  return (
    <div className="flex justify-between items-centers w-full bg-[#1E90FF]">
      <p className="hidden md:flex gap-2 items-center !mb-0 p-3 text-[white] text-[25px] font-[600]">
        Tổng quan <SparklesIcon className="w-8 h-8" />
      </p>
      <img
        src="/src/assets/user/Hirenow.png"
        alt=""
        className="max-h-[70px] object-cover"
      />
    </div>
  );
};

export default JobP1Header;
