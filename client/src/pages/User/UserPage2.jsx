import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { SparklesIcon, StarIcon } from "@heroicons/react/24/solid";
import { UserJobs } from "../../data/data";
import {
  BookmarkIcon,
  ClockIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
const UserPage2 = () => {
  return (
    <>
      <div className="flex justify-between items-centers w-full bg-[#1E90FF]">
        <p className="hidden md:flex gap-2 items-center !mb-0 p-3 text-[white] text-[25px] font-[600]">
          Bắt đầu công việc trong mơ của bạn{" "}
          <SparklesIcon className="w-8 h-8" />
        </p>
        <img
          src="/src/assets/user/Hirenow.png"
          alt=""
          className="max-h-[70px] object-cover"
        />
      </div>
      <div className=" hidden md:flex max-h-[20px] h-full w-full  justify-between items-center p-4 mt-2">
        <div className="flex gap-2 items-center">
          <div className="relative flex justify-center items-center gap-3 pr-4 text-black after:content-[''] after:w-[1px] after:h-5 after:bg-black after:absolute after:right-0">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <p className="!mb-0">Loại công việc</p>
          </div>
          <div className="relative flex justify-center items-center gap-3 pr-4 text-black after:content-[''] after:w-[1px] after:h-5 after:bg-black after:absolute after:right-0">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="!mb-0">Địa điểm</p>
          </div>
          <div className="relative flex justify-center items-center gap-3 pr-4 text-black after:content-[''] after:w-[1px] after:h-5 after:bg-black after:absolute after:right-0">
            <FontAwesomeIcon icon={faUserCheck} />
            <p className="!mb-0">Kinh nghiệm</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <input
              type="text"
              name="Search"
              placeholder="Tìm tên công việc"
              className="border p-2 w-[300px] rounded-[10px]"
            />
          </div>
        </div>
        <div>
          <button className="text-white px-4 py-2 bg-[#1E90FF] rounded-md">
            Tìm kiếm ngay
          </button>
        </div>
      </div>

      <div className="flex w-full mt-2">
        {/* Phần 1 (Chiếm 3 phần) */}
        <div
          className="flex-1 md:flex-[3]  p-2 max-h-[900px] overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="w-full flex flex-col gap-3">
            {/* công việc */}
            <div className="flex flex-col gap-4">
              {UserJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col gap-2 w-full p-4 rounded-lg"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                >
                  {/* img - name */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <img
                        className="max-w-[50px] rounded-md border-[1px]"
                        src={job.image}
                        alt={job.company}
                      />
                      <span className="flex flex-col gap-1">
                        <p className="!mb-0 text-[20px]">{job.title}</p>
                        <p className="!mb-0 text-gray-500 text-[13px]">
                          {job.company}
                        </p>
                      </span>
                    </div>
                    <BookmarkIcon className="w-8 h-8" />
                  </div>
                  {/* skill - experience */}
                  <div className="flex gap-2">
                    {job.skills.map((skill, index) => {
                      const colors = [
                        "bg-green-200 text-green-500",
                        "bg-red-200 text-red-500",
                        "bg-blue-200 text-blue-500",
                      ];
                      return (
                        <p
                          key={index}
                          className={`!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] ${colors[index % colors.length]}`}
                        >
                          {skill}
                        </p>
                      );
                    })}
                  </div>
                  {/* description */}
                  <p className="w-full text-[15px] line-clamp-3">
                    {job.description}
                  </p>
                  <span className="border-b-[1px] border-gray-300 w-full"></span>
                  {/* salary */}
                  <div className="flex items-center justify-between w-full">
                    <p className="!mb-0 text-[30px] font-[500]">
                      {job.salary}
                      <span className="text-[20px] font-[500] text-gray-400">
                        /hour
                      </span>
                    </p>
                    <span className="flex items-center gap-1 text-13px text-gray-400">
                      <ClockIcon className="w-4 h-4" />
                      <p className="!mb-0">{job.postedTime}</p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phần 2 (Chiếm 7 phần) */}
        <div
          className="hidden md:flex md:flex-[7] p-2  max-h-[900px] overflow-y-auto w-full"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div
            className="flex rounded-lg w-full"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="flex-[7] w-full  flex flex-col border-r-2 border-gray-200">
              <div className="flex justify-between items-center p-4 border-b-2 border-gray-200">
                <p className="!mb-0 text-[30px] font-[500]">
                  Google Dev. Backend
                </p>
                <div className="flex gap-2">
                  <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-green-200 text-green-500">
                    Thạc sĩ
                  </p>
                  <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-red-200 text-red-500">
                    Remote
                  </p>
                  <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-blue-200 text-blue-500">
                    Full-time
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col p-4  gap-[50px] max-h-[780px] overflow-y-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="flex flex-col justify-center item-center">
                  <p className="font-[500]">Tóm tắt về vai trò:</p>
                  <p className="!mb-0 font-[400]">
                    Google Dev. Backend chịu trách nhiệm phát triển và duy trì
                    hệ thống backend, đặc biệt là các dịch vụ microservices, đảm
                    bảo hiệu suất cao, khả năng mở rộng và bảo mật tốt. Vị trí
                    này yêu cầu làm việc với SQL, NoSQL để quản lý dữ liệu, lập
                    trình với Node.js, Python để phát triển API và các dịch vụ
                    backend. Ngoài ra, lập trình viên sẽ phối hợp chặt chẽ với
                    các nhóm frontend, AI, DevOps để triển khai và tích hợp hệ
                    thống một cách hiệu quả. Kinh nghiệm với Node.js, Python,
                    SQL cùng kiến thức về microservices và bảo mật backend là
                    những yếu tố quan trọng cho vị trí này.
                  </p>
                </div>
                <div className="flex flex-col justify-center item-center">
                  <p className="font-[500]">về trách nhiệm công việc: </p>
                  <p className="!mb-0 font-[400]">
                    Google Dev. Backend chịu trách nhiệm thiết kế và phát triển
                    hệ thống backend với kiến trúc microservices, đảm bảo hiệu
                    suất, bảo mật và khả năng mở rộng. Công việc bao gồm xây
                    dựng và tối ưu API để giao tiếp giữa frontend, mobile app và
                    các dịch vụ khác, quản lý cơ sở dữ liệu SQL/NoSQL, cũng như
                    cải thiện bảo mật hệ thống thông qua các cơ chế xác thực,
                    phân quyền và mã hóa dữ liệu. Ngoài ra, lập trình viên sẽ
                    tích hợp hệ thống với AI, DevOps và các dịch vụ đám mây,
                    đồng thời giám sát, debug và bảo trì để đảm bảo hệ thống
                    hoạt động ổn định. Họ cũng cần phối hợp chặt chẽ với các
                    nhóm kỹ thuật khác để duy trì tính nhất quán và hiệu quả của
                    sản phẩm.
                  </p>
                </div>
                <div className="flex flex-col justify-center item-center">
                  <p className="font-[500]">về kinh nghiệm cần có: </p>
                  <ul className="list-disc">
                    <li>
                      Có ít nhất 3 năm kinh nghiệm trong lĩnh vực phát triển
                      phần mềm ở vị trí backend
                    </li>
                    <li>
                      Đã từng tham gia ít nhất 4-5 dự án trong đó đảm nhiệm việc
                      phát triển back-end; hoặc 2 dự án lớn (có 5 người tham gia
                      trở lên)
                    </li>
                    <li>
                      Có kinh nghiệm phát triển API Web Services, tương tác với
                      API và sử dụng thành thạo các công cụ lập trình như
                      Eclipse, Netbean
                    </li>
                    <li>
                      Thành thạo về Java core Back-End, xử lý tốt Multithread
                      (Xử lý tối thiểu 1000-2000 giao dịch cùng lúc),
                      Multi-processing, cơ chế Hash table, cơ chế xử lý file.
                    </li>
                    <li>
                      Thành thạo việc xây dựng các tài liệu đặc tả kỹ thuật
                      (Technical Specification Document), bao gồm: ERD, Database
                      schema, swagger APIs,…
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center item-center">
                  <p className="font-[500]">Các yêu cầu kĩ năng:</p>
                  <div className="flex gap-3">
                    <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                      Figma
                    </p>
                    <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                      Dotnet
                    </p>
                    <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                      Json
                    </p>
                    <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                      Mongodb
                    </p>
                    <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                      SSMSQL
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[3] w-full  flex flex-col gap-3">
              <div className="flex w-[80%] flex-col gap-4 p-4">
                <div className="flex justify-between items-center">
                  {" "}
                  <p className="!mb-0 flex items-center gap-2 text-[20px] font-[500]">
                    Google, inc.{" "}
                    <CheckBadgeIcon className="w-5 h-5 text-green-600" />{" "}
                  </p>
                  <img
                    src="/src/assets/user/google.png"
                    alt=""
                    className="max-w-[50px]"
                  />
                </div>
                <div>
                  <p className="!mb-2  font-[500]">Gia nhập vào: </p>
                  <p className="!mb-0 font-[400] text-gray-500">16/3/2022</p>
                </div>
                <div>
                  <p className="!mb-2  font-[500]">Địa điểm: </p>
                  <p className="!mb-0 font-[400] text-gray-500">
                    24C, Trương Công Định, Quận 1, TP HCM
                  </p>
                </div>
              </div>
              <span className="border-b-[2px]"></span>
              <div className="flex w-[80%] flex-col gap-4 p-4">
                <div className="flex  items-center">
                  {" "}
                  <p className="!mb-0 flex items-center gap-2 text-[20px] font-[500]">
                    Các thông tin khác:
                  </p>
                </div>
                <div>
                  <p className="!mb-2  font-[500] flex items-center gap-3">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                  </p>
                  <p className="!mb-0 font-[400] text-gray-500">
                    Đã xác minh thanh toán
                  </p>
                </div>
                <div>
                  <p className="!mb-2  font-[500]">
                    $65K+ tổng số tiền đã chi trả{" "}
                  </p>
                  <p className="!mb-0 font-[400] text-gray-500">
                    Đã xác minh thanh toán
                  </p>
                </div>
              </div>
              <span className="border-b-[2px]"></span>
              <div className="flex w-[80%] flex-col gap-4 p-4">
                <div className="flex  items-center">
                  {" "}
                  <p className="!mb-0 flex items-center gap-2 text-[20px] font-[500]">
                    Về các dịch vụ:
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage2;
