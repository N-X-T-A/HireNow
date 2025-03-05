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

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Test = () => {
  const cvRef = useRef();
  const handleDownloadPDF = () => {
    const input = cvRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("cv.pdf");
    });
  };
  return (
    <div className="p-5">
      {/* Khu vực CV */}
      <div ref={cvRef} className="bg-white p-5 shadow-lg rounded-md">
        <h1 className="text-xl font-bold">John Doe</h1>
        <p>Web Developer</p>
        <p>Email: johndoe@example.com</p>
      </div>

      {/* Nút tải xuống */}
      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Tải xuống PDF
      </button>
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
