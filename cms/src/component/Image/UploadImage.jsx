import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadImage = (props) => {
  const { onChange, property, record } = props;
  const value = record.params[property.path];
  const [preview, setPreview] = useState(value);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]; // Chỉ nhận 1 file
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(property.path, reader.result);
      };
      reader.readAsDataURL(file);
    },
    [onChange, property.path]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Chỉ nhận ảnh
    multiple: false, // chỉ 1 ảnh
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #007bff",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#f0f8ff" : "white",
      }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "300px", marginBottom: "10px" }}
        />
      ) : (
        <p>Kéo thả hoặc click để chọn hình ảnh</p>
      )}
    </div>
  );
};

export default UploadImage;
