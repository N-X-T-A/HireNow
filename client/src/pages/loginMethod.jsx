import React from "react";
import Header from "../components/header/header";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { jwtDecode } from "jwt-decode";
import { Environment } from "../environments/Environment";
import { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //login google
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);

      const { access_token } = response;
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const userInfo = await userInfoResponse.json();

        sessionStorage.setItem("access_token", access_token);
        sessionStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
        setTimeout(() => {
          setIsLoading(false);
          setIsLoggedIn(true);
        }, 2000);
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Lấy thông tin người dùng thất bại");
        setIsLoading(false); // Tắt loading nếu có lỗi
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      alert("Đăng nhập thất bại");
      setIsLoading(false);
    },
  });
  //login git
  const handleLoginGit = () => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`;
    window.location.href = authUrl;
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("GitHub Authorization Code:", code);
      alert("Lấy code thành công! Code: " + code);
      //Xóa path sau 1 lan success
      window.history.replaceState({}, document.title, window.location.pathname);
      // setIsLoading(true);
      // fetch(`https://github.com/login/oauth/access_token`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify({
      //     client_id: GITHUB_CLIENT_ID,
      //     client_secret: GITHUB_SECRET_ID,
      //     code,
      //     redirect_uri: REDIRECT_URI,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then(async (data) => {
      //     console.log("GitHub response:", data);
      //     if (data.access_token) {
      //       sessionStorage.setItem("access_token", data.access_token);

      //       // Lấy thông tin người dùng từ GitHub API
      //       const userInfoResponse = await fetch(
      //         "https://api.github.com/user",
      //         {
      //           headers: {
      //             Authorization: `Bearer ${data.access_token}`,
      //           },
      //         }
      //       );

      //       const userInfo = await userInfoResponse.json();
      //       console.log("User info:", userInfo);
      //       sessionStorage.setItem("user", JSON.stringify(userInfo));
      //       setUser(userInfo);
      //       setIsLoggedIn(true);
      //     } else {
      //       console.error("GitHub OAuth failed:", data);
      //       alert("Đăng nhập GitHub thất bại");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error during GitHub login:", error);
      //     alert("Đăng nhập GitHub thất bại");
      //   })
      //   .finally(() => setIsLoading(false));
    }
  }, []);
  //Lấy token local
  const accessToken = sessionStorage.getItem("access_token");
  const userif = sessionStorage.getItem("user");

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
          <MultiStepForm user={user} />
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
                  onClick={handleLoginGit}
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

const MultiStepForm = ({ user }) => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-items-center justify-center">
      <img className="w-[30%] rounded-md" src={user?.picture} alt="" />
      <h2 className="text-2xl font-bold">Chào {user?.name}!</h2>
      <p className="text-gray-600">Bắt đầu điền thông tin tiếp theo</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
        Tiếp tục
      </button>
    </div>
  );
};
