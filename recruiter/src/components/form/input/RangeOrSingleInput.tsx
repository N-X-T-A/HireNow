import React, { useState } from "react";
import { ArrowRightIcon } from "../../../icons";
import Input from "./InputField";

interface RangeOrSingleInputProps {
  value?: { min?: string; max?: string };
  onChange?: (value: { min?: string; max?: string }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  hint?: string;
}

const RangeOrSingleInput: React.FC<RangeOrSingleInputProps> = ({
  value = {},
  onChange,
  placeholder = "Enter value",
  className = "",
  disabled = false,
  error = false,
  success = false,
  hint,
}) => {
  const [isRange, setIsRange] = useState(false);
  const [inputValue, setInputValue] = useState<{ min?: string; max?: string }>(
    value
  );

  const handleToggleRange = () => {
    setIsRange(!isRange);
    setInputValue({ min: "", max: "" });
    if (onChange) onChange({ min: "", max: "" });
  };

  const handleChange =
    (key: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Only allow numbers
      const updatedValue = { ...inputValue, [key]: rawValue };
      setInputValue(updatedValue);
      if (onChange) onChange(updatedValue);
    };

  return (
    <div className={`flex flex-col ${className} relative`}>
      <div className="flex items-center gap-2">
        {!isRange ? (
          <Input
            type="text"
            value={inputValue.min || ""}
            onChange={handleChange("min")}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            success={success}
            className="flex-1"
          />
        ) : (
          <div className="flex gap-2 w-full items-center justify-between">
            <Input
              type="text"
              value={inputValue.min || ""}
              onChange={handleChange("min")}
              placeholder="Min"
              disabled={disabled}
              error={error}
              success={success}
              className="flex-1"
            />
            <span className="text-gray-500 dark:text-gray-400">-</span>
            <Input
              type="text"
              value={inputValue.max || ""}
              onChange={handleChange("max")}
              placeholder="Max"
              disabled={disabled}
              error={error}
              success={success}
              className="flex-1"
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleToggleRange}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition mx-0.5 absolute right-0"
        >
          <ArrowRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

export default RangeOrSingleInput;
