import React from "react";

const Final = () => {
  return (
    <div className="relative flex flex-col items-center">
      <img className="w-[50%]" src="/src/assets/login/done.gif" alt="" />
      <p className="absolute bottom-0 font-bold text-green-600 text-[20px] uppercase">
        Chúc mừng!
      </p>
      <p className="absolute bottom-[-30px] font-bold text-gray-600 text-[13px]">
        tài khoản của bạn đã được tạo thành công.
      </p>
    </div>
  );
};

export default Final;
