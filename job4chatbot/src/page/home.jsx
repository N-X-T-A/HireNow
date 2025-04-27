import React, { useEffect, useState } from "react";
import HomeCom from "../component/homeCom";
import { fetchJobsAll } from "../API/jobListAPI";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchJobsAll();
        setJobs(data);
      } catch (err) {
        console.log("Không thể tải công việc.");
      }
    };

    getJobs();
  }, []);

  return (
    <div>
      <HomeCom jobs={jobs} />
    </div>
  );
};

export default Home;
