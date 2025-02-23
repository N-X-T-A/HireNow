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
import { slideData } from "../data/data";
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
                {slideData.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative">
                      <img
                        src={slide.image}
                        alt="Slide Image"
                        className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
                      />
                      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-[10px] w-full rounded-[10px]">
                        <p className="text-[white] text-[22px] font-[300]">
                          {slide.quote}
                        </p>
                        <p className="text-[white] text-[15px]">
                          {slide.author}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Right section */}
            <GoogleOAuthProvider clientId={GG_ID}>
              <LoginMethod />
            </GoogleOAuthProvider>
          </div>
        </div>
      </login>
    </div>
  );
}
