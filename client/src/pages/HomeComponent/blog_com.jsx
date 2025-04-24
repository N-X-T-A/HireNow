import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLanguage } from "../../hooks/useLanguage";

const Blog_com = () => {
  const [Blog, SetBlog] = useState([]);
  const navigate = useNavigate();
  const { translations } = useLanguage();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/blog");
        SetBlog(res.data);
      } catch (err) {
        console.log("Lỗi fetch blog:", err);
      }
    };
    fetchJob();
  }, []);

  return (
    <div className="w-full bg-white flex flex-col gap-5 mt-[100px] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-[15px] font-[400] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
          {translations["blogTitle"]}
        </p>
        <h1 className="text-[45px] font-[500] max-w-[950px] text-center">
          {translations["blogSubtitle"]}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full flex items-center justify-between"
      >
        <div className="flex gap-2">
          {[
            translations["allPosts"],
            translations["latestPosts"],
            translations["interviews"],
          ].map((label, i) => (
            <button
              key={i}
              className="relative px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px] group transform hover:-translate-y-[5px] hover:border-black transition-all duration-500"
            >
              <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-[20px]"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                {label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/blogs")}
          className="px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]"
        >
          {translations["seeMore"]} <FontAwesomeIcon icon={faCircleRight} />
        </button>
      </motion.div>

      <div className="w-full flex flex-row gap-2">
        {Blog?.slice(0, 5).map((job, index) => (
          <motion.div
            key={job._id}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
            whileHover={{
              y: -10,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              onClick={() => navigate(`/blogs/${job._id}`)}
              src={job.image}
              alt=""
              className="rounded-t-md h-[180px] object-cover"
            />
            <div className="cursor-pointer flex gap-2 flex-col border-[1px] border-gray-300 p-2 pt-4 rounded-b-md">
              <p
                onClick={() => navigate(`/blogs/${job._id}`)}
                className="font-bold text-justify min-h-[70px]"
              >
                {job.title}
              </p>
              <p className="text-justify line-clamp-4 min-h-[96px]">
                {job.short_title}
              </p>
              <p className="text-sm text-gray-500 italic line-clamp-1">
                {translations["tags"]}:{" "}
                {job.tags.map((tag) => tag.name).join(", ")}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog_com;
