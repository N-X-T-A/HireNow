import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ReactQuill.css";

interface TextareaProps {
  value?: string;
  onChange?: (value: string | React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  toolbarOptions?: string[] | "full";
}

const fullToolbar = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["image", "link"],
  ["clean"],
];

const allFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

const TextArea: React.FC<TextareaProps> = ({
  value = "",
  onChange,
  className = "",
  disabled = false,
  error = false,
  hint = "",
  toolbarOptions = "full",
}) => {
  const handleChange = (
    content: string | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (typeof content === "string") {
      onChange?.(content);
    } else {
      onChange?.(content.target.value);
    }
  };

  const getModules = () => {
    if (toolbarOptions === "full") return { toolbar: fullToolbar };
    if (Array.isArray(toolbarOptions)) {
      const filteredToolbar = fullToolbar.map((group) =>
        Array.isArray(group)
          ? group.filter((item) =>
              typeof item === "string" ? toolbarOptions.includes(item) : false
            )
          : group
      );
      return { toolbar: filteredToolbar.filter((group) => group.length > 0) };
    }
    return { toolbar: fullToolbar };
  };

  return (
    <div className="relative">
      <div
        className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-md focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white
          ${
            disabled
              ? "bg-gray-100 opacity-50 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400"
              : ""
          }
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }
          ${className}`}
      >
        <ReactQuill
          value={value}
          onChange={(content) => handleChange(content)}
          modules={getModules()}
          formats={toolbarOptions === "full" ? allFormats : toolbarOptions}
          theme="snow"
          readOnly={disabled}
          className="custom-quill"
        />
      </div>
      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
