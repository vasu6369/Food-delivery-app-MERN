import React, { useContext, useState } from "react";
import { StoreContext } from "../context/Context";
import { FaChevronDown, FaChevronUp, FaMapMarkedAlt, FaRupeeSign, FaShippingFast } from "react-icons/fa";
import OrderTracker from "../components/OrderTracker";

const MyOrders = () => {
    const { myorders } = useContext(StoreContext);
    const [expandedOrders, setExpandedOrders] = useState({});
    const [trackOrders, setTrackOrders] = useState({});

    const toggleOrderItems = (orderId) => {
        setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId], }));
    };

    const toggleTrackOrder = (orderId) => {
        setTrackOrders((prev) => ({ ...prev, [orderId]: !prev[orderId], }));
    };

    const formatDateTime = (date) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "secondary";
            case "Preparing":
                return "info";
            case "Out for Delivery":
                return "primary";
            case "Delivered":
                return "success";
            default:
                return "warning";
        }
    };

    return (
        <div
            className="container mt-5 pt-5"
            style={{ backgroundColor: "var(--bs-body-bg)", color: "var(--bs-body-color)", minHeight: "80vh", }}>
            <h2 className="text-center fw-bold mb-5">My Orders</h2>

            {myorders.length === 0 ? (
                <p className="text-center text-muted fs-5">
                    You haven't placed any orders yet.
                </p>
            ) : (
                myorders
                    .filter((order) => order.items.length > 0 && order.amount !== "0")
                    .map((order) => {
                        const isExpanded = expandedOrders[order._id];
                        const isTracking = trackOrders[order._id];
                        const statusColor = getStatusColor(order.status);

                        return (
                            <div key={order._id} className="card mb-4  shadow rounded-4 px-3 py-4 " style={{ backgroundColor: "var(--bs-card-bg, var(--bs-body-bg))", color: "var(--bs-body-color)", transition: "background-color 0.3s ease", }} >
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">

                                    <div className="flex-grow-1">
                                        <h5 className="fw-bold mb-2 text-primary">
                                            Order Date: {formatDateTime(order.date)}
                                        </h5>

                                        <p className="mb-1 text-wrap">
                                            <FaMapMarkedAlt className="me-2 text-secondary" />
                                            <strong>Address:</strong> {order.address}
                                        </p>

                                        <p className="mb-1">
                                            <FaRupeeSign className="me-2 text-success" />
                                            <strong>Total Amount:</strong> ₹{order.amount}
                                        </p>

                                        <p className="mb-1">
                                            <FaShippingFast className="me-2"/>
                                            <strong>Status:</strong>{" "}
                                            <span
                                                className={` rounded-pill fw-bold  py-1 text-${statusColor}` }
                                            >
                                                
                                                {order.status}
                                            </span>
                                        </p>

                                        {isTracking && <OrderTracker currentStatus={order.status} />}
                                    </div>

                                    <div className="text-md-end d-flex flex-column gap-2 mt-3 mt-md-0">
                                        <button
                                            className={`btn btn-sm fw-semibold d-flex align-items-center justify-content-center gap-2 ${isTracking ? "btn-primary text-white" : "btn-outline-primary"}`}
                                            style={{ borderRadius: "2rem", padding: "0.5rem 1rem", transition: "all 0.3s", whiteSpace: "nowrap",}}
                                            onClick={() => toggleTrackOrder(order._id)}
                                        >
                                            {isTracking ? "Hide Status" : "View Status"}{" "}{isTracking ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>

                                        <button
                                            className={`btn btn-sm fw-semibold d-flex align-items-center justify-content-center gap-2 ${isExpanded ? "btn-secondary text-white" : "btn-outline-secondary"}`}
                                            style={{ borderRadius: "2rem", padding: "0.5rem 1rem", transition: "all 0.3s", whiteSpace: "nowrap",}}
                                            onClick={() => toggleOrderItems(order._id)}
                                        >
                                            {isExpanded ? "Hide Items" : "View Items"}{" "}{isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="row mt-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                                <div className="card border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: "var(--bs-card-bg, var(--bs-body-bg))", color: "var(--bs-body-color)",}}>
                                                    <img src={item.image} alt={`Image of ${item.name}`} className="card-img-top rounded-top-4" style={{ height: "150px", objectFit: "cover", borderBottom: "1px solid var(--bs-border-color, #f0f0f0)", width: "100%",}}/>
                                                    <div className="card-body text-center">
                                                        <h6 className="fw-bold">{item.name}</h6>
                                                        <p className="mb-0">₹{item.price} × {item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
            )}
        </div>
    );
};

export default MyOrders;
