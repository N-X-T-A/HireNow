import React from "react";

const Foot = () => {
  return (
    <footer className="bg-gray-400 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold">Your Company</h2>
          <p className="mt-2 text-sm">
            Cung cấp dịch vụ tốt nhất cho khách hàng với sự tận tâm và chuyên
            nghiệp.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Đường dẫn nhanh</h3>
          <ul className="mt-2 space-y-2 ">
            <li>
              <a href="/" className="hover:underline">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:underline">
                Việc làm
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Liên hệ</h3>
          <p className="mt-2 text-sm">Email: contact@yourcompany.com</p>
          <p className="text-sm">Điện thoại: 0123-456-789</p>
        </div>
      </div>

      <div className="text-center text-sm mt-6 border-t border-white/20 pt-4">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Foot;
