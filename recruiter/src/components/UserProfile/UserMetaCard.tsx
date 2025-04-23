import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useEffect, useState } from "react";
import { TrashBinIcon } from "../../icons";

interface UserMetaCardProps {
  isEdit?: boolean;
}

type Location = {
  city: string;
  detailed_location: string;
};

export default function UserMetaCard({ isEdit = true }: UserMetaCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState<any>(null);
  const [recruiter, setRecruiter] = useState<any>(null);

  useEffect(() => {
    const recruiterFromLocalStorage = localStorage.getItem("recruiter");
    if (recruiterFromLocalStorage) {
      try {
        const parsed = JSON.parse(recruiterFromLocalStorage);
        setRecruiter(parsed);
        setFormData({ ...parsed });
      } catch (error) {
        console.error("Error parsing recruiter data:", error);
      }
    }
  }, []);

  const handleChange = (field: string, value: any) => {
    if (!formData) return;
    const updatedForm = { ...formData };
    if (field.startsWith("companyId.")) {
      const key = field.replace("companyId.", "");
      updatedForm.companyId[key] = value;
    } else if (field.startsWith("social_links.")) {
      const key = field.replace("social_links.", "");
      updatedForm.companyId.social_links[key] = value;
    } else {
      updatedForm[field] = value;
    }
    setFormData(updatedForm);
  };

  const handleSave = () => {
    localStorage.setItem("recruiter", JSON.stringify(formData));
    setRecruiter({ ...formData });
    closeModal();
  };

  return (
    <>
      <div
        className="relative border border-gray-200 rounded-2xl dark:border-gray-800 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${recruiter?.companyId.background_image})`,
          height: "220px",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 w-full bg-black/45 h-full dark:bg-gray-900/45 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl px-6 py-4 flex items-center gap-4 z-10">
          <div className="w-[100px] h-[100px] rounded-full border-4 border-white dark:border-gray-800 bg-white overflow-hidden">
            <img
              className="w-full h-full object-scale-down"
              src={recruiter?.companyId.logo}
              alt="Company Logo"
            />
          </div>
          <h2 className="text-xl font-semibold text-white dark:text-white/90">
            {recruiter?.companyId.name}
          </h2>
        </div>
        {isEdit && (
          <button
            onClick={openModal}
            className="absolute top-4 right-4 z-20 flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206Z" />
            </svg>
            Edit
          </button>
        )}
      </div>

      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Company Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <Label>Name</Label>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {recruiter?.companyId.name}
                </p>
              </div>

              <div>
                <Label>Email</Label>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {recruiter?.email}
                </p>
              </div>

              <div>
                <Label>Website</Label>
                <p className="text-sm text-blue-600 hover:underline">
                  <a
                    href={recruiter?.companyId.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {recruiter?.companyId.website}
                  </a>
                </p>
              </div>

              <div>
                <Label>Size</Label>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {recruiter?.companyId.size}
                </p>
              </div>

              <div>
                <Label>Founded Year</Label>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {recruiter?.companyId.founded_year}
                </p>
              </div>

              <div>
                <Label>Description</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {recruiter?.companyId.description}
                </p>
              </div>

              {recruiter?.companyId.social_links?.linkedin && (
                <div>
                  <Label>LinkedIn</Label>
                  <p className="text-sm text-blue-600 hover:underline">
                    <a
                      href={recruiter.companyId.social_links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {recruiter.companyId.social_links.linkedin}
                    </a>
                  </p>
                </div>
              )}

              {recruiter?.companyId.social_links?.facebook && (
                <div>
                  <Label>Facebook</Label>
                  <p className="text-sm text-blue-600 hover:underline">
                    <a
                      href={recruiter.companyId.social_links.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {recruiter.companyId.social_links.facebook}
                    </a>
                  </p>
                </div>
              )}

              {recruiter?.companyId?.locations &&
                recruiter.companyId.locations.length > 0 && (
                  <div className="col-span-2">
                    <Label>Locations</Label>
                    <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
                      {recruiter?.companyId?.locations?.map(
                        (loc: Location, index: number) => (
                          <li key={index}>
                            {loc.city} – {loc.detailed_location}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Company Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update all the fields below to change company info.
            </p>
          </div>
          <form className="flex flex-col space-y-5">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3 space-y-5">
              <div>
                <Label>Logo URL</Label>
                <Input
                  value={formData?.companyId.logo || ""}
                  onChange={(e) =>
                    handleChange("companyId.logo", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Background Image URL</Label>
                <Input
                  value={formData?.companyId.background_image || ""}
                  onChange={(e) =>
                    handleChange("companyId.background_image", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Name</Label>
                <Input
                  value={formData?.companyId.name || ""}
                  onChange={(e) =>
                    handleChange("companyId.name", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={formData?.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div>
                <Label>Website</Label>
                <Input
                  value={formData?.companyId.website || ""}
                  onChange={(e) =>
                    handleChange("companyId.website", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Size</Label>
                <Input
                  value={formData?.companyId.size || ""}
                  onChange={(e) =>
                    handleChange("companyId.size", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Founded Year</Label>
                <Input
                  type="number"
                  value={formData?.companyId.founded_year || ""}
                  onChange={(e) =>
                    handleChange("companyId.founded_year", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={formData?.companyId.description || ""}
                  onChange={(e) =>
                    handleChange("companyId.description", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={formData?.companyId.social_links?.linkedin || ""}
                  onChange={(e) =>
                    handleChange("social_links.linkedin", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Facebook</Label>
                <Input
                  value={formData?.companyId.social_links?.facebook || ""}
                  onChange={(e) =>
                    handleChange("social_links.facebook", e.target.value)
                  }
                />
              </div>

              {formData?.companyId.locations?.map(
                (loc: Location, index: number) => (
                  <div
                    key={index}
                    className="space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative"
                  >
                    <div>
                      <Label>City #{index + 1}</Label>
                      <Input
                        value={loc.city}
                        onChange={(e) => {
                          const updated = [...formData.companyId.locations];
                          updated[index].city = e.target.value;
                          handleChange("companyId.locations", updated);
                        }}
                      />
                    </div>

                    <div>
                      <Label>Detailed Location #{index + 1}</Label>
                      <Input
                        value={loc.detailed_location}
                        onChange={(e) => {
                          const updated = [...formData.companyId.locations];
                          updated[index].detailed_location = e.target.value;
                          handleChange("companyId.locations", updated);
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          const updated = formData.companyId.locations.filter(
                            (_: any, i: number) => i !== index
                          );

                          handleChange("companyId.locations", updated);
                        }}
                      >
                        <TrashBinIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )
              )}

              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  const updated = [...(formData?.companyId.locations || [])];
                  updated.push({ city: "", detailed_location: "" });
                  handleChange("companyId.locations", updated);
                }}
              >
                + Add New Location
              </Button>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="none" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
