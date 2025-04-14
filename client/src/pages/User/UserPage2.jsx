import React from "react";
import { useEffect, useState } from "react";
import JobList from "../../components/user/JobList";
import JobDetail from "../../components/user/JobDetail";
import JobP2Header from "../../components/user/JobP2Header";
import {
  getRecommendedJobs,
  addBookmark,
  removeBookmark,
} from "../../apis/jobAPI";
const UserPage2 = () => {
  //useState
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [OpenNotification, setOpenNotification] = useState(false);
  const [OpenNotification1, setOpenNotification1] = useState(false);
  const [UserJobsAPI, setJobsAPI] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  console.log(selectedJob);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalJobs, setOriginalJobs] = useState([]);

  //API
  //bookmark
  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedJobs")) || {};
    setBookmarkedJobs(storedBookmarks);
  }, []);

  const handleBookmarkClick = async (jobId) => {
    const isBookmarked = !!bookmarkedJobs[jobId];

    if (!sessionStorage.getItem("access_token")) {
      alert("Bạn cần đăng nhập để sử dụng chức năng này!");
      return;
    }

    try {
      if (!isBookmarked) {
        await addBookmark(jobId);
        console.log("Đã thêm bookmark");

        const updatedBookmarks = { ...bookmarkedJobs, [jobId]: true };
        setBookmarkedJobs(updatedBookmarks);
        localStorage.setItem(
          "bookmarkedJobs",
          JSON.stringify(updatedBookmarks)
        );
        setOpenNotification(true);
        setTimeout(() => {
          setOpenNotification(false);
        }, 2000);
      } else {
        await removeBookmark(jobId);
        console.log("Đã xóa bookmark");

        const updatedBookmarks = { ...bookmarkedJobs };
        delete updatedBookmarks[jobId];
        setBookmarkedJobs(updatedBookmarks);
        localStorage.setItem(
          "bookmarkedJobs",
          JSON.stringify(updatedBookmarks)
        );
        setOpenNotification1(true);
        setTimeout(() => {
          setOpenNotification1(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bookmark:", error);
    }
  };

  //fetch API
  // useEffect fetch jobs
  useEffect(() => {
    const fetchJobsAPI = async () => {
      try {
        const response = await getRecommendedJobs();
        setTimeout(() => {
          setOriginalJobs(response.data.jobs);
          setJobsAPI(response.data.jobs);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
        setLoading(false);
        setOpen(true);
      }
    };

    fetchJobsAPI();
  }, []);

  useEffect(() => {
    if (!sortOrder && !searchTerm) {
      setJobsAPI(originalJobs);
      return;
    }
    let filteredJobs = [...originalJobs];
    if (searchTerm) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOrder) {
      filteredJobs.sort((a, b) => {
        switch (sortOrder) {
          case "salary_asc":
            return (
              extractNumber(a.salary_range) - extractNumber(b.salary_range)
            );
          case "salary_desc":
            return (
              extractNumber(b.salary_range) - extractNumber(a.salary_range)
            );
          case "time_asc":
            return new Date(a.posted_time) - new Date(b.posted_time);
          case "time_desc":
            return new Date(b.posted_time) - new Date(a.posted_time);
          case "title_asc":
            return a.title.localeCompare(b.title);
          case "title_desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    setJobsAPI(filteredJobs);
  }, [sortOrder, searchTerm, originalJobs]);

  const extractNumber = (salary) => {
    return parseInt(salary.replace(/\D/g, ""), 10) || 0;
  };

  return (
    <>
      <JobP2Header onSortChange={setSortOrder} setSearchTerm={setSearchTerm} />
      <div className="flex w-full mt-2">
        {/* Phần 1 (Chiếm 3 phần) */}
        <JobList
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSelectJob={setSelectedJob}
          UserJobsAPI={UserJobsAPI}
          bookmarkedJobs={bookmarkedJobs}
          open={open}
          loading={loading}
          OpenNotification={OpenNotification}
          OpenNotification1={OpenNotification1}
          handleBookmarkClick={handleBookmarkClick}
        />

        {/* Phần 2 (Chiếm 7 phần) */}
        <div
          className="hidden md:flex md:flex-[7] p-2  max-h-[900px] overflow-y-auto w-full"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {selectedJob ? (
            <JobDetail jobId={selectedJob} />
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <img src="/src/assets/user/Click.gif" alt="" />
              <p className="text-gray-500 text-[30px] font-[500] w-full text-center">
                Chọn một công việc để xem chi tiết
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage2;
