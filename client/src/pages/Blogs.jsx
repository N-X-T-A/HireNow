import React, { useState, useEffect } from "react";
import withLayout from "../layout/withLayout";
import { useNavigate } from "react-router-dom";
import { TagIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const Blogs = () => {
  const [Blog, SetBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/blog");
        SetBlog(res.data);
      } catch (err) {
        console.log("Lỗi fetch blog:", err);
      }
    };
    fetchJob();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(Blog);

  useEffect(() => {
    let filtered = Blog;
    if (searchTerm) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedTag) {
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => tag.name === selectedTag)
      );
    }
    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, Blog]);

  const allTags = [
    ...new Set(Blog.flatMap((post) => post.tags.map((tag) => tag.name))),
  ];

  return (
    <div className="flex flex-col gap-4 container w-full !max-w-[1700px] p-[10px] py-2 text-lg">
      <div
        className="w-full h-[400px] bg-fixed bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: 'url("/src/assets/home/usagi-shima-5.webp")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex flex-col justify-center text-white px-4 text-left">
          <h2 className="text-[64px] font-bold mb-4 drop-shadow-lg">
            Khám phá Blog Việc Làm
          </h2>
          <p className="text-2xl max-w-xl mb-6 drop-shadow-md">
            Chia sẻ kiến thức, mẹo phỏng vấn, và hành trình sự nghiệp giúp bạn
            tiến xa hơn trong công việc mơ ước.
          </p>
        </div>
      </div>

      <h2 className="text-4xl font-[600] !mb-0">Bài viết gần đây</h2>
      <div className="flex gap-5 border-b pb-10">
        {Blog?.slice(0, 1).map((item) => (
          <div key={item._id} className="relative flex-1 cursor-pointer">
            <img
              onClick={() => navigate(`/blogs/${item._id}`)}
              src={item.image}
              alt={item.title}
              className="w-full object-cover rounded-lg h-[528px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg" />
            <div className="absolute bottom-0 left-0 p-6 text-white z-10">
              <h2
                onClick={() => navigate(`/blogs/${item._id}`)}
                className="cursor-pointer text-3xl font-bold drop-shadow-md"
              >
                {item.title}
              </h2>
              <p className="text-xl font-[300] mt-2 drop-shadow-sm">
                {item.short_title}
              </p>
            </div>
          </div>
        ))}

        <div className="flex-1 flex flex-col gap-4 cursor-pointer">
          {Blog?.slice(1, 4).map((post) => (
            <div key={post._id} className="flex gap-4">
              <img
                onClick={() => navigate(`/blogs/${post._id}`)}
                src={post.image}
                alt={post.title}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div>
                <h3
                  onClick={() => navigate(`/blogs/${post._id}`)}
                  className="text-[24px] font-semibold line-clamp-1"
                >
                  {post.title}
                </h3>
                <p className="text-base text-gray-500">{post.date}</p>
                <p className="text-lg mt-1 line-clamp-2">{post.short_title}</p>
                <div className="flex gap-2 justify-between text-base">
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  <span className="flex gap-2 items-center">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="px-2 py-1 text-sm font-[600] rounded-full bg-gray-300"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-4xl font-[600] mt-8">Toàn bộ bài viết</h2>

      <div className="flex gap-2">
        <div className="flex-[7] flex flex-wrap -mx-2 cursor-pointer">
          {filteredPosts.map((post) => (
            <div key={post._id} className="w-1/2 px-2 mb-4">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  onClick={() => navigate(`/blogs/${post._id}`)}
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3
                    onClick={() => navigate(`/blogs/${post._id}`)}
                    className="text-xl font-semibold line-clamp-1"
                  >
                    {post.title}
                  </h3>
                  <p className="text-base text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                  <p className="text-lg mt-1 line-clamp-2">
                    {post.short_title}
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="flex gap-2 items-center">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="px-2 py-1 text-sm font-[600] rounded-full bg-gray-300"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-[3] px-2">
          <div className="bg-white p-4 shadow-md rounded-lg mb-4">
            <h4 className="flex items-center text-xl font-semibold mb-2 gap-2">
              <TagIcon className="w-6 h-6" /> Tìm kiếm tiêu đề
            </h4>
            <input
              type="text"
              placeholder="Nhập từ khóa..."
              className="w-full p-3 text-base border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <h4 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <MagnifyingGlassCircleIcon className="w-7 h-7" /> Lọc theo tag
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 text-sm font-[600] rounded-full ${
                  selectedTag === ""
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setSelectedTag("")}
              >
                Tất cả
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 text-sm font-[600] rounded-full ${
                    selectedTag === tag
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(Blogs);
