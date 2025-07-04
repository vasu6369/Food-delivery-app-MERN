import React, { useContext } from "react";
import { StoreContext } from "../context/Context";
import OrderAnalytics from "../components/OrderAnalytics";
import FoodAnalytics from "../components/FoodAnalytics";

export default function Analytics() {
    const { users, orders } = useContext(StoreContext);

    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, order) => acc + parseFloat(order.amount), 0);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Analytics Dashboard</h2>

            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card bg-primary text-white p-3 shadow">
                        <h5>Total Users</h5>
                        <h3>{totalUsers}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white p-3 shadow">
                        <h5>Total Orders</h5>
                        <h3>{totalOrders}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-warning text-white p-3 shadow">
                        <h5>Total Revenue</h5>
                        <h3>₹{totalRevenue.toFixed(2)}</h3>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <FoodAnalytics />
                </div>

                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <OrderAnalytics />
                    </div>
                </div>
            </div>

            <div className="card p-4">
                <h5 className="text-center mb-3">Recent Orders</h5>
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Address</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(orders.length-5, orders.length).reverse().map((order) => (
                                <tr key={order._id} className="text-center">
                                    <td className="fw-bold">{order._id}</td>
                                    <td className="text-success fw-bold">₹{order.amount}</td>
                                    <td className="text-wrap">{order.address}</td>
                                    <td className="text-nowrap">{new Date(order.date).toLocaleString()}</td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-danger py-3">
                                        No Orders Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
