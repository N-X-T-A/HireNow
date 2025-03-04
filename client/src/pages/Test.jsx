//Lấy token

// const accessToken = sessionStorage.getItem("access_token");
// if (accessToken) {
//   console.log("Token từ sessionStorage:", accessToken);
// } else {
//   console.log("Không có token, cần đăng nhập lại.");
// }

//Xóa token

// const handleLogout = () => {
//   sessionStorage.removeItem("access_token");
//   alert("Đăng xuất thành công!");
// };

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useState } from "react";
const services = [
  {
    title: "3D ARTIST",
    image: "/src/assets/home/ceo.jpg",
    tags: ["Game Design", "Environment Artist", "AI Artist", "Archviz Artist"],
  },
  {
    title: "VIDEO EXPLAINER",
    image: "/src/assets/home/ceo1.jpg",
    tags: ["Animated Explainer", "AI explainer", "Live-action explainer"],
  },
  {
    title: "GRAPHIC DESIGN",
    image: "/src/assets/home/ceo2.jpg",
    tags: [
      "Illustration",
      "Motion graphic design",
      "User interface design",
      "Print design",
      "Logo Design",
    ],
  },
  {
    title: "DIGITAL MARKETING",
    image: "/src/assets/home/ceo3.jpg",
    tags: [
      "Advertising",
      "Search Engine Optimization",
      "Affiliate Marketing",
      "Email Marketing",
      "Content",
    ],
  },
];

function ServiceCard({ service }) {
  return (
    <div className="relative bg-white p-5 shadow-lg rounded-xl transform rotate-2">
      <img
        src={service.image}
        alt={service.title}
        className="rounded-md w-full h-40 object-cover"
      />
      <h3 className="text-lg font-bold mt-4">{service.title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {service.tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-200 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <button className="absolute bottom-5 right-5 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">
        →
      </button>
    </div>
  );
}

const Test = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default Test;
// //login git
// const handleLoginGit = () => {
//   const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`;
//   window.location.href = authUrl;
// };
// useEffect(() => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const code = urlParams.get("code");

//   if (code) {
//     console.log("GitHub Authorization Code:", code);
//     alert("Lấy code thành công! Code: " + code);
//     //Xóa path sau 1 lan success
//     window.history.replaceState({}, document.title, window.location.pathname);
//     // setIsLoading(true);
//     // fetch(`https://github.com/login/oauth/access_token`, {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     Accept: "application/json",
//     //   },
//     //   body: JSON.stringify({
//     //     client_id: GITHUB_CLIENT_ID,
//     //     client_secret: GITHUB_SECRET_ID,
//     //     code,
//     //     redirect_uri: REDIRECT_URI,
//     //   }),
//     // })
//     //   .then((res) => res.json())
//     //   .then(async (data) => {
//     //     console.log("GitHub response:", data);
//     //     if (data.access_token) {
//     //       sessionStorage.setItem("access_token", data.access_token);

//     //       // Lấy thông tin người dùng từ GitHub API
//     //       const userInfoResponse = await fetch(
//     //         "https://api.github.com/user",
//     //         {
//     //           headers: {
//     //             Authorization: `Bearer ${data.access_token}`,
//     //           },
//     //         }
//     //       );

//     //       const userInfo = await userInfoResponse.json();
//     //       console.log("User info:", userInfo);
//     //       sessionStorage.setItem("user", JSON.stringify(userInfo));
//     //       setUser(userInfo);
//     //       setIsLoggedIn(true);
//     //     } else {
//     //       console.error("GitHub OAuth failed:", data);
//     //       alert("Đăng nhập GitHub thất bại");
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error during GitHub login:", error);
//     //     alert("Đăng nhập GitHub thất bại");
//     //   })
//     //   .finally(() => setIsLoading(false));
//   }
// }, []);

//login google
// const login = useGoogleLogin({
//   onSuccess: async (response) => {
//     setIsLoading(true);

//     const { access_token } = response;
//     try {
//       const userInfoResponse = await fetch(
//         "https://www.googleapis.com/oauth2/v3/userinfo",
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       );
//       const userInfo = await userInfoResponse.json();

//       sessionStorage.setItem("access_token", access_token);
//       sessionStorage.setItem("user", JSON.stringify(userInfo));
//       setUser(userInfo);
//       setTimeout(() => {
//         setIsLoading(false);
//         setIsLoggedIn(true);
//       }, 2000);
//     } catch (error) {
//       console.error("Error fetching user info:", error);
//       alert("Lấy thông tin người dùng thất bại");
//       setIsLoading(false); // Tắt loading nếu có lỗi
//     }
//   },
//   onError: (error) => {
//     console.error("Google login error:", error);
//     alert("Đăng nhập thất bại");
//     setIsLoading(false);
//   },
// });

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
