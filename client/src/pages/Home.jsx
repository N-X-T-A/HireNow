import React from "react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  return (
    <div>
      <Header />
      <div className="container w-full !max-w-[1700px] p-[10px]  py-8">
        <div className="w-full  bg-white flex rounded-[10px] gap-2">
          <div
            className="respon-l flex-1 max-w-[800px] w-full rounded-[10px] "
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="relative">
              <img
                className="w-full  max-h-[750px] object-cover rounded-[10px]"
                src="/src/assets/home/frame.webp"
                alt=""
              />
            </div>
          </div>
          <div
            className="respon-m flex-1 max-w-[370px] w-full p-[10px] rounded-[10px]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="flex flex-col w-full h-full items-center justify-items-center justify-between">
              <div className="w-full flex justify-between px-[25px]">
                <div>
                  <p className="!m-0 text-[20px] font-[700]">Service</p>
                  <p className="!m-0 text-[18px] font-[600] decoration-solid underline decoration-solid">
                    FAQS
                  </p>
                </div>
                <div>
                  <img
                    className="max-w-28 w-full "
                    src="/src/assets/home/logo.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full px-[25px]">
                <div>
                  <p className="!m-0 text-[50px] font-[700]">chuyển đổi</p>
                  <p className="!m-0 text-[40px] font-[400]">trải nghiệm</p>
                  <p className="!m-0 text-[35px] font-[400]">
                    tìm kiếm việc làm.
                  </p>
                  <p className="!m-0 text-[15px] font-[400] pt-[10px]">
                    khám phá cơ sở dữ liệu việc làm rộng lớn từ các công ty hàng
                    đầu
                  </p>
                  <button className="mt-[10px] w-[70%] h-[45px] rounded-[10px] px-[20px] py-[10px] bg-[#1E90FF] text-white cursor-pointer  transition ease-in-out duration-300 hover:bg-[black]">
                    Lấy chỗ trống ngay
                  </button>
                </div>
              </div>
              <div className="w-full px-[25px] mb-[20px]">
                <p className="!m-0 text-[15px] font-[400]">
                  Kết nối với chúng tôi:
                </p>
                <div className="flex gap-3 text-[30px] pt-[10px]">
                  <FontAwesomeIcon icon={faFacebook} />
                  <FontAwesomeIcon icon={faInstagram} />
                  <FontAwesomeIcon icon={faTwitter} />
                </div>
              </div>
            </div>
          </div>
          <div className="respon-m flex-1 w-full max-h-[750px] rounded-[10px]">
            <div className="flex flex-col w-full h-full items-center gap-2">
              {/* Hình ảnh đầu tiên */}
              <motion.div>
                <motion.div
                  className="card w-full rounded-[10px] relative overflow-hidden"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                >
                  <img
                    className="w-full min-h-[375px] object-cover rounded-[10px]"
                    src="/src/assets/home/tartical.jpg"
                    alt="Tuyển dụng nhân sự"
                  />
                  <p className="!mb-0 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-[20px] w-full text-white">
                    Việc tuyển dụng nhân sự chất lượng là một yếu tố quyết định
                    đến sự thành công của dự án
                  </p>
                </motion.div>
                <motion.div className="absolute"></motion.div>
              </motion.div>

              {/* Hình ảnh thứ hai */}
              <div
                className="w-full rounded-[10px] relative overflow-hidden"
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                <img
                  className="w-full max-h-[375px] object-cover rounded-[10px]"
                  src="/src/assets/home/tarnical2.jpg"
                  alt="Hình ảnh tuyển dụng"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
