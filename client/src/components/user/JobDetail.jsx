import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SparklesIcon, StarIcon } from "@heroicons/react/24/solid";
import { ClockIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import parse from "html-react-parser";
const JobDetail = ({ jobId }) => {
  //state
  const navigate = useNavigate();
  const [selectedJob, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Lỗi khi parse JSON từ sessionStorage:", error);
      return null;
    }
  });
  //state pdf
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [OpenNotification, setOpenNotification] = useState(false);
  const [OpenNotification1, setOpenNotification1] = useState(false);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      const newFormData = new FormData();
      newFormData.append("resume", selectedFile);
    } else {
      alert("Vui lòng chọn một file PDF hợp lệ.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResumeUrl("");
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Vui lòng chọn file trước khi gửi.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const uploadResponse = await axios.post(
        "http://localhost:5000/api/v1/upload/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const cloudinaryUrl = uploadResponse.data.metadata.resumeUrl;
      setResumeUrl(cloudinaryUrl);
      const applicationData = {
        job_id: jobId,
        resume: cloudinaryUrl,
        cover_letter: coverLetter,
      };
      console.log("dâta", applicationData);
      const applyResponse = await axios.post(
        "http://localhost:5000/api/v1/application",
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
      }, 1000);
      console.log(applyResponse.data);
    } catch (error) {
      console.error("Lỗi khi gửi file:", error);

      setOpenNotification1(true);
      setTimeout(() => {
        setOpenNotification1(false);
      }, 1000);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  //fetch API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/job/${jobId}`
        );
        setJobs(response.data.job);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchJobs();
  }, [jobId]);

  return (
    <>
      <div
        className="flex rounded-lg w-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        {/* bên phải - left section */}
        <div className="flex-[7] w-full  flex flex-col border-r-2 border-gray-200 ">
          <div className="flex justify-between items-center p-4 border-b-2 border-gray-200">
            <p
              onClick={() => navigate(`/user/jobs/${jobId}`)}
              className="!mb-0 text-[30px] font-[500] cursor-pointer hover:underline"
            >
              {selectedJob.title}
            </p>

            <span className="flex items-center gap-1 text-13px text-gray-400">
              <ClockIcon className="w-4 h-4" />
              <p className="!mb-0">{selectedJob?.posted_time}</p>
            </span>
          </div>
          <div
            className="flex flex-col p-4  gap-[50px] max-h-[780px] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex flex-col justify-center item-center pb-2 border-b-[1px] border-gray-200">
              <p className="font-[500]">Tóm tắt về vai trò:</p>
              <p className="!mb-0 font-[400]">
                {selectedJob?.description
                  ? parse(
                      selectedJob.description.replace(
                        "<p>",
                        '<p class="!mb-0">'
                      )
                    )
                  : "Không có mô tả"}
              </p>
            </div>
            <div className="flex flex-col justify-center item-center  pb-2  border-b-[1px] border-gray-200">
              <p className="font-[500]">về trách nhiệm công việc: </p>
              <p className="!mb-0 font-[400]">
                {selectedJob?.responsibility
                  ? parse(
                      selectedJob.responsibility.replace(
                        "<ul>",
                        '<ul class="list-disc pl-5 space-y-2">'
                      )
                    )
                  : "Không có trách nhiệm công việc"}
              </p>
            </div>
            <div className="flex flex-col justify-center item-center pb-2   border-b-[1px] border-gray-200">
              <p className="font-[500]">về kinh nghiệm cần có: </p>
              <p className="!mb-0 font-[400]">
                {selectedJob?.required_experience
                  ? parse(
                      selectedJob.required_experience.replace(
                        "<ul>",
                        '<ul class="list-disc pl-5 space-y-2">'
                      )
                    )
                  : "Không có yêu cầu kinh nghiệm"}
              </p>
            </div>
            <div className="flex flex-col justify-center item-center pb-2   border-b-[1px] border-gray-200">
              <p className="font-[500]">Lí do nên gia nhập: </p>
              <p className="!mb-0 font-[400]">
                {selectedJob?.reasons_to_join
                  ? parse(
                      selectedJob.reasons_to_join.replace(
                        "<ul>",
                        '<ul class="list-disc pl-5 space-y-2">'
                      )
                    )
                  : "Không có lí do nên gia nhập"}
              </p>
            </div>
            <div className="flex flex-col justify-center item-center">
              <p className="font-[500]">Các yêu cầu kĩ năng:</p>
              <div className="flex gap-3">
                {selectedJob?.skills?.map((skill, index) => (
                  <p
                    key={index}
                    className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200 text-gray-700"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* bên phải - right section */}
        <div className="flex-[3] w-full flex flex-col gap-3">
          {/* Thông tin công ty */}
          <div className="flex w-[80%] flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
              <p className="!mb-0 flex items-center gap-2 text-[20px] font-[500]">
                {selectedJob?.company?.name}
                <CheckBadgeIcon className="w-5 h-5 text-green-600" />
              </p>
              <img
                src={selectedJob?.company?.logo}
                alt={selectedJob?.company}
                className="max-w-[50px]"
              />
            </div>
            <div>
              <p className="!mb-2 font-[500]">Gia nhập vào:</p>
              <p className="!mb-0 font-[400] text-gray-500">2020</p>
            </div>
            <div>
              <p className="!mb-2 font-[500]">Địa điểm:</p>
              <p className="!mb-0 font-[400] text-gray-500">
                {selectedJob?.company?.locations
                  ?.map((loc) => `${loc.city} - ${loc.detailed_location}`)
                  .join(", ")}
              </p>
            </div>
          </div>

          <span className="border-b-[2px]"></span>

          {/*thông tin khác */}
          <div className="flex w-[80%] flex-col gap-4 p-4">
            <p className="!mb-0 text-[20px] font-[500]">Các thông tin khác:</p>
            <div>
              <p className="!mb-2 font-[500] flex items-center gap-3">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
                  ))}
              </p>
              <p className="!mb-0 font-[400] text-gray-500">
                Đã xác minh thanh toán
              </p>
            </div>
            <div>
              <p className="!mb-2 font-[500]">$65K+ tổng số tiền đã chi trả</p>
              <p className="!mb-0 font-[400] text-gray-500">
                Đã xác minh thanh toán
              </p>
            </div>
          </div>

          <span className="border-b-[2px]"></span>

          {/*dịch vụ */}
          <div className="flex w-[80%] flex-col gap-4 p-4">
            <p className="!mb-0 text-[20px] font-[500]">Về các dịch vụ:</p>
            <div className="flex flex-wrap gap-3">
              <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                TensorFlow
              </p>
              <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                PyTorch
              </p>
              <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                NLP
              </p>
              <p className="!mb-0 px-2 py-1 text-[13px] rounded-xl font-[500] bg-gray-200">
                Deep Learning
              </p>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="text-white px-4 py-2 bg-[#1E90FF] rounded-xl mt-8"
            >
              Ứng tuyển
            </button>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpen(!open)}
                className="fixed inset-0 flex items-center justify-center bg-black/70 z-[999] w-full h-screen"
              >
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="md:w-[1000px] h-auto bg-white rounded-[10px] shadow-lg overflow-hidden flex gap-4 p-4"
                >
                  <img
                    src="/src/assets/user/apply.gif"
                    alt=""
                    className="max-w-[300px] border-[2px] rounded-[10px]"
                  />
                  <div className="flex flex-col gap-3 w-full">
                    <>
                      <span>
                        <p className="!mb-0 font-[600] text-[#1E90FF]">
                          Thông tin liên hệ:
                        </p>
                        <div className="flex  items-center gap-2">
                          <img
                            src={user?.photoURL}
                            alt=""
                            className="w-10 h-10 rounded-full border-[2px] border-gray-200"
                          />

                          <div>
                            <p className="!mb-0">{user?.username}</p>
                            <p className="!mb-0 text-gray-500 text-[12px]">
                              Dalat, LamDong, VietNam
                            </p>
                          </div>
                        </div>
                      </span>
                      <span>
                        <p className="!mb-0 font-[600] text-[#1E90FF]">
                          Đăng tải CV của bạn tại đây:
                        </p>
                        <div className="w-full border-[1px] rounded-[10px] border-dashed border-gray-300 p-2">
                          <div className="flex gap-2 items-center">
                            <div className="flex gap-4 items-center">
                              <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                Chọn file PDF
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                              </label>

                              {file && (
                                <div className="flex items-center gap-2 border px-2 py-1 rounded shadow">
                                  <span>{file.name}</span>
                                  <button
                                    onClick={handleRemoveFile}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                  >
                                    Xóa
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="!mb-0 font-[600] text-[13px] text-gray-500">
                            Vui lòng chỉ upload file có filetype là .pdf, chỉ
                            một file duy nhất
                          </p>
                        </div>
                      </span>
                      <span>
                        <p className="!mb-0 font-[600] text-[#1E90FF]">
                          Thêm mô tả ngắn của bạn về việc lựa chọn công việc
                          này:
                        </p>
                        <div className="flex gap-2">
                          <textarea
                            className="border p-2 w-full rounded-md"
                            placeholder="Mô tả ngắn của bạn"
                            onChange={(e) => setCoverLetter(e.target.value)}
                          />
                          <button
                            onClick={handleSubmit}
                            className={`px-2 py-1 rounded-md text-white ${
                              loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#1E90FF] cursor-pointer"
                            }`}
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="flex items-center gap-2">
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                                  ></path>
                                </svg>
                                Đang gửi...
                              </span>
                            ) : (
                              "Xác nhận"
                            )}
                          </button>
                        </div>
                      </span>
                    </>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {OpenNotification && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-[5%] right-[2%] "
        >
          <div className="relative flex items-center justify-center">
            <p className="!mb-0 px-4 py-1 rounded-lg border-[2px] border-green-500">
              Ứng tuyển thành công
            </p>
          </div>
        </motion.div>
      )}
      {OpenNotification1 && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-[5%] right-[2%] "
        >
          <div className="relative flex items-center justify-center">
            <p className="!mb-0 px-4 py-1 rounded-lg border-[2px] border-red-500">
              Lỗi thử lại sau
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default JobDetail;
