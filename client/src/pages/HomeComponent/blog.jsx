import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
const Blog = () => {
  return (
    <div className="w-full bg-white flex flex-col  gap-5 mt-[100px] items-center justify-items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center justify-items-center justify-center gap-2"
      >
        <p className="!mb-0 text-[15px] font-[400] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
          Góc nhìn và lời khuyên
        </p>
        <h1 className="!mb-0 text-[45px] font-[500] max-w-[950px] text-center">
          Tìm lời khuyên của chuyên gia và hiểu biết sâu sắc về tăng trưởng trên
          blog của chúng tôi
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full flex items-center justify-items-center justify-center justify-between "
      >
        <div className="flex gap-2">
          <button className="relative px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]  overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]  hover:border-black">
            <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Tất cả các bài viết
            </span>
          </button>
          <button className="relative px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]  overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]  hover:border-black">
            <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Bài viết mới nhất
            </span>
          </button>
          <button className="relative px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]  overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px] hover:border-black">
            <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Các bài phỏng vấn
            </span>
          </button>
        </div>
        <button className="px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]">
          Xem thêm <FontAwesomeIcon icon={faCircleRight} />
        </button>
      </motion.div>
      <div className="w-full flex flex-row gap-2 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex flex-col gap-3"
        >
          <img
            className="w-full rounded-[30px]"
            src="/src/assets/home/artical.jpg"
            alt=""
          />
          <p className="!mb-0 text-[30px] font-[600]">
            Cách phát hiện gian lận tuyển dụng.
          </p>
          <p className="!mb-0 text-[15px] font-[400] text-gray-400 line-clamp-4">
            Phát hiện gian lận trong tuyển dụng là một vấn đề quan trọng để bảo
            vệ ứng viên cũng như doanh nghiệp. Dưới đây là một số cách để nhận
            biết và phòng tránh gian lận trong tuyển dụng. Phát hiện gian lận
            trong tuyển dụng là một vấn đề quan trọng để bảo vệ ứng viên cũng
            như doanh nghiệp. Dưới đây là một số cách để nhận biết và phòng
            tránh gian lận trong tuyển dụng. Phát hiện gian lận trong tuyển dụng
            là một vấn đề quan trọng để bảo vệ ứng viên cũng như doanh nghiệp.
            Dưới đây là một số cách để nhận biết và phòng tránh gian lận trong
            tuyển dụng
          </p>
          <button className="w-[20%] relative px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]  overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]  hover:border-black">
            <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Xem thêm
            </span>
          </button>
        </motion.div>
        <motion.div className="flex-1"></motion.div>
      </div>
    </div>
  );
};

export default Blog;
