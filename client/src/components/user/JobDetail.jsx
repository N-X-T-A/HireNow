import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { SparklesIcon, StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
const JobDetail = ({ jobId }) => {
  //state
  const navigate = useNavigate();
  const [selectedJob, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Lỗi khi parse JSON từ sessionStorage:", error);
      return null;
    }
  });
  //fetch API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/jobs/${jobId}`);
        setJobs(response.data);
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
          <p
            onClick={() => navigate(`/user/jobs/1`)}
            className="!mb-0 text-[30px] font-[500] cursor-pointer hover:underline"
          >
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
          <button
            onClick={() => setOpen(!open)}
            className="text-white px-4 py-2 bg-[#1E90FF] rounded-xl mt-8"
          >
            Ứng tuyển
          </button>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(!open)}
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-[999] w-full h-screen"
            >
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="md:w-[1000px] h-auto bg-white rounded-[10px] shadow-lg overflow-hidden flex gap-4 p-4"
              >
                <img
                  src="/src/assets/user/apply.gif"
                  alt=""
                  className="max-w-[300px] border-[2px] rounded-[10px]"
                />
                <div className="flex flex-col gap-3 w-full">
                  <>
                    <span>
                      <p className="!mb-0 font-[600] text-[#1E90FF]">
                        Thông tin liên hệ:
                      </p>
                      <div className="flex  items-center gap-2">
                        <img
                          src={user?.photoURL}
                          alt=""
                          className="w-10 h-10 rounded-full border-[2px] border-gray-200"
                        />

                        <div>
                          <p className="!mb-0">{user?.username}</p>
                          <p className="!mb-0 text-gray-500 text-[12px]">
                            Dalat, LamDong, VietNam
                          </p>
                        </div>
                      </div>
                    </span>
                    <span>
                      <p className="!mb-0 font-[600] text-[#1E90FF]">
                        Đăng tải CV của bạn tại đây:
                      </p>
                      <div className="w-full border-[1px] rounded-[10px] border-dashed border-gray-300 p-2">
                        <div className="flex gap-2 items-center">
                          <button className="py-1 px-4 rounded-md border-[1px] border-[#1E90FF]">
                            Tải lên
                          </button>
                          <p className="!mb-0 text-gray-500">
                            Chưa có file nào được upload
                          </p>
                        </div>
                        <p className="!mb-0 font-[600] text-[13px] text-gray-500">
                          Vui lòng chỉ upload file có filetype là .pdf, chỉ một
                          file duy nhất
                        </p>
                      </div>
                    </span>
                    <span>
                      <p className="!mb-0 font-[600] text-[#1E90FF]">
                        Thêm mô tả ngắn của bạn về việc lựa chọn công việc này:
                      </p>
                      <div className="flex gap-2">
                        <textarea
                          className="border-[1px] rounded-md flex-[7] p-2"
                          type="text"
                          placeholder="Mô tả ngắn của bạn"
                        />
                        <button className="px-2 py-1 rounded-md bg-[#1E90FF] text-white">
                          Xác nhận
                        </button>
                      </div>
                    </span>
                  </>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
