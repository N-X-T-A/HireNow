import React, { useEffect, useState } from "react";
import DetailJobCom from "../component/detailJobCom";
import { useParams } from "react-router-dom";
import { fetchJobsAId } from "../API/jobListAPI";
const DetailJob = () => {
  const { jobId } = useParams();
  const [jobs, setJobs] = useState([]);
  //API fetch
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await fetchJobsAId(jobId);
        setJobs(jobData);
        console.log(jobData);
      } catch (error) {
        console.error("Lỗi khi lấy công việc:", error);
      }
    };
    fetchJob();
  }, [jobId]);

  const [jobsDetail, setJobsDetail] = useState(null);
  return (
    <div>
      <DetailJobCom jobs={jobs} />
    </div>
  );
};

export default DetailJob;
