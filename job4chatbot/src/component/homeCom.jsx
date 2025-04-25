import React from "react";
import { useNavigate } from "react-router-dom";
const HomeCom = ({ jobs }) => {
  const navigate = useNavigate();
  console.log(jobs);
  return (
    <div className="p-4 grid gap-4">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="border rounded-xl p-4 hover:shadow-md cursor-pointer transition"
          onClick={() => navigate(`/jobs/${job._id}`)}
        >
          <div className="flex items-center gap-4">
            <img
              src={job.company.logo}
              alt="logo"
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-500">
                {job.company.name} • {job.location}
              </p>
              <p className="text-sm mt-1">{job.salary_range}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeCom;
