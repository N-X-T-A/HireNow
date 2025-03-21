import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import JobP1Header from "../../components/user/jobP1Header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jobs } from "../../data/data";
import { services } from "../../data/data";
import { companiesPage1 } from "../../data/data";
import axios from "axios";
const UserPage1 = () => {
  //state
  const navigate = useNavigate();
  const [jobsList, setJobsList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  //API
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/job");
      setJobsList(response.data.jobs);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách công việc:", error);
    }
  };
  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/company/");
      setCompaniesList(response.data.metadata);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách công việc:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  useEffect(() => {
    fetchCompanies();
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
      <div className="w-full flex flex-col gap-3 mt-[5%]  items-center justify-items-center justify-center">
        {/* job header*/}
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
        {/* job list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {jobsList?.slice(0, 8).map((job, index) => (
            <motion.div
              key={job._id}
              className={`bg-gray-100 pt-2 pr-2 pl-2 pb-4 border rounded-xl shadow-md transition-all duration-300 cursor-pointer ${hoverColors[index % hoverColors.length]} hover:text-white md:w-[400px] w-[330px]`}
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
                  {job.company.name}
                </h2>
                <h3
                  className="text-xl font-bold text-gray-900 hover:underline"
                  onClick={() => navigate(`/user/jobs/${job._id}`)}
                >
                  {job.title}
                </h3>
                <p className="text-gray-500">{job.location} • Toàn thời gian</p>
                <p className="font-semibold text-gray-700">
                  {job.salary_range}
                </p>
                <button className="mt-3 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800">
                  Ứng tuyển
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  Đăng {job.posted_time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <button className=" transition ease-in-out duration-300 transform hover:-translate-y-[5px] flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] bg-black rounded-[20px] text-white">
          Xem thêm <FontAwesomeIcon icon={faCircleRight} />
        </button>
        {/* service */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center justify-items-center justify-center gap-2"
        >
          <h1 className="!mb-0 text-[45px] font-[500] max-w-[600px] text-center">
            Các dịch vụ phổ biến
          </h1>
          <p>
            Các dịch vụ hỗ trợ bên thứ 3 có thể hỗ trợ cho công việc của bạn
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ">
            {services.map((service, index) => (
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative bg-white p-5 shadow-lg rounded-xl transform rotate-2"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-md w-full h-40 object-cover"
                />
                <h3 className="text-lg font-bold mt-4">{service.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-200 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="absolute bottom-5 right-5 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">
                  →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* companies header*/}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center justify-items-center justify-center gap-2"
        >
          <h1 className="!mb-0 text-[45px] font-[500] max-w-[600px] text-center">
            Danh sách các công ty tuyển dụng hàng đầu
          </h1>
        </motion.div>
        {/* companies list */}
        <div className="flex gap-3 flex-wrap justify-center items-center w-full">
          {/* companies item */}
          {companiesList?.map((company, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              key={company._id}
              className="md:w-1/4 flex-col gap-1 p-2 relative"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <img
                src={company.background_image}
                alt=""
                className="w-full max-h-[200px] object-cover"
              />
              <img
                src={company.logo}
                alt=""
                className="absolute max-w-[70px] left-5 top-[-1/2] -translate-y-1/2 p-[2px] rounded-full bg-white"
              />
              <p className="!mb-0 mt-[8%] px-2 text-[20px] font-[600]">
                {company.name}
              </p>
              <p className="!mb-0 px-2 text-[15px] text-gray-400 ">VietNam</p>
              <p className="!mb-0 px-2 text-[15px] text-gray-600 text-justify line-clamp-3">
                {company.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPage1;
