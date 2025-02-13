import React from "react";
import Header from "../components/header/header";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import LoginMethod from "./loginMethod";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "../pages/pageCss/Login.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Environment } from "../environments/Environment";
export default function Login() {
  const GG_ID = Environment.GG_CLIENT_ID;

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
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                        "Trong lĩnh vực tiếp thị, sự thấu hiểu khách hàng là
                        chìa khóa dẫn đến thành công. Chúng tôi luôn tìm kiếm
                        những chuyên gia có khả năng phân tích dữ liệu, sáng tạo
                        chiến lược và xây dựng trải nghiệm mua sắm tuyệt vời cho
                        khách hàng."
                      </p>
                      <p className="text-[white] text-[15px]">
                        Minh Nguyễn - Chuyên gia Marketing
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
                        "Mỗi bức ảnh không chỉ là một khoảnh khắc, mà còn là một
                        câu chuyện. Tôi tin rằng nhiếp ảnh không chỉ ghi lại
                        hình ảnh mà còn truyền tải cảm xúc, mang lại giá trị
                        nghệ thuật và kết nối mọi người thông qua những khung
                        hình đẹp."
                      </p>
                      <p className="text-[white] text-[15px]">
                        Linh Trần - Nhiếp ảnh gia chuyên nghiệp
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
                        "Để trở thành một diễn viên giỏi, bạn không chỉ cần tài
                        năng mà còn phải có sự kiên trì và đam mê. Mỗi vai diễn
                        là một thử thách mới, là cơ hội để hóa thân và truyền
                        tải những câu chuyện đầy cảm xúc đến khán giả."
                      </p>
                      <p className="text-[white] text-[15px]">
                        Huy Phạm - Diễn viên
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {/* Right section */}
            <GoogleOAuthProvider clientId={GG_ID}>
              <LoginMethod />
            </GoogleOAuthProvider>
            ;
          </div>
        </div>
      </login>
    </div>
  );
}
