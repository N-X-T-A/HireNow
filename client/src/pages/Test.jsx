import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import LoginMethod from "./loginMethod";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import "../pages/pageCss/Login.css";

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

export default function Test() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <div className="relative">
          <img
            src="/src/assets/login/3.jpg"
            alt=""
            className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent  p-[10px] w-full rounded-[10px]">
            <p className="text-[white] text-[22px] font-[300]">
              "Dưới góc độ công nghệ thông tin, việc tuyển dụng nhân sự chất
              lượng là một yếu tố quyết định đến sự thành công của dự án. Chúng
              tôi tìm kiếm những ứng viên không chỉ có kỹ năng chuyên môn vững
              vàng mà còn có khả năng làm việc nhóm và giải quyết vấn đề sáng
              tạo."
            </p>
            <p className="text-[white] text-[15px]">
              Pablo Escanor - Kỹ sư Phần mềm
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <div className="relative">
          <img
            src="/src/assets/login/1.png"
            alt=""
            className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent  p-[10px] w-full rounded-[10px]">
            <p className="text-[white] text-[22px] font-[300]">
              "Trong lĩnh vực tiếp thị, sự thấu hiểu khách hàng là chìa khóa dẫn
              đến thành công. Chúng tôi luôn tìm kiếm những chuyên gia có khả
              năng phân tích dữ liệu, sáng tạo chiến lược và xây dựng trải
              nghiệm mua sắm tuyệt vời cho khách hàng."
            </p>
            <p className="text-[white] text-[15px]">
              Minh Nguyễn - Chuyên gia Marketing
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img
            src="/src/assets/login/2.jpg"
            alt=""
            className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent  p-[10px] w-full rounded-[10px]">
            <p className="text-[white] text-[22px] font-[300]">
              "Mỗi bức ảnh không chỉ là một khoảnh khắc, mà còn là một câu
              chuyện. Tôi tin rằng nhiếp ảnh không chỉ ghi lại hình ảnh mà còn
              truyền tải cảm xúc, mang lại giá trị nghệ thuật và kết nối mọi
              người thông qua những khung hình đẹp."
            </p>
            <p className="text-[white] text-[15px]">
              Linh Trần - Nhiếp ảnh gia chuyên nghiệp
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img
            src="/src/assets/login/4.jpg"
            alt=""
            className="w-full max-w-[800px] max-h-[750px] object-cover rounded-[10px]"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent  p-[10px] w-full rounded-[10px]">
            <p className="text-[white] text-[22px] font-[300]">
              "Để trở thành một diễn viên giỏi, bạn không chỉ cần tài năng mà
              còn phải có sự kiên trì và đam mê. Mỗi vai diễn là một thử thách
              mới, là cơ hội để hóa thân và truyền tải những câu chuyện đầy cảm
              xúc đến khán giả."
            </p>
            <p className="text-[white] text-[15px]">Huy Phạm - Diễn viên</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
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
