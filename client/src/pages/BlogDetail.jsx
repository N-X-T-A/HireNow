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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/blog/${id}`
        );
        const blogData = response.data;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = blogData.description;

        const headings = Array.from(tempDiv.querySelectorAll("h2"));
        const tocItems = headings.map((heading, index) => {
          const id = `section-${index}`;
          heading.setAttribute("id", id);
          return {
            id,
            text: heading.innerText,
          };
        });

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

  const handleScrollTo = (id, offset = 100) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 container w-full !max-w-[1700px] p-[10px] py-2">
      <div
        className="w-full h-[400px] bg-fixed bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex flex-col justify-center text-white px-4 text-left">
          <h2 className="text-[40px] font-bold  drop-shadow-lg">
            {Blog.title}
          </h2>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-[7] text-xl leading-relaxed">
          <p className="text-[18px] mb-6 drop-shadow-md">{Blog.short_title}</p>

          {Blog?.description
            ? parse(
                Blog.description.replace("<ul>", '<ul class="list-disc pl-5">')
              )
            : "Đang tải nội dung..."}
        </div>

        <div className="flex-[3]">
          <div className="border p-4 rounded shadow bg-white sticky top-24">
            <h3 className="text-2xl font-bold mb-4">Mục Lục</h3>
            <ul className="space-y-2 cursor-pointer">
              {toc.map((item) => (
                <li
                  key={item.id}
                  className="text-blue-600 hover:underline text-base lg:text-lg"
                  onClick={() => handleScrollTo(item.id)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(BlogDetail);
