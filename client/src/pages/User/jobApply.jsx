import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchJobsAPIApplication } from "../../apis/jobAPI";
import { jobs } from "../../data/data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { SparklesIcon, StarIcon } from "@heroicons/react/24/solid";
import Joyride from "react-joyride";
import parse from "html-react-parser";
import JobApplyStatusCom from "../../components/user/jobApplyStatusCom";

const JobApply = () => {
  //config
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openBaymax, setOpenBaymax] = useState(false);
  const [jobsAPI, setJobsAPI] = useState([]);
  const [jobsSelect, setJobsSelect] = useState([]);
  const [jobSave, setJobSave] = useState([]);
  const [jobID, setJobID] = useState(null);
  const [runTutorial, setRunTutorial] = useState(false);
  const ACCESS_TOKEN = sessionStorage?.getItem("access_token");
  const [showButton, setShowButton] = useState(false);
  //config tutorial
  const stepsTutorial = [
    {
      target: "#left-panel",
      content: "Đây là danh sách công việc đã lưu của bạn.",
      placement: "right",
    },
    {
      target: "#right-panel",
      content: "Đây là trạng thái ứng tuyển của bạn.",
      placement: "left",
    },
  ];
  //API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await fetchJobsAPIApplication();
        setJobsAPI(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
        setOpenBaymax(true);
      }
    };

    fetchJobs();
  }, []);

  //save list
  const fetchJobsAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/favorite",
        {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        }
      );
      setJobSave(response.data.metadata);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách công việc:", error);
      setOpenBaymax(true);
    }
  };
  useEffect(() => {
    fetchJobsAPI();
  }, []);
  //delete list
  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/favorite/${jobId}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      console.log("Đã xóa bookmark");
      setJobSave((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
    } catch (error) {
      console.error("Lỗi khi xóa bookmark:", error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/application/${id}`,
        { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
      );
      console.log("Xóa thành công:", response.data);
      setJobsAPI((prevJobs) => prevJobs.filter((job) => job.job_id !== id));
      setOpen(false);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      throw error;
    }
  };
  //API fetch detail
  useEffect(() => {
    const fetchJobsDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/job/${jobID}`
        );
        setJobsSelect(response.data.job);
        console.log("Danh sách công việc:", response.data.job);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchJobsDetail();
  }, [jobID]);

  const hoverColors = [
    "hover:bg-blue-100",

    "hover:bg-red-100",
    "hover:bg-yellow-100",
    "hover:bg-purple-100",
    "hover:bg-pink-100",
  ];
  return (
    <div>
      <JobApplyStatusCom
        openBaymax={openBaymax}
        setOpenBaymax={setOpenBaymax}
        jobsAPI={jobsAPI}
      />
    </div>
  );
};

export default JobApply;
