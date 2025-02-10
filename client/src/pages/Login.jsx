import React from "react";
import Header from "../components/header/header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import LoginMethod from "./loginMethod";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "../pages/pageCss/Login.css";

export default function Login() {
  return (
    <div>
      <Header />
      {/* login here */}
      <login>
        <div className="container w-full !max-w-[1500px] p-[10px]  py-8">
          <div
            className="w-full rounded-[10px]  bg-white flex p-[10px] "
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            {/* Left section */}
            <div className="respon-l flex-1 max-w-[800px] w-full">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
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
                        "Dưới góc độ công nghệ thông tin, việc tuyển dụng nhân
                        sự chất lượng là một yếu tố quyết định đến sự thành công
                        của dự án. Chúng tôi tìm kiếm những ứng viên không chỉ
                        có kỹ năng chuyên môn vững vàng mà còn có khả năng làm
                        việc nhóm và giải quyết vấn đề sáng tạo."
                      </p>
                      <p className="text-[white] text-[15px]">
                        Pablo Escanor - Kỹ sư Phần mềm
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <div className="relative">
                    <img
                      src="/src/assets/login/1.png"
                      alt=""
                      className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent  p-[10px] w-full rounded-[10px]">
                      <p className="text-[white] text-[22px] font-[300]">
                        "Dưới góc độ công nghệ thông tin, việc tuyển dụng nhân
                        sự chất lượng là một yếu tố quyết định đến sự thành công
                        của dự án. Chúng tôi tìm kiếm những ứng viên không chỉ
                        có kỹ năng chuyên môn vững vàng mà còn có khả năng làm
                        việc nhóm và giải quyết vấn đề sáng tạo."
                      </p>
                      <p className="text-[white] text-[15px]">
                        Pablo Escanor - Kỹ sư Phần mềm
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative">
                    <img
                      src="/src/assets/login/2.jpg"
                      alt=""
                      className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent  p-[10px] w-full rounded-[10px]">
                      <p className="text-[white] text-[22px] font-[300]">
                        "Dưới góc độ công nghệ thông tin, việc tuyển dụng nhân
                        sự chất lượng là một yếu tố quyết định đến sự thành công
                        của dự án. Chúng tôi tìm kiếm những ứng viên không chỉ
                        có kỹ năng chuyên môn vững vàng mà còn có khả năng làm
                        việc nhóm và giải quyết vấn đề sáng tạo."
                      </p>
                      <p className="text-[white] text-[15px]">
                        Pablo Escanor - Kỹ sư Phần mềm
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative">
                    <img
                      src="/src/assets/login/4.jpg"
                      alt=""
                      className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent  p-[10px] w-full rounded-[10px]">
                      <p className="text-[white] text-[22px] font-[300]">
                        "Dưới góc độ công nghệ thông tin, việc tuyển dụng nhân
                        sự chất lượng là một yếu tố quyết định đến sự thành công
                        của dự án. Chúng tôi tìm kiếm những ứng viên không chỉ
                        có kỹ năng chuyên môn vững vàng mà còn có khả năng làm
                        việc nhóm và giải quyết vấn đề sáng tạo."
                      </p>
                      <p className="text-[white] text-[15px]">
                        Pablo Escanor - Kỹ sư Phần mềm
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {/* Right section */}
            <LoginMethod />
          </div>
        </div>
      </login>
    </div>
  );
}
