import React from "react";
import withLayout from "../layout/withLayout";
const BlogDetail = () => {
  return (
    <div>
      {" "}
      <div className="container w-full !max-w-[1200px] p-[10px]  py-2">
        <div className="flex flex-col gap-4 items-center">
          <span className="flex gap-2 w-full items-center justify-center">
            <p className="!mb-0 rounded-full text-white px-2 py-1 bg-gray-400 text-[15px]">
              Bài đăng mới
            </p>
            <p className="!mb-0 text-[15px]">20 Tháng 1, 2025</p>
          </span>
          <h2 className="text-[30px]">Cách phát hiện gian lận tuyển dụng</h2>
          <p className="!mb-0 text-sm text-gray-500">
            Trong thời đại số hóa, gian lận tuyển dụng ngày càng trở nên tinh
            vi, gây ảnh hưởng lớn đến ứng viên và doanh nghiệp. Dưới đây là một
            số dấu hiệu nhận biết và cách phòng tránh để bảo vệ bản thân khỏi
            các chiêu trò lừa đảo tuyển dụng.Nếu nhà tuyển dụng yêu cầu bạn đóng
            một khoản tiền để xét duyệt hồ sơ, đào tạo, hoặc đảm bảo vị trí làm
            việc, rất có thể đây là một trò lừa đảo. Các công ty uy tín không
            bao giờ yêu cầu ứng viên trả tiền khi ứng tuyển.
          </p>
          <img
            className="h-[400px] w-full object-cover"
            src="/src/assets/home/artical.jpg"
            alt=""
          />
          <span className="w-full">
            <h2 className="text-[20px]">
              Mô tả công việc quá chung chung hoặc hứa hẹn thu nhập "khủng"
            </h2>
            <p className="!mb-1 text-sm text-gray-500">
              Một trong những dấu hiệu dễ nhận biết nhất là khi nhà tuyển dụng
              yêu cầu ứng viên nộp phí trước khi nhận việc. Điều này thường được
              ngụy trang dưới nhiều hình thức như phí xét duyệt hồ sơ, phí đào
              tạo, tiền đặt cọc để giữ chỗ hoặc phí mua đồng phục. Trên thực tế,
              những công ty uy tín không bao giờ yêu cầu ứng viên trả bất kỳ
              khoản tiền nào trong quá trình tuyển dụng. Những lời hứa như "chỉ
              cần đóng một khoản nhỏ là có thể nhận việc ngay" thường chỉ là bẫy
              để lấy tiền của những người nhẹ dạ cả tin. Khi gặp trường hợp này,
              tốt nhất là bạn nên đặt nghi vấn và tìm hiểu kỹ trước khi quyết
              định.
            </p>
            <p className="!mb-0 text-sm text-gray-500">
              Một yếu tố khác cần chú ý là mức lương và đãi ngộ không thực tế.
              Nếu một công việc đăng tuyển mà không yêu cầu kinh nghiệm nhưng
              lại hứa hẹn thu nhập cao bất thường, hãy cân nhắc. Ví dụ, những
              tin tuyển dụng kiểu "Chỉ cần làm việc 2-3 giờ/ngày, lương 50
              triệu/tháng, không yêu cầu kỹ năng" thường là dấu hiệu của lừa
              đảo. Những công việc thực tế luôn có yêu cầu rõ ràng về trình độ
              và trách nhiệm cụ thể. Nếu mức lương và quyền lợi vượt xa so với
              mặt bằng chung mà không có lý do hợp lý, rất có thể đây là một
              hình thức lừa đảo nhằm thu hút sự quan tâm của ứng viên nhẹ dạ.
            </p>
          </span>
          <span className="w-full">
            <h2 className="text-[20px]">
              Ngoài ra, bạn cũng nên kiểm tra kỹ thông tin của công ty trước khi
              ứng tuyển.
            </h2>
            <p className="!mb-1 text-sm text-gray-500">
              Một trong những dấu hiệu dễ nhận biết nhất là khi nhà tuyển dụng
              yêu cầu ứng viên nộp phí trước khi nhận việc. Điều này thường được
              ngụy trang dưới nhiều hình thức như phí xét duyệt hồ sơ, phí đào
              tạo, tiền đặt cọc để giữ chỗ hoặc phí mua đồng phục. Trên thực tế,
              những công ty uy tín không bao giờ yêu cầu ứng viên trả bất kỳ
              khoản tiền nào trong quá trình tuyển dụng. Những lời hứa như "chỉ
              cần đóng một khoản nhỏ là có thể nhận việc ngay" thường chỉ là bẫy
              để lấy tiền của những người nhẹ dạ cả tin. Khi gặp trường hợp này,
              tốt nhất là bạn nên đặt nghi vấn và tìm hiểu kỹ trước khi quyết
              định.
            </p>
            <p className="!mb-0 text-sm text-gray-500">
              Một yếu tố khác cần chú ý là mức lương và đãi ngộ không thực tế.
              Nếu một công việc đăng tuyển mà không yêu cầu kinh nghiệm nhưng
              lại hứa hẹn thu nhập cao bất thường, hãy cân nhắc. Ví dụ, những
              tin tuyển dụng kiểu "Chỉ cần làm việc 2-3 giờ/ngày, lương 50
              triệu/tháng, không yêu cầu kỹ năng" thường là dấu hiệu của lừa
              đảo. Những công việc thực tế luôn có yêu cầu rõ ràng về trình độ
              và trách nhiệm cụ thể. Nếu mức lương và quyền lợi vượt xa so với
              mặt bằng chung mà không có lý do hợp lý, rất có thể đây là một
              hình thức lừa đảo nhằm thu hút sự quan tâm của ứng viên nhẹ dạ.
            </p>
          </span>
          <span className="w-full">
            <h2 className="text-[20px]">
              Một yếu tố khác cần chú ý là mức lương và đãi ngộ không thực tế
            </h2>
            <p className="!mb-1 text-sm text-gray-500">
              Một trong những dấu hiệu dễ nhận biết nhất là khi nhà tuyển dụng
              yêu cầu ứng viên nộp phí trước khi nhận việc. Điều này thường được
              ngụy trang dưới nhiều hình thức như phí xét duyệt hồ sơ, phí đào
              tạo, tiền đặt cọc để giữ chỗ hoặc phí mua đồng phục. Trên thực tế,
              những công ty uy tín không bao giờ yêu cầu ứng viên trả bất kỳ
              khoản tiền nào trong quá trình tuyển dụng. Những lời hứa như "chỉ
              cần đóng một khoản nhỏ là có thể nhận việc ngay" thường chỉ là bẫy
              để lấy tiền của những người nhẹ dạ cả tin. Khi gặp trường hợp này,
              tốt nhất là bạn nên đặt nghi vấn và tìm hiểu kỹ trước khi quyết
              định.
            </p>
            <p className="!mb-0 text-sm text-gray-500">
              Một yếu tố khác cần chú ý là mức lương và đãi ngộ không thực tế.
              Nếu một công việc đăng tuyển mà không yêu cầu kinh nghiệm nhưng
              lại hứa hẹn thu nhập cao bất thường, hãy cân nhắc. Ví dụ, những
              tin tuyển dụng kiểu "Chỉ cần làm việc 2-3 giờ/ngày, lương 50
              triệu/tháng, không yêu cầu kỹ năng" thường là dấu hiệu của lừa
              đảo. Những công việc thực tế luôn có yêu cầu rõ ràng về trình độ
              và trách nhiệm cụ thể. Nếu mức lương và quyền lợi vượt xa so với
              mặt bằng chung mà không có lý do hợp lý, rất có thể đây là một
              hình thức lừa đảo nhằm thu hút sự quan tâm của ứng viên nhẹ dạ.
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default withLayout(BlogDetail);
