import React from "react";
import withLayout from "../layout/withLayout";
import { blogPosts } from "../data/data";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
  const navigate = useNavigate();
  return (
    <div className=" container w-full !max-w-[1700px] p-[10px]  py-2">
      {/* Tiêu đề */}
      <h2 className="text-3xl font-[600] mb-6">Bài viết gần đây</h2>
      <div className="flex gap-5  border-b pb-10">
        <div className="flex-1">
          <img
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="w-full h-80 object-cover rounded-lg"
          />
          <h3
            onClick={() => navigate("/blogs/:id")}
            className="cursor-pointer pt-2 text-[25px] font-semibold"
          >
            {blogPosts[0].title}
          </h3>
          <p className="text-sm text-gray-500">
            {blogPosts[0].author} - {blogPosts[0].date}
          </p>
          <p className="text-sm mt-1">{blogPosts[0].description}</p>
          <div className="flex gap-2 mt-2">
            {blogPosts[0].tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-3 text-blue-600">Xem ngay</p>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {blogPosts.slice(1, 4).map((post) => (
            <div key={post.id} className="flex gap-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  {post.author} - {post.date}
                </p>
                <p className="text-sm mt-1">{post.description}</p>
                <div className="flex gap-2 mt-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Phần bài viết nổi bật */}

      {/* Danh sách bài viết toàn bộ */}
      <h2 className="text-3xl font-[600] mt-8">Toàn bộ bài viết</h2>
      <div className="flex gap-2">
        <span className="px-2 py-1 rounded-full bg-gray-200">Tất cả</span>
        <span className="px-2 py-1 rounded-full bg-gray-200">Tin mới</span>
        <span className="px-2 py-1 rounded-full bg-gray-200">Sự kiện</span>
        <span className="px-2 py-1 rounded-full bg-gray-200">Tuyển dụng</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {post.author} - {post.date}
              </p>
              <p className="text-sm mt-1">{post.description}</p>
              <div className="flex gap-2 mt-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withLayout(Blogs);
