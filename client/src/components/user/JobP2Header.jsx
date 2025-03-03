import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SparklesIcon } from "@heroicons/react/24/solid";
import {
  faMagnifyingGlass,
  faLocationDot,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
const JobHeader = () => {
  return (
    <>
      {" "}
      <div className="flex justify-between items-centers w-full bg-[#1E90FF]">
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
      <div className=" hidden md:flex max-h-[20px] h-full w-full  justify-between items-center p-4 mt-2">
        <div className="flex gap-2 items-center">
          <div className="relative flex justify-center items-center gap-3 pr-4 text-black after:content-[''] after:w-[1px] after:h-5 after:bg-black after:absolute after:right-0">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <p className="!mb-0">Loại công việc</p>
          </div>
          <div className="relative flex justify-center items-center gap-3 pr-4 text-black after:content-[''] after:w-[1px] after:h-5 after:bg-black after:absolute after:right-0">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="!mb-0">Địa điểm</p>
          </div>
          <div className="relative flex justify-center items-center gap-3 pr-4 text-black after:content-[''] after:w-[1px] after:h-5 after:bg-black after:absolute after:right-0">
            <FontAwesomeIcon icon={faUserCheck} />
            <p className="!mb-0">Kinh nghiệm</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <input
              type="text"
              name="Search"
              placeholder="Tìm tên công việc"
              className="border p-2 w-[300px] rounded-[10px]"
            />
          </div>
        </div>
        <div>
          <button className="text-white px-4 py-2 bg-[#1E90FF] rounded-md">
            Tìm kiếm ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default JobHeader;
