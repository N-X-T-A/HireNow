import React from "react";
import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import parse from "html-react-parser";

const JobDetailPageCom = ({
  open,
  setOpen,
  jobs,
  setJobs,
  user,
  setUser,
  file,
  setFile,
  resumeUrl,
  setResumeUrl,
  coverLetter,
  setCoverLetter,
  loading,
  setLoading,
  OpenNotification,
  setOpenNotification,
  OpenNotification1,
  setOpenNotification1,
  handleFileChange,
  handleRemoveFile,
  handleSubmit,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 bg-[#f5f5f5]">
        <div className="flex flex-col justify-center items-center relative w-full">
          <img
            className="max-h-[300px] w-full object-cover"
            src={jobs?.company?.background_image}
            alt=""
          />
          {/* job card */}
          <div
            className="flex flex-col md:flex-row w-[70%] p-4 absolute bottom-[-15%] md:bottom-[-25%] bg-white rounded-[20px] justify-between items-center"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="flex md:flex-row flex-col justify-center items-center md:gap-3">
              <img
                className="max-w-[30px] md:max-w-[90px] rounded-lg border-[1px]"
                src={jobs?.company?.logo}
                alt=""
              />
              <div className=" flex flex-col gap-2">
                <p className="hidden md:block !mb-0 font-[500]">
                  Công ty Công nghệ
                </p>
                <p className="!mb-0 text-[15px] md:text-[30px] font-[500]">
                  {jobs?.title}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 w-full rounded-lg bg-[#1E90FF] text-white font-[500]"
              >
                Ứng tuyển ngay
              </button>
              {/* pop up */}
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
                              className={`px-2 py-1 w-[150px] rounded-md text-white ${
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
              <div className="hidden md:flex gap-2 justify-center items-center"></div>
            </div>
          </div>
        </div>
        <div className="w-[70%] flex justify-center  gap-3 mt-[10%] md:mt-[7%] ">
          {/* left section */}
          <div
            className="md:flex-[7]  flex flex-col gap-3 max-h-[1000px] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* description */}
            <div className="flex flex-col gap-1">
              <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
                Tóm tắt về công việc
              </p>
              <p className="!mb-0 text-[15px] font-[400] text-justify">
                {jobs?.description
                  ? parse(jobs.description.replace("<p>", '<p class="!mb-0">'))
                  : "Không có mô tả"}
              </p>
            </div>
            {/* description */}
            <div className="flex flex-col gap-1">
              <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
                Trách nhiệm trong công việc
              </p>
              <div className="p-4 rounded-lg bg-white text-justify">
                {jobs?.responsibility
                  ? parse(
                      jobs.responsibility.replace(
                        "<ul>",
                        '<ul class="list-disc list-inside pl-5 space-y-3">'
                      )
                    )
                  : "Không có trách nhiệm công việc"}
              </div>
            </div>
            {/* requirement */}
            <div className="flex flex-col gap-1">
              <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
                Yêu cầu công việc
              </p>
              <div className="p-4 rounded-lg bg-white text-justify">
                {jobs?.required_experience
                  ? parse(
                      jobs.required_experience.replace(
                        "<ul>",
                        '<ul class="list-disc list-inside pl-5 space-y-3">'
                      )
                    )
                  : "Không có trách nhiệm công việc"}
              </div>
            </div>
            {/* benefit */}
            <div className="flex flex-col gap-1">
              <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
                Lợi ích công việc
              </p>
              <div className="p-4 rounded-lg bg-white text-justify">
                {jobs?.reasons_to_join
                  ? parse(
                      jobs.reasons_to_join.replace(
                        "<ul>",
                        '<ul class="list-disc list-inside pl-5 space-y-3">'
                      )
                    )
                  : "Không có trách nhiệm công việc"}
              </div>
            </div>
          </div>
          {/* right section */}
          <div className="hidden  md:flex flex-col gap-4 md:flex-[3] p-2">
            {/* right 1st */}
            <div className="flex flex-col gap-2 w-full p-4 rounded-lg bg-[white]">
              <div className="flex  items-center gap-2">
                <img
                  className="max-w-[30px] md:max-w-[90px] rounded-lg border-[1px]"
                  src={jobs?.company?.logo}
                  alt=""
                />
                <div>
                  <p className="!mb-0 text-[20px]">{jobs?.company?.name}</p>
                  <p className="!mb-0 text-[12px] text-blue-500">
                    Xem thêm về công ty{" "}
                  </p>
                </div>
              </div>
              <p className="!mb-0 text-gray-400">
                Growing software technology company
              </p>
              <div className="mt-2 w-full flex flex-col gap-3 justify-center items-center">
                <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                  Mô hình công ty{" "}
                  <span className="font-[500]  text-end">Sản phẩm</span>
                </p>
                <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                  Lĩnh vực công ty{" "}
                  <span className="font-[500]  text-end">
                    Sản Phẩm Phần Mềm và Dịch Vụ Web
                  </span>
                </p>
                <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                  Quy mô công ty{" "}
                  <span className="font-[500]  text-end">51-150 nhân viên</span>
                </p>
                <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                  Quốc gia{" "}
                  <span className="font-[500]  text-end">Việt Nam</span>
                </p>
                <p className="flex justify-between items-center w-full p-1 border-b-[1px] border-dashed">
                  Thời gian làm việc{" "}
                  <span className="font-[500]  text-end">Thứ 2 - Thứ 6</span>
                </p>
              </div>
            </div>
            {/* right 2st */}
            <div className="flex flex-col gap-2 w-full p-4 rounded-lg bg-[white]">
              <p className="font-[500] !mb-0">
                Trải nghiệm tìm kiếm thông minh hơn với Premium
              </p>
              <p className="!mb-0">
                Các thành viên cao cấp có khả năng được tuyển dụng cao hơn tới
                2,6 lần. Thêm vào đó! Đi trước với quyền truy cập độc quyền vào
                các nhà lãnh đạo doanh nghiệp có ảnh hưởng.
              </p>
              <div className="flex gap-2 justify-center items-center">
                <img
                  className="max-w-[70px]"
                  src="/src/assets/user/GroupContact.png"
                  alt=""
                />
                <p className="!mb-0 text-[12px] text-gray-400">
                  Hàng triệu thành viên đã sử dụng Premium
                </p>
              </div>
              <button className="w-full py-2 px-4 bg-[#1E90FF] rounded-lg text-white font-[500]">
                Thử 1 tháng Premium với giá ₫0
              </button>
              <p className="!mb-0 text-[12px] text-gray-400">
                1 tháng miễn phí với hỗ trợ 24/7. Hủy bất cứ lúc nào. Chúng tôi
                sẽ nhắc bạn 7 ngày trước khi thời gian dùng thử của bạn kết thúc
              </p>
            </div>
          </div>
        </div>
      </div>
      {OpenNotification && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-[10%] right-[45%] shadow-lg"
        >
          <div className="relative flex items-center justify-center">
            <p className="!mb-0 px-4 py-2 font-[600] rounded-lg text-white bg-green-500">
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
          className="fixed top-[10%] right-[45%] shadow-lg"
        >
          <div className="relative flex items-center justify-center">
            <p className="!mb-0 px-4 py-2 font-[600] rounded-lg text-white bg-red-500">
              Ứng tuyển không thành công
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default JobDetailPageCom;
