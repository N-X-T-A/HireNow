import React from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MultiStepForm from "../../components/multiStepForm/MultistepForm";
import StepperControl from "../../components/multiStepForm/StepperControl";
import Account from "../../components/steps/Account";
import JobRecommend from "../../components/steps/JobRecommend";
import Salary from "../../components/steps/Salary";
import Final from "../../components/steps/Final";
import { StepperContext } from "../../contexts/StepperContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "../../pages/pageCss/Login.css";
import { RecruiterAccount } from "../../components/recuiterStep/recruiterAccount";
import { RecruiterSocial } from "../../components/recuiterStep/recruiterSocial";
export default function LoginMethod() {
  // const GITHUB_CLIENT_ID = Environment.GITHUB_CLIENT_ID;
  // const REDIRECT_URI = "http://localhost:3000/login";
  // const GITHUB_SECRET_ID = Environment.GITHUB_SECRET_ID;
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Lỗi khi parse JSON từ sessionStorage:", error);
      return null;
    }
  });

  const [firstLoggin, setFisrtLoggin] = useState(() => {
    return JSON.parse(sessionStorage.getItem("firstLoggin")) ?? true;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isLoggedIn")) ?? false;
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  //login normal
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Lỗi xác thực");
      const data = await res.json();
      console.log("User data:", data);
      console.log(data.metadata.accessToken);
      // Lưu thông tin vào sessionStorage
      sessionStorage.setItem("access_token", data.metadata.accessToken);
      sessionStorage.setItem("user", JSON.stringify(data.metadata));
      sessionStorage.setItem(
        "firstLoggin",
        JSON.stringify(data.metadata.isFirstLogin)
      );
      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));

      // Giả lập loading trước khi cập nhật trạng thái
      setTimeout(() => {
        setUser(data.metadata);
        setFisrtLoggin(data.metadata.isFirstLogin);
        setIsLoggedIn(true);
        setIsLoading(false);
        window.dispatchEvent(new Event("userUpdated"));
      }, 3000);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setIsLoading(false);
    }
  };
  //login google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      console.log("Google Access Token:", response.access_token);
      try {
        console.log("Google Access Token:", response.access_token);
        const res = await fetch("http://localhost:5000/api/v1/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.access_token }),
        });
        if (!res.ok) throw new Error("Lỗi xác thực");
        const data = await res.json();
        console.log("User data:", data);

        sessionStorage.setItem("access_token", data.accessToken);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem(
          "firstLoggin",
          JSON.stringify(data.user.isFirstLogin)
        );
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true));

        // loading
        setTimeout(() => {
          setUser(data.user);
          setFisrtLoggin(data.user.isFirstLogin);
          setIsLoggedIn(true);
          setIsLoading(false);

          window.dispatchEvent(new Event("userUpdated"));
        }, 3000);
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        setIsLoading(false);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  //Lấy token local
  // const accessToken = sessionStorage.getItem("access_token");
  //navigate
  const handleNavigate = () => {
    if (user.role === "candidate") {
      navigate("/User/UserHome");
    } else if (user.role === "recruiter") {
      navigate("/employer/page1");
    } else {
      navigate("/"); // Điều hướng về trang chủ nếu không có role phù hợp
    }
  };
  //multiStep
  const steps = [
    "Thông tin tài khoản",
    "Trình độ học vấn",
    "Kinh nghiệm",
    "Hoàn tất",
  ];
  const RecuiterStep = ["Thông tin Công ty", "Chi tiết", "Hoàn tất"];
  const [isStepValid, setIsStepValid] = useState(false);
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account setIsStepValid={setIsStepValid} />;
      case 2:
        return <JobRecommend setIsStepValid={setIsStepValid} />;
      case 3:
        return <Salary setIsStepValid={setIsStepValid} />;
      case 4:
        return <Final setIsStepValid={setIsStepValid} />;
      default:
    }
  };
  const displayRecruiterStep = (step) => {
    switch (step) {
      case 1:
        return <RecruiterAccount />;
      case 2:
        return <RecruiterSocial />;
      case 3:
        return <Final />;
      default:
    }
  };

  const handleClick = async (action) => {
    if (action === "Tiếp theo") {
      if (!isStepValid) return;
      if (currentStep === steps.length) {
        console.log("Dữ liệu cuối cùng:", userData);
        setFinalData(userData);
        const userId = user._id;
        try {
          const response = await axios.put(
            "http://localhost:5000/api/v1/user/update-profile",
            userData,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Cập nhật thành công:", response.data);
          sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
          sessionStorage.setItem("firstLoggin", JSON.stringify(false));
          handleNavigate();
        } catch (error) {
          console.error("Lỗi khi cập nhật:", error.response?.data || error);
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      if (currentStep > 1) {
        setCurrentStep((prev) => prev - 1);
      }
    }
  };

  const handleClick1 = async (action) => {
    if (action === "Tiếp theo") {
      if (currentStep === RecuiterStep.length) {
        setFinalData(userData);

        try {
          console.log("Cập nhật thành công:", userData);
        } catch (error) {
          console.error("Lỗi khi cập nhật");
        }
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
          firstLoggin ? (
            user?.role === "recruiter" ? (
              <div className="flex flex-col w-full h-full items-center justify-center">
                <MultiStepForm steps={RecuiterStep} currentStep={currentStep} />
                <div
                  className="my-6 p-10 w-full min-h-[400px] max-h-[450px] overflow-y-auto"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <StepperContext.Provider
                    value={{ userData, setUserData, finalData, setFinalData }}
                  >
                    {displayRecruiterStep(currentStep)}
                  </StepperContext.Provider>
                </div>
                <StepperControl
                  handleClick={handleClick1}
                  currentStep={currentStep}
                  steps={RecuiterStep}
                />
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
                  isStepValid={isStepValid}
                />
              </div>
            )
          ) : (
            <div className="flex flex-col gap-3 w-full h-full items-center justify-items-center justify-center">
              <img
                className="w-[30%] rounded-[100px]"
                src={`${user?.photoURL}`}
                alt=""
              />
              <h2 className="text-2xl font-bold !mb-0">
                Chào {user?.username} !
              </h2>
              <p className="text-gray-600">
                {user?.role === "recruiter"
                  ? "Sẵn sàng để tìm kiếm ứng viên tiềm năng chưa?"
                  : "Sẵn sàng để bắt đầu một công việc chưa?"}
              </p>
              <button
                onClick={handleNavigate}
                className=" bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Bắt đầu
              </button>
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
                  name="email"
                  placeholder="Email"
                  className="w-[70%] border-[1px] border-zinc-800 h-[40px] rounded-[10px] px-[20px] py-[10px] mt-[35px]"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  className="w-[70%] border-[1px] border-zinc-800 h-[40px] rounded-[10px] px-[20px] py-[10px]"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className={`w-[70%] h-[45px] rounded-[10px] px-[20px] py-[10px] ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-[#1E90FF] text-white cursor-pointer transition ease-in-out duration-300"
                  }`}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
                  onClick={handleGoogleLogin}
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
                  onClick={handleGoogleLogin}
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
