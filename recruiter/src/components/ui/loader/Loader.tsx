import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="w-14 animate-spin">
      <svg viewBox="25 25 50 50" className="w-full h-full">
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="hsl(214, 97%, 59%)"
          strokeWidth="2"
          strokeLinecap="round"
          className="loader-circle"
        />
      </svg>

      {/* Custom animation */}
      <style>
        {`
          .loader-circle {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            animation: dash4 1.5s ease-in-out infinite;
          }

          @keyframes dash4 {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90, 200;
              stroke-dashoffset: -35px;
            }
            100% {
              stroke-dashoffset: -125px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
