import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import RangeOrSingleInput from "../components/form/input/RangeOrSingleInput";
import TextArea from "../components/form/input/TextArea";
import MultiSelect from "../components/form/MultiSelect";
import BulletListInput from "../components/form/input/BulletListInput";
import Alert from "../components/ui/alert/Alert";
import apiFetch from "../utils/api";
import { SERVICE_URL } from "../api/config";
import Loader from "../components/ui/loader/Loader";

export default function JobForm() {
  const [formData, setFormData] = useState({
    jobName: "",
    reasonsToJoin: [],
    descriptions: "",
    responsibility: "",
    required_experience: "",
    salary: { min: "", max: "" },
    skills: [],
  });

  const [formKey, setFormKey] = useState(0);
  const [salaryError, setSalaryError] = useState<Record<string, boolean>>({});
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    message: string;
  } | null>(null);
  const [multiOptions, setMultiOptions] = useState<
    { value: string; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const id = localStorage.getItem("industry_id");
        const data = await apiFetch(`${SERVICE_URL}/job/skills/${id}`);
        const options = data.map((skill: { _id: string; name: string }) => ({
          value: skill._id,
          text: skill.name,
        }));
        setMultiOptions(options);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const errors: Record<string, boolean> = {};
    const { min, max } = formData.salary;

    if (!formData.jobName) errors.jobName = true;
    if (!formData.descriptions) errors.descriptions = true;
    if (!formData.responsibility) errors.responsibility = true;
    if (!formData.skills.length) errors.skills = true;
    if (
      formData.reasonsToJoin.length < 3 ||
      formData.reasonsToJoin.some((line) => !line || String(line).trim() === "")
    ) {
      errors.reasonsToJoin = true;
    }

    if (!min && !max) {
      errors.salary = true;
    } else if (min && max && parseInt(min) > parseInt(max)) {
      setSalaryError(errors);
      return;
    } else {
      setSalaryError(errors);
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setAlert({
        variant: "error",
        message: "Please fill out all required fields.",
      });
      return;
    }

    let formattedSalary = "";
    if (min && max) {
      formattedSalary = `$${min} - $${max}`;
    } else if (min) {
      formattedSalary = `$${min}`;
    } else if (max) {
      formattedSalary = `$${max}`;
    }

    const submittedData = {
      title: formData.jobName,
      skills: formData.skills,
      salary_range: formattedSalary,
      reasons_to_join: `<ul>${formData.reasonsToJoin
        .map((item) => `${item}`)
        .join("")}</ul>`,
      required_experience: `${formData.required_experience}`,
      responsibility: `${formData.responsibility}`,
      description: `${formData.descriptions}`,
    };

    try {
      setLoading(true);
      await apiFetch(`${SERVICE_URL}/job`, {
        method: "POST",
        body: JSON.stringify(submittedData),
      });

      setAlert({ variant: "success", message: "Job posted successfully!" });

      setFormData({
        jobName: "",
        reasonsToJoin: [],
        descriptions: "",
        responsibility: "",
        required_experience: "",
        salary: { min: "", max: "" },
        skills: [],
      });

      setFormKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error posting job:", error);
      setAlert({
        variant: "error",
        message: "Failed to post job. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div>
      <PageMeta title="Recruiter Dashboard" description="" />
      <PageBreadcrumb pageTitle="Create Job" />
      {alert && (
        <Alert
          className="fixed top-[153px] right-[25px] w-[500px]"
          variant={alert.variant}
          title={alert.variant === "success" ? "Success" : "Error"}
          message={alert.message}
        />
      )}
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="space-y-6">
            <div>
              <Label htmlFor="jobName">Job Name</Label>
              <Input
                type="text"
                id="jobName"
                value={formData.jobName}
                onChange={(e) => handleChange("jobName", e.target.value)}
                error={formErrors.jobName}
              />
            </div>
            <div>
              <MultiSelect
                key={formKey}
                label="Skills"
                options={multiOptions}
                defaultSelected={formData.skills}
                onChange={(values) => handleChange("skills", values)}
                error={formErrors.skills}
              />
            </div>
            <div>
              <Label htmlFor="reasonsToJoin">3 Reasons to Join</Label>
              <BulletListInput
                key={formKey}
                value={formData.reasonsToJoin}
                onChange={(value) => handleChange("reasonsToJoin", value)}
                error={formErrors.reasonsToJoin}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <Label htmlFor="salary">Salary</Label>
              <RangeOrSingleInput
                key={formKey}
                placeholder="Salary"
                value={formData.salary}
                onChange={(value) => handleChange("salary", value)}
                error={formErrors.salary}
              />
            </div>
            <div>
              <Label htmlFor="responsibility">Responsibility</Label>
              <TextArea
                value={formData.responsibility}
                onChange={(content) => handleChange("responsibility", content)}
                error={formErrors.responsibility}
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Label htmlFor="descriptions">Job Description</Label>
          <TextArea
            value={formData.descriptions}
            onChange={(content) => handleChange("descriptions", content)}
            error={formErrors.descriptions}
          />
        </div>
        <div className="mt-6">
          <Label htmlFor="required_experience">Required Experience</Label>
          <TextArea
            value={formData.required_experience}
            onChange={(content) => handleChange("required_experience", content)}
            error={formErrors.required_experience}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center min-w-[120px]"
            disabled={loading}
          >
            {loading ? <Loader /> : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
