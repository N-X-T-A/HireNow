Dưới đây là cách thay đổi `JobP2Header.jsx` để sử dụng các **button** thay vì `<select>`.

- Mỗi button sẽ thay đổi trạng thái sắp xếp khi được nhấn.
- Khi nhấn lần đầu: Sắp xếp theo tăng dần (`asc`).
- Khi nhấn lần nữa: Sắp xếp theo giảm dần (`desc`).
- Khi nhấn lần thứ ba: Quay về danh sách gốc (`null`).

---

## **📌 Cập nhật `JobP2Header.jsx`**

```jsx
import { useState } from "react";

const JobP2Header = ({ onSortChange }) => {
  const [sortStates, setSortStates] = useState({
    salary: null,
    time: null,
    title: null,
    company: null,
  });

  const handleSortClick = (type) => {
    const nextState =
      sortStates[type] === "asc"
        ? "desc"
        : sortStates[type] === "desc"
          ? null
          : "asc";

    const newSortStates = {
      salary: null,
      time: null,
      title: null,
      company: null,
    };
    newSortStates[type] = nextState; // Chỉ bật sort cho một tiêu chí

    setSortStates(newSortStates);
    onSortChange(nextState ? `${type}_${nextState}` : null);
  };

  const getButtonText = (type, label) => {
    if (sortStates[type] === "asc") return `${label} ▲`;
    if (sortStates[type] === "desc") return `${label} ▼`;
    return label;
  };

  return (
    <div className="flex justify-end p-4 gap-2">
      <button
        onClick={() => handleSortClick("salary")}
        className={`px-4 py-2 rounded-md transition ${
          sortStates.salary ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {getButtonText("salary", "Lương")}
      </button>

      <button
        onClick={() => handleSortClick("time")}
        className={`px-4 py-2 rounded-md transition ${
          sortStates.time ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {getButtonText("time", "Thời gian đăng tuyển")}
      </button>

      <button
        onClick={() => handleSortClick("title")}
        className={`px-4 py-2 rounded-md transition ${
          sortStates.title ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {getButtonText("title", "Tên công việc")}
      </button>

      <button
        onClick={() => handleSortClick("company")}
        className={`px-4 py-2 rounded-md transition ${
          sortStates.company ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {getButtonText("company", "Tên công ty")}
      </button>
    </div>
  );
};

export default JobP2Header;
```

---

## **📌 Cập nhật `JobList.jsx`**

Để xử lý sắp xếp từ `JobP2Header`, cập nhật logic trong `JobList.jsx`:

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

const JobList = ({ sortOrder }) => {
  const [originalJobs, setOriginalJobs] = useState([]); // Dữ liệu gốc từ API
  const [jobsAPI, setJobsAPI] = useState([]); // Dữ liệu hiển thị
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobsAPI = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/job/recommend",
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );

        setTimeout(() => {
          setOriginalJobs(response.data.jobs || []);
          setJobsAPI(response.data.jobs || []);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công việc:", error);
        setLoading(false);
      }
    };

    fetchJobsAPI();
  }, []);

  useEffect(() => {
    if (!sortOrder) {
      setJobsAPI(originalJobs);
      return;
    }

    const sorted = [...originalJobs].sort((a, b) => {
      switch (sortOrder) {
        case "salary_asc":
          return extractNumber(a.salary_range) - extractNumber(b.salary_range);
        case "salary_desc":
          return extractNumber(b.salary_range) - extractNumber(a.salary_range);
        case "time_asc":
          return new Date(a.posted_time) - new Date(b.posted_time);
        case "time_desc":
          return new Date(b.posted_time) - new Date(a.posted_time);
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        case "company_asc":
          return a.company.name.localeCompare(b.company.name);
        case "company_desc":
          return b.company.name.localeCompare(a.company.name);
        default:
          return 0;
      }
    });

    setJobsAPI(sorted);
  }, [sortOrder, originalJobs]);

  const extractNumber = (salary) => {
    return parseInt(salary.replace(/\D/g, ""), 10) || 0;
  };

  return (
    <div className="job-list-container">
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        jobsAPI.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company.name}</p>
            <p>Lương: {job.salary_range}</p>
            <p>Đăng tuyển: {job.posted_time}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
```

---

## **📌 Cập nhật `Page.jsx`**

Truyền `sortOrder` từ `JobP2Header` sang `JobList`:

```jsx
import { useState } from "react";
import JobP2Header from "./JobP2Header";
import JobList from "./JobList";

const Page = () => {
  const [sortOrder, setSortOrder] = useState(null); // Ban đầu không sắp xếp

  return (
    <div>
      <JobP2Header onSortChange={setSortOrder} />
      <div className="flex w-full mt-2">
        <JobList sortOrder={sortOrder} />
      </div>
    </div>
  );
};

export default Page;
```

---

## **✨ Kết quả mong muốn**

- **Button thay đổi trạng thái sắp xếp (▲ / ▼)**
- **Khi nhấn lần 3, trở về danh sách gốc**
- **Hỗ trợ sắp xếp theo:**
  - 🏷 **Lương** (Tăng dần / Giảm dần)
  - ⏳ **Thời gian đăng tuyển** (Mới nhất / Cũ nhất)
  - 📌 **Tên công việc** (A → Z / Z → A)
  - 🏢 **Tên công ty** (A → Z / Z → A)

---

🔥 Giờ bạn có giao diện **nút bấm sắp xếp chuyên nghiệp, gọn gàng** mà vẫn giữ trải nghiệm người dùng tốt! 🚀
