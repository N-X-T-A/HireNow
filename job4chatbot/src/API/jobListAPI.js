import axios from "axios";
const API_URL = "https://hirenow-server.onrender.com/api/v1/";

export const fetchJobsAll = async () => {
  try {
    const response = await axios.get(`${API_URL}job`);
    return response.data.jobs;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách công việc:", error);
    throw error;
  }
};

export const fetchJobsAId = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}job/${jobId}`);
    return response.data.job;
  } catch (error) {
    console.error("Lỗi khi lấy công việc:", error);
    throw error;
  }
};
