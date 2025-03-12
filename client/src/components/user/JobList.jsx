import React from "react";
import { useEffect, useState } from "react";
import { ClockIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
const JobList = ({ onSelectJob }) => {
  const [UserJobs, setJobs] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState({});
  const [onBookmark, setonBookmark] = useState(null);
  console.log(onBookmark);
  //saveClick
  const handleBookmarkClick = (jobId) => {
    setBookmarkedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
    setonBookmark(jobId);
  };
  //fetch API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchJobs();
  }, []);
  return (
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
          {UserJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-2 w-full p-4 rounded-lg transition ease-in-out duration-300 transform hover:-translate-y-[5px]"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              onClick={() => onSelectJob(job.id)}
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
                {bookmarkedJobs[job.id] && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-blue-300 rounded-full"
                  />
                )}

                {/* Icon Bookmark */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn việc click chọn job khi bấm bookmark
                    handleBookmarkClick(job.id);
                  }}
                  className="relative z-10 p-2 rounded-full transition-all"
                >
                  <BookmarkIcon
                    className={`w-10 h-10 transition-all ${
                      bookmarkedJobs[job.id] ? "fill-blue-500" : "fill-gray-400"
                    }`}
                  />
                </button>
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
                <p className="!mb-0 text-[20px] font-[500]">
                  {job.salary}
                  <span className="text-[15px] font-[400] text-gray-400">
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
  );
};

export default JobList;
