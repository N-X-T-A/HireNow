import React, { useState } from "react";
import {
  SparklesIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
const JobHeader = ({ onSortChange, setSearchTerm }) => {
  const [sortStates, setSortStates] = useState({
    salary: null,
    time: null,
    title: null,
    company: null,
  });

  const handleSortClick = (type) => {
    const nextState =
      sortStates[type] === "asc"
        ? "desc"
        : sortStates[type] === "desc"
          ? null
          : "asc";

    const newSortStates = {
      salary: null,
      time: null,
      title: null,
      company: null,
    };
    newSortStates[type] = nextState;

    setSortStates(newSortStates);
    onSortChange(nextState ? `${type}_${nextState}` : null);
  };

  const getButtonText = (type, label) => {
    if (sortStates[type] === "asc") return `${label} ▲`;
    if (sortStates[type] === "desc") return `${label} ▼`;
    return label;
  };

  return (
    <>
      {" "}
      <div className="flex justify-between  w-full bg-[#1E90FF]">
        <p className="hidden md:flex gap-2 items-center !mb-0 p-3 text-[white] text-[25px] font-[600]">
          Bắt đầu công việc trong mơ của bạn{" "}
          <SparklesIcon className="w-8 h-8" />
        </p>
        <img
          src="/src/assets/user/Hirenow.png"
          alt=""
          className="max-h-[70px] object-cover"
        />
      </div>
      <div className=" hidden md:flex max-h-[20px] h-full w-full justify-between items-center   py-4 mt-2">
        <div className="flex gap-2 items-center">
          <div
            onClick={() => handleSortClick("salary")}
            className="relative flex justify-center items-center gap-3  text-black "
          >
            <button className="font-[500] relative px-4 py-2  hover:border-2 bg-[#1E90FF] text-white rounded-md overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]  hover:border-black">
              <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
              <span className=" flex gap-2 items-center relative z-10 group-hover:text-black transition-colors duration-500">
                <CurrencyDollarIcon className="w-5 h-5" />
                {getButtonText("salary", "Lương")}
              </span>
            </button>
          </div>
          <div
            onClick={() => handleSortClick("time")}
            className="relative flex justify-center items-center gap-3  text-black "
          >
            <button className="font-[500] relative px-4 py-2  hover:border-2 bg-[#1E90FF] text-white rounded-md overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]  hover:border-black">
              <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
              <span className="flex gap-2  relative z-10 group-hover:text-black transition-colors duration-500">
                <ClockIcon className="w-5 h-5" />
                {getButtonText("time", "Thời gian đăng tuyển")}
              </span>
            </button>
          </div>
          <div
            onClick={() => handleSortClick("title")}
            className="relative flex justify-center items-center gap-3  text-black "
          >
            <button className="font-[500] relative px-4 py-2  hover:border-2 bg-[#1E90FF] text-white rounded-md overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]  hover:border-black">
              <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
              <span className=" flex gap-2 relative z-10 group-hover:text-black transition-colors duration-500">
                <BriefcaseIcon className="w-5 h-5" />
                {getButtonText("title", "Tên công việc")}
              </span>
            </button>
          </div>
          <div className="flex justify-center items-center gap-1">
            <input
              type="text"
              name="Search"
              placeholder="Tìm tên công việc"
              className="border p-2 w-[300px] rounded-[10px]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobHeader;
