import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "none" | "secondary" | "danger" | "outline";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400",
    none: "",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
