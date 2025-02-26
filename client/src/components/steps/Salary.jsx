import React from "react";
import { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContext";
const Salary = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [skills, setSkills] = useState(userData.skills || []);
  const [formData, setFormData] = useState({
    salaryExpectation: userData.experience?.[0]?.salaryExpectation || "",
    location: userData.experience?.[0]?.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const selectedSkills = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSkills(selectedSkills);
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
      <input
        type="text"
        name="salaryExpectation"
        placeholder="Mức lương mong muốn"
        value={formData.salaryExpectation}
        onChange={handleChange}
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="location"
        placeholder="Địa điểm làm việc"
        value={formData.location}
        onChange={handleChange}
        className="border p-2 m-2"
      />

      <select multiple onChange={handleSkillChange} className="border p-2 m-2">
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="React">React</option>
        <option value="Node.js">Node.js</option>
        <option value="SQL">SQL</option>
      </select>
    </div>
  );
};

export default Salary;
