import React, { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import { useLanguage } from "../../hooks/useLanguage";

const JobRecommend = ({ setIsStepValid }) => {
  const { translations } = useLanguage();
  const { userData, setUserData } = useContext(StepperContext);
  const [formData, setFormData] = useState({
    institution: userData.education?.[0]?.school || "",
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

  useEffect(() => {
    setIsStepValid(
      formData.institution.trim() !== "" &&
        formData.degree.trim() !== "" &&
        formData.field_of_study.trim() !== "" &&
        formData.start_date.trim() !== "" &&
        formData.end_date.trim() !== "" &&
        formData.description.trim() !== ""
    );
  }, [formData, setIsStepValid]);

  return (
    <div className="flex flex-col max-h-[400px] overflow-y-auto">
      <p className="!mb-1">{translations["graduatedLabel"]}</p>
      <input
        type="text"
        name="institution"
        placeholder={translations["graduatedPlaceholder"]}
        value={formData.institution}
        onChange={handleChange}
        className="border p-2 mb-3"
      />

      <p className="!mb-1">{translations["degreeLabel"]}</p>
      <select
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        className="border p-2 mb-3"
      >
        <option value="">{translations["selectDegreeDefault"]}</option>
        <option value="bachelor">{translations["bachelor"]}</option>
        <option value="master">{translations["master"]}</option>
        <option value="phd">{translations["phd"]}</option>
      </select>

      <p className="!mb-1">{translations["fieldOfStudyLabel"]}</p>
      <input
        type="text"
        name="field_of_study"
        placeholder={translations["fieldOfStudyPlaceholder"]}
        value={formData.field_of_study}
        onChange={handleChange}
        className="border p-2 mb-3"
      />

      <p className="!mb-1">{translations["startDateLabel"]}</p>
      <input
        type="number"
        name="start_date"
        placeholder={translations["startDatePlaceholder"]}
        value={formData.start_date}
        onChange={handleChange}
        className="border p-2 mb-3"
      />

      <p className="!mb-1">{translations["endDateLabel"]}</p>
      <input
        type="number"
        name="end_date"
        placeholder={translations["endDatePlaceholder"]}
        value={formData.end_date}
        onChange={handleChange}
        className="border p-2 mb-3"
      />

      <p className="!mb-1">{translations["descriptionLabel"]}</p>
      <textarea
        name="description"
        placeholder={translations["descriptionPlaceholder"]}
        value={formData.description}
        onChange={handleChange}
        className="border p-6"
      />
    </div>
  );
};

export default JobRecommend;
