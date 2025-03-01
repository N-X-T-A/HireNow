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

import { useState, useEffect } from "react";
import axios from "axios";

export default function Test() {
  const [jobs, setJobs] = useState([]); // Danh sách công việc
  const [selectedJob, setSelectedJob] = useState(null); // Công việc được chọn

  // Fetch danh sách công việc từ JSON Server
  useEffect(() => {
    axios
      .get("http://localhost:3001/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  }, []);

  // Fetch chi tiết công việc khi chọn
  useEffect(() => {
    if (selectedJob) {
      axios
        .get(`http://localhost:3001/jobs/${selectedJob}`)
        .then((res) => setSelectedJob(res.data))
        .catch((err) => console.error("Lỗi khi lấy chi tiết công việc:", err));
    }
  }, [selectedJob]);

  return (
    <div className="flex">
      {/* Danh sách công việc (bên trái) */}
      <div className="w-2/3 p-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 mb-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedJob(job.id)}
          >
            <h2 className="text-lg font-bold">{job.title}</h2>
            <p className="text-gray-600">
              {job.description.substring(0, 80)}...
            </p>
          </div>
        ))}
      </div>

      {/* Chi tiết công việc (bên phải) */}
      <div className="w-1/3 p-4 bg-red-300">
        {selectedJob ? (
          <div>
            <h2 className="text-xl font-bold">{selectedJob.title}</h2>
            <p className="text-gray-700">{selectedJob.description}</p>
            <p className="font-semibold mt-2">Yêu cầu kỹ năng:</p>
            <ul className="list-disc ml-5">
              {selectedJob.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Chọn một công việc để xem chi tiết</p>
        )}
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
