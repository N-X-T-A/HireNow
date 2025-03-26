import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckBadgeIcon,
  PencilIcon,
  PlusIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { peopleNear } from "../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
const Profile = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });
  const navigate = useNavigate();
  //test input
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    duration: "",
  });

  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("workExperience");
    if (storedData) {
      setWorkList(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.company || !formData.position || !formData.duration) return;

    const updatedList = [...workList, formData];
    setWorkList(updatedList);
    sessionStorage.setItem("workExperience", JSON.stringify(updatedList));
    setFormData({ company: "", position: "", duration: "" });
  };

  const handleClear = () => {
    sessionStorage.removeItem("workExperience");
    setWorkList([]);
  };

  //posst
  const [open1, setOpen1] = useState(false);

  const [formData1, setFormData1] = useState({
    statusPost: "",
  });

  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    const storedData1 = sessionStorage.getItem("postStatus");
    if (storedData1) {
      setStatusList(JSON.parse(storedData1));
    }
  }, []);

  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const handleSave1 = () => {
    if (!formData1.statusPost) return;

    const updatedList1 = [...statusList, formData1];
    setStatusList(updatedList1);
    sessionStorage.setItem("postStatus", JSON.stringify(updatedList1));
    setFormData1({ statusPost: "" });
  };
  const handleClear1 = () => {
    sessionStorage.removeItem("postStatus");
    setStatusList([]);
  };
  return (
    <div className="  w-full flex gap-3 justify-center">
      {/* left section */}
      <div className="md:flex-[7] flex flex-col gap-4 w-full ">
        {/* header */}
        <div
          className="w-full rounded-lg"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          {" "}
          {/* header profile */}
          <div className="relative w-full">
            <img
              className="w-full max-h-[130px]  rounded-t-lg object-cover"
              src="/src/assets/user/bgprofile1.jpg"
              alt=""
            />
            <img
              src={user?.photoURL}
              alt=""
              className="absolute max-w-[100px] max-h-[100px] left-5 top-[-1/2] -translate-y-1/2 p-[2px] rounded-full bg-white"
            />
            <PencilIcon className="w-5 h-5 absolute right-5 top-5 p-[2px] rounded-full bg-white text-gray-500" />
          </div>
          {/* header info */}
          <div className="mt-[15%] md:mt-[5%] flex flex-col gap-3 px-4 pb-2">
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="!mb-0 font-[500] text-[20px] flex gap-2 items-center ">
                  {user?.username}{" "}
                  <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                </p>
                <p className="!mb-0 font-[400] text-[12px] text-gray-500">
                  {user?.email}
                </p>
                <p className="!mb-0 pt-2 font-[400] text-[15px] text-gray-500">
                  5 Ngo Thi Nham, Dalat, Vietnam{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    Liên hệ
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 rounded-[20px] bg-[#1E90FF] text-[white] font-[500] ">
                  Chỉnh sửa trang cá nhân
                </button>
                <button className="px-4 py-2 rounded-[20px] border-[1px] border-[#1E90FF] text-[#1E90FF] font-[500] ">
                  Tải cv
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Activity */}
        <div
          className="w-full rounded-lg p-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
            {/* activity header */}
            <div className="justify-between items-center flex gap-2 w-full">
              <div className="flex flex-col gap-1 p-2">
                <span>
                  <p className="!mb-0 font-[500] text-[15px]">
                    Hoạt động của bạn
                  </p>
                  <p className="!mb-0 text-[13px] text-blue-600">
                    Tìm hiểu thêm
                  </p>
                </span>
              </div>
              <div className="flex gap-1 p-2 justify-center items-center">
                <button
                  onClick={() => setOpen1(!open1)}
                  className="px-4 py-2 rounded-[20px] bg-[#1E90FF] text-[white] font-[500] text-[14px]"
                >
                  Thêm trạng thái của bạn
                </button>
                {/* testinput */}
                {open1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setOpen1(!open1)}
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
                      className="md:w-[1000px] h-auto bg-white rounded-[10px] shadow-lg overflow-hidden   p-4"
                    >
                      <h2 className="text-xl font-bold mb-4">Thêm bài viết</h2>
                      <input
                        type="textArea"
                        name="statusPost"
                        placeholder="Nội dung bài viết"
                        value={formData1.statusPost}
                        onChange={handleChange1}
                        className="w-full p-2 border rounded mb-2"
                      />

                      <button
                        onClick={handleSave1}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleClear1}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Xóa tất cả
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                <PencilIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
              </div>
            </div>
            {/* list post */}
            <div
              className="p-2 flex md:flex-row flex-col max-h-[400px] overflow-y-auto gap-2 md:max-w-[1109px] md:overflow-x-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* post */}
              {statusList.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2  p-2 rounded-lg border-[1px] md:min-w-[500px] max-w-[500px]"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col ">
                      <p className="!mb-0 text-[14px] font-[500]">
                        {user?.username}
                      </p>
                      <p className="!mb-0 text-[14px] font-[500] text-gray-500">
                        vừa xong
                      </p>
                    </div>
                  </div>
                  {/* content post */}
                  <p className="p-2 !mb-0 w-full text-justify line-clamp-7">
                    {stat.statusPost}
                  </p>
                </div>
              ))}

              {/* post */}
              <div className="flex flex-col gap-2  p-2 rounded-lg border-[1px] md:min-w-[500px] max-w-[500px]">
                <div className="flex gap-2 items-center">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col ">
                    <p className="!mb-0 text-[14px] font-[500]">
                      {user?.username}
                    </p>
                    <p className="!mb-0 text-[14px] font-[500] text-gray-500">
                      2 ngày trước
                    </p>
                  </div>
                </div>
                {/* content post */}
                <p className="p-2 !mb-0 w-full text-justify line-clamp-7">
                  Tôi là Thái Phương, sinh viên ngành Công nghệ Thông tin tại
                  Trường Đại học Đà Lạt. Với niềm đam mê lập trình và phát triển
                  phần mềm, tôi luôn tìm kiếm cơ hội để học hỏi và trau dồi kỹ
                  năng. Tôi đã có kinh nghiệm thực tập tại Công ty XYZ, nơi tôi
                  làm việc với các công nghệ hiện đại và phát triển các ứng dụng
                  thực tế. Tôi mong muốn được làm việc trong môi trường chuyên
                  nghiệp, nơi tôi có thể đóng góp và phát triển sự nghiệp của
                  mình.
                </p>
              </div>

              {/* post */}
              <div className="flex flex-col gap-2  p-2 rounded-lg border-[1px] md:min-w-[500px] max-w-[500px]">
                <div className="flex gap-2 items-center">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col ">
                    <p className="!mb-0 text-[14px] font-[500]">
                      {user?.username}
                    </p>
                    <p className="!mb-0 text-[14px] font-[500] text-gray-500">
                      2 ngày trước
                    </p>
                  </div>
                </div>
                {/* content post */}
                <p className="p-2 !mb-0 w-full text-justify line-clamp-7">
                  Tôi là Thái Phương, sinh viên ngành Công nghệ Thông tin tại
                  Trường Đại học Đà Lạt. Với niềm đam mê lập trình và phát triển
                  phần mềm, tôi luôn tìm kiếm cơ hội để học hỏi và trau dồi kỹ
                  năng.
                </p>
              </div>
              {/* post */}
              <div className="flex flex-col gap-2  p-2 rounded-lg border-[1px] md:min-w-[500px] max-w-[500px]">
                <div className="flex gap-2 items-center">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col ">
                    <p className="!mb-0 text-[14px] font-[500]">
                      {user?.username}
                    </p>
                    <p className="!mb-0 text-[14px] font-[500] text-gray-500">
                      2 ngày trước
                    </p>
                  </div>
                </div>
                {/* content post */}
                <p className="p-2 !mb-0 w-full text-justify line-clamp-7">
                  Tôi là Thái Phương, sinh viên ngành Công nghệ Thông tin tại
                  Trường Đại học Đà Lạt. Với niềm đam mê lập trình và phát triển
                  phần mềm, tôi luôn tìm kiếm cơ hội để học hỏi và trau dồi kỹ
                  năng. Tôi đã có kinh nghiệm thực tập tại Công ty XYZ, nơi tôi
                  làm việc với các công nghệ hiện đại và phát triển các ứng dụng
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* experiecne */}
        <div
          className="w-full rounded-lg p-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
            {/* experiecne header */}
            <div className="  flex flex-col gap-1  w-full">
              <div className="flex  gap-2 p-2 justify-between items-center">
                <span>
                  <p className="!mb-0 font-[500] text-[15px]">
                    Kinh nghiệm của bạn
                  </p>
                  <p className="!mb-0 text-[13px] text-blue-600">
                    Tìm hiểu thêm
                  </p>
                </span>
                <div
                  onClick={() => setOpen(!open)}
                  className="flex gap-1 p-2 justify-center items-center"
                >
                  <PlusIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
                </div>
                {/* testinput */}
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
                      className="md:w-[1000px] h-auto bg-white rounded-[10px] shadow-lg overflow-hidden   p-4"
                    >
                      <h2 className="text-xl font-bold mb-4">
                        Thêm Kinh Nghiệm Làm Việc
                      </h2>
                      <input
                        type="text"
                        name="company"
                        placeholder="Tên công ty"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2"
                      />
                      <input
                        type="text"
                        name="position"
                        placeholder="Chức vụ"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2"
                      />
                      <input
                        type="text"
                        name="duration"
                        placeholder="Thời gian làm việc (VD: 2019-2025)"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2"
                      />
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleClear}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Xóa tất cả
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </div>
              {workList.map((work, index) => (
                <div key={index} className="p-2 flex gap-1 ">
                  <img
                    className="w-[40px] h-[40px] rounded-lg"
                    src="/src/assets/user/companies.png"
                    alt=""
                  />
                  <span className="!mb-0 flex flex-col justify-center ">
                    <p className="!mb-0 font-[600] text-[15px]">
                      {work.company}
                    </p>
                    <p className="!mb-0 font-[400] text-[12px] text-gray-400">
                      {work.position}
                    </p>
                    <p className="!mb-0 font-[600] text-[10px] text-gray-400">
                      {work.duration}
                    </p>
                  </span>
                </div>
              ))}
              <div className="p-2 flex gap-1 ">
                <img
                  className="w-[40px] h-[40px] rounded-lg"
                  src="/src/assets/user/companies.png"
                  alt=""
                />
                <span className="!mb-0 flex flex-col justify-center ">
                  <p className="!mb-0 font-[600] text-[15px]">LocMinh ielts</p>
                  <p className="!mb-0 font-[400] text-[12px] text-gray-400">
                    Ban quản lí và sáng tạo nội dung
                  </p>
                  <p className="!mb-0 font-[600] text-[10px] text-gray-400">
                    2019-2025
                  </p>
                </span>
              </div>
            </div>
            {/* list education */}
          </div>
        </div>
        {/* education */}
        <div
          className="w-full rounded-lg p-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
            {/* education header */}
            <div className="  flex flex-col gap-1  w-full">
              <div className="flex  gap-2 p-2 justify-between items-center">
                <span>
                  <p className="!mb-0 font-[500] text-[15px]">
                    Trình độ học vấn của bạn
                  </p>
                  <p className="!mb-0 text-[13px] text-blue-600">
                    Tìm hiểu thêm
                  </p>
                </span>
                <div className="flex gap-1 p-2 justify-center items-center">
                  <PlusIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
                </div>
              </div>
              <div className="p-2 flex gap-1 ">
                <img
                  className="w-[40px] h-[40px] rounded-lg"
                  src="/src/assets/user/school.png"
                  alt=""
                />
                <span className="!mb-0 flex flex-col justify-center ">
                  <p className="!mb-0 font-[600] text-[15px]">
                    Trường Đại Học Đà Lạt
                  </p>
                  <p className="!mb-0 font-[400] text-[12px] text-gray-400">
                    Chuyển ngành phần mềm, web-app
                  </p>
                  <p className="!mb-0 font-[600] text-[10px] text-gray-400">
                    2019-2025
                  </p>
                </span>
              </div>
            </div>
            {/* list education */}
          </div>
        </div>
        {/* skill */}
        <div
          className="w-full rounded-lg p-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="w-full flex flex-col  rounded-lg p-2 border-[2px] border-dashed ">
            {/* experiecne header */}
            <div className="  flex flex-col gap-1  w-full">
              <div className="flex  gap-2 p-2 justify-between items-center">
                <span>
                  <p className="!mb-0 font-[500] text-[15px]">
                    Kỹ năng của bạn
                  </p>
                  <p className="!mb-0 text-[13px] text-blue-600">
                    Tìm hiểu thêm
                  </p>
                </span>
                <div className="flex gap-1 p-2 justify-center items-center">
                  <PlusIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
                </div>
              </div>
              <p className="!mb-0 p-2 font-[500] text-[15px]">
                Font-end development
              </p>
              <p className="!mb-0 p-2 font-[500] text-[15px]">Designer</p>
            </div>
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="hidden md:flex flex-col md:flex-[3] gap-3  w-full rounded-lg">
        {/* 1st */}
        <div
          className="w-full rounded-lg max-h-fit p-4 flex flex-col gap-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <span className="flex justify-between items-center w-full">
            <p className="!mb-0 font-[500] text-[14px]">Liên kết mạng xã hội</p>
            <div className="flex gap-1 p-2 justify-center items-center">
              <PlusIcon className="w-5 h-5 p-[5px] rounded-full bg-[#1E90FF] text-white" />
            </div>
          </span>
          <p className="!mb-0 cursor-pointer">
            <FontAwesomeIcon icon={faGithub} />{" "}
            <span className="text-blue-400">https://github.com/Ouugii</span>
          </p>
          <p className="!mb-0 cursor-pointer">
            <FontAwesomeIcon icon={faFacebook} />{" "}
            <span className="text-blue-400">https://facebook.com/Ouugii</span>
          </p>
          <p className="!mb-0 cursor-pointer">
            <FontAwesomeIcon icon={faTwitter} />{" "}
            <span className="text-blue-400">https://x.com/Ouugii</span>
          </p>
        </div>
        {/* 2st */}
        <div
          className="w-full rounded-lg max-h-fit flex flex-col "
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <img
            src="/src/assets/user/group.jpg"
            alt=""
            className="w-full max-h-[250px] object-cover rounded-t-lg"
          />

          <div className="w-full p-3 flex flex-col gap-2">
            <p className="!mb-0 text-[18px] font-[500]">
              Cùng khám phá những người "đồng nghiệp" khác.
            </p>
            <p className="text-[14px] text-gray-500">
              Nền tảng được tạo ra không chỉ giúp bạn tìm kiếm việc làm mà còn
              có thể kết nối với những người khác, thông qua đó trao đổi và trau
              dồi thêm kinh nghiệm để có thể hoàn thiện bản thân nhé!
            </p>
          </div>
        </div>
        <div
          className="w-full rounded-lg max-h-fit flex flex-col "
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <p className="!mb-0 font-[500] text-[14px] p-4">
            Những người bạn có thế biêt
          </p>
          {/* people */}
          <div
            className="px-4 pb-4 flex flex-col gap-2  items-center max-h-[520px] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* people item */}
            {peopleNear?.map((item) => (
              <div
                onClick={() => navigate(`/user/profile-user`)}
                className="cursor-pointer flex justify-between items-center w-full pb-2 border-b-[1px] border-gray-300"
              >
                <div className="flex gap-2 items-center">
                  {" "}
                  <img
                    src={item.src}
                    alt=""
                    className="w-[60px] h-[60px] object-cover rounded-full"
                  />
                  <span className="flex flex-col gap-1">
                    <p className="!mb-0 text-[14px] font-[500]">{item.name}</p>
                    <p className="!mb-0 text-[10px] text-gray-600">
                      {item.email}
                    </p>
                  </span>
                </div>
                <TagIcon className="w-5 h-5 text-green-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
