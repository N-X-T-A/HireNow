import React, { useState } from "react";
import { CheckBadgeIcon, PlusIcon, TagIcon } from "@heroicons/react/24/solid";
import { peopleNear } from "../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import JobP3Header from "./jobP3Header";

const ShowProfileComponent = () => {
  return (
    <div>
      {" "}
      <div className="  w-full flex gap-3 justify-center">
        {/* left section */}
        <div className="md:flex-[7] flex flex-col gap-4 w-full ">
          {/* header */}
          <div
            className="w-full rounded-lg"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            {" "}
            {/* header profile */}
            <div className="relative w-full">
              <img
                className="w-full max-h-[130px] rounded-t-lg object-cover"
                src="/src/assets/user/bgprofile1.jpg"
                alt=""
              />
              <img
                src="/src/assets/user/21501.jpg"
                alt=""
                className=" max-w-[100px] h-[100px] object-cover absolute left-5 top-[-1/2] -translate-y-1/2 p-[2px] rounded-full bg-white"
              />
            </div>
            {/* header info */}
            <div className="mt-[15%] md:mt-[5%] flex flex-col gap-3 px-4 pb-2">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="!mb-0 font-[500] text-[20px] flex gap-2 items-center ">
                    Nguyễn Thị Hải{" "}
                    <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                  </p>
                  <p className="!mb-0 font-[400] text-[12px] text-gray-500">
                    NguyenHai@gmail.com
                  </p>
                  <p className="!mb-0 pt-2 font-[400] text-[15px] text-gray-500">
                    15 Bui Thi Xuan, Dalat, Vietnam{" "}
                    <span className="text-blue-600 underline cursor-pointer">
                      Liên hệ
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 rounded-[20px] border-[1px] border-[#1E90FF] text-[#1E90FF] font-[500] ">
                    Link
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Activity */}
          <div
            className="w-full rounded-lg p-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
              {/* activity header */}
              <div className="justify-between items-center flex gap-2 w-full">
                <div className="flex flex-col gap-1 p-2">
                  <span>
                    <p className="!mb-0 font-[500] text-[15px]">
                      Hoạt động của Hải
                    </p>
                    <p className="!mb-0 text-[13px] text-blue-600">
                      Tìm hiểu thêm
                    </p>
                  </span>
                </div>
              </div>
              {/* list post */}
              <div
                className="p-2 flex md:flex-row flex-col max-h-[400px] overflow-y-auto gap-2 md:max-w-[1109px] md:overflow-x-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/* post */}
                <div className="flex flex-col gap-2  p-2 rounded-lg border-[1px] md:min-w-[500px] max-w-[500px]">
                  <div className="flex gap-2 items-center">
                    <img
                      src="/src/assets/user/21501.jpg"
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col ">
                      <p className="!mb-0 text-[14px] font-[500]">
                        Nguyễn Thị Hải
                      </p>
                      <p className="!mb-0 text-[14px] font-[500] text-gray-500">
                        2 ngày trước
                      </p>
                    </div>
                  </div>
                  {/* content post */}
                  <p className="p-2 !mb-0 w-full text-justify line-clamp-7">
                    Tôi là Hải, sinh viên ngành Công nghệ Thông tin tại Trường
                    Đại học Đà Lạt. Với niềm đam mê lập trình và phát triển phần
                    mềm, tôi luôn tìm kiếm cơ hội để học hỏi và trau dồi kỹ
                    năng.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* experiecne */}
          <div
            className="w-full rounded-lg p-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
              {/* experiecne header */}
              <div className="justify-between items-center flex gap-2 w-full">
                <div className="flex flex-col gap-1 p-2">
                  <span>
                    <p className="!mb-0 font-[500] text-[15px]">
                      Kinh nghiệm của Hải
                    </p>
                    <p className="!mb-0 text-[13px] text-blue-600">
                      Tìm hiểu thêm
                    </p>
                  </span>
                  <p className="!mb-0 text-gray-400">
                    Trống, thông tin về kinh nghiệm của Hải sẽ xuất hiện ở đây
                  </p>
                </div>
              </div>
              {/* list experiecne */}
            </div>
          </div>
          {/* education */}
          <div
            className="w-full rounded-lg p-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
              {/* education header */}
              <div className="justify-between items-center flex gap-2 w-full">
                <div className="flex flex-col gap-1 p-2">
                  <span>
                    <p className="!mb-0 font-[500] text-[15px]">
                      Học vấn của Hải
                    </p>
                    <p className="!mb-0 text-[13px] text-blue-600">
                      Tìm hiểu thêm
                    </p>
                  </span>
                  <p className="!mb-0 text-gray-400">
                    Trống, thông tin về học vấn của Hải sẽ xuất hiện ở đây
                  </p>
                </div>
              </div>
              {/* list education */}
            </div>
          </div>
          {/* skill */}
          <div
            className="w-full rounded-lg p-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
              {/* skill header */}
              <div className="justify-between items-center flex gap-2 w-full">
                <div className="flex flex-col gap-1 p-2">
                  <span>
                    <p className="!mb-0 font-[500] text-[15px]">
                      Kỹ năng của Hải
                    </p>
                    <p className="!mb-0 text-[13px] text-blue-600">
                      Tìm hiểu thêm
                    </p>
                  </span>
                  <p className="!mb-0 text-gray-400">
                    Trống, thông tin về kỹ năng của Hải sẽ xuất hiện ở đây
                  </p>
                </div>
              </div>
              {/* list skill */}
            </div>
          </div>
        </div>
        {/* right section */}
        <div className="hidden md:flex flex-col md:flex-[3] gap-3  w-full rounded-lg">
          {/* 1st */}
          <div
            className="w-full rounded-lg max-h-fit p-4 flex flex-col gap-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <span className="flex justify-between items-center w-full">
              <p className="!mb-0 font-[500] text-[14px]">
                Liên kết mạng xã hội
              </p>
            </span>
            <p className="!mb-0 cursor-pointer">
              <FontAwesomeIcon icon={faGithub} />{" "}
              <span className="text-blue-400">https://github.com/Ouugii</span>
            </p>
            <p className="!mb-0 cursor-pointer">
              <FontAwesomeIcon icon={faFacebook} />{" "}
              <span className="text-blue-400">https://facebook.com/Ouugii</span>
            </p>
            <p className="!mb-0 cursor-pointer">
              <FontAwesomeIcon icon={faTwitter} />{" "}
              <span className="text-blue-400">https://x.com/Ouugii</span>
            </p>
          </div>
          <div
            className="w-full rounded-lg max-h-fit flex flex-col "
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <p className="!mb-0 font-[500] text-[14px] p-4">
              Những người bạn có thế biêt
            </p>
            {/* people */}
            <div
              className="px-4 pb-4 flex flex-col gap-2  items-center max-h-[700px] overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* people item */}
              {peopleNear?.map((item) => (
                <div className="flex justify-between items-center w-full pb-2 border-b-[1px] border-gray-300">
                  <div className="flex gap-2 items-center">
                    {" "}
                    <img
                      src={item.src}
                      alt=""
                      className="w-[60px] h-[60px] object-cover rounded-full"
                    />
                    <span className="flex flex-col gap-1">
                      <p className="!mb-0 text-[14px] font-[500]">
                        {item.name}
                      </p>
                      <p className="!mb-0 text-[10px] text-gray-600">
                        {item.email}
                      </p>
                    </span>
                  </div>
                  <TagIcon className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProfileComponent;
