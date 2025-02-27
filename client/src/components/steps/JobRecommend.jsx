import React, { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const JobRecommend = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [formData, setFormData] = useState({
    institution: userData.education?.[0]?.institution || "",
    degree: userData.education?.[0]?.degree || "",
    field_of_study: userData.education?.[0]?.field_of_study || "",
    start_date: userData.education?.[0]?.start_date || "",
    end_date: userData.education?.[0]?.end_date || "",
    description: userData.education?.[0]?.description || "",
  });

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      education: { ...formData },
    }));
  }, [formData, setUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col ">
      <p className="!mb-1">Đã tốt nghiệp tại</p>
      <input
        type="text"
        name="institution"
        placeholder="Tốt nghiệp tại"
        value={formData.institution}
        onChange={handleChange}
        className="border p-2 mb-3"
      />
      <p className="!mb-1">Bằng cấp:</p>
      <select
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        className="border p-2 mb-3"
      >
        <option value="">Chọn bằng</option>
        <option value="bachelor">Cử nhân</option>
        <option value="master">Thạc sĩ</option>
        <option value="phd">Tiến sĩ</option>
      </select>

      <p className="!mb-1">Ngành học:</p>
      <input
        type="text"
        name="field_of_study"
        placeholder="Nhập ngành học"
        value={formData.field_of_study}
        onChange={handleChange}
        className="border p-2 mb-3"
      />

      <p className="!mb-1">Mô tả thêm:</p>
      <textarea
        type="text"
        name="description"
        placeholder="Nhập ngành học"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 mb-3"
      />
    </div>
  );
};

export default JobRecommend;
