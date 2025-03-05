import React, { useState } from "react";
import {
  CheckBadgeIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
const UserProfile = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });

  return (
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
              src={user?.photoURL}
              alt=""
              className="absolute left-5 top-[-1/2] -translate-y-1/2 p-[2px] rounded-full bg-white"
            />
            <PencilIcon className="w-5 h-5 absolute right-5 top-5 p-[2px] rounded-full bg-white text-gray-500" />
          </div>
          {/* header info */}
          <div className="mt-[15%] md:mt-[5%] flex flex-col gap-3 px-4 pb-2">
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="!mb-0 font-[500] text-[20px] flex gap-2 items-center ">
                  {user?.username}{" "}
                  <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                </p>
                <p className="!mb-0 font-[400] text-[12px] text-gray-500">
                  {user?.email}
                </p>
                <p className="!mb-0 pt-2 font-[400] text-[15px] text-gray-500">
                  5 Ngo Thi Nham, Dalat, Vietnam{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    Liên hệ
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 rounded-[20px] bg-[#1E90FF] text-[white] font-[500] ">
                  Chỉnh sửa trang cá nhân
                </button>
                <button className="px-4 py-2 rounded-[20px] border-[1px] border-[#1E90FF] text-[#1E90FF] font-[500] ">
                  Tải cv
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
                    Hoạt động của bạn
                  </p>
                  <p className="!mb-0 text-[13px] text-blue-600">
                    Tìm hiểu thêm
                  </p>
                </span>
              </div>
              <div className="flex gap-1 p-2 justify-center items-center">
                <button className="px-4 py-2 rounded-[20px] bg-[#1E90FF] text-[white] font-[500] text-[14px]">
                  Tạo bài viết ngay
                </button>
                <PencilIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
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
                    src={user?.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col ">
                    <p className="!mb-0 text-[14px] font-[500]">
                      {user?.username}
                    </p>
                    <p className="!mb-0 text-[14px] font-[500] text-gray-500">
                      2 ngày trước
                    </p>
                  </div>
                </div>
                {/* content post */}
                <p className="p-2 !mb-0 w-full text-justify line-clamp-7">
                  Tôi là Thái Phương, sinh viên ngành Công nghệ Thông tin tại
                  Trường Đại học Đà Lạt. Với niềm đam mê lập trình và phát triển
                  phần mềm, tôi luôn tìm kiếm cơ hội để học hỏi và trau dồi kỹ
                  năng. Tôi đã có kinh nghiệm thực tập tại Công ty XYZ, nơi tôi
                  làm việc với các công nghệ hiện đại và phát triển các ứng dụng
                  thực tế. Tôi mong muốn được làm việc trong môi trường chuyên
                  nghiệp, nơi tôi có thể đóng góp và phát triển sự nghiệp của
                  mình.
                </p>
              </div>

              {/* post */}
              <div className="flex flex-col gap-2  p-2 rounded-lg border-[1px] md:min-w-[500px] max-w-[500px]">
                <div className="flex gap-2 items-center">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col ">
                    <p className="!mb-0 text-[14px] font-[500]">
                      {user?.username}
                    </p>
                    <p className="!mb-0 text-[14px] font-[500] text-gray-500">
                      2 ngày trước
                    </p>
                  </div>
                </div>
                {/* content post */}
                <p className="p-2 !mb-0 w-full text-justify line-clamp-7">
                  Tôi là Thái Phương, sinh viên ngành Công nghệ Thông tin tại
                  Trường Đại học Đà Lạt. Với niềm đam mê lập trình và phát triển
                  phần mềm, tôi luôn tìm kiếm cơ hội để học hỏi và trau dồi kỹ
                  năng. Tôi đã có kinh nghiệm thực tập tại Công ty XYZ, nơi tôi
                  làm việc với các công nghệ hiện đại và phát triển các ứng dụng
                  thực tế. Tôi mong muốn được làm việc trong môi trường chuyên
                  nghiệp, nơi tôi có thể đóng góp và phát triển sự nghiệp của
                  mình.
                </p>
              </div>
              {/* post */}
              <div className="flex flex-col gap-2  p-2 rounded-lg border-[1px] md:min-w-[500px] max-w-[500px]">
                <div className="flex gap-2 items-center">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col ">
                    <p className="!mb-0 text-[14px] font-[500]">
                      {user?.username}
                    </p>
                    <p className="!mb-0 text-[14px] font-[500] text-gray-500">
                      2 ngày trước
                    </p>
                  </div>
                </div>
                {/* content post */}
                <p className="p-2 !mb-0 w-full text-justify line-clamp-7">
                  Tôi là Thái Phương, sinh viên ngành Công nghệ Thông tin tại
                  Trường Đại học Đà Lạt. Với niềm đam mê lập trình và phát triển
                  phần mềm, tôi luôn tìm kiếm cơ hội để học hỏi và trau dồi kỹ
                  năng. Tôi đã có kinh nghiệm thực tập tại Công ty XYZ, nơi tôi
                  làm việc với các công nghệ hiện đại và phát triển các ứng dụng
                  thực tế. Tôi mong muốn được làm việc trong môi trường chuyên
                  nghiệp, nơi tôi có thể đóng góp và phát triển sự nghiệp của
                  mình.
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
                    Kinh nghiệm của bạn
                  </p>
                  <p className="!mb-0 text-[13px] text-blue-600">
                    Tìm hiểu thêm
                  </p>
                </span>
              </div>
              <div className="flex gap-1 p-2 justify-center items-center">
                <PlusIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
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
                    Học vấn của bạn
                  </p>
                  <p className="!mb-0 text-[13px] text-blue-600">
                    Tìm hiểu thêm
                  </p>
                </span>
              </div>
              <div className="flex gap-1 p-2 justify-center items-center">
                <PlusIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
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
                    Kỹ năng của bạn
                  </p>
                  <p className="!mb-0 text-[13px] text-blue-600">
                    Tìm hiểu thêm
                  </p>
                </span>
              </div>
              <div className="flex gap-1 p-2 justify-center items-center">
                <PlusIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
              </div>
            </div>
            {/* list skill */}
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="hidden md:flex md:flex-[3] bg-green-400 w-full p-4 rounded-lg">
        b
      </div>
    </div>
  );
};

export default UserProfile;
