import React from "react";
import { CheckBadgeIcon, PlusIcon, TagIcon } from "@heroicons/react/24/solid";
import { peopleNear } from "../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export const CompaniesProfileUserShow = () => {
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
                src="/src/assets/user/companies.webp"
                alt=""
                className=" max-w-[100px] h-[100px] object-cover absolute left-5 top-[-1/2] -translate-y-1/2 p-[2px] rounded-full bg-white"
              />
            </div>
            {/* header info */}
            <div className="mt-[15%] md:mt-[5%] flex flex-col gap-3 px-4 pb-2">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="!mb-0 font-[500] text-[20px] flex gap-2 items-center ">
                    Google inc.{" "}
                    <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
                  </p>
                  <p className="!mb-0 font-[400] text-[12px] text-gray-500">
                    Google@gmail.com
                  </p>
                  <p className="!mb-0 pt-2 font-[400] text-[15px] text-gray-500">
                    15 Bui Thi Xuan, Dalat, Vietnam{" "}
                    <span className="text-blue-600 underline cursor-pointer">
                      Liên hệ
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 rounded-[20px] bg-[#1E90FF] text-[white] font-[500] ">
                    Nhắn tin
                  </button>
                  <button className="px-4 py-2 rounded-[20px] border-[1px] border-[#1E90FF] text-[#1E90FF] font-[500] ">
                    Link
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* about */}
          <div
            className="w-full rounded-lg p-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
              {/* about header */}
              <div className="justify-between items-center flex gap-2 w-full">
                <div className="flex flex-col gap-1 p-2">
                  <span>
                    {" "}
                    <span>
                      <p className="!mb-0 font-[500] text-[15px]">
                        Về chúng tôi
                      </p>
                    </span>
                    <p className="!mb-0 text-gray-400">
                      Google là một tập đoàn công nghệ đa quốc gia của Mỹ, nổi
                      tiếng với công cụ tìm kiếm Google Search, hệ điều hành
                      Android, trình duyệt Chrome, và nền tảng YouTube. Thành
                      lập năm 1998 bởi Larry Page và Sergey Brin, Google đã phát
                      triển thành một trong những công ty công nghệ lớn nhất thế
                      giới, thuộc sở hữu của Alphabet Inc. Công ty tập trung vào
                      trí tuệ nhân tạo, điện toán đám mây, quảng cáo trực tuyến
                      và phần cứng như điện thoại Pixel. Với sứ mệnh “sắp xếp
                      thông tin của thế giới và làm cho nó trở nên hữu ích, dễ
                      tiếp cận,” Google đóng vai trò quan trọng trong cuộc sống
                      số hiện đại.
                    </p>
                  </span>
                  <span>
                    {" "}
                    <span>
                      <p className="!mb-0 font-[500] text-[15px]">Website</p>
                    </span>
                    <p className="!mb-0 text-blue-700">
                      http://www.marvell.com
                    </p>
                  </span>
                  <span>
                    {" "}
                    <span>
                      <p className="!mb-0 font-[500] text-[15px]">Gia nhập:</p>
                    </span>
                    <p className="!mb-0 text-gray-400">22/2/2020</p>
                  </span>
                  <span>
                    <span>
                      <p className="!mb-0 font-[500] text-[15px]">
                        Ngành công nghiệp:
                      </p>
                    </span>
                    <p className="!mb-0 text-gray-400">
                      Công nghệ thông tin, Cloud
                    </p>
                  </span>
                  <span>
                    <span>
                      <p className="!mb-0 font-[500] text-[15px]">
                        Phạm vi công ty:
                      </p>
                    </span>
                    <p className="!mb-0 text-gray-400">10000-50000 Nhân viên</p>
                  </span>
                  <span>
                    <span>
                      <p className="!mb-0 font-[500] text-[15px]">
                        Các địa chỉ:
                      </p>
                    </span>
                    <p className="!mb-0 text-gray-400">CA, Watsinton</p>
                    <p className="!mb-0 text-gray-400">Vietnam, HaNoi</p>
                  </span>
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
                      Điểm nổi bật của công ty
                    </p>
                    <p className="!mb-0 text-[13px] text-blue-600">
                      Tìm hiểu thêm
                    </p>
                  </span>
                  {/* post */}
                  <span className="flex flex-col gap-2 max-h-[590px] overflow-y-auto">
                    <div className="w-full">
                      <div className="flex w-full border rounded-lg  p-4 bg-white">
                        {/* Hình ảnh */}
                        <img
                          src="/src/assets/user/companies3.jpg"
                          alt="Team Meeting"
                          className="w-1/3 h-auto rounded-lg object-cover"
                        />

                        {/* Nội dung */}
                        <div className="w-2/3 pl-4">
                          <h3 className="text-lg font-bold">
                            Our People, Our Culture, Our Technology
                          </h3>
                          <p className="text-sm text-gray-700 mt-2">
                            We are passionate about people who love technology.
                            Our people innovate with creativity while being a
                            part of an open environment dedicated to building a
                            legacy.
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            We have a diverse employee population ranging from
                            entry-level individuals to experienced
                            professionals...
                          </p>

                          {/* Liên kết */}
                          <a
                            href="#"
                            className="mt-3 inline-flex items-center text-blue-600 hover:underline"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10.59 13.41L9.17 12l6-6 6 6-1.41 1.41L16 9.83V20h-2V9.83l-4.59 4.58z"></path>
                            </svg>
                            Learn more about careers at Marvell
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="w-full">
                      <div className="flex w-full border rounded-lg  p-4 bg-white">
                        {/* Hình ảnh */}
                        <img
                          src="/src/assets/user/companies3.jpg"
                          alt="Team Meeting"
                          className="w-1/3 h-auto rounded-lg object-cover"
                        />

                        {/* Nội dung */}
                        <div className="w-2/3 pl-4">
                          <h3 className="text-lg font-bold">
                            Our People, Our Culture, Our Technology
                          </h3>
                          <p className="text-sm text-gray-700 mt-2">
                            We are passionate about people who love technology.
                            Our people innovate with creativity while being a
                            part of an open environment dedicated to building a
                            legacy.
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            We have a diverse employee population ranging from
                            entry-level individuals to experienced
                            professionals...
                          </p>

                          {/* Liên kết */}
                          <a
                            href="#"
                            className="mt-3 inline-flex items-center text-blue-600 hover:underline"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10.59 13.41L9.17 12l6-6 6 6-1.41 1.41L16 9.83V20h-2V9.83l-4.59 4.58z"></path>
                            </svg>
                            Learn more about careers at Marvell
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className="w-full">
                      <div className="flex w-full border rounded-lg  p-4 bg-white">
                        {/* Hình ảnh */}
                        <img
                          src="/src/assets/user/companies3.jpg"
                          alt="Team Meeting"
                          className="w-1/3 h-auto rounded-lg object-cover"
                        />

                        {/* Nội dung */}
                        <div className="w-2/3 pl-4">
                          <h3 className="text-lg font-bold">
                            Our People, Our Culture, Our Technology
                          </h3>
                          <p className="text-sm text-gray-700 mt-2">
                            We are passionate about people who love technology.
                            Our people innovate with creativity while being a
                            part of an open environment dedicated to building a
                            legacy.
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            We have a diverse employee population ranging from
                            entry-level individuals to experienced
                            professionals...
                          </p>

                          {/* Liên kết */}
                          <a
                            href="#"
                            className="mt-3 inline-flex items-center text-blue-600 hover:underline"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M10.59 13.41L9.17 12l6-6 6 6-1.41 1.41L16 9.83V20h-2V9.83l-4.59 4.58z"></path>
                            </svg>
                            Learn more about careers at Marvell
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </span>
                </div>
              </div>
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
              <div className="flex gap-1 p-2 justify-center items-center">
                <PlusIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
              </div>
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
