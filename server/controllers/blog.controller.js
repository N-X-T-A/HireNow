"use strict";
const blogService = require("../services/blog.service");

class BlogController {
  getAllBlogs = async (req, res) => {
    try {
      const blogs = await blogService.getAllBlogs();
      res.status(200).json(blogs);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching blogs", error: err.message });
    }
  };

  getBlogById = async (req, res) => {
    try {
      const blog = await blogService.getBlogById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching blog", error: err.message });
    }
  };
}

module.exports = new BlogController();
