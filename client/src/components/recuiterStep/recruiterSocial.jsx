import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StepperContext } from "../../contexts/StepperContext";
export const RecruiterSocial = () => {
  const { userData, setUserData } = useContext(StepperContext);
  console.log(userData);
  // State form data
  const [formData, setFormData] = useState({
    website: userData.website || "",
    size: userData.size || "",
    founded_year: userData.founded_year || "",
  });

  // State hình ảnh
  const [logo, setLogo] = useState(userData.logo || "");
  const [backgroundImage, setBackgroundImage] = useState(
    userData.background_image || ""
  );

  // State social links (dynamic field)
  const [socialLinks, setSocialLinks] = useState(
    userData.social_links || { linkedin: "", facebook: "" }
  );

  // Cập nhật dữ liệu vào userData
  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      ...formData,
      logo,
      background_image: backgroundImage,
      social_links: socialLinks,
    }));
  }, [formData, logo, backgroundImage, socialLinks, setUserData]);

  // Hàm upload ảnh lên server
  const handleUploadImage = async (event, setImage) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/upload/image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImage(response.data.url);
    } catch (error) {
      console.error("Upload image failed:", error);
    }
  };

  // Hàm thay đổi input thông thường
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm thay đổi input cho social links
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col">
      {/* Website */}
      <div className="w-full mx-2 flex-1">
        <label className="font-bold text-gray-500">Website</label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Company Size */}
      <div className="w-full mx-2 flex-1">
        <label className="font-bold text-gray-500">Quy mô công ty</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Founded Year */}
      <div className="w-full mx-2 flex-1">
        <label className="font-bold text-gray-500">Năm thành lập</label>
        <input
          type="number"
          name="founded_year"
          value={formData.founded_year}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      {/* Logo Upload */}
      <div className="w-full mx-2 flex-1">
        <label className="font-bold text-gray-500">Logo Công Ty</label>
        <input type="file" onChange={(e) => handleUploadImage(e, setLogo)} />
        {logo && (
          <div className="mt-2">
            <img src={logo} alt="Logo" className="w-32 h-32 object-cover" />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded mt-1"
              onClick={() => setLogo("")}
            >
              Xóa ảnh
            </button>
          </div>
        )}
      </div>

      {/* Background Image Upload */}
      <div className="w-full mx-2 flex-1">
        <label className="font-bold text-gray-500">Hình nền</label>
        <input
          type="file"
          onChange={(e) => handleUploadImage(e, setBackgroundImage)}
        />
        {backgroundImage && (
          <div className="mt-2">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-full h-32 object-cover"
            />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded mt-1"
              onClick={() => setBackgroundImage("")}
            >
              Xóa ảnh
            </button>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="w-full mx-2 flex-1">
        <label className="font-bold text-gray-500">Facebook</label>
        <input
          type="text"
          name="facebook"
          value={socialLinks.facebook}
          onChange={handleSocialChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="w-full mx-2 flex-1">
        <label className="font-bold text-gray-500">LinkedIn</label>
        <input
          type="text"
          name="linkedin"
          value={socialLinks.linkedin}
          onChange={handleSocialChange}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};
