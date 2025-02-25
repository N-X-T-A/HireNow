import React, { useEffect, useState } from "react";
import "../header/header.css";
import "../../assets/home/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faNewspaper,
  faUser,
  faBriefcase,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const Header = (shouldFetch) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  //fetch user
  useEffect(() => {
    const fetchUser = () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ sessionStorage", error);
        setCurrentUser(null);
      }
    };
    fetchUser();
    const handleUserUpdate = () => fetchUser();
    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, [shouldFetch]);

  //log test
  console.log("current user: ", currentUser);

  return (
    <>
      <header className="h-max">
        <div className="container-fluid flex justify-center">
          <div className="row min-h-[80px] w-11/12">
            {/* logo */}
            <div className="col-lg-2 flex items-center justify-start">
              <img
                className="max-w-28 w-full "
                src="/src/assets/home/logo.png"
                alt=""
                onClick={() => navigate("/")}
              />
            </div>
            {/* right item */}
            <div className="res-rightItem col-lg-10  flex justify-end ">
              <div className="row items-center justify-center">
                <div className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center">
                  <FontAwesomeIcon icon={faNewspaper} className="text-[22px]" />
                  <span className="pt-1.5 text-[12px]">Bài viết</span>
                </div>

                <div className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center">
                  <FontAwesomeIcon icon={faUser} className="text-[22px]" />
                  <span className="pt-1.5 text-[12px]">Mọi người</span>
                </div>
                <div className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center">
                  <FontAwesomeIcon icon={faYoutube} className="text-[22px]" />
                  <span className="pt-1.5 text-[12px]">Khóa học</span>
                </div>
                <div className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center">
                  <FontAwesomeIcon icon={faBriefcase} className="text-[22px]" />
                  <span className="pt-1.5 text-[12px]">Việc làm</span>
                </div>
                <div className=" pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center">
                  <FontAwesomeIcon icon={faGlobe} className="text-[22px]" />
                  <span className="pt-1.5 text-[12px]">Thị trường</span>
                </div>
                <span className="border-r !w-max !max-w-none"></span>
                {/* change user here */}
                {currentUser ? (
                  <>
                    <div className="res-btn-loginHeader flex items-center justify-center gap-[10px] !w-max !max-w-none">
                      <img
                        src={currentUser.photoURL}
                        alt=""
                        className="w-10 h-10 rounded-full mb-[4px]  transition ease-in-out duration-300 transform hover:-translate-y-[5px]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="res-btn-loginHeader flex items-center justify-center gap-[10px] !w-max !max-w-none ">
                      <button className="!h-max !w-max !max-w-none px-[20px] py-[7px] rounded-[5px] text-[#1E90FF] transition ease-in-out duration-300 transform hover:-translate-y-[2px]  hover:bg-[#1E90FF]  hover:text-white">
                        Đăng ký ngay
                      </button>
                      <button
                        onClick={() => navigate("/login")}
                        className=" !h-max !w-max !max-w-none px-[20px] py-[7px] rounded-[5px] bg-[#1E90FF] text-[#FFFFFF] transition ease-in-out duration-300 transform hover:-translate-y-[2px] hover:px-[19px] hover:py-[6px] hover:text-[#1E90FF]  hover:bg-white hover:border hover:border-[#1E90FF]"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
