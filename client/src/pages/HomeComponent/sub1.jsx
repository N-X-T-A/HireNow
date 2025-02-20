import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
const Sub1 = () => {
  return (
    <div className="w-full bg-white flex flex-col  gap-2 mt-[100px] items-center justify-items-center justify-center">
      <div className="w-[60%] flex flex-col gap-[20px] items-center justify-items-center justify-between">
        <p className="!mb-0 text-[40px] font-[700] text-center">
          HireNow đã được xây dựng như thế nào?
        </p>
        <p className="!mb-0 text-[15px] font-[300] text-center">
          chúng tôi hiện thực hóa những ý tưởng bằng cách kết hợp nhiều năm kinh
          nghiệm của đội ngũ tài năng của chúng tôi.
        </p>
        <div className="flex items-center justify-items-center justify-center gap-3">
          <button className="flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] bg-black rounded-[20px] text-white">
            Tìm công việc <FontAwesomeIcon icon={faCircleRight} />
          </button>
          <button className="flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] border-2 rounded-[20px] text-black">
            Liên hệ ngay <FontAwesomeIcon icon={faCircleRight} />
          </button>
        </div>
      </div>
      <div className="relative w-full mt-[30px]">
        <img
          className=" w-full object-cover rounded-[30px]"
          src="/src/assets/home/Frame.png"
          alt=""
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        />
        <div className="absolute inset-0 w-[700px] bg-gradient-to-r from-black to-transparent rounded-[30px]"></div>
        <button className="bg-gradient-to-r from-gray-200 to-white absolute top-4 left-6 flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] rounded-[20px] text-black">
          <span className="px-[15px] py-[3px] bg-white text-black rounded-[20px] font-[500]">
            Event
          </span>
          <span>Tìm kiếm ứng cử viên</span>
          <FontAwesomeIcon icon={faCircleRight} />
        </button>
        <div className="absolute bottom-[20%] left-6 flex flex-col gap-2 max-w-[600px]">
          <p className="!mb-0 text-[40px] font-[600] text-white ">
            Hiệu quả thay đổi trải nghiệm ứng viên của bạn
          </p>
          <p className="!mb-0 text-[15px] font-[400] text-white text-justify">
            Mang đến một quy trình tuyển dụng mượt mà và chuyên nghiệp hơn. Tối
            ưu hóa trải nghiệm của ứng viên từ lúc nộp hồ sơ đến khi nhận được
            phản hồi, giúp họ cảm thấy gắn kết và hài lòng hơn với doanh nghiệp
            của bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sub1;
