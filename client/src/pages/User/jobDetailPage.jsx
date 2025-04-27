import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchJobAPIdetail } from "../../apis/jobAPI";
import JobDetailPageCom from "../../components/user/jobDetailPageCom";
const JobDetailPage = () => {
  const { jobId } = useParams();
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Lỗi khi parse JSON từ sessionStorage:", error);
      return null;
    }
  });
  //pdf save
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [OpenNotification, setOpenNotification] = useState(false);
  const [OpenNotification1, setOpenNotification1] = useState(false);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      const newFormData = new FormData();
      newFormData.append("resume", selectedFile);
    } else {
      alert("Vui lòng chọn một file PDF hợp lệ.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResumeUrl("");
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Vui lòng chọn file trước khi gửi.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const uploadResponse = await axios.post(
        "http://localhost:5000/api/v1/upload/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const cloudinaryUrl = uploadResponse.data.metadata.resumeUrl;
      setResumeUrl(cloudinaryUrl);
      const applicationData = {
        job_id: jobId,
        resume: cloudinaryUrl,
        cover_letter: coverLetter,
      };
      console.log("dâta", applicationData);
      const applyResponse = await axios.post(
        "http://localhost:5000/api/v1/application",
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOpenNotification(true);
      setTimeout(() => {
        setOpenNotification(false);
      }, 1000);
      console.log(applyResponse.data);
    } catch (error) {
      console.error("Lỗi khi gửi file:", error);

      setOpenNotification1(true);
      setTimeout(() => {
        setOpenNotification1(false);
      }, 1000);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  //API fetch
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetchJobAPIdetail(jobId);
        setJobs(response);
        console.log(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchJobs();
  }, []);
  return (
    <JobDetailPageCom
      open={open}
      setOpen={setOpen}
      jobs={jobs}
      setJobs={setJobs}
      user={user}
      setUser={setUser}
      file={file}
      setFile={setFile}
      resumeUrl={resumeUrl}
      setResumeUrl={setResumeUrl}
      coverLetter={coverLetter}
      setCoverLetter={setCoverLetter}
      loading={loading}
      setLoading={setLoading}
      OpenNotification={OpenNotification}
      setOpenNotification={setOpenNotification}
      OpenNotification1={OpenNotification1}
      setOpenNotification1={setOpenNotification1}
      handleFileChange={handleFileChange}
      handleRemoveFile={handleRemoveFile}
      handleSubmit={handleSubmit}
    />
  );
};

export default JobDetailPage;
