import React, { useEffect, useState } from "react";
import { CheckBadgeIcon, PlusIcon, TagIcon } from "@heroicons/react/24/solid";
import { peopleNear } from "../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Companyjobs } from "../../data/data";
export const CompaniesProfileUserShow = ({ company, error, loading }) => {
  //
  const socialIcons = {
    facebook: faFacebook,
    linkedin: faLinkedin,
    github: faGithub,
    twitter: faTwitter,
  };
  //

  //state
  const [activeTabs, setActiveTabs] = useState(0);
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;
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
                src={company?.background_image}
                alt=""
              />
              <img
                src={company?.logo}
                alt=""
                className=" max-w-[100px] h-[100px] object-cover absolute left-5 top-[-1/2] -translate-y-1/2 p-[2px] rounded-full bg-white"
              />
            </div>
            {/* header info */}
            <div className="mt-[15%] md:mt-[5%] flex flex-col gap-3 px-4 pb-2">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="!mb-0 font-[500] text-[20px] flex gap-2 items-center ">
                    {company?.name}{" "}
                    <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
                  </p>
                  <p className="!mb-0 font-[400] text-[12px] text-gray-500">
                    {company?.name}@gmail.com
                  </p>
                  {company?.locations.map((location, index) => (
                    <p className="!mb-0 pt-2 font-[400] text-[15px] text-gray-500">
                      {location.detailed_location}, {location.city}{" "}
                      <span className="text-blue-600 underline cursor-pointer">
                        Liên hệ
                      </span>
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-2"></div>
              </div>
              <div className="flex gap-4 items-center w-full border-t-[1px] pt-2">
                <p
                  onClick={() => setActiveTabs(0)}
                  className="font-[500] cursor-pointer text-[#1E90FF]"
                >
                  Tổng quan
                </p>
                <p
                  onClick={() => setActiveTabs(1)}
                  className="font-[500] cursor-pointer text-[#1E90FF]"
                >
                  Việc làm
                </p>
              </div>
            </div>
          </div>
          {/* tab1 */}
          {activeTabs == 0 && (
            <>
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
                          {company?.description}
                          Google là một tập đoàn công nghệ đa quốc gia của Mỹ,
                          nổi tiếng với công cụ tìm kiếm Google Search, hệ điều
                          hành Android, trình duyệt Chrome, và nền tảng YouTube.
                          Thành lập năm 1998 bởi Larry Page và Sergey Brin,
                          Google đã phát triển thành một trong những công ty
                          công nghệ lớn nhất thế giới, thuộc sở hữu của Alphabet
                          Inc. Công ty tập trung vào trí tuệ nhân tạo, điện toán
                          đám mây, quảng cáo trực tuyến và phần cứng như điện
                          thoại Pixel. Với sứ mệnh “sắp xếp thông tin của thế
                          giới và làm cho nó trở nên hữu ích, dễ tiếp cận,”
                          Google đóng vai trò quan trọng trong cuộc sống số hiện
                          đại.
                        </p>
                      </span>
                      <span>
                        {" "}
                        <span>
                          <p className="!mb-0 font-[500] text-[15px]">
                            Website
                          </p>
                        </span>
                        <p className="!mb-0 text-blue-700">
                          {company?.website}
                        </p>
                      </span>
                      <span>
                        {" "}
                        <span>
                          <p className="!mb-0 font-[500] text-[15px]">
                            Gia nhập:
                          </p>
                        </span>
                        <p className="!mb-0 text-gray-400">
                          22/2/{company?.founded_year}
                        </p>
                      </span>
                      <span>
                        <span>
                          <p className="!mb-0 font-[500] text-[15px]">
                            Ngành công nghiệp:
                          </p>
                        </span>
                        <p className="!mb-0 text-gray-400">
                          {company?.industry}
                        </p>
                      </span>
                      <span>
                        <span>
                          <p className="!mb-0 font-[500] text-[15px]">
                            Phạm vi công ty:
                          </p>
                        </span>
                        <p className="!mb-0 text-gray-400">{company?.size}</p>
                      </span>
                      <span>
                        <span>
                          <p className="!mb-0 font-[500] text-[15px]">
                            Các địa chỉ:
                          </p>
                        </span>
                        {company?.locations?.map((location, index) => (
                          <p key={index} className="!mb-0 text-gray-400">
                            {location.city}, {location.detailed_location}
                          </p>
                        ))}
                      </span>
                    </div>
                  </div>
                  {/* list experiecne */}
                </div>
              </div>
              {/* spotlight */}
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
                          <div className="flex w-full border rounded-lg p-4 bg-white">
                            {/* Hình ảnh */}
                            <img
                              src="/src/assets/user/companies3.jpg"
                              alt="Team Meeting"
                              className="w-1/3 h-auto rounded-lg object-cover"
                            />

                            {/* Nội dung */}
                            <div className="w-2/3 pl-4">
                              <h3 className="text-lg font-bold">
                                Khám phá Văn hóa Công ty Chúng Tôi
                              </h3>
                              <p className="text-sm text-gray-700 mt-2">
                                Chúng tôi trân trọng những con người đam mê công
                                nghệ và đổi mới không ngừng. Tại đây, bạn sẽ
                                được làm việc trong môi trường năng động, sáng
                                tạo và thân thiện.
                              </p>
                              <p className="text-sm text-gray-700 mt-2">
                                Chúng tôi luôn khuyến khích sự phát triển cá
                                nhân và đề cao tinh thần làm việc nhóm để cùng
                                nhau đạt được những thành tựu vượt bậc...
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
                                Tìm hiểu thêm về cơ hội nghề nghiệp
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*  */}
                        <div className="w-full">
                          <div className="flex w-full border rounded-lg p-4 bg-white">
                            {/* Hình ảnh */}
                            <img
                              src="/src/assets/user/companies3.jpg"
                              alt="Team Meeting"
                              className="w-1/3 h-auto rounded-lg object-cover"
                            />

                            {/* Nội dung */}
                            <div className="w-2/3 pl-4">
                              <h3 className="text-lg font-bold">
                                Phát triển Sự nghiệp Cùng Chúng Tôi
                              </h3>
                              <p className="text-sm text-gray-700 mt-2">
                                Chúng tôi luôn tìm kiếm những tài năng mới, từ
                                sinh viên mới ra trường cho đến những chuyên gia
                                giàu kinh nghiệm, để cùng nhau xây dựng tương
                                lai vững chắc.
                              </p>
                              <p className="text-sm text-gray-700 mt-2">
                                Môi trường làm việc cởi mở và chính sách đào tạo
                                bài bản giúp bạn phát triển toàn diện các kỹ
                                năng chuyên môn và kỹ năng lãnh đạo...
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
                                Khám phá các vị trí tuyển dụng
                              </a>
                            </div>
                          </div>
                        </div>
                        {/*  */}
                        <div className="w-full">
                          <div className="flex w-full border rounded-lg p-4 bg-white">
                            {/* Hình ảnh */}
                            <img
                              src="/src/assets/user/companies3.jpg"
                              alt="Team Meeting"
                              className="w-1/3 h-auto rounded-lg object-cover"
                            />

                            {/* Nội dung */}
                            <div className="w-2/3 pl-4">
                              <h3 className="text-lg font-bold">
                                Công Nghệ Là Trái Tim Của Chúng Tôi
                              </h3>
                              <p className="text-sm text-gray-700 mt-2">
                                Với tầm nhìn đổi mới sáng tạo, chúng tôi không
                                ngừng phát triển các giải pháp công nghệ tiên
                                tiến, đáp ứng nhu cầu ngày càng cao của khách
                                hàng trên toàn thế giới.
                              </p>
                              <p className="text-sm text-gray-700 mt-2">
                                Gia nhập đội ngũ của chúng tôi để cùng nhau kiến
                                tạo những sản phẩm có tầm ảnh hưởng lớn trong kỷ
                                nguyên số...
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
                                Tham gia cùng chúng tôi ngay hôm nay
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
            </>
          )}
          {/*tab2 */}
          {activeTabs == 1 && (
            <>
              <p className="flex gap-2 items-center text-[20px] !mb-0 font-[600]">
                Tất cả công việc của <span>{company?.name}</span>
                <CheckBadgeIcon className="w-4 h-4 text-blue-600" />
              </p>
              <div
                className="w-full rounded-lg p-2 flex flex-wrap gap-4 justify-center items-center"
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                <div className="cursor-pointer flex flex-wrap gap-4 justify-center">
                  {Companyjobs.map((job, index) => (
                    <div
                      key={index}
                      className=" w-[30%] p-4 bg-white border-1 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <img
                          src={company?.logo}
                          alt="Company Logo"
                          className="w-12 h-12"
                        />
                        <button className="text-gray-500 hover:text-gray-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 6.75v10.5M12 6.75v10.5M6.75 6.75v10.5"
                            />
                          </svg>
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold mt-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600">{job.company}</p>
                      <p className="text-gray-500">{job.location}</p>
                      <p className="text-sm text-gray-400 mt-2">{job.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
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
            {company?.social_links && (
              <div className="">
                <p className="!mb-0 font-[500] text-[15px]">Social Links:</p>
                {Object.entries(company.social_links).map(([key, url]) =>
                  socialIcons[key] ? (
                    <p key={key} className="!mb-0 cursor-pointer">
                      <FontAwesomeIcon
                        icon={socialIcons[key]}
                        className="mr-2 text-blue-500"
                      />
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400"
                      >
                        {url}
                      </a>
                    </p>
                  ) : null
                )}
              </div>
            )}
          </div>
          {/* 2st */}
          <div
            className="w-full rounded-lg max-h-fit flex flex-col "
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            {/* Company job */}
            <div
              className="w-full rounded-lg max-h-fit flex flex-col "
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <img
                src={company?.background_image}
                alt=""
                className="w-full max-h-[50px] object-cover rounded-t-lg"
              />

              <div className="w-full p-3 flex flex-col gap-2">
                <p className="!mb-0 text-center text-[18px] font-[4 00]">
                  Khám phá các công việc tại {company?.name} để xem công việc
                  nào phù hợp với bạn nhé
                </p>
                <div className="flex gap-2 items-center">
                  <img
                    src={company?.logo}
                    alt=""
                    className="max-w-[70px] max-h-[70px] border-1 rounded-md object-cover"
                  />
                  <span>
                    <p className="!mb-0 text-[20px]">{company?.name}</p>
                    <p className="!mb-0 text-[15px] text-gray-400">
                      {company?.industry}
                    </p>
                  </span>
                </div>
                <button
                  onClick={() => setActiveTabs(1)}
                  className="w-full p-2 rounded-lg bg-[#1E90FF] text-[white] font-[500]"
                >
                  Xem ngay
                </button>
              </div>
            </div>
          </div>
          {/* 3st */}
          <div
            className="w-full rounded-lg max-h-fit p-4 flex flex-col gap-2"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            {" "}
            <span className="flex justify-between items-center w-full">
              <p className="!mb-0 font-[500] text-[14px]">
                Các công việc đã đăng gần đây
              </p>
            </span>
            {/* listJob */}
            <div className="p-2 rounded-md border-1 cursor-pointer">
              <div className="w-full p-3 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <img
                    src={company?.logo}
                    alt=""
                    className="max-w-[70px] max-h-[70px] border-1 rounded-md object-cover"
                  />
                  <span>
                    <p className="!mb-0 text-[18px] font-[500]">
                      Physical Design Engineer Intern - Bachelors
                    </p>
                    <p className="!mb-0 text-[15px]">{company?.name}</p>

                    <p className="!mb-0 text-[15px] text-gray-400">
                      {company?.industry}
                    </p>
                    <p className="!mb-0 text-[15px]">{company?.description}</p>
                    <p className="!mb-0 text-[15px] text-gray-400 mt-2">
                      2 ngày trước
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-md border-1 cursor-pointer">
              <div className="w-full p-3 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <img
                    src={company?.logo}
                    alt=""
                    className="max-w-[70px] max-h-[70px] border-1 rounded-md object-cover"
                  />
                  <span>
                    <p className="!mb-0 text-[18px] font-[500]">
                      Physical Design Engineer Intern - Bachelors
                    </p>
                    <p className="!mb-0 text-[15px]">{company?.name}</p>

                    <p className="!mb-0 text-[15px] text-gray-400">
                      {company?.industry}
                    </p>
                    <p className="!mb-0 text-[15px]">{company?.description}</p>
                    <p className="!mb-0 text-[15px] text-gray-400 mt-2">
                      2 ngày trước
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-md border-1 cursor-pointer">
              <div className="w-full p-3 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <img
                    src={company?.logo}
                    alt=""
                    className="max-w-[70px] max-h-[70px] border-1 rounded-md object-cover"
                  />
                  <span>
                    <p className="!mb-0 text-[18px] font-[500]">
                      Physical Design Engineer Intern - Bachelors
                    </p>
                    <p className="!mb-0 text-[15px]">{company?.name}</p>

                    <p className="!mb-0 text-[15px] text-gray-400">
                      {company?.industry}
                    </p>
                    <p className="!mb-0 text-[15px]">{company?.description}</p>
                    <p className="!mb-0 text-[15px] text-gray-400 mt-2">
                      2 ngày trước
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
