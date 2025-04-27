import React from "react";

const Footer = () => {
  return (
    <footer className="mt-2 bg-white border-t border-gray-300 text-black py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h3 className="text-lg mb-4">Về Chúng Tôi</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tin tức
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Candidate */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Dành cho Ứng Viên</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Tìm việc làm
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tạo CV
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Kỹ năng phỏng vấn
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hồ sơ cá nhân
              </a>
            </li>
          </ul>
        </div>

        {/* Employer */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Dành cho Nhà Tuyển Dụng
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Đăng tin tuyển dụng
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tìm kiếm ứng viên
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Giải pháp tuyển dụng
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Báo giá dịch vụ
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm">
        © 2025 JobFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
