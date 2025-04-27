import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/";
const getToken = () => sessionStorage.getItem("access_token");
const token = sessionStorage.getItem("access_token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchJobAPIdetail = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}job/${jobId}`);
    return response.data.job;
  } catch (error) {
    console.error("Lỗi :", error);
    throw error;
  }
};
export const fetchJobAPIApplicationDelete = async (jobId) => {
  try {
    await axiosInstance.delete(`application/${jobId}`);
    console.log("Đã xóa ");
  } catch (error) {
    console.error("Lỗi :", error);
    throw error;
  }
};
export const fetchJobAPIFavoriteDelete = async (jobId) => {
  try {
    await axiosInstance.delete(`favorite/${jobId}`);
    console.log("Đã xóa bookmark");
  } catch (error) {
    console.error("Lỗi :", error);
    throw error;
  }
};

export const fetchJobAPIFavorite = async () => {
  try {
    const response = await axiosInstance.get("favorite");
    return response.data.metadata;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách công việc đã lưu:", error);
    throw error;
  }
};

export const fetchJobsAll = async () => {
  try {
    const response = await axios.get(`${API_URL}job`);
    return response.data.jobs;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách công việc:", error);
    throw error;
  }
};

export const fetchJobsAPIApplication = async () => {
  const token = sessionStorage.getItem("access_token");
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  try {
    const response = await axiosInstance.get("application");
    return response.data.metadata;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách công việc:", error);
    throw error;
  }
};

export const fetchCompaniesAll = async () => {
  try {
    const response = await axios.get(`${API_URL}company`);
    return response.data.metadata;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách công việc:", error);
    throw error;
  }
};

export const getRecommendedJobs = async () => {
  return await axios.get(`${API_URL}job/recommend`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const addBookmark = async (jobId) => {
  return await axios.post(
    `${API_URL}favorite/${jobId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const removeBookmark = async (jobId) => {
  return await axios.delete(`${API_URL}favorite/${jobId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
