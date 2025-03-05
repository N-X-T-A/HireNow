"use strict";

const { uploadImage, uploadResume } = require("../utils/cloudinary");

class UploadController {
  static async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided." });
      }

      const imageUrl = await uploadImage(req.file.path);
      return res.status(200).json({
        message: "Image uploaded successfully!",
        metadata: { imageUrl },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async uploadResume(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No resume file provided." });
      }

      const resumeUrl = await uploadResume(req.file.path);
      return res.status(200).json({
        message: "Resume uploaded successfully!",
        metadata: { resumeUrl },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = UploadController;
