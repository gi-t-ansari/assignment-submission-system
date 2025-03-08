import React, { useEffect } from "react";

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: "bg-green-500 border-green-700",
    error: "bg-red-500 border-red-700",
    warning: "bg-yellow-500 border-yellow-700",
    info: "bg-blue-500 border-blue-700",
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 text-white border-l-4 rounded-md shadow-lg animate-slide-in ${typeStyles[type]}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button className="ml-4" onClick={onClose}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default Toast;
