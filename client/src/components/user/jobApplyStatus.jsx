import React, { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { jobs } from "../../data/data";
import { motion } from "framer-motion";
const JobApplyStatus = () => {
  //useState
  const [open, setOpen] = useState(false);
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
      <div className="flex flex-col gap-2">
        {/* nav */}
        <div className="flex justify-between items-centers w-full bg-[#1E90FF]">
          <p className="hidden md:flex gap-2 items-center !mb-0 p-3 text-[white] text-[25px] font-[600]">
            Trạng thái công việc của bạn <SparklesIcon className="w-8 h-8" />
          </p>
          <img
            src="/src/assets/user/Hirenow.png"
            alt=""
            className="max-h-[70px] object-cover"
          />
        </div>
        {/* job centent */}
        <div className="w-full flex gap-2">
          {/* left */}
          <div
            className="flex-1  p-2 rounded-lg"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <p className="!mb-0 text-[14px] font-[600]">
              Tất cả công việc đã lưu
            </p>
            <div
              className="p-2 w-full rounded-lg  flex flex-wrap gap-3  max-h-[900px] overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className={`bg-gray-100 md:w-[calc(50%-8px)]  pt-2 pr-2 pl-2 pb-4 border rounded-xl shadow-md transition-all duration-300 cursor-pointer ${hoverColors[index % hoverColors.length]} hover:text-white`}
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
                    <h3
                      onClick={() => setOpen(!open)}
                      className="hover:underline text-xl font-bold text-gray-900"
                    >
                      {job.title}
                    </h3>
                    <p className="text-gray-500">
                      {job.location} • {job.type}
                    </p>
                    <p className="text-gray-500 ">{job.category}</p>
                    <p className="font-semibold text-gray-700">{job.salary}</p>
                    <button className="mt-3 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800">
                      Ứng tuyển
                    </button>
                    <p className="text-xs text-gray-400 mt-2">
                      Đăng {job.posted}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* pop up */}
          {open && (
            <div
              onClick={() => setOpen(!open)}
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-[999] w-full h-screen"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="md:w-[1000px] h-auto bg-white rounded-[10px] shadow-lg overflow-hidden flex gap-4 p-4"
              ></div>
            </div>
          )}
          {/* right */}
          <div
            className="flex-1  p-2 rounded-lg"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <p className="!mb-0 text-[14px] font-[600]">
              Trạng thái ứng tuyển công việc của tôi
            </p>
            <div
              className="p-2 w-full rounded-lg  flex flex-wrap gap-3  max-h-[900px] overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className={`bg-gray-100 md:w-[calc(50%-8px)]  pt-2 pr-2 pl-2 pb-4 border rounded-xl shadow-md transition-all duration-300 cursor-pointer ${hoverColors[index % hoverColors.length]} hover:text-white`}
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
                    <h3 className="text-xl font-bold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-gray-500">
                      {job.location} • {job.type}
                    </p>
                    <p className="text-gray-500">{job.category}</p>
                    <p className="font-semibold text-gray-700">{job.salary}</p>
                    <button
                      className="mt-3 w-full bg-orange-300 text-white py-2 rounded-md font-medium cursor-not-allowed opacity-70"
                      disabled
                    >
                      Đang chờ xét duyệt...
                    </button>
                    <p className="text-xs text-gray-400 mt-2">
                      Đăng {job.posted}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplyStatus;
