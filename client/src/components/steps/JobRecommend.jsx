import React from "react";
import { useContext, useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";
const JobRecommend = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [formData, setFormData] = useState({
    jobPreference: userData.jobPreference || "",
    experience: userData.experience || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        name="jobPreference"
        placeholder="Công việc mong muốn"
        value={formData.jobPreference}
        onChange={handleChange}
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="experience"
        placeholder="Kinh nghiệm làm việc"
        value={formData.experience}
        onChange={handleChange}
        className="border p-2 m-2"
      />
    </div>
  );
};
export default JobRecommend;
