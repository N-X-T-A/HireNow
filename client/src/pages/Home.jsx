import React from "react";
import Header from "../components/header/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  return (
    <div>
      <Header />
      <div className="container w-full !max-w-[1700px] p-[10px]  py-8">
        <div className="w-full  bg-white flex rounded-[10px] gap-2">
          <div
            className="respon-l flex-1 max-w-[800px] w-full rounded-[10px] "
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="relative">
              <img
                loading="lazy"
                className="w-full  max-h-[750px] object-cover rounded-[10px]"
                src="/src/assets/home/frame.webp"
                alt=""
              />
            </div>
          </div>
          <div
            className="respon-m flex-1 max-w-[370px] w-full p-[10px] rounded-[10px]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="flex flex-col w-full h-full items-center justify-items-center justify-between">
              <div className="w-full flex justify-between px-[25px]">
                <div>
                  <p className="!m-0 text-[20px] font-[700]">Service</p>
                  <p className="!m-0 text-[18px] font-[600] decoration-solid underline decoration-solid">
                    FAQS
                  </p>
                </div>
                <div>
                  <img
                    className="max-w-28 w-full "
                    src="/src/assets/home/logo.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full px-[25px]">
                <div>
                  <p className="!m-0 text-[50px] font-[700]">chuyển đổi</p>
                  <p className="!m-0 text-[40px] font-[400]">trải nghiệm</p>
                  <p className="!m-0 text-[35px] font-[400]">
                    tìm kiếm việc làm.
                  </p>
                  <p className="!m-0 text-[15px] font-[400] pt-[10px]">
                    khám phá cơ sở dữ liệu việc làm rộng lớn từ các công ty hàng
                    đầu
                  </p>
                  <button className="mt-[10px] w-[70%] h-[45px] rounded-[10px] px-[20px] py-[10px] bg-[#1E90FF] text-white cursor-pointer  transition ease-in-out duration-300 hover:bg-[black]">
                    Lấy chỗ trống ngay
                  </button>
                </div>
              </div>
              <div className="w-full px-[25px] mb-[20px]">
                <p className="!m-0 text-[15px] font-[400]">
                  Kết nối với chúng tôi:
                </p>
                <div className="flex gap-3 text-[30px] pt-[10px]">
                  <FontAwesomeIcon icon={faFacebook} />
                  <FontAwesomeIcon icon={faInstagram} />
                  <FontAwesomeIcon icon={faTwitter} />
                </div>
              </div>
            </div>
          </div>
          <div className="respon-m flex-1 w-full max-h-[750px] rounded-[10px]">
            <div className="flex flex-col w-full h-full items-center gap-2">
              {/* Hình ảnh đầu tiên */}
              <motion.div
                layoutId="article-card"
                onClick={() => setOpen(true)}
                className="card w-full rounded-[10px] relative overflow-hidden cursor-pointer"
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                <motion.img
                  layoutId="article-image"
                  className="w-full min-h-[375px] object-cover rounded-[10px]"
                  src="/src/assets/home/tartical.webp"
                  alt="Tuyển dụng nhân sự"
                />
                <motion.p
                  layoutId="article-text"
                  className="!mb-0 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-[20px] w-full text-white"
                >
                  Việc tuyển dụng nhân sự chất lượng là một yếu tố quyết định
                  đến sự thành công của dự án
                </motion.p>
              </motion.div>

              {/* Modal hiển thị khi nhấn vào */}
              {open && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center bg-black/70 z-[999] w-full h-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setOpen(false)}
                >
                  <div className="w-[1000px] h-[80%] bg-black rounded-[10px] shadow-lg overflow-hidden">
                    <motion.img
                      layoutId="article-image"
                      src="/src/assets/home/tartical.webp"
                      className="w-full max-h-[300px] object-cover rounded-t-[10px]"
                    />
                    <motion.p
                      layoutId="article-text"
                      className="text-white text-[30px] p-[10px]"
                    >
                      Việc tuyển dụng nhân sự chất lượng là một yếu tố quyết
                      định đến sự thành công của dự án
                    </motion.p>
                    <div
                      className="text-white text-[15px] p-[10px] max-h-[300px] overflow-y-auto"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      Việc tuyển dụng nhân sự chất lượng là một trong những yếu
                      tố quan trọng quyết định đến sự thành công và phát triển
                      bền vững của doanh nghiệp. Một đội ngũ nhân sự giỏi không
                      chỉ giúp công ty duy trì và nâng cao năng suất làm việc mà
                      còn đóng vai trò quan trọng trong việc đổi mới, sáng tạo
                      và tạo ra lợi thế cạnh tranh trên thị trường. Quá trình
                      tuyển dụng không chỉ đơn giản là tìm kiếm ứng viên có năng
                      lực chuyên môn cao, mà còn phải đảm bảo sự phù hợp giữa
                      ứng viên với văn hóa doanh nghiệp, tầm nhìn, sứ mệnh và
                      giá trị cốt lõi của tổ chức. Những nhân sự phù hợp không
                      chỉ đóng góp vào hiệu suất công việc mà còn giúp xây dựng
                      môi trường làm việc chuyên nghiệp, đoàn kết và hiệu quả,
                      từ đó thúc đẩy tinh thần làm việc của toàn bộ đội ngũ. Một
                      chiến lược tuyển dụng hiệu quả không chỉ dựa vào việc đánh
                      giá năng lực qua bằng cấp hay kinh nghiệm làm việc, mà còn
                      phải xem xét các kỹ năng mềm, khả năng thích nghi với môi
                      trường mới và tinh thần làm việc nhóm của ứng viên. Các
                      công ty hàng đầu hiện nay đều tập trung vào việc xây dựng
                      quy trình tuyển dụng chuyên nghiệp, ứng dụng công nghệ AI
                      để sàng lọc hồ sơ, đánh giá kỹ năng thực tế thông qua các
                      bài kiểm tra chuyên sâu, phỏng vấn đa giai đoạn để đảm bảo
                      lựa chọn được những nhân sự thực sự phù hợp. Bên cạnh đó,
                      việc tuyển dụng nhân sự chất lượng không chỉ dừng lại ở
                      quá trình tuyển chọn mà còn liên quan mật thiết đến việc
                      đào tạo, phát triển và giữ chân nhân tài. Một môi trường
                      làm việc tốt, chính sách đãi ngộ hợp lý, lộ trình thăng
                      tiến rõ ràng sẽ là những yếu tố then chốt giúp doanh
                      nghiệp giữ chân được những nhân viên giỏi, hạn chế tình
                      trạng thay đổi nhân sự liên tục gây ảnh hưởng đến hoạt
                      động kinh doanh. Cuối cùng, tuyển dụng không phải là một
                      quá trình đơn lẻ mà là một phần quan trọng trong chiến
                      lược phát triển dài hạn của doanh nghiệp. Một doanh nghiệp
                      muốn thành công cần có tầm nhìn xa, không chỉ tập trung
                      vào tuyển dụng mà còn phải đầu tư vào phát triển nhân tài,
                      tạo điều kiện để nhân viên phát huy hết tiềm năng của
                      mình. Chỉ khi sở hữu một đội ngũ nhân sự chất lượng, doanh
                      nghiệp mới có thể đạt được những mục tiêu lớn, khẳng định
                      vị thế của mình trên thị trường và tiến xa hơn trong tương
                      lai.
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Hình ảnh thứ hai */}
              <div
                className="w-full rounded-[10px] relative overflow-hidden"
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                <img
                  className="w-full max-h-[375px] object-cover rounded-[10px]"
                  src="/src/assets/home/tarnical2.jpg"
                  alt="Hình ảnh tuyển dụng"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
