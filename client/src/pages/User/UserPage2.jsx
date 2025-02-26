import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
const UserPage2 = () => {
  return (
    <>
      <img
        className="w-full max-h-[100px] object-cover"
        src="/src/assets/user/banner.png"
        alt=""
      />
      <div className="rounded-[20px] max-h-[20px] h-full w-full bg-blue-300 flex justify-between items-center p-4">
        <div className="flex gap-2 items-center">
          <div className="relative flex justify-center items-center gap-3 pr-4 text-white after:content-[''] after:w-[1px] after:h-5 after:bg-white after:absolute after:right-0">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <p className="!mb-0">Loại công việc</p>
          </div>
          <div className="relative flex justify-center items-center gap-3 pr-4 text-white after:content-[''] after:w-[1px] after:h-5 after:bg-white after:absolute after:right-0">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="!mb-0">Địa điểm</p>
          </div>
          <div className="relative flex justify-center items-center gap-3 pr-4 text-white after:content-[''] after:w-[1px] after:h-5 after:bg-white after:absolute after:right-0">
            <FontAwesomeIcon icon={faUserCheck} />
            <p className="!mb-0">Kinh nghiệm</p>
          </div>
        </div>
        <div>
          <button className="text-white">Tìm kiếm ngay</button>
        </div>
      </div>

      <div className="flex w-full pt-2">
        {/* Phần 1 (Chiếm 3 phần) */}
        <div className="flex-[3] bg-blue-300 p-4">Bên trái (3 phần)</div>

        {/* Phần 2 (Chiếm 7 phần) */}
        <div className="flex-[7] bg-red-300 p-4">Bên phải (7 phần)</div>
      </div>
    </>
  );
};

export default UserPage2;
