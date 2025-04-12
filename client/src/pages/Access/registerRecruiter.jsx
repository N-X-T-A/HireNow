import React from "react";
import withLayout from "../../layout/withLayout";
import { CheckIcon } from "@heroicons/react/24/outline";
const RegisterRecruiter = () => {
  return (
    <div className="m-auto w-full !max-w-[1100px] p-[10px]  py-2">
      <div className="flex p-2 rounded-md justify-center ">
        <div className="bg-[#007bff] rounded-l-lg flex-[4] flex flex-col justify-center items-center gap-2 p-4">
          <img
            src="/src/assets/home/bg-dangki-uv-in.png"
            alt="recruiter"
            className="w-[200px]"
          />
          <p className="flex gap-1 text-white">
            <CheckIcon className="w-5 h-5" /> +4,000,000 ứng viên tiếp cận thông
            tin tuyển dụng
          </p>
          <p className="flex gap-1 text-white">
            <CheckIcon className="w-5 h-5" /> Hơn 20 hồ sơ ứng tuyển cho 1 việc
            làm đăng tuyển
          </p>
          <p className="flex gap-1 text-white">
            <CheckIcon className="w-5 h-5" /> Tăng hiệu quả 4 - 5 lần so với các
            phương thức tuyển dụng khác
          </p>
          <p className="flex gap-1 text-white">
            <CheckIcon className="w-5 h-5" /> +2,000 lượt xem trung bình cho 1
            việc làm
          </p>
        </div>
        <div className="flex-[6] rounded-r-lg bg-gray-200 flex flex-col gap-4 p-4">
          <h1 className="text-[30px] font-[400]">Đăng ký cho nhà tuyển dụng</h1>
          <span className="flex items-center gap-4">
            <p className="w-[120px] text-[15px]">Email</p>
            <input
              type="email"
              name="email"
              className="flex-1 border-black text-[15px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email"
              required
            />
          </span>

          <span className="flex items-center gap-4">
            <p className="w-[120px] text-[15px]">Mật khẩu</p>
            <input
              type="email"
              name="email"
              className="flex-1 border-black text-[15px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Mật khẩu"
              required
            />
          </span>

          <span className="flex items-center gap-4">
            <p className="w-[120px] text-[15px]">Xác nhận mật khẩu</p>
            <input
              type="email"
              name="email"
              className="flex-1 border-black text-[15px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Xác nhận mật khẩu"
              required
            />
          </span>

          <span className="flex items-center gap-4">
            <p className="w-[120px] text-[15px]">Tên công ty</p>
            <input
              type="email"
              name="email"
              className="flex-1 border-black text-[15px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tên công ty"
              required
            />
          </span>
          <p className="!mb-0 text-[10px] text-center">
            Bằng việc bấm vào nút{" "}
            <span className="text-[#007bff] text-[13px]">"đăng ký"</span> bạn đã
            đồng ý với điều khoản sử dụng và chính sách bảo mật của Tìm Việc
          </p>
          <div className="w-full flex items-center justify-center">
            <button className="px-2 text-white py-2 bg-[#007bff] rounded-md w-[200px]">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(RegisterRecruiter);
