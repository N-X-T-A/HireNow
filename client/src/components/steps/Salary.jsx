import React from "react";
import { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import Multiselect from "multiselect-react-dropdown";
import { dataSkill } from "../../data/data";
const Salary = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [option] = useState(dataSkill);
  const [skills, setSkills] = useState(userData.skills || []);
  const [formData, setFormData] = useState({
    company_name: userData.experience?.[0]?.company_name || "",
    position: userData.experience?.[0]?.position || "",
    description: userData.experience?.[0]?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      experience: { ...formData },
      skills,
    }));
  }, [formData, skills, setUserData]);
  return (
    <div className="flex flex-col">
      <p className="!mb-1">Đã có kinh nghiệm tại</p>
      <input
        type="text"
        name="company_name"
        placeholder="Đã có kinh nghiệm tại"
        value={formData.company_name}
        onChange={handleChange}
        className="border p-2 mb-3"
      />
      <p className="!mb-1">Vị trí/ chức danh</p>
      <select
        className="border p-2 mb-3"
        value={formData.position}
        onChange={handleChange}
        name="position"
      >
        <option value="">Chọn vị trí/chức danh</option>
        <option value="software_engineer">Software Engineer</option>
        <option value="frontend_developer">Frontend Developer</option>
        <option value="backend_developer">Backend Developer</option>
        <option value="data_scientist">Data Scientist</option>
      </select>
      <p className="!mb-1">Chọn kỹ năng của bạn</p>
      <Multiselect
        className="mb-3"
        options={option}
        placeholder="Chọn kỹ năng của bạn"
        displayValue="skill"
        selectedValues={skills}
        onSelect={(selectedList) => setSkills(selectedList)}
        onRemove={(selectedList) => setSkills(selectedList)}
      />
      <p className="!mb-1">Mô tả thêm:</p>
      <textarea
        type="text"
        name="description"
        placeholder="Nhập ngành học"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 "
      />
    </div>
  );
};

export default Salary;
