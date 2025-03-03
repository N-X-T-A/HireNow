import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import JobP1Header from "../../components/user/jobP1Header";
import { motion } from "framer-motion";
import { jobs } from "../../data/data";
const UserPage1 = () => {
  const hoverColors = [
    "hover:bg-blue-100",
    "hover:bg-green-100",
    "hover:bg-red-100",
    "hover:bg-yellow-100",
    "hover:bg-purple-100",
    "hover:bg-pink-100",
  ];
  return (
    <>
      <JobP1Header />
      <div className="w-full relative">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full max-h-[450px] object-cover"
          src="/src/assets/user/nav.png"
          alt=""
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="absolute hidden  md:bottom-[-15%] mt-2 w-full md:flex flex-col justify-center gap-3"
        >
          {/* total dashboard */}
          <div
            className="w-full flex flex-col md:flex-row justify-center items-center rounded-[20px] bg-white"
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
                <GlobeAltIcon className="w-5 h-5 text-[#1E90FF]" /> Các nhà
                tuyển dụng mới
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
        </motion.div>
      </div>
      <div className="w-full flex flex-col gap-3 mt-[10%]  items-center justify-items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center justify-items-center justify-center gap-2"
        >
          <p className="!mb-0 text-[15px] font-[400] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
            Thực hiện ước mơ nghề nghiệp của bạn
          </p>
          <h1 className="!mb-0 text-[45px] font-[500] max-w-[600px] text-center">
            Công việc đang được tìm kiếm nhiều nhất
          </h1>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              className={`bg-gray-100 pt-2 pr-2 pl-2 pb-4 border rounded-xl shadow-md transition-all duration-300 cursor-pointer ${hoverColors[index % hoverColors.length]} hover:text-white`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="p-3 rounded-xl bg-white">
                {" "}
                <h2 className="text-lg font-semibold text-gray-800">
                  {job.company}
                </h2>
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <p className="text-gray-500">
                  {job.location} • {job.type}
                </p>
                <p className="text-gray-500">{job.category}</p>
                <p className="font-semibold text-gray-700">{job.salary}</p>
                <button className="mt-3 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800">
                  Ứng tuyển
                </button>
                <p className="text-xs text-gray-400 mt-2">Đăng {job.posted}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <button className=" transition ease-in-out duration-300 transform hover:-translate-y-[5px] flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] bg-black rounded-[20px] text-white">
          Xem thêm <FontAwesomeIcon icon={faCircleRight} />
        </button>
      </div>
    </>
  );
};

export default UserPage1;
