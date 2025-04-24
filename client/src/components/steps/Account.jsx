import { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import { useLanguage } from "../../hooks/useLanguage";
const Account = ({ setIsStepValid }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [formData, setFormData] = useState({
    username: userData.name || "",
    phone: userData.phone || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const { translations } = useLanguage();

  //kiem tra du lieu hop le
  useEffect(() => {
    setIsStepValid(
      formData.username.trim() !== "" && formData.phone.trim() !== ""
    );
  }, [formData, setIsStepValid]);
  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {translations["fullName"]}
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={formData.name}
            name="username"
            placeholder={translations["fullName"]}
            className="p-1 px-2 appearance-non outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          {translations["phoneNumber"]}
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/\D/g, ""))
            }
            value={formData.phone}
            name="phone"
            placeholder={translations["phoneNumber"]}
            pattern="\d*"
            className="p-1 px-2 appearance-non outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
