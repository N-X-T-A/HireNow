import React from "react";
import { useState } from "react";
import JobList from "../../components/user/JobList";
import JobDetail from "../../components/user/JobDetail";
import JobP2Header from "../../components/user/JobP2Header";
const UserPage2 = () => {
  //useState
  const [selectedJob, setSelectedJob] = useState(null);
  console.log(selectedJob);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <JobP2Header onSortChange={setSortOrder} setSearchTerm={setSearchTerm} />
      <div className="flex w-full mt-2">
        {/* Phần 1 (Chiếm 3 phần) */}
        <JobList
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSelectJob={setSelectedJob}
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
