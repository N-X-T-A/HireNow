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
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

const slideData = [
  {
    id: 1,
    image: "/src/assets/login/3.jpg",
    quote: "Nature is beautiful",
    author: "John Doe",
  },
  {
    id: 2,
    image: "/src/assets/login/1.png",
    quote: "The city never sleeps",
    author: "Jane Smith",
  },
  {
    id: 3,
    image: "/src/assets/login/2.jpg",
    quote: "Future is now",
    author: "Tech Guru",
  },
  {
    id: 4,
    image: "/src/assets/login/4.jpg",
    quote: "Future is now",
    author: "Tech Guru",
  },
  {
    id: 5,
    image: "/src/assets/home/tartical.webp",
    quote: "Future is now",
    author: "Tech Guru",
  },
  {
    id: 6,
    image: "/src/assets/home/tarnical2.webp",
    quote: "Future is now",
    author: "Tech Guru",
  },
];

export default function Test() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[800px] w-full">
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Autoplay,
            EffectCoverflow,
          ]}
          effect="coverflow"
          grabCursor={true}
          initialSlide={1}
          loopFillGroupWithBlank={false}
          centeredSlides={true}
          slidesPerView={"auto"}
          loopAdditionalSlides={slideData.length}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="mySwiper"
        >
          {slideData.map((slide) => (
            <SwiperSlide key={slide.id} className="max-w-[300px]">
              <div className="relative">
                <img
                  src={slide.image}
                  alt="Slide Image"
                  className="w-full object-cover rounded-[10px]"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-[10px] w-full rounded-[10px]">
                  <p className="text-white text-[22px] font-[300]">
                    {slide.quote}
                  </p>
                  <p className="text-white text-[15px]">{slide.author}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

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
