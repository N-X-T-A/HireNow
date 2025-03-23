import React, { useContext, useState, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export const RecruiterAccount = () => {
  //state
  const { userData, setUserData } = useContext(StepperContext);
  const [formData, setFormData] = useState({
    username: userData.name || "",
    industry_id: userData.industry_id || "",
    description: userData.description || "",
  });

  const Citytest = ["Ha Noi", "Ho Chi Minh", "Da Nang", "Hai Phong"];
  const [locations, setLocations] = useState(
    userData.locations || [{ city: "", detailed_location: "" }]
  );
  //
  // Cập nhật userData mỗi khi locations thay đổi
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      locations: locations,
    }));
  }, [locations, setUserData]);
  //+
  const addLocation = () => {
    setLocations([...locations, { city: "", detailed_location: "" }]);
  };
  //-
  const removeLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };
  //Onchange
  const handleChangeLoca = (index, key, value) => {
    setLocations(
      locations.map((loc, i) => (i === index ? { ...loc, [key]: value } : loc))
    );
  };

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
          Tên công ty
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={formData.name}
            name="username"
            placeholder="Họ và tên"
            className="p-1 px-2 appearance-non outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Ngành công nghiệp
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={formData.industry_id}
            name="industry_id"
            placeholder="Ngành công nghiệp"
            pattern="\d*"
            className="p-1 px-2 appearance-non outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Địa chỉ
        </div>
        <div className="max-w-full space-y-4">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-100 p-1 rounded-lg shadow-md"
            >
              <select
                value={loc.city}
                onChange={(e) =>
                  handleChangeLoca(index, "city", e.target.value)
                }
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn thành phố</option>
                {Citytest.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Nhập địa chỉ chi tiết"
                value={loc.detailed_location}
                onChange={(e) =>
                  handleChangeLoca(index, "detailed_location", e.target.value)
                }
                className="flex-[4] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {locations.length > 1 && (
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  onClick={() => removeLocation(index)}
                >
                  x
                </button>
              )}
            </div>
          ))}

          <button
            className="w-max bg-green-500 text-white py-2 px-1 text-[13px] rounded-md hover:bg-green-600 transition"
            onClick={addLocation}
          >
            Thêm địa điểm
          </button>
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Mô tả thêm
        </div>
        <textarea
          name="description"
          placeholder="Nhập mô tả"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};
