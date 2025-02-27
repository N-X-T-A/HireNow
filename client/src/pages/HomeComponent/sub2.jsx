import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { jobs } from "../../data/data";
import { slidesCEO } from "../../data/data";
import { useState, useEffect } from "react";
const Sub2 = () => {
  const [currentCEO, setCurrentCEO] = useState(2);
  //slider loading
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCEO((prev) => (prev >= slidesCEO.length - 3 ? 2 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const hoverColors = [
    "hover:bg-blue-100",
    "hover:bg-green-100",
    "hover:bg-red-100",
    "hover:bg-yellow-100",
    "hover:bg-purple-100",
    "hover:bg-pink-100",
  ];
  return (
    <div className="w-full bg-white flex flex-col  gap-2 mt-[100px] items-center justify-items-center justify-center">
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
          Tìm kiếm và khám phá công việc của bạn ở đây
        </h1>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-[100px] flex flex-col items-center justify-items-center justify-center gap-2"
      >
        <p className="!mb-0 text-[15px] font-[300] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
          CEO và người có ảnh hưởng
        </p>
        <h1 className="!mb-0 text-[45px] font-[500] max-w-[900px] text-center">
          Top những CEO và người có ảnh hưởng đã có mặt trên nền tảng của chúng
          tôi
        </h1>
      </motion.div>

      <div className="flex justify-center items-center overflow-hidden w-full h-[700px] relative">
        {slidesCEO.map((slide, index) => {
          const offset = index - currentCEO;

          return (
            <motion.div
              key={slide.id}
              className="absolute w-[450px] h-[650px] rounded-xl overflow-hidden"
              animate={{
                x: offset * 260,
                scale: Math.max(0.8, 1 - Math.abs(offset) * 0.2),
                rotateY: Math.abs(offset) <= 1 ? offset * -20 : 0,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt="slide"
              />
              <div className="absolute bottom-0 bg-black/50 text-white w-full text-center p-2">
                <p className="text-lg">{slide.quote}</p>
                <p className="text-sm">{slide.author}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Sub2;
