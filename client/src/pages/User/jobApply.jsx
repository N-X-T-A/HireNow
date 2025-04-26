import React, { useState, useEffect } from "react";
import {
  fetchJobsAPIApplication,
  fetchJobAPIFavorite,
  fetchJobAPIFavoriteDelete,
  fetchJobAPIdetail,
  fetchJobAPIApplicationDelete,
} from "../../apis/jobAPI";
import JobApplyStatusCom from "../../components/user/jobApplyStatusCom";

const JobApply = () => {
  //config
  const [open, setOpen] = useState(false);
  const [openBaymax, setOpenBaymax] = useState(false);
  const [jobsAPI, setJobsAPI] = useState([]);
  const [jobsSelect, setJobsSelect] = useState([]);
  const [jobSave, setJobSave] = useState([]);
  const [jobID, setJobID] = useState(null);

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
      const response = await fetchJobAPIFavorite();
      setJobSave(response);
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
      await fetchJobAPIFavoriteDelete(jobId);
      console.log("Đã xóa bookmark");
      setJobSave((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
    } catch (error) {
      console.error("Lỗi khi xóa bookmark:", error);
      setOpenBaymax(true);
    }
  };

  const deleteApplication = async (id) => {
    try {
      console.log("Xóa application ID:", id);
      await fetchJobAPIApplicationDelete(id);
      console.log("Xóa thành công");
      setJobsAPI((prevJobs) => prevJobs.filter((job) => job.job_id !== id));
      setOpen(false);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      setOpenBaymax(true);
      throw error;
    }
  };
  //API fetch detail
  useEffect(() => {
    const fetchJobsDetail = async () => {
      try {
        const response = await fetchJobAPIdetail(jobID);
        setJobsSelect(response);
        console.log("Danh sách công việc:", response.data.job);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };

    fetchJobsDetail();
  }, [jobID]);

  return (
    <div>
      <JobApplyStatusCom
        openBaymax={openBaymax}
        setOpenBaymax={setOpenBaymax}
        jobsAPI={jobsAPI}
        setJobsAPI={setJobsAPI}
        jobSave={jobSave}
        setJobSave={setJobSave}
        handleDelete={handleDelete}
        setJobsSelect={setJobsSelect}
        jobsSelect={jobsSelect}
        deleteApplication={deleteApplication}
        setJobID={setJobID}
        jobID={jobID}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default JobApply;
