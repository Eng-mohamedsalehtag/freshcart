import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="relative flex items-center justify-center w-20 h-20 mb-6">
        {/* Outer static ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-100"></div>

        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-green-500 border-t-transparent animate-spin"></div>

        {/* Inner pulsing circle */}
        <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-800">Loading...</h2>
        <div className="flex items-center justify-center space-x-1">
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
