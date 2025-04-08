import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white flex flex-col  gap-5 mt-[100px] items-center justify-items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center justify-items-center justify-center gap-2"
      >
        <p className="!mb-0 text-[15px] font-[400] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
          Góc nhìn và lời khuyên
        </p>
        <h1 className="!mb-0 text-[45px] font-[500] max-w-[950px] text-center">
          Tìm lời khuyên của chuyên gia và hiểu biết sâu sắc về tăng trưởng trên
          blog của chúng tôi
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full flex items-center justify-items-center  justify-between "
      >
        <div className="flex gap-2">
          <button className="relative px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]  overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]  hover:border-black">
            <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Tất cả các bài viết
            </span>
          </button>
          <button className="relative px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]  overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]  hover:border-black">
            <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Bài viết mới nhất
            </span>
          </button>
          <button className="relative px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]  overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px] hover:border-black">
            <span className="absolute inset-0 bg-white border-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Các bài phỏng vấn
            </span>
          </button>
        </div>
        <button
          onClick={() => navigate("/blogs")}
          className="px-[20px] py-[10px] border-2 bg-black text-white rounded-[20px]"
        >
          Xem thêm <FontAwesomeIcon icon={faCircleRight} />
        </button>
      </motion.div>
      <div className="w-full flex flex-row gap-4 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 max-h-[800px] flex flex-col gap-3"
        >
          <img
            className="w-full rounded-[10px]"
            src="/src/assets/home/artical.jpg"
            alt=""
          />
          <p className="!mb-0 text-[30px] font-[600]">
            Cách phát hiện gian lận tuyển dụng.
          </p>
          <p className="!mb-0 text-[15px] font-[400] text-gray-400 line-clamp-4">
            Phát hiện gian lận trong tuyển dụng là một vấn đề quan trọng để bảo
            vệ ứng viên cũng như doanh nghiệp. Dưới đây là một số cách để nhận
            biết và phòng tránh gian lận trong tuyển dụng. Phát hiện gian lận
            trong tuyển dụng là một vấn đề quan trọng để bảo vệ ứng viên cũng
            như doanh nghiệp. Dưới đây là một số cách để nhận biết và phòng
            tránh gian lận trong tuyển dụng. Phát hiện gian lận trong tuyển dụng
            là một vấn đề quan trọng để bảo vệ ứng viên cũng như doanh nghiệp.
            Dưới đây là một số cách để nhận biết và phòng tránh gian lận trong
            tuyển dụng
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex flex-col gap-2 max-h-[530px] overflow-y-auto text-justify"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical1.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Công nghệ AI phát triển mạnh mẽ, mở ra kỷ nguyên tự động hóa mới
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Trí tuệ nhân tạo (AI) đang thay đổi cách con người làm việc và
                sinh hoạt hàng ngày. Các hệ thống tự động hóa thông minh đang
                được triển khai rộng rãi trong nhiều lĩnh vực như y tế, tài
                chính, và sản xuất. Nhiều công ty công nghệ lớn đang đầu tư mạnh
                vào AI để cải thiện hiệu suất và tối ưu hóa quy trình vận hành.
                Tuy nhiên, các chuyên gia cũng cảnh báo về những thách thức liên
                quan đến đạo đức và bảo mật dữ liệu khi AI ngày càng trở nên
                mạnh mẽ.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc 500 53{" "}
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical2.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Thị trường chứng khoán biến động, nhà đầu tư cần thận trọng
                trong tuần tới
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Trong tuần qua, thị trường chứng khoán toàn cầu đã chứng kiến
                những biến động mạnh do ảnh hưởng từ tình hình kinh tế và chính
                trị. Nhiều nhà đầu tư lo ngại trước các chính sách điều hành lãi
                suất mới từ các ngân hàng trung ương. Các chuyên gia tài chính
                khuyến nghị nhà đầu tư nên đa dạng hóa danh mục đầu tư và theo
                dõi sát sao các chỉ số quan trọng. Dự báo trong tuần tới, thị
                trường có thể tiếp tục dao động mạnh, đặc biệt là ở nhóm cổ
                phiếu công nghệ và năng lượng.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc 500 53{" "}
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical3.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Ứng dụng tìm việc làm trực tuyến giúp hàng triệu người tiếp cận
                cơ hội mới
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Sự phát triển của các nền tảng tuyển dụng trực tuyến đã giúp
                hàng triệu người dễ dàng tiếp cận với những cơ hội việc làm phù
                hợp. Các công ty ngày càng sử dụng AI để phân tích hồ sơ ứng
                viên và đề xuất những công việc phù hợp dựa trên kỹ năng. Đặc
                biệt, nhiều nền tảng còn tích hợp các khóa học nâng cao kỹ năng,
                giúp ứng viên tăng cơ hội trúng tuyển. Tuy nhiên, người tìm việc
                cũng cần cẩn trọng với các tin tuyển dụng giả mạo để tránh bị
                lừa đảo.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc 500 53{" "}
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical1.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Startup công nghệ Việt Nam gọi vốn thành công 10 triệu USD từ
                quỹ đầu tư quốc tế
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Một startup công nghệ tại Việt Nam vừa công bố thành công trong
                vòng gọi vốn Series A với số tiền lên đến 10 triệu USD. Công ty
                này chuyên về phát triển nền tảng trí tuệ nhân tạo hỗ trợ doanh
                nghiệp tự động hóa quy trình vận hành. Nhà đầu tư đánh giá cao
                tiềm năng của dự án và cam kết hỗ trợ startup trong việc mở rộng
                thị trường quốc tế. Sự kiện này đánh dấu một bước tiến quan
                trọng trong việc khẳng định vị thế của các công ty công nghệ
                Việt Nam trên bản đồ thế giới.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc 500 53{" "}
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical2.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Startup công nghệ Việt Nam gọi vốn thành công 10 triệu USD từ
                quỹ đầu tư quốc tế
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Một startup công nghệ tại Việt Nam vừa công bố thành công trong
                vòng gọi vốn Series A với số tiền lên đến 10 triệu USD. Công ty
                này chuyên về phát triển nền tảng trí tuệ nhân tạo hỗ trợ doanh
                nghiệp tự động hóa quy trình vận hành. Nhà đầu tư đánh giá cao
                tiềm năng của dự án và cam kết hỗ trợ startup trong việc mở rộng
                thị trường quốc tế. Sự kiện này đánh dấu một bước tiến quan
                trọng trong việc khẳng định vị thế của các công ty công nghệ
                Việt Nam trên bản đồ thế giới.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex flex-col gap-2 max-h-[530px] overflow-y-auto text-justify"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical1.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Công nghệ AI phát triển mạnh mẽ, mở ra kỷ nguyên tự động hóa mới
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Trí tuệ nhân tạo (AI) đang thay đổi cách con người làm việc và
                sinh hoạt hàng ngày. Các hệ thống tự động hóa thông minh đang
                được triển khai rộng rãi trong nhiều lĩnh vực như y tế, tài
                chính, và sản xuất. Nhiều công ty công nghệ lớn đang đầu tư mạnh
                vào AI để cải thiện hiệu suất và tối ưu hóa quy trình vận hành.
                Tuy nhiên, các chuyên gia cũng cảnh báo về những thách thức liên
                quan đến đạo đức và bảo mật dữ liệu khi AI ngày càng trở nên
                mạnh mẽ.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc 500 53{" "}
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical2.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Thị trường chứng khoán biến động, nhà đầu tư cần thận trọng
                trong tuần tới
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Trong tuần qua, thị trường chứng khoán toàn cầu đã chứng kiến
                những biến động mạnh do ảnh hưởng từ tình hình kinh tế và chính
                trị. Nhiều nhà đầu tư lo ngại trước các chính sách điều hành lãi
                suất mới từ các ngân hàng trung ương. Các chuyên gia tài chính
                khuyến nghị nhà đầu tư nên đa dạng hóa danh mục đầu tư và theo
                dõi sát sao các chỉ số quan trọng. Dự báo trong tuần tới, thị
                trường có thể tiếp tục dao động mạnh, đặc biệt là ở nhóm cổ
                phiếu công nghệ và năng lượng.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc 500 53{" "}
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical3.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Ứng dụng tìm việc làm trực tuyến giúp hàng triệu người tiếp cận
                cơ hội mới
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Sự phát triển của các nền tảng tuyển dụng trực tuyến đã giúp
                hàng triệu người dễ dàng tiếp cận với những cơ hội việc làm phù
                hợp. Các công ty ngày càng sử dụng AI để phân tích hồ sơ ứng
                viên và đề xuất những công việc phù hợp dựa trên kỹ năng. Đặc
                biệt, nhiều nền tảng còn tích hợp các khóa học nâng cao kỹ năng,
                giúp ứng viên tăng cơ hội trúng tuyển. Tuy nhiên, người tìm việc
                cũng cần cẩn trọng với các tin tuyển dụng giả mạo để tránh bị
                lừa đảo.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc 500 53{" "}
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical1.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Startup công nghệ Việt Nam gọi vốn thành công 10 triệu USD từ
                quỹ đầu tư quốc tế
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Một startup công nghệ tại Việt Nam vừa công bố thành công trong
                vòng gọi vốn Series A với số tiền lên đến 10 triệu USD. Công ty
                này chuyên về phát triển nền tảng trí tuệ nhân tạo hỗ trợ doanh
                nghiệp tự động hóa quy trình vận hành. Nhà đầu tư đánh giá cao
                tiềm năng của dự án và cam kết hỗ trợ startup trong việc mở rộng
                thị trường quốc tế. Sự kiện này đánh dấu một bước tiến quan
                trọng trong việc khẳng định vị thế của các công ty công nghệ
                Việt Nam trên bản đồ thế giới.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc 500 53{" "}
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex gap-2"
          >
            <img
              className="w-full max-w-[170px] max-h-[170px] object-cover rounded-[30px]"
              src="/src/assets/home/artical2.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="!mb-0 text-[20px] font-[400]">
                Startup công nghệ Việt Nam gọi vốn thành công 10 triệu USD từ
                quỹ đầu tư quốc tế
              </p>
              <p className="!mb-0 text-[12px] font-[400] text-gray-400 line-clamp-3">
                Một startup công nghệ tại Việt Nam vừa công bố thành công trong
                vòng gọi vốn Series A với số tiền lên đến 10 triệu USD. Công ty
                này chuyên về phát triển nền tảng trí tuệ nhân tạo hỗ trợ doanh
                nghiệp tự động hóa quy trình vận hành. Nhà đầu tư đánh giá cao
                tiềm năng của dự án và cam kết hỗ trợ startup trong việc mở rộng
                thị trường quốc tế. Sự kiện này đánh dấu một bước tiến quan
                trọng trong việc khẳng định vị thế của các công ty công nghệ
                Việt Nam trên bản đồ thế giới.
              </p>
              <div className="flex justify-between">
                <p className="!mb-0 text-[15px] font-[400] text-gray-400">
                  2 phút đọc
                </p>
                <p>12/2/2025</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
