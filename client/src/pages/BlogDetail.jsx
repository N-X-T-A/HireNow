import React, { useState, useEffect } from "react";
import withLayout from "../layout/withLayout";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";
const BlogDetail = () => {
  const { id } = useParams();
  const [Blog, SetBlog] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [toc, setToc] = useState([]);

  console.log(id);
  //fetch API
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/blog/${id}`
        );
        const blogData = response.data;

        // Tạo div tạm để xử lý HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = blogData.description;

        // Tìm tất cả thẻ h2
        const headings = Array.from(tempDiv.querySelectorAll("h2"));
        const tocItems = headings.map((heading, index) => {
          const id = `section-${index}`;
          heading.setAttribute("id", id);
          return {
            id,
            text: heading.innerText,
          };
        });

        // Cập nhật lại description với id đã gán
        blogData.description = tempDiv.innerHTML;

        SetBlog(blogData);
        setImageUrl(blogData.image);
        setToc(tocItems);
      } catch (err) {
        console.log("Lỗi fetch blog:", err);
      }
    };

    fetchJob();
  }, [id]);

  //clcik
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  console.log(Blog);
  return (
    <div className="flex flex-col gap-4 container w-full !max-w-[1700px] p-[10px]  py-2">
      <div
        className="w-full h-[400px] bg-fixed bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex flex-col  justify-center text-white px-4 text-left">
          {" "}
          <h2 className="text-[50px] font-bold mb-4 drop-shadow-lg">
            {Blog.title}
          </h2>
          <p className="text-[13px]  w-[60%] mb-6 drop-shadow-md">
            {Blog.short_title}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <span className="flex-[7]">
          {Blog?.description
            ? parse(
                Blog.description.replace("<ul>", '<ul class="list-disc pl-5">')
              )
            : "Đang tải nội dung..."}
        </span>
        <span className="flex-[3]">
          <div className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-bold mb-2">Mục Lục</h3>
            <ul className="space-y-2 list-decimal list-inside cursor-pointer">
              {toc.map((item) => (
                <li
                  key={item.id}
                  className="text-blue-600 hover:underline"
                  onClick={() => handleScrollTo(item.id)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </span>
      </div>
    </div>
  );
};

export default withLayout(BlogDetail);
