"use strict";
const { Blog } = require("../models");

class BlogService {
  async getAllBlogs() {
    return await Blog.find({}, { description: 0 }).populate("tags", "name");
  }

  async getBlogById(id) {
    return await Blog.findById(id).populate("tags", "name description");
  }
}

module.exports = new BlogService();
