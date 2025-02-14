import React from "react";
import { useContext, useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";
const Salary = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [formData, setFormData] = useState({
    salaryExpectation: userData.salaryExpectation || "",
    location: userData.location || "",
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
    </div>
  );
};

export default Salary;
