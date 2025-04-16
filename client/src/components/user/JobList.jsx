import React from "react";

import { ClockIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobList = ({
  onSelectJob,
  sortOrder,
  searchTerm,
  UserJobsAPI,
  bookmarkedJobs,
  open,
  loading,
  OpenNotification,
  OpenNotification1,
  handleBookmarkClick,
}) => {
  const navigate = useNavigate();

  console.log(UserJobsAPI);
  return (
    <>
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
            className="md:w-[600px] h-auto bg-white rounded-[10px] shadow-lg overflow-hidden flex flex-col md:flex-row gap-4 p-2"
          >
            <img
              src="/src/assets/user/baymax.gif"
              alt=""
              className="rounded-[10px]"
            />
            <div className="w-full flex flex-col justify-center items-center">
              <p className="!mb-0 text-[20px] font-[600]">
                Opps! Baymax hết pin mất rồi
              </p>
              <p className="!mb-0 text-[20px] font-[600]">
                đăng nhập lại nhé!!
              </p>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/login");
                }}
                className="px-4 py-2 rounded-lg text-[15px] mt-4 font-[600] bg-[#1E90FF] text-white"
              >
                Đăng nhập
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div
        className="flex-1 md:flex-[3]  p-2 max-h-[900px] overflow-y-auto cursor-pointer "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-full flex flex-col gap-3">
          {/* công việc */}
          <div className="flex flex-col gap-4">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 w-full p-4 rounded-lg"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton circle height={50} width={50} />
                      <div className="flex flex-col gap-1">
                        <Skeleton width={150} height={20} />
                        <Skeleton width={100} height={15} />
                      </div>
                    </div>
                    <Skeleton count={2} height={15} />
                    <Skeleton width="80%" height={20} />
                  </div>
                ))
              : UserJobsAPI.map((job) => (
                  <div
                    key={job.id}
                    className="relative  flex flex-col gap-2 w-full p-4 rounded-lg transition ease-in-out duration-300 transform hover:-translate-y-[5px]"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                    onClick={() => onSelectJob(job._id)}
                  >
                    {job.tag && (
                      <span
                        className={`absolute top-2 right-2 px-3 py-1 text-[12px] font-bold rounded-full z-20 animate-pulse ${
                          job.tag.toLowerCase() === "super hot"
                            ? "bg-red-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {job.tag === "Super hot" ? "🔥 Super hot" : job.tag}
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <img
                          className="max-w-[50px] rounded-md border-[1px]"
                          src={job.company.logo}
                          alt={job.company.name}
                        />
                        <span className="flex flex-col gap-1">
                          <p className="!mb-0 text-[20px]">{job.title}</p>
                          <p className="!mb-0 text-gray-500 text-[13px]">
                            {job.company.name}
                          </p>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmarkClick(job._id);
                        }}
                        className="relative z-10 p-2 rounded-full transition-all"
                      >
                        <BookmarkIcon
                          className={`w-10 h-10 transition-all ${
                            bookmarkedJobs[job._id]
                              ? "fill-blue-500"
                              : "fill-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      {job?.skills.map((skill, index) => {
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

                    <p
                      className="!mb-0 w-full text-[15px] min-h-[auto] max-h-[130px] overflow-y-auto"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {parse(
                        job.reasons_to_join.replace(
                          "<ul>",
                          '<ul class="list-disc pl-5">'
                        )
                      )}
                    </p>

                    <span className="border-b-[1px] border-gray-300 w-full"></span>

                    <div className="flex items-center justify-between w-full">
                      <p className="!mb-0 text-[20px] font-[500]">
                        {job.salary_range}
                      </p>
                      <span className="flex items-center gap-1 text-13px text-gray-400">
                        <ClockIcon className="w-4 h-4" />
                        <p className="!mb-0">{job.posted_time}</p>
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {OpenNotification && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-[5%] right-[2%] "
        >
          <div className="relative flex items-center justify-center">
            <p className="!mb-0 px-4 py-2 font-[600] rounded-lg text-white bg-green-500">
              Lưu thành công
            </p>
          </div>
        </motion.div>
      )}
      {OpenNotification1 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-[5%] right-[2%] "
        >
          <div className="relative flex items-center justify-center">
            <p className="!mb-0 px-4 py-2 font-[600] rounded-lg text-white bg-red-500">
              Xóa thành công
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default JobList;
