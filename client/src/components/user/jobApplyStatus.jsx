import React, { useState, useEffect } from "react";
import axios from "axios";
import { jobs } from "../../data/data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { SparklesIcon, StarIcon } from "@heroicons/react/24/solid";
import Joyride from "react-joyride";
import parse from "html-react-parser";
const JobApplyStatus = () => {
  //useState
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [jobsAPI, setJobsAPI] = useState([]);
  const [jobsSelect, setJobsSelect] = useState([]);
  const [jobSave, setJobSave] = useState([]);
  const [jobID, setJobID] = useState(null);
  const [runTutorial, setRunTutorial] = useState(false);
  const ACCESS_TOKEN = sessionStorage?.getItem("access_token");
  const [bookmarkedJobs, setBookmarkedJobs] = useState({});
  //config tutorial
  const stepsTutorial = [
    {
      target: "#left-panel",
      content: "Đây là danh sách công việc đã lưu của bạn.",
      placement: "right",
    },
    {
      target: "#right-panel",
      content: "Đây là trạng thái ứng tuyển của bạn.",
      placement: "left",
    },
  ];
  //API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/jobs`);
        setJobsAPI(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchJobs();
  }, []);

  //save list
  const fetchJobsAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/favorite",
        {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }
      );
      setJobSave(response.data.metadata);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách công việc:", error);
    }
  };
  useEffect(() => {
    fetchJobsAPI();
  }, []);
  //delete list
  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/favorite/${jobId}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      console.log("Đã xóa bookmark");
      setJobSave((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
      // const updatedBookmarks = { ...bookmarkedJobs, [jobId]: false };
      // setBookmarkedJobs(updatedBookmarks);
      // localStorage.setItem(
      //   "bookmarkedJobs",
      //   JSON.stringify(updatedBookmarks)
      // );
    } catch (error) {
      console.error("Lỗi khi xóa bookmark:", error);
    }
  };

  useEffect(() => {
    const fetchJobsDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/job/${jobID}`
        );
        setJobsSelect(response.data.job);
        console.log("Danh sách công việc:", response.data.job);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchJobsDetail();
  }, [jobID]);

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
      <div
        onClick={() => setRunTutorial(true)}
        className="cursor-pointer fixed bottom-[50px] right-[30px] bg-white text-black py-3 px-4 rounded-full font-[600]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        ?
      </div>
      <Joyride
        steps={stepsTutorial}
        run={runTutorial}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        locale={{
          back: "Quay lại",
          close: "Đóng",
          last: "Hoàn tất",
          nextLabelWithProgress: "Tiếp theo (Bước {step} của {steps})",
          skip: "Bỏ qua",
        }}
        callback={(data) => {
          if (data.status === "Hoàn tất" || data.status === "Skip") {
            setRunTutorial(false);
          }
        }}
      />
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
        <div className="w-full flex md:flex-row flex-col gap-2">
          {/* left */}
          <div
            id="left-panel"
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
              {jobSave.map((job, index) => (
                <motion.div
                  key={job._id}
                  className={`relative bg-gray-100 md:w-[calc(50%-8px)]  pt-2 pr-2 pl-2 pb-4 border rounded-xl shadow-md transition-all duration-300 cursor-pointer ${hoverColors[index % hoverColors.length]} hover:text-white`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true, amount: 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="absolute top-4 right-4 text-red-600">
                    <XCircleIcon
                      className="w-5 h-5"
                      onClick={() => handleDelete(job.job_id)}
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-white">
                    {" "}
                    <h2 className="text-lg font-semibold text-gray-800">
                      {job.company.name}
                    </h2>
                    <h3
                      onClick={() => {
                        setOpen(!open);
                        setJobID(job.job_id);
                      }}
                      className="hover:underline text-xl font-bold text-gray-900"
                    >
                      {job.title}
                    </h3>
                    <p className="text-gray-500 line-clamp-1">
                      {job.company.location} • Data scient
                    </p>
                    <p className="text-gray-500 ">Data Pipeline</p>
                    <p className="font-semibold text-gray-700">
                      {job.salary_range}
                    </p>
                    <button className="mt-3 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800">
                      Ứng tuyển
                    </button>
                    <p className="text-xs text-gray-400 mt-2">
                      Đăng 4 ngày trước
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* pop up */}
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
                {/* bên phải - left section */}
                <div className="flex-[7] w-full  flex flex-col border-r-2 border-gray-200 ">
                  <div className="flex justify-between items-center p-4 border-b-2 border-gray-200">
                    <p
                      onClick={() => navigate(`/user/jobs/1`)}
                      className="!mb-0 text-[30px] font-[500] cursor-pointer hover:underline"
                    >
                      {jobsSelect?.title}
                    </p>
                    <div className="flex gap-2">
                      {jobsSelect?.skills?.map((skill, index) => (
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
                      <p className="!mb-0 font-[400]">
                        {jobsSelect?.description
                          ? parse(
                              jobsSelect.description.replace(
                                "<p>",
                                '<p class="!mb-0">'
                              )
                            )
                          : "Không có mô tả"}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center item-center">
                      <p className="font-[500]">về trách nhiệm công việc: </p>
                      <p className="!mb-0 font-[400]">
                        {" "}
                        {jobsSelect?.responsibility
                          ? parse(
                              jobsSelect.responsibility.replace(
                                "<ul>",
                                '<ul class="list-disc pl-5 space-y-2">'
                              )
                            )
                          : "Không có trách nhiệm công việc"}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center item-center">
                      <p className="font-[500]">về kinh nghiệm cần có: </p>
                      <ul className="list-disc pl-5">
                        {jobsSelect?.required_experience
                          ? parse(
                              jobsSelect.required_experience.replace(
                                "<ul>",
                                '<ul class="list-disc pl-5 space-y-2">'
                              )
                            )
                          : "Không có yêu cầu kinh nghiệm"}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-center item-center">
                      <p className="font-[500]">Các yêu cầu kĩ năng:</p>
                      <div className="flex gap-3">
                        {jobsSelect?.skills?.map((skill, index) => (
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
                        {jobsSelect?.company?.name}
                        <CheckBadgeIcon className="w-5 h-5 text-green-600" />
                      </p>
                      <img
                        src={jobsSelect?.company?.logo}
                        alt={jobsSelect?.company}
                        className="max-w-[50px]"
                      />
                    </div>
                    <div>
                      <p className="!mb-2 font-[500]">Gia nhập vào:</p>
                      <p className="!mb-0 font-[400] text-gray-500">2023</p>
                    </div>
                    <div>
                      <p className="!mb-2 font-[500]">Địa điểm:</p>
                      <p className="!mb-0 font-[400] text-gray-500">
                        {jobsSelect?.company?.locations
                          ?.map(
                            (loc) => `${loc.city} - ${loc.detailed_location}`
                          )
                          .join(", ")}
                      </p>
                    </div>
                  </div>

                  <span className="border-b-[2px]"></span>

                  {/*thông tin khác */}
                  <div className="flex w-[80%] flex-col gap-4 p-4">
                    <p className="!mb-0 text-[20px] font-[500]">
                      Các thông tin khác:
                    </p>
                    <div>
                      <p className="!mb-2 font-[500] flex items-center gap-3">
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <StarIcon
                              key={index}
                              className="w-5 h-5 text-yellow-500"
                            />
                          ))}
                      </p>
                      <p className="!mb-0 font-[400] text-gray-500">
                        Đã xác minh thanh toán
                      </p>
                    </div>
                    <div>
                      <p className="!mb-2 font-[500]">
                        $65K+ tổng số tiền đã chi trả
                      </p>
                      <p className="!mb-0 font-[400] text-gray-500">
                        Đã xác minh thanh toán
                      </p>
                    </div>
                  </div>

                  <span className="border-b-[2px]"></span>

                  {/*dịch vụ */}
                  <div className="flex w-[80%] flex-col gap-4 p-4">
                    <p className="!mb-0 text-[20px] font-[500]">
                      Về các dịch vụ:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                        TensorFlow
                      </p>
                      <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                        PyTorch
                      </p>
                      <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                        NLP
                      </p>
                      <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                        Deep Learning
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          {/* right */}
          <div
            id="right-panel"
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
