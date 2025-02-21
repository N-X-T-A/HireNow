import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
const Sub1 = () => {
  const sliderData = [
    { src: "/src/assets/home/asian.webp", label: "Nhân lực" },
    { src: "/src/assets/home/high.webp", label: "Nhân lực" },
    { src: "/src/assets/home/porttrail.webp", label: "Nhân lực" },
    ,
  ];
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <div className="w-full bg-white flex flex-col  gap-2 mt-[100px] items-center justify-items-center justify-center">
      <div className="w-[60%] flex flex-col gap-[20px] items-center justify-items-center justify-between">
        <p className="!mb-0 text-[40px] font-[700] text-center">
          HireNow đã được xây dựng như thế nào?
        </p>
        <p className="!mb-0 text-[15px] font-[300] text-center">
          chúng tôi hiện thực hóa những ý tưởng bằng cách kết hợp nhiều năm kinh
          nghiệm của đội ngũ tài năng của chúng tôi.
        </p>
        <div className="flex items-center justify-items-center justify-center gap-3">
          <button className="transition ease-in-out duration-300 transform hover:-translate-y-[5px] flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] bg-black rounded-[20px] text-white">
            Tìm công việc <FontAwesomeIcon icon={faCircleRight} />
          </button>
          <button className="transition ease-in-out duration-300 transform hover:-translate-y-[5px] flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] border-2 rounded-[20px] text-black">
            Liên hệ ngay <FontAwesomeIcon icon={faCircleRight} />
          </button>
        </div>
      </div>
      <div className="relative w-full mt-[30px]">
        <img
          className=" w-full object-cover rounded-[30px]"
          src="/src/assets/home/Frame.png"
          alt=""
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        />
        <div className="absolute inset-0 w-[700px] bg-gradient-to-r from-black to-transparent rounded-[30px]"></div>
        <button className="bg-gradient-to-r from-gray-200 to-white absolute top-4 left-6 flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] rounded-[20px] text-black">
          <span className="px-[15px] py-[3px] bg-white text-black rounded-[20px] font-[500]">
            Event
          </span>
          <span>Tìm kiếm ứng cử viên</span>
          <FontAwesomeIcon icon={faCircleRight} />
        </button>
        <div className="absolute bottom-[20%] left-6 flex flex-col gap-2 max-w-[600px]">
          <p className="!mb-0 text-[40px] font-[600] text-white ">
            Hiệu quả thay đổi trải nghiệm ứng viên của bạn
          </p>
          <p className="!mb-0 text-[15px] font-[400] text-white text-justify">
            Mang đến một quy trình tuyển dụng mượt mà và chuyên nghiệp hơn. Tối
            ưu hóa trải nghiệm của ứng viên từ lúc nộp hồ sơ đến khi nhận được
            phản hồi, giúp họ cảm thấy gắn kết và hài lòng hơn với doanh nghiệp
            của bạn.
          </p>
          <button className="relative w-[50%] px-[20px] py-[10px] border-2 border-white rounded-[20px] text-white mt-3 overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]">
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Tham gia tìm kiếm cơ hội ngay.
            </span>
          </button>
        </div>
      </div>
      <div className="pt-[60px] w-full flex gap-3 items-center justify-items-center justify-between">
        <div className="flex-1 flex flex-col gap-6">
          <p className="!mb-0 text-[40px] max-w-[600px] font-[500]">
            Mở động đội ngũ nhân viên của bạn một cách nhanh chóng.
          </p>
          <p className="!mb-0 text-[15px] max-w-[500px] font-[400] ">
            {" "}
            Tận dụng trang web việc làm toàn cầu của chúng tôi để thuê những
            người bạn muốn, ở bất cứ đâu - chỉ trong vài phút.
          </p>
          <div className="pt-[40px] max-w-[600px] w-full flex gap-4 items-center justify-items-center">
            <div className=" flex-1 flex flex-col gap-2 w-[300px] h-[300px] p-[20px] rounded-[10px] bg-gray-100">
              <div className="flex-1">
                <button className=" w-[50%] px-[20px] py-[8px] rounded-[20px] border-2 border-black">
                  Nhân viên
                </button>
              </div>
              <div className="flex-1">
                {" "}
                <img
                  className="max-w-[200px] flex-1"
                  src="/src/assets/home/GroupContact.png"
                  alt=""
                />
              </div>
              <div className="flex-1 flex items-center justify-items-center justify-between">
                <p className="!mb-0 max-w-[150px] text-[20px]">
                  Bắt đầu thuê nhân viên
                </p>
                <FontAwesomeIcon
                  className="!text-[40px]"
                  icon={faCircleRight}
                />
              </div>
            </div>

            <Slider
              {...settings}
              className="w-[300px] h-[300px] flex-1 rounded-[10px]"
            >
              {sliderData.map((item, index) => (
                <div key={index} className="relative min-h-[300px]">
                  <img
                    className="w-full h-full rounded-[10px] object-cover min-h-[300px] max-h-[300px]"
                    src={item.src}
                    alt={item.label}
                  />
                  <button className="bg-white/20 absolute top-5 left-5 w-[50%] px-[20px] py-[8px] rounded-[20px] border-2 border-white text-white">
                    {item.label}
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="flex-1">a</div>
      </div>
    </div>
  );
};

export default Sub1;
