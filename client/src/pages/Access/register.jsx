import React from "react";
import withLayout from "../../layout/withLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      if (response.data.statusCode === 201) {
        setMessage("Đăng ký thành công!");
        navigate("/login");
      } else {
        setMessage(response.data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Lỗi kết nối server");
    }
  };
  return (
    <div className="container w-full !max-w-[1500px] p-[10px] py-8 mx-auto">
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Đăng Ký</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default withLayout(Register);
