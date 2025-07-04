import React from "react";
import { FaCheckCircle, FaClock, FaShippingFast, FaBoxOpen } from "react-icons/fa";

const steps = [
  { label: "Pending", icon: <FaClock /> },
  { label: "Preparing", icon: <FaBoxOpen /> },
  { label: "Out for Delivery", icon: <FaShippingFast /> },
  { label: "Delivered", icon: <FaCheckCircle /> },
];

const statusColors = ["secondary", "info", "primary", "success"];

const OrderTracker = ({ currentStatus }) => {
  const currentIndex = steps.findIndex((s) => s.label === currentStatus);

  return (
    <div className="position-relative px-2">
      <div className="position-absolute top-50 start-0 translate-middle-y w-100" style={{ height: "4px", backgroundColor: "#e0e0e0", zIndex: 0, borderRadius: "50px", }}>
        <div
          style={{ height: "100%", width: `${(currentIndex / (steps.length - 1)) * 100}%`, background: "linear-gradient(to right, #0d6efd, #0dcaf0)", transition: "width 0.4s ease-in-out", borderRadius: "50px", }}></div>
      </div>

      <div className="d-flex justify-content-between text-center position-relative" style={{ zIndex: 1 }}>
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;

          return (
            <div key={index} className="flex-fill">
              <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 shadow-sm ${isCompleted ? `bg-${statusColors[index]} text-white` : "bg-white border text-muted"}`} style={{ width: "50px", height: "50px", fontSize: "20px", }}>
                {step.icon}
              </div>
              <div className={`small ${isCompleted ? "fw-semibold text-dark" : "text-muted"}`}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
