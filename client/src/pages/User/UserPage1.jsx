import React, { useState, useEffect } from "react";
import UserPage1Com from "../../components/user/userPage1Com";
import { fetchJobsAll } from "../../apis/jobAPI";
import { fetchCompaniesAll } from "../../apis/jobAPI";
const UserPage1 = () => {
  //state
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });
  const [jobsList, setJobsList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  //API
  useEffect(() => {
    const fetchJobsP1 = async () => {
      try {
        const response = await fetchJobsAll();
        setJobsList(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };
    fetchJobsP1();
  }, []);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetchCompaniesAll();
        setCompaniesList(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
      }
    };
    fetchCompanies();
  }, []);
  const hoverColors = [
    "hover:bg-blue-100",
    "hover:bg-green-100",
    "hover:bg-red-100",
    "hover:bg-yellow-100",
    "hover:bg-purple-100",
    "hover:bg-pink-100",
  ];
  return (
    <>
      <UserPage1Com
        jobsList={jobsList}
        companiesList={companiesList}
        user={user}
        hoverColors={hoverColors}
      />
    </>
  );
};

export default UserPage1;
