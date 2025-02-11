import { useContext, useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";
const Account = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [formData, setFormData] = useState({
    username: userData.username || "",
    sdt: userData.telephone || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(userData);
  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Họ tên
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={formData.username}
            name="username"
            placeholder="Họ và tên"
            className="p-1 px-2 appearance-non outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Số điện thoại
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/\D/g, ""))
            }
            value={formData.telephone}
            name="telephone"
            placeholder="Số điện thoại"
            pattern="\d*"
            className="p-1 px-2 appearance-non outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
