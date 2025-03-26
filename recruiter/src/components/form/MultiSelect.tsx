import type React from "react";
import { useState, useRef } from "react";

interface Option {
  value: string;
  text: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  error?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
  error = false,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    setSearchTerm(""); // Reset search term
    onChange?.(newSelectedOptions);
  };

  const removeOption = (value: string) => {
    const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const filteredOptions = options.filter(
    (option) =>
      option.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedOptions.includes(option.value)
  );

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>

      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div
            className={`flex h-11 w-full cursor-pointer rounded-lg border py-1.5 px-3 shadow-theme-xs transition dark:bg-gray-900 ${
              error
                ? "border-error-500 focus:ring-error-500/20"
                : "border-gray-300 focus:ring-brand-500/20"
            } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
            onClick={toggleDropdown}
          >
            <div className="flex flex-wrap flex-auto gap-2">
              {selectedOptions.map((value, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-center rounded-full bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 dark:bg-gray-800"
                >
                  <span className="flex-initial">
                    {options.find((opt) => opt.value === value)?.text}
                  </span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(value);
                    }}
                    className="pl-2 text-gray-500 cursor-pointer"
                  >
                    ✕
                  </div>
                </div>
              ))}
              <input
                ref={inputRef}
                type="text"
                placeholder="Select option..."
                className="flex-1 min-w-[100px] bg-transparent outline-none text-sm placeholder:text-gray-800 dark:placeholder:text-white/90"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isOpen && (
            <div className="absolute left-0 z-40 w-full bg-white rounded-lg shadow-sm top-full max-h-40 overflow-y-auto dark:bg-gray-900">
              <div className="flex flex-col">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className="hover:bg-primary/5 w-full cursor-pointer p-2"
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.text}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500 text-sm text-center">
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
