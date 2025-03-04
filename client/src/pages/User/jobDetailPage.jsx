import React from "react";
import {
  MapPinIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
const JobDetailPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-[#f5f5f5]">
      <div className="flex flex-col justify-center items-center relative w-full">
        <img
          className="max-h-[300px] w-full object-cover"
          src="/src/assets/user/21501.jpg"
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
              src="/src/assets/user/google.png"
              alt=""
            />
            <div className=" flex flex-col gap-2">
              <p className="hidden md:block !mb-0 font-[500]">
                Công ty Công nghệ đa quốc gia Google
              </p>
              <p className="!mb-0 text-[15px] md:text-[30px] font-[500]">
                Google Dev. Backend
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <button className="px-4 py-2 w-full rounded-lg bg-[#1E90FF] text-white font-[500]">
              Ứng tuyển ngay
            </button>
            <div className="hidden md:flex gap-2 justify-center items-center">
              <button className="rounded-lg border-[#1E90FF] border-[2px] text-[13.32px] text-[black] font-[500] flex-[3_1_1] px-4 py-2">
                Tạo CV ngay
              </button>
              <button className=" rounded-lg border-[#1E90FF] border-[2px]  px-4 py-2">
                <BookmarkIcon className="w-[20px] h-[20px]" />
              </button>
              <button className="rounded-lg border-[#1E90FF] border-[2px]  px-4 py-2">
                <ShareIcon className="w-[20px] h-[20px]" />
              </button>
            </div>
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
              Lập trình viên backend tại Google sẽ chịu trách nhiệm thiết kế,
              phát triển và duy trì các hệ thống backend có hiệu suất cao, đảm
              bảo khả năng mở rộng và ổn định của dịch vụ. Công việc bao gồm xây
              dựng API RESTful và GraphQL để kết nối với frontend và các dịch vụ
              khác trong hệ thống, tối ưu hóa hiệu suất, giảm thời gian phản hồi
              và cải thiện trải nghiệm người dùng. Người đảm nhiệm vai trò này
              sẽ triển khai và quản lý hệ thống trên nền tảng cloud như Google
              Cloud Platform, sử dụng Docker và Kubernetes, đồng thời đảm bảo
              tính bảo mật và an toàn dữ liệu thông qua việc thực hiện các biện
              pháp chống tấn công bảo mật như SQL Injection, XSS, CSRF. Ngoài
              ra, lập trình viên backend cần hợp tác chặt chẽ với các nhóm sản
              phẩm, QA và frontend để đảm bảo tính đồng bộ và hiệu quả của hệ
              thống, theo dõi logs và xử lý lỗi để duy trì sự ổn định.
            </p>
          </div>
          {/* description */}
          <div className="flex flex-col gap-1">
            <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
              Trách nhiệm trong công việc
            </p>
            <ul className="list-disc list-inside p-4 rounded-lg bg-white text-justify space-y-3">
              <li>Xây dựng, phát triển phần mềm/ứng dụng</li>
              <li>
                Tiếp nhận yêu cầu về chức năng, nội dung của phần mềm/ứng dụng.
                Tham gia phân tích, thiết kế chi tiết các chức năng được giao
              </li>
              <li>
                Trực tiếp xây dựng, phát triển phần mềm/ứng dụng theo tài liệu
                thiết kế và framework đã được thông qua theo phân công của
                trưởng nhóm/PM dự án
              </li>
              <li>
                Làm Unit Test, tiếp nhận ý kiến của bộ phận kiểm thử, liên quan
                khác để điều chỉnh, bổ sung đến khi phần mềm/ứng dụng được hoàn
                thiện
              </li>
              <li>
                Giám sát và kiểm tra hệ thống và các thành phần liên quan để
                phát hiện các sự cố tiềm ấn, đưa ra giải pháp kịp thời để ngăn
                chặn và xử lý. Tối ưu hệ thống.
              </li>
              <li>
                Xây dựng các tài liệu dự án theo phân công của Trưởng nhóm/PM dự
                án
              </li>
              <li>Sửa chữa, nâng cấp, bảo trì phần mềm</li>
              <li>Tích hợp, triển khai phần mềm/ứng dụng</li>
              <li>Các công việc khác</li>
            </ul>
          </div>
          {/* requirement */}
          <div className="flex flex-col gap-1">
            <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
              Yêu cầu công việc
            </p>
            <ul className="list-disc list-inside p-4 rounded-lg bg-white text-justify space-y-3">
              <li>Dưới 40 tuổi</li>
              <li>Tốt nghiệp CĐ/ĐH</li>
              <li className="font-bold">Nhân sự Backend: Dev Java Backend</li>
              <li>
                Tối thiểu 1 năm kinh nghiệm phát triển thực tế với Java và các
                framework (Spring Framework, Spring Boot)
              </li>
              <li>
                Kiến thức tốt về Cấu trúc Dữ liệu và Thuật toán; Chuyên môn về
                Cơ sở dữ liệu SQL / NoSQL (Oracle, MongoDB); Kinh nghiệm với các
                API RESTful, Microservices
              </li>
              <li className="font-bold">
                Nhân sự Frontend: Dev Angular Frontend
              </li>
              <li>
                Tối thiểu 1 năm kinh nghiệm làm việc với framework JS/UI –
                Angular;
              </li>
              <li>Tích hợp, triển khai phần mềm/ứng dụng</li>
            </ul>
          </div>
          {/* benefit */}
          <div className="flex flex-col gap-1">
            <p className="!mb-0 text-[20px] font-[500] text-[#1E90FF]">
              Lợi ích công việc
            </p>
            <ul className="list-disc list-inside p-4 rounded-lg bg-white text-justify space-y-3">
              <li>Thu nhập từ 200 - 500 triệu/năm</li>
              <li>Teambuilding, nghỉ mát hàng năm....</li>

              <li>Phụ cấp điện thoại, Bảo hiểm XH, BHYT....</li>
              <li>Phụ cấp ăn trưa 730.000đ/tháng</li>
              <li className="font-bold">
                Tham gia các chương trình đào tạo nâng cao chuyên môn, nghiệp vụ
                định kỳ
              </li>
              <li>Khám sức khỏe hàng năm</li>
              <li>Thời gian làm việc: Thứ 2 - thứ 6, 8h00 - 17h00</li>
            </ul>
          </div>
        </div>
        {/* right section */}
        <div className="hidden  md:flex flex-col gap-4 md:flex-[3] p-2">
          {/* right 1st */}
          <div className="flex flex-col gap-2 w-full p-4 rounded-lg bg-[white]">
            <div className="flex  items-center gap-2">
              <img
                className="max-w-[30px] md:max-w-[90px] rounded-lg border-[1px]"
                src="/src/assets/user/google.png"
                alt=""
              />
              <div>
                <p className="!mb-0 text-[20px]">Google .etc</p>
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
                Quốc gia <span className="font-[500]  text-end">Việt Nam</span>
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
              Các thành viên cao cấp có khả năng được tuyển dụng cao hơn tới 2,6
              lần. Thêm vào đó! Đi trước với quyền truy cập độc quyền vào các
              nhà lãnh đạo doanh nghiệp có ảnh hưởng.
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
              1 tháng miễn phí với hỗ trợ 24/7. Hủy bất cứ lúc nào. Chúng tôi sẽ
              nhắc bạn 7 ngày trước khi thời gian dùng thử của bạn kết thúc
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
