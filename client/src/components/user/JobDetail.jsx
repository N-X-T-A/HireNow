import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { SparklesIcon, StarIcon } from "@heroicons/react/24/solid";
const JobDetail = ({ jobId }) => {
  //state
  const [selectedJob, setJobs] = useState([]);
  //fetch API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/jobs/${jobId}`);
        setJobs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchJobs();
  }, [jobId]);
  return (
    <div
      className="flex rounded-lg w-full"
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      {/* bên phải - left section */}
      <div className="flex-[7] w-full  flex flex-col border-r-2 border-gray-200 ">
        <div className="flex justify-between items-center p-4 border-b-2 border-gray-200">
          <p className="!mb-0 text-[30px] font-[500] cursor-pointer hover:underline">
            {selectedJob.title}
          </p>
          <div className="flex gap-2">
            {selectedJob?.skills?.map((skill, index) => (
              <p
                key={index}
                className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200 text-gray-700"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div
          className="flex flex-col p-4  gap-[50px] max-h-[780px] overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex flex-col justify-center item-center">
            <p className="font-[500]">Tóm tắt về vai trò:</p>
            <p className="!mb-0 font-[400]">{selectedJob?.description}</p>
          </div>
          <div className="flex flex-col justify-center item-center">
            <p className="font-[500]">về trách nhiệm công việc: </p>
            <p className="!mb-0 font-[400]">{selectedJob?.respon}</p>
          </div>
          <div className="flex flex-col justify-center item-center">
            <p className="font-[500]">về kinh nghiệm cần có: </p>
            <ul className="list-disc pl-5">
              {selectedJob?.requiredExperience?.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center item-center">
            <p className="font-[500]">Các yêu cầu kĩ năng:</p>
            <div className="flex gap-3">
              {selectedJob?.requiredSkills?.map((skill, index) => (
                <p
                  key={index}
                  className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200 text-gray-700"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* bên phải - right section */}
      <div className="flex-[3] w-full flex flex-col gap-3">
        {/* Thông tin công ty */}
        <div className="flex w-[80%] flex-col gap-4 p-4">
          <div className="flex justify-between items-center">
            <p className="!mb-0 flex items-center gap-2 text-[20px] font-[500]">
              {selectedJob?.company}
              <CheckBadgeIcon className="w-5 h-5 text-green-600" />
            </p>
            <img
              src={selectedJob?.image}
              alt={selectedJob?.company}
              className="max-w-[50px]"
            />
          </div>
          <div>
            <p className="!mb-2 font-[500]">Gia nhập vào:</p>
            <p className="!mb-0 font-[400] text-gray-500">
              {selectedJob?.joinDate}
            </p>
          </div>
          <div>
            <p className="!mb-2 font-[500]">Địa điểm:</p>
            <p className="!mb-0 font-[400] text-gray-500">
              {selectedJob?.address}
            </p>
          </div>
        </div>

        <span className="border-b-[2px]"></span>

        {/*thông tin khác */}
        <div className="flex w-[80%] flex-col gap-4 p-4">
          <p className="!mb-0 text-[20px] font-[500]">Các thông tin khác:</p>
          <div>
            <p className="!mb-2 font-[500] flex items-center gap-3">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
                ))}
            </p>
            <p className="!mb-0 font-[400] text-gray-500">
              Đã xác minh thanh toán
            </p>
          </div>
          <div>
            <p className="!mb-2 font-[500]">$65K+ tổng số tiền đã chi trả</p>
            <p className="!mb-0 font-[400] text-gray-500">
              Đã xác minh thanh toán
            </p>
          </div>
        </div>

        <span className="border-b-[2px]"></span>

        {/*dịch vụ */}
        <div className="flex w-[80%] flex-col gap-4 p-4">
          <p className="!mb-0 text-[20px] font-[500]">Về các dịch vụ:</p>
          <div className="flex flex-wrap gap-3">
            {selectedJob?.services?.map((service, index) => (
              <p
                key={index}
                className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200"
              >
                {service}
              </p>
            ))}
          </div>
          <button className="text-white px-4 py-2 bg-[#1E90FF] rounded-xl mt-8">
            Ứng tuyển
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
