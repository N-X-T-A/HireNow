import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { UserJobs } from "../../data/data";
import { BookmarkIcon, ClockIcon } from "@heroicons/react/24/outline";
const UserPage2 = () => {
  return (
    <>
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

      <div className="flex w-full mt-2">
        {/* Phần 1 (Chiếm 3 phần) */}
        <div
          className="flex-1 md:flex-[3]  p-2 max-h-[900px] overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="w-full flex flex-col gap-3">
            {/* công việc */}
            <div className="flex flex-col gap-4">
              {UserJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col gap-2 w-full p-4 rounded-lg"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                >
                  {/* img - name */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <img
                        className="max-w-[50px] rounded-md border-[1px]"
                        src={job.image}
                        alt={job.company}
                      />
                      <span className="flex flex-col gap-1">
                        <p className="!mb-0 text-[20px]">{job.title}</p>
                        <p className="!mb-0 text-gray-500 text-[13px]">
                          {job.company}
                        </p>
                      </span>
                    </div>
                    <BookmarkIcon className="w-8 h-8" />
                  </div>
                  {/* skill - experience */}
                  <div className="flex gap-2">
                    {job.skills.map((skill, index) => {
                      const colors = [
                        "bg-green-200 text-green-500",
                        "bg-red-200 text-red-500",
                        "bg-blue-200 text-blue-500",
                      ];
                      return (
                        <p
                          key={index}
                          className={`!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] ${colors[index % colors.length]}`}
                        >
                          {skill}
                        </p>
                      );
                    })}
                  </div>
                  {/* description */}
                  <p className="w-full text-[15px] line-clamp-3">
                    {job.description}
                  </p>
                  <span className="border-b-[1px] border-gray-300 w-full"></span>
                  {/* salary */}
                  <div className="flex items-center justify-between w-full">
                    <p className="!mb-0 text-[30px] font-[500]">
                      {job.salary}
                      <span className="text-[20px] font-[500] text-gray-400">
                        /hour
                      </span>
                    </p>
                    <span className="flex items-center gap-1 text-13px text-gray-400">
                      <ClockIcon className="w-4 h-4" />
                      <p className="!mb-0">{job.postedTime}</p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phần 2 (Chiếm 7 phần) */}
        <div
          className="hidden md:flex md:flex-[7] bg-red-300  p-2  max-h-[900px] overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          Bên phải (7 phần)
        </div>
      </div>
    </>
  );
};

export default UserPage2;
