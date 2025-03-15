// Файл components/LoadingIndicator.tsx
import React from "react";

export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-transparent rounded-full border-blue-500 animate-spin">
        <svg
          className="absolute inset-0 w-full h-full rotate-45"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21L16.2426 16.2426"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
