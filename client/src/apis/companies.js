import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/";
const getToken = () => sessionStorage.getItem("access_token");

export const getCompanyDetails = async (companyId) => {
  try {
    const response = await axios.get(`${API_URL}company/${companyId}`);
    return response.data.metadata;
  } catch (error) {
    throw error.response?.data?.message || "Lỗi không xác định khi tải công ty";
  }
};
