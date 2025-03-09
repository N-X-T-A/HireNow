const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary in the "uploads/images" folder.
 * @param {string} filePath - The local path of the image to upload.
 * @returns {Promise<object>} - The uploaded image details.
 */
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads/images",
      access_mode: "public",
    });
    console.log("Image upload successful");
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

/**
 * Uploads a resume to Cloudinary in the "uploads/resumes" folder.
 * @param {string} filePath - The local path of the resume to upload.
 * @returns {Promise<object>} - The uploaded resume details.
 */
const uploadResume = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads/resumes",
      access_mode: "public",
    });

    console.log("Resume upload successful");
    console.log("File URL:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};

module.exports = {
  uploadImage,
  uploadResume,
};
