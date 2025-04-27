import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MapPinIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import parse from "html-react-parser";
const DetailJobCom = ({ jobs }) => {
  console.log(jobs);
  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-[#f5f5f5]">
      <div className="flex flex-col justify-center items-center relative w-full">
        <img
          className="max-h-[300px] w-full object-cover"
          src={jobs?.company?.background_image}
          alt=""
        />
        {/* job card */}
        <div
          className="flex flex-col md:flex-row w-[70%] p-4 absolute bottom-[-15%] md:bottom-[-25%] bg-white rounded-[20px] justify-between items-center"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="flex md:flex-row flex-col justify-center items-center md:gap-3">
            <img
              className="max-w-[30px] md:max-w-[90px] rounded-lg border-[1px]"
              src={jobs?.company?.logo}
              alt=""
            />
            <div className=" flex flex-col gap-2">
              <p className="hidden md:block !mb-0 font-[500]">
                Công ty Công nghệ
              </p>
              <p className="!mb-0 text-[15px] md:text-[30px] font-[500]">
                {jobs?.title}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="hidden md:flex gap-2 justify-center items-center">
              <button className="rounded-lg border-[#1E90FF] border-[2px] text-[13.32px] text-[black] font-[500] flex-[3_1_1] px-4 py-2">
                Tạo CV ngay
              </button>
              <button className=" rounded-lg border-[#1E90FF] border-[2px]  px-4 py-2">
                <BookmarkIcon className="w-[20px] h-[20px]" />
              </button>
              <button className="rounded-lg border-[#1E90FF] border-[2px]  px-4 py-2">
                <ShareIcon className="w-[20px] h-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] flex justify-center  gap-3 mt-[10%] md:mt-[7%] ">
        {/* left section */}
        <div
          className="md:flex-[7]  flex flex-col gap-3 max-h-[1000px] overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* description */}
          <div className="flex flex-col gap-1">
            <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
              Tóm tắt về công việc
            </p>
            <p className="!mb-0 text-[15px] font-[400] text-justify">
              {jobs?.description
                ? parse(jobs.description.replace("<p>", '<p class="!mb-0">'))
                : "Không có mô tả"}
            </p>
          </div>
          {/* description */}
          <div className="flex flex-col gap-1">
            <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
              Trách nhiệm trong công việc
            </p>
            <div className="p-4 rounded-lg bg-white text-justify">
              {jobs?.responsibility
                ? parse(
                    jobs.responsibility.replace(
                      "<ul>",
                      '<ul class="list-disc list-inside pl-5 space-y-3">'
                    )
                  )
                : "Không có trách nhiệm công việc"}
            </div>
          </div>
          {/* requirement */}
          <div className="flex flex-col gap-1">
            <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
              Yêu cầu công việc
            </p>
            <div className="p-4 rounded-lg bg-white text-justify">
              {jobs?.required_experience
                ? parse(
                    jobs.required_experience.replace(
                      "<ul>",
                      '<ul class="list-disc list-inside pl-5 space-y-3">'
                    )
                  )
                : "Không có trách nhiệm công việc"}
            </div>
          </div>
          {/* benefit */}
          <div className="flex flex-col gap-1">
            <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
              Lợi ích công việc
            </p>
            <div className="p-4 rounded-lg bg-white text-justify">
              {jobs?.reasons_to_join
                ? parse(
                    jobs.reasons_to_join.replace(
                      "<ul>",
                      '<ul class="list-disc list-inside pl-5 space-y-3">'
                    )
                  )
                : "Không có trách nhiệm công việc"}
            </div>
          </div>
        </div>
        {/* right section */}
        <div className="hidden  md:flex flex-col gap-4 md:flex-[3] p-2">
          {/* right 1st */}
          <div className="flex flex-col gap-2 w-full p-4 rounded-lg bg-[white]">
            <div className="flex  items-center gap-2">
              <img
                className="max-w-[30px] md:max-w-[90px] rounded-lg border-[1px]"
                src={jobs?.company?.logo}
                alt=""
              />
              <div>
                <p className="!mb-0 text-[20px]">{jobs?.company?.name}</p>
                <p className="!mb-0 text-[12px] text-blue-500">
                  Xem thêm về công ty{" "}
                </p>
              </div>
            </div>
            <p className="!mb-0 text-gray-400">
              Growing software technology company
            </p>
            <div className="mt-2 w-full flex flex-col gap-3 justify-center items-center">
              <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                Mô hình công ty{" "}
                <span className="font-[500]  text-end">Sản phẩm</span>
              </p>
              <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                Lĩnh vực công ty{" "}
                <span className="font-[500]  text-end">
                  Sản Phẩm Phần Mềm và Dịch Vụ Web
                </span>
              </p>
              <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                Quy mô công ty{" "}
                <span className="font-[500]  text-end">51-150 nhân viên</span>
              </p>
              <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                Quốc gia <span className="font-[500]  text-end">Việt Nam</span>
              </p>
              <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                Thời gian làm việc{" "}
                <span className="font-[500]  text-end">Thứ 2 - Thứ 6</span>
              </p>
            </div>
          </div>
          {/* right 2st */}
          <div className="flex flex-col gap-2 w-full p-4 rounded-lg bg-[white]">
            <p className="font-[500] !mb-0">
              Trải nghiệm tìm kiếm thông minh hơn với Premium
            </p>
            <p className="!mb-0">
              Các thành viên cao cấp có khả năng được tuyển dụng cao hơn tới 2,6
              lần. Thêm vào đó! Đi trước với quyền truy cập độc quyền vào các
              nhà lãnh đạo doanh nghiệp có ảnh hưởng.
            </p>
            <div className="flex gap-2 justify-center items-center">
              <img
                className="max-w-[70px]"
                src="/src/assets/user/GroupContact.png"
                alt=""
              />
              <p className="!mb-0 text-[12px] text-gray-400">
                Hàng triệu thành viên đã sử dụng Premium
              </p>
            </div>
            <button className="w-full py-2 px-4 bg-[#1E90FF] rounded-lg text-white font-[500]">
              Thử 1 tháng Premium với giá ₫0
            </button>
            <p className="!mb-0 text-[12px] text-gray-400">
              1 tháng miễn phí với hỗ trợ 24/7. Hủy bất cứ lúc nào. Chúng tôi sẽ
              nhắc bạn 7 ngày trước khi thời gian dùng thử của bạn kết thúc
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailJobCom;
