import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "../pages/pageCss/Test.css";
const Test = () => {
  return (
    <login>
      <div className="container w-full !max-w-[1500px] p-[10px]  py-8">
        <div
          className="w-full rounded-[10px]  bg-white flex p-[10px] "
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="respon-l flex-1 max-w-[800px] w-full">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              <SwiperSlide>
                <div className="relative">
                  <img
                    src="/src/assets/login/3.jpg"
                    alt=""
                    className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
                  />
                  <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent  p-[10px] w-full rounded-[10px]">
                    <p className="text-[white] text-[22px] font-[300]">
                      "Dưới góc độ công nghệ thông tin, việc tuyển dụng nhân sự
                      chất lượng là một yếu tố quyết định đến sự thành công của
                      dự án. Chúng tôi tìm kiếm những ứng viên không chỉ có kỹ
                      năng chuyên môn vững vàng mà còn có khả năng làm việc nhóm
                      và giải quyết vấn đề sáng tạo."
                    </p>
                    <p className="text-[white] text-[15px]">
                      Pablo Escanor - Kỹ sư Phần mềm
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
          </div>
          <div className="respon-r flex-1 pl-[20px] w-full">
            <div className="flex flex-col w-full h-full items-center justify-items-center justify-center">
              <div className="flex flex-col w-full items-center justify-items-center justify-center gap-[10px]">
                <p className="text-center !m-0 text-[35px] font-[400] tracking-[0.5px]">
                  Chào mừng bạn quay trở lại!
                </p>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-[70%] border-[1px] border-zinc-800 h-[40px] rounded-[10px] px-[20px] py-[10px] mt-[35px]"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-[70%] border-[1px] border-zinc-800 h-[40px] rounded-[10px] px-[20px] py-[10px] "
                />
                <button className="w-[70%] h-[45px] rounded-[10px] px-[20px] py-[10px] bg-[black] text-white cursor-pointer  transition ease-in-out duration-300 hover:bg-[#1E90FF]">
                  Đăng nhập
                </button>
              </div>
              <div className="flex items-center w-[70%] py-[25px]">
                <hr className="flex-grow border-t border-gray-900" />
                <span className="px-4 text-gray-600">Hoặc</span>
                <hr className="flex-grow border-t border-gray-900" />
              </div>
              <div className="flex items-center justify-center w-[70%]">
                <p className="text-center !m-0">
                  Chưa có tài khoản?{" "}
                  <span className="relative cursor-pointer bg-gradient-to-r from-[#1E90FF] via-green-400 to-blue-900 bg-clip-text text-transparent after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#1E90FF] after:via-green-400 after:to-blue-900 after:transition-all after:duration-300 hover:after:w-[90%]">
                    đăng ký{" "}
                  </span>{" "}
                  ngay
                </p>
              </div>
              <div className="flex  gap-[10px] flex-col items-center w-[70%] py-[25px]">
                <button className="flex items-center justify-items-center justify-center gap-[10px] w-full h-[45px] rounded-[10px] px-[20px] py-[10px] border-[1px] border-zinc-800 text-black cursor-pointer  transition ease-in-out duration-300 ">
                  <img
                    src="/src/assets/login/gg.png"
                    alt=""
                    className="w-full max-w-[20px]"
                  />
                  Đăng nhập bằng Google
                </button>
                <button className="flex items-center justify-items-center justify-center gap-[10px] w-full h-[45px] rounded-[10px] px-[20px] py-[10px] border-[1px] border-zinc-800 text-black cursor-pointer  transition ease-in-out duration-300 ">
                  <img
                    src="/src/assets/login/git.png"
                    alt=""
                    className="w-full max-w-[20px]"
                  />
                  Đăng nhập bằng Github
                </button>
                <button className="flex items-center justify-items-center justify-center gap-[10px] w-full h-[45px] rounded-[10px] px-[20px] py-[10px] border-[1px] border-zinc-800 text-black cursor-pointer  transition ease-in-out duration-300 ">
                  <img
                    src="/src/assets/login/twt.png"
                    alt=""
                    className="w-full max-w-[20px]"
                  />
                  Đăng nhập bằng Twitter
                </button>
              </div>
              <p className="pt-[20px] text-[10px] w-[70%] text-right text-gray-400 cursor-pointer hover:bg-gradient-to-r hover:from-[#1E90FF] hover:via-green-400 hover:to-blue-900 hover:bg-clip-text hover:text-transparent">
                inc, vietnam 19-1-25, by Yung_Ah
              </p>
            </div>
          </div>
        </div>
      </div>
    </login>
  );
};

export default Test;
