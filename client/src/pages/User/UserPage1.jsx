import React from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import JobP1Header from "../../components/user/jobP1Header";
const UserPage1 = () => {
  return (
    <>
      <JobP1Header />
      <div className="mt-2 w-full flex flex-col justify-center gap-3">
        {/* total dashboard */}
        <div
          className="w-full flex flex-col md:flex-row justify-center items-center rounded-[20px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="p-4 flex-1 flex flex-col justify-between items-center md:border-r-[1px] border-b-[1px] border-gray-300 md:h-[150px]">
            <div>
              {" "}
              <p className="!mb-0">
                Chào mừng trở lại,{" "}
                <span className="text-[20px] font-bold">Thái</span>
              </p>
            </div>
            <p className="!mb-0">
              <span className="text-[30px] font-bold">25</span> công việc mới
              đang chờ bạn!
            </p>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between items-center md:h-[150px] md:border-r-[1px] border-b-[1px] border-gray-300">
            <p className="!mb-0 flex items-center justify-center gap-1">
              <GlobeAltIcon className="w-5 h-5 text-[#1E90FF]" /> Các nhà tuyển
              dụng mới
            </p>
            <div className="flex justify-between items-center w-full">
              <p className="!mb-0 px-[20px] text-[30px] font-bold">13</p>
              <p className="!mb-0 ">
                <span className="text-[20px] font-bold text-green-600">
                  +7%
                </span>{" "}
                trong tháng qua
              </p>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between items-center md:h-[150px] md:border-r-[1px] border-b-[1px] border-gray-300">
            <p className="!mb-0 flex items-center justify-center gap-1">
              <GlobeAltIcon className="w-5 h-5 text-[#1E90FF]" />
              Tổng số lượng các nhà tuyển dụng
            </p>
            <div className="flex justify-between items-center w-full">
              <p className="!mb-0 px-[20px] text-[30px] font-bold">80</p>
              <p className="!mb-0 ">
                <span className="text-[20px] font-bold text-green-600">
                  +8.5%
                </span>{" "}
                trong tháng qua
              </p>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between items-center md:h-[150px]">
            <p className="!mb-0 flex items-center justify-center gap-1">
              <GlobeAltIcon className="w-5 h-5 text-[#1E90FF]" />
              Tổng số công việc được đăng lên
            </p>
            <div className="flex justify-between items-center w-full">
              <p className="!mb-0 px-[20px] text-[30px] font-bold">60</p>
              <p className="!mb-0 ">
                <span className="text-[20px] font-bold text-green-600">
                  +32%
                </span>{" "}
                trong tháng qua
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage1;
