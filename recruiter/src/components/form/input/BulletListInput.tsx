import { useState, useRef } from "react";

interface BulletListInputProps {
  value?: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
}

export default function BulletListInput({
  value = [],
  onChange,
  error = false,
}: BulletListInputProps) {
  const [lines, setLines] = useState<string[]>(
    value.length > 0 ? value : ["", "", ""]
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, newValue: string) => {
    const updatedLines = [...lines];
    updatedLines[index] = newValue;
    setLines(updatedLines);
    onChange(updatedLines.map((line) => `<li>${line}</li>`));
  };

  const handleFocus = () => {
    if (lines.every((line) => line.trim() === "")) {
      setLines(["", "", ""]);
    }
  };

  const handleBlur = () => {
    const filteredLines = lines.filter((line) => line.trim() !== "");
    setLines(filteredLines.length > 0 ? filteredLines : ["", "", ""]);
    onChange(filteredLines.map((line) => `<li>${line}</li>`));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index < 2 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (e.key === "ArrowUp" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowDown" && index < 2) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`w-full rounded-lg border px-4 py-2 text-sm shadow-md focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white ${
        error
          ? "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800"
          : "border-gray-300 focus:ring-2 focus:ring-blue-500"
      }`}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2 py-4">
          <span className="text-lg">•</span>
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={lines[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={70}
            className="w-full border-none outline-none bg-transparent"
          />
        </div>
      ))}
    </div>
  );
}
