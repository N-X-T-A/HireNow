import React from "react";
import withLayout from "../layout/withLayout";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
const EmployerIntro = () => {
  //config
  const navigate = useNavigate();
  return (
    <div className="container w-full !max-w-[1700px] p-[10px] flex flex-col gap-4 py-2">
      {/* 1st */}
      <div className="rounded-md bg-blue-100 py-4">
        <div className="w-[1200px] m-auto flex justify-between items-center ">
          <span className="flex flex-col gap-2">
            <p className="!mb-0 text-[40px]">Đăng tin tuyển dụng ngay !</p>
            <p className="flex gap-2 !mb-0">
              <CheckCircleIcon className="w-5 h-5 text-green-500" /> Dịch vụ
              đăng tin tuyển dụng
            </p>
            <p className="flex gap-2 !mb-0">
              <CheckCircleIcon className="w-5 h-5 text-green-500" /> Tiếp cận
              hơn 585.773 Ứng viên Trên hệ thống
            </p>
            <p className="flex gap-2 !mb-0">
              <CheckCircleIcon className="w-5 h-5 text-green-500" /> Hệ thống
              Tìm - Lọc ứng viên đơn giản, tiết kiệm thời gian
            </p>
            <br />
            <button
              onClick={() => navigate("/register-recruiter")}
              className="w-[200px] px-2 py-2 rounded-md bg-blue-500 text-white"
            >
              Đăng ký ngay
            </button>
          </span>
          <img src="/src/assets/home/bg_banner.svg" alt="" />
        </div>
      </div>
      {/* 2st */}
      <div className="w-[1200px] m-auto flex justify-between">
        <img
          src="/src/assets/home/vip_cards.webp"
          alt=""
          className="w-[600px]"
        />
        <span className="flex flex-col gap-2 justify-center">
          <p className="!mb-0 text-[40px]">
            Trở thành VIP của chúng tôi, tuyển dụng nhiều hơn - không lo mất
            phí.
          </p>
          <button className="w-[200px] px-2 py-2 rounded-md bg-blue-500 text-white">
            Xem chi tiết
          </button>
        </span>
      </div>
      {/* 3st */}
      <div className="rounded-md bg-blue-100 py-4">
        <div className="w-[900px] m-auto flex flex-col justify-between items-center">
          <h1 className="!mb-0 text-[40px] font-[400] text-center">
            Các tính năng nổi bật chỉ có ở HireNow
          </h1>
          <div className="w-full flex justify-between py-2">
            <img
              src="/src/assets/home/Mockup_landing-page.webp"
              alt=""
              className="w-[300px]"
            />
            <span className="flex flex-col gap-2 justify-center">
              <p className="flex gap-2 !mb-0">
                <CheckCircleIcon className="w-5 h-5 text-green-500" /> Không bị
                trôi tin đăng.
              </p>
              <p className="flex gap-2 !mb-0">
                <CheckCircleIcon className="w-5 h-5 text-green-500" /> Giúp công
                việc bạn nổi bật hơn.
              </p>
              <p className="flex gap-2 !mb-0">
                <CheckCircleIcon className="w-5 h-5 text-green-500" /> Thu hút
                nhiều ứng viên tiềm năng ứng tuyển vào công việc.
              </p>
              <button className="w-[200px] px-2 py-2 rounded-md bg-blue-500 text-white">
                Xem chi tiết
              </button>
            </span>
          </div>
          <div className="w-full flex justify-between py-2">
            <span className="flex flex-col gap-2 justify-center">
              <p className="flex gap-2 !mb-0">
                <CheckCircleIcon className="w-5 h-5 text-green-500" /> Đẩy tin
                như việc quảng cáo lại tin đăng nhằm thu hút thêm nhiều ứng
                viên.
              </p>
              <p className="flex gap-2 !mb-0">
                <CheckCircleIcon className="w-5 h-5 text-green-500" /> Tin của
                bạn sẽ được làm mới mà không phải đăng lại.
              </p>

              <button className="w-[200px] px-2 py-2 rounded-md bg-blue-500 text-white">
                Xem chi tiết
              </button>
            </span>
            <img
              src="/src/assets/home/Mockup_landing-page2.webp"
              alt=""
              className="w-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(EmployerIntro);
