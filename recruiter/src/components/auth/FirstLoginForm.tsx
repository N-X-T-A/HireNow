import { useEffect, useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import { useNavigate } from "react-router";
import { SERVICE_URL } from "../../api/config";

export default function FirstLoginForm() {
  const [step, setStep] = useState(1);
  const [industryOptions, setIndustryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    locations: [{ city: "", detailed_location: "" }],
    size: "",
    foundedYear: "",
    website: "",
    linkedin: "",
    facebook: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch(`${SERVICE_URL}/job/listings`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const formatted = data.map((item: any) => ({
          value: item._id,
          label: item.title,
        }));
        setIndustryOptions(formatted);
      } catch (err) {
        console.error("Failed to fetch industries", err);
      }
    };

    fetchIndustries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, industry: value }));
  };

  const handleLocationChange = (
    index: number,
    field: "city" | "detailed_location",
    value: string
  ) => {
    const updated = [...formData.locations];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, locations: updated }));
  };

  const addLocation = () => {
    setFormData((prev) => ({
      ...prev,
      locations: [...prev.locations, { city: "", detailed_location: "" }],
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) return alert("No token found. Please log in again.");

    const payload = {
      name: formData.companyName,
      industry_id: formData.industry,
      locations: formData.locations,
      website: formData.website,
      logo: "",
      background_image: "",
      size: formData.size,
      founded_year: Number(formData.foundedYear),
      social_links: {
        linkedin: formData.linkedin,
        facebook: formData.facebook,
      },
      description: "",
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/company/67d5362f97895d3ad89456f0",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("accessToken");
        return navigate("/signin");
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save company info");
      }

      alert("Company information saved successfully!");
      navigate("/plans");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">
                Step 1: Company Basic Info
              </h2>
              <div>
                <Label>
                  Company Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <Label>
                  Industry<span className="text-error-500">*</span>
                </Label>
                <Select
                  options={industryOptions}
                  placeholder="Select industry"
                  onChange={handleSelectChange}
                  defaultValue={formData.industry}
                />
              </div>
              <button type="button" onClick={nextStep} className="btn-primary">
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Step 2: Location & Size</h2>

              <div className="space-y-4">
                <Label>Branch Locations</Label>
                {formData.locations.map((loc, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-3 md:grid-cols-2"
                  >
                    <Input
                      name={`city-${index}`}
                      value={loc.city}
                      onChange={(e) =>
                        handleLocationChange(index, "city", e.target.value)
                      }
                      placeholder="Enter city"
                    />
                    <Input
                      name={`detailed-${index}`}
                      value={loc.detailed_location}
                      onChange={(e) =>
                        handleLocationChange(
                          index,
                          "detailed_location",
                          e.target.value
                        )
                      }
                      placeholder="Enter detailed address"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLocation}
                  className="text-sm text-primary-600 hover:underline"
                >
                  + Add another branch
                </button>
              </div>

              <div>
                <Label>Company Size</Label>
                <Input
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 11-50, 100-500"
                />
              </div>
              <div>
                <Label>Founded Year</Label>
                <Input
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  placeholder="e.g. 2015"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">
                Step 3: Socials & Website
              </h2>
              <div>
                <Label>Website</Label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
              <div>
                <Label>Facebook</Label>
                <Input
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Back
                </button>
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
