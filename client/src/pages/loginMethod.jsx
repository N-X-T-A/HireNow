import React from "react";
import Header from "../components/header/header";
import {
  useGoogleLogin,
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { jwtDecode } from "jwt-decode";
import { Environment } from "../environments/Environment";
import { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import MultiStepForm from "../components/multiStepForm/MultistepForm";
import StepperControl from "../components/multiStepForm/StepperControl";
import Account from "../components/steps/Account";
import JobRecommend from "../components/steps/JobRecommend";
import Salary from "../components/steps/Salary";
import Final from "../components/steps/Final";
import { StepperContext } from "../contexts/StepperContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "../pages/pageCss/Login.css";
export default function LoginMethod() {
  const GITHUB_CLIENT_ID = Environment.GITHUB_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/login";
  const GITHUB_SECRET_ID = Environment.GITHUB_SECRET_ID;
  const [user, setUser] = useState(() => {
    const userif = sessionStorage.getItem("user");
    return userif ? JSON.parse(userif) : null;
  });
  const hadLogin = false;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  //login google
  const login = () => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  };

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:5000/auth/google",
  //         {
  //           token: response.credential,
  //         },
  //         { withCredentials: true }
  //       );

  //       if (res.data.success) {
  //         setTimeout(() => {
  //           setIsLoading(false);
  //           setIsLoggedIn(true);
  //         }, 2000);
  //       }
  //     } catch (error) {
  //       console.error("Login Failed", error);
  //     }
  //   },
  //   onError: () => console.log("Login Failed"),
  // });

  //Lấy token local
  // const accessToken = sessionStorage.getItem("access_token");
  // const userif = sessionStorage.getItem("user");
  //multiStep
  const steps = [
    "Thông tin tài khoản",
    "Công việc phù hợp dành cho bạn",
    "Mức lương và địa điểm",
    "Hoàn tất",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <JobRecommend />;
      case 3:
        return <Salary />;
      case 4:
        return <Final />;
      default:
    }
  };

  const handleClick = (action) => {
    if (action === "Tiếp theo") {
      if (currentStep === steps.length) {
        // Khi đến bước cuối cùng, in dữ liệu ra console
        console.log("Dữ liệu cuối cùng:", userData);
        setFinalData(userData);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      if (currentStep > 1) {
        setCurrentStep((prev) => prev - 1);
      }
    }
  };
  //log test
  console.log(user);
  return (
    <>
      <div className="respon-r flex-1 pl-[20px] w-full">
        {isLoading ? (
          <div className="flex flex-col w-full h-full items-center justify-items-center justify-center">
            <img src="/src/assets/login/loading.gif" alt="" />
            <p className="text-lg font-semibold mb-2">Đang đăng nhập...</p>
            <div className="loader"></div>
          </div>
        ) : isLoggedIn ? (
          hadLogin ? (
            <div className="flex flex-col w-full h-full items-center justify-items-center justify-center">
              <img
                className="w-[30%] rounded-md"
                src="/src/assets/login/dance.gif"
                alt=""
              />
              <h2 className="text-2xl font-bold">Chào Thái!</h2>
              <p className="text-gray-600">
                Sẵn sàng để bắt đầu một công việc chưa
              </p>
              <button className=" bg-blue-500 text-white py-2 px-4 rounded-md">
                Bắt đầu
              </button>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full items-center justify-center">
              <MultiStepForm steps={steps} currentStep={currentStep} />
              <div className="my-6 p-10 w-full min-h-[400px]">
                <StepperContext.Provider
                  value={{ userData, setUserData, finalData, setFinalData }}
                >
                  {displayStep(currentStep)}
                </StepperContext.Provider>
              </div>
              <StepperControl
                handleClick={handleClick}
                currentStep={currentStep}
                steps={steps}
              />
            </div>
          )
        ) : (
          <>
            <div className="flex flex-col w-full h-full items-center justify-items-center justify-center">
              <div className="flex flex-col w-full items-center justify-items-center justify-center gap-[10px]">
                <p className="text-center !m-0 text-[35px] font-[400] tracking-[0.5px]">
                  Chào mừng bạn quay trở lại!
                </p>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-[70%] border-[1px] border-zinc-800 h-[40px] rounded-[10px] px-[20px] py-[10px] mt-[35px]"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-[70%] border-[1px] border-zinc-800 h-[40px] rounded-[10px] px-[20px] py-[10px] "
                />
                <button className="w-[70%] h-[45px] rounded-[10px] px-[20px] py-[10px] bg-[black] text-white cursor-pointer  transition ease-in-out duration-300 hover:bg-[#1E90FF]">
                  Đăng nhập
                </button>
              </div>
              <div className="flex items-center w-[70%] py-[25px]">
                <hr className="flex-grow border-t border-gray-900" />
                <span className="px-4 text-gray-600">Hoặc</span>
                <hr className="flex-grow border-t border-gray-900" />
              </div>
              <div className="flex items-center justify-center w-[70%]">
                <p className="text-center !m-0">
                  Chưa có tài khoản?{" "}
                  <span className="relative cursor-pointer bg-gradient-to-r from-[#1E90FF] via-green-400 to-blue-900 bg-clip-text text-transparent after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#1E90FF] after:via-green-400 after:to-blue-900 after:transition-all after:duration-300 hover:after:w-[90%]">
                    đăng ký{" "}
                  </span>{" "}
                  ngay
                </p>
              </div>
              <div className="flex  gap-[10px] flex-col items-center w-[70%] py-[25px]">
                <button
                  onClick={login}
                  className="flex items-center justify-items-center justify-center gap-[10px] w-full h-[45px] rounded-[10px] px-[20px] py-[10px] border-[1px] border-zinc-800 text-black cursor-pointer  transition ease-in-out duration-300 "
                >
                  <img
                    src="/src/assets/login/gg.png"
                    alt=""
                    className="w-full max-w-[20px]"
                  />
                  Đăng nhập bằng Google
                </button>

                <button
                  // onClick={handleLoginGit}
                  className="flex items-center justify-items-center justify-center gap-[10px] w-full h-[45px] rounded-[10px] px-[20px] py-[10px] border-[1px] border-zinc-800 text-black cursor-pointer  transition ease-in-out duration-300 "
                >
                  <img
                    src="/src/assets/login/git.png"
                    alt=""
                    className="w-full max-w-[20px]"
                  />
                  Đăng nhập bằng Github
                </button>
                <button className="flex items-center justify-items-center justify-center gap-[10px] w-full h-[45px] rounded-[10px] px-[20px] py-[10px] border-[1px] border-zinc-800 text-black cursor-pointer  transition ease-in-out duration-300 ">
                  <img
                    src="/src/assets/login/twt.png"
                    alt=""
                    className="w-full max-w-[20px]"
                  />
                  Đăng nhập bằng Facebook
                </button>
              </div>
              <p className="pt-[20px] text-[10px] w-[70%] text-right text-gray-400 cursor-pointer hover:bg-gradient-to-r hover:from-[#1E90FF] hover:via-green-400 hover:to-blue-900 hover:bg-clip-text hover:text-transparent">
                inc, vietnam 19-1-25, by Yung_Ah
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
