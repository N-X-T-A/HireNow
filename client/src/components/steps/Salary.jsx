import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StepperContext } from "../../contexts/StepperContext";
import Multiselect from "multiselect-react-dropdown";
import { useLanguage } from "../../hooks/useLanguage";

const Salary = ({ setIsStepValid }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const { translations } = useLanguage();

  const [jobListings, setJobListings] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [skills, setSkills] = useState(userData.skills || []);

  const [formData, setFormData] = useState({
    company_name: userData.experience?.[0]?.company || "",
    start_date: userData.experience?.[0]?.start_date || "",
    end_date: userData.experience?.[0]?.end_date || "",
    description: userData.experience?.[0]?.description || "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/job/listings")
      .then((response) => setJobListings(response.data))
      .catch((error) =>
        console.error("Lỗi khi fetch danh sách ngành nghề: ", error)
      );
  }, []);

  useEffect(() => {
    if (selectedJob) {
      axios
        .get(`http://localhost:5000/api/v1/job/skills/${selectedJob._id}`)
        .then((response) => setJobSkills(response.data))
        .catch((error) =>
          console.error("Lỗi khi fetch danh sách kỹ năng: ", error)
        );
    } else {
      setJobSkills([]);
    }
  }, [selectedJob]);

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      experience: { ...formData },
      skills: skills.map((skill) => skill._id),
    }));
  }, [formData, skills, setUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setIsStepValid(
      formData.company_name.trim() !== "" &&
        formData.start_date.trim() !== "" &&
        formData.end_date.trim() !== "" &&
        formData.position?.trim() !== "" &&
        skills.length > 0 &&
        formData.description.trim() !== ""
    );
  }, [formData, skills, setIsStepValid]);

  return (
    <div className="flex flex-col">
      <p className="!mb-1">{translations.experienceAt}</p>
      <input
        type="text"
        name="company_name"
        placeholder={translations.enterCompanyName}
        value={formData.company_name}
        onChange={handleChange}
        className="border p-2 mb-3"
      />

      <p className="!mb-1">{translations.selectJobTitle}</p>
      <select
        className="border p-2 mb-3"
        value={selectedJob ? selectedJob._id : ""}
        onChange={(e) => {
          const job = jobListings.find(
            (item) => String(item._id) === e.target.value
          );
          setSelectedJob(job);
          setSkills([]);
          setFormData((prev) => ({
            ...prev,
            position: job ? job.title : "",
          }));
        }}
      >
        <option value="">{translations.selectJobTitle}</option>
        {jobListings.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title}
          </option>
        ))}
      </select>

      <p className="!mb-1">{translations.selectYourSkills}</p>
      <Multiselect
        className="mb-3"
        options={jobSkills}
        placeholder={translations.selectYourSkills}
        displayValue="name"
        selectedValues={skills}
        onSelect={(selectedList) => setSkills(selectedList)}
        onRemove={(selectedList) => setSkills(selectedList)}
      />

      <p className="!mb-1">{translations.startDate}</p>
      <input
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        className="border p-2 mb-3"
      />

      <p className="!mb-1">{translations.endDate}</p>
      <input
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
        className="border p-2 mb-3"
      />

      <p className="!mb-1">{translations.description}</p>
      <textarea
        name="description"
        placeholder={translations.enterDescription}
        value={formData.description}
        onChange={handleChange}
        className="border p-2"
      />
    </div>
  );
};

export default Salary;
