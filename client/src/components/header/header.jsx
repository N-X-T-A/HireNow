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
  faBorderAll,
  faCommentDots,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const Header = (shouldFetch) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [firstLoggin, setFisrtLoggin] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("firstLoggin")) || null;
    } catch (error) {
      console.error("Lỗi khi parse JSON từ sessionStorage:", error);
      return null;
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  //notification
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([{ id: 1, message: "Bạn có thông báo mới!" }]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClickNotification = () => {
    setShowPopup(!showPopup);
    setNotifications([]); // Xóa thông báo sau khi click
  };

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
  //logtest
  const role = currentUser?.role;
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
                {/* change user here */}
                {currentUser ? (
                  <>
                    {" "}
                    {role === "candidate" && (
                      <>
                        <div
                          onClick={() => navigate("/user/userHome")}
                          className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center"
                        >
                          <FontAwesomeIcon
                            icon={faBorderAll}
                            className="text-[22px]"
                          />

                          <span className="pt-1.5 text-[12px]">Tất cả</span>
                        </div>
                        <div
                          onClick={() => navigate("/user/jobs")}
                          className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center"
                        >
                          <FontAwesomeIcon
                            icon={faBriefcase}
                            className="text-[22px]"
                          />
                          <span className="pt-1.5 text-[12px]">Việc làm</span>
                        </div>
                        <div
                          onClick={() => navigate("/user/test")}
                          className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center"
                        >
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            className="text-[22px]"
                          />

                          <span className="pt-1.5 text-[12px]">Nhắn tin</span>
                        </div>
                        {/* notification */}
                        <div
                          onClick={handleClickNotification}
                          className=" relative pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center "
                        >
                          <FontAwesomeIcon
                            icon={faBell}
                            className="text-[22px]"
                          />
                          {notifications.length > 0 && (
                            <span className="absolute top-0 right-5 w-2 h-2 bg-red-500 rounded-full z-[2]"></span>
                          )}
                          <span className="pt-1.5 text-[12px]">Thông báo</span>
                        </div>
                        {showPopup && (
                          <div className="absolute  right-[8%] top-[7%] mt-2 !w-[300px] bg-white border shadow-lg rounded-lg p-2 z-[100000]">
                            <h4 className="font-bold text-gray-700">
                              Thông báo
                            </h4>
                            {notifications.length === 0 ? (
                              <p className="text-gray-500 text-sm">
                                Không có thông báo mới
                              </p>
                            ) : (
                              notifications.map((item) => (
                                <p
                                  key={item.id}
                                  className="text-sm text-gray-800"
                                >
                                  {item.message}
                                </p>
                              ))
                            )}
                            <button
                              onClick={() => setShowPopup(false)}
                              className="mt-2 text-blue-500 text-sm"
                            >
                              Đóng
                            </button>
                          </div>
                        )}
                        {/* avatar */}
                        <div
                          className="relative res-btn-loginHeader flex items-center justify-center gap-[10px] !w-max !max-w-none"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <img
                            src={currentUser?.photoURL}
                            alt=""
                            className="w-10 h-10 rounded-full mb-[4px]  transition ease-in-out duration-300 transform hover:-translate-y-[5px]"
                          />
                          {isOpen && (
                            <div
                              className="absolute top-[70%] right-0 md:top-[100%] mt-2 w-48 bg-white border shadow-lg rounded-lg p-2 z-50"
                              onClick={(e) => e.stopPropagation()}
                              onMouseLeave={() => setIsOpen(false)}
                            >
                              {firstLoggin ? (
                                <>
                                  <button
                                    className="block w-full px-4 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                      navigate("/login");
                                    }}
                                  >
                                    Tiếp tục cung cấp thông tin
                                  </button>
                                  <button
                                    className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                                    onClick={() => {
                                      sessionStorage.clear();
                                      navigate("/");
                                      window.location.reload();
                                    }}
                                  >
                                    Đăng xuất
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="block w-full px-4 py-2 hover:bg-gray-100"
                                    onClick={() => navigate("/user/profile")}
                                  >
                                    Trang cá nhân
                                  </button>
                                  <button
                                    onClick={() => navigate("/user/job-apply")}
                                    className="block w-full px-4 py-2 hover:bg-gray-100"
                                  >
                                    Công việc
                                  </button>

                                  <button
                                    className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                                    onClick={() => {
                                      sessionStorage.clear();
                                      navigate("/");
                                      window.location.reload();
                                    }}
                                  >
                                    Đăng xuất
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {role === "recruiter" && (
                      <>
                        <div className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center">
                          <FontAwesomeIcon
                            icon={faBorderAll}
                            className="text-[22px]"
                          />

                          <span className="pt-1.5 text-[12px]">Công việc</span>
                        </div>

                        <div className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center">
                          <FontAwesomeIcon
                            icon={faBriefcase}
                            className="text-[22px]"
                          />
                          <span className="pt-1.5 text-[12px]">Nhân sự</span>
                        </div>
                        <div className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center">
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            className="text-[22px]"
                          />

                          <span className="pt-1.5 text-[12px]">Xem thêm</span>
                        </div>
                        <div
                          className="relative res-btn-loginHeader flex items-center justify-center gap-[10px] !w-max !max-w-none"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <img
                            src={currentUser?.photoURL}
                            alt=""
                            className="w-10 h-10 rounded-full mb-[4px]  transition ease-in-out duration-300 transform hover:-translate-y-[5px]"
                          />
                          {isOpen && (
                            <div
                              className="absolute top-[70%] right-0 md:top-[100%] mt-2 w-48 bg-white border shadow-lg rounded-lg p-2 z-50"
                              onClick={(e) => e.stopPropagation()}
                              onMouseLeave={() => setIsOpen(false)}
                            >
                              <>
                                <button className="block w-full px-4 py-2 hover:bg-gray-100">
                                  Trang cá nhân
                                </button>
                                <button className="block w-full px-4 py-2 hover:bg-gray-100">
                                  Tiến độ công việc
                                </button>
                                <button
                                  className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                                  onClick={() => {
                                    sessionStorage.clear();
                                    navigate("/");
                                    window.location.reload();
                                  }}
                                >
                                  Đăng xuất
                                </button>
                              </>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => navigate("/blogs")}
                      className="pt-[5px] text-[#757575] flex justify-center flex-col !w-auto !max-w-none cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] hover:text-[#1E90FF] text-center"
                    >
                      <FontAwesomeIcon
                        icon={faNewspaper}
                        className="text-[22px]"
                      />
                      <span className="pt-1.5 text-[12px]">Bài viết</span>
                    </div>

                    <div className="res-btn-loginHeader flex items-center justify-center gap-[10px] !w-max !max-w-none ">
                      <button
                        onClick={() => navigate("/register")}
                        className="!h-max !w-max !max-w-none px-[20px] py-[7px] rounded-[5px] text-[#1E90FF] transition ease-in-out duration-300 transform hover:-translate-y-[2px]  hover:bg-[#1E90FF]  hover:text-white"
                      >
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
