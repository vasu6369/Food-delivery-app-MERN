import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net";
import "datatables.net-buttons/js/dataTables.buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import { StoreContext } from "../context/Context";
import pdfFonts from "pdfmake/build/vfs_fonts";

window.JSZip = jszip;
window.pdfMake = pdfMake;

const statuses = ["Pending", "Preparing", "Out for Delivery", "Delivered"];

export default function OrdersTable() {
    const tableRef = useRef(null);
    const { orders } = useContext(StoreContext);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [orderStatuses, setOrderStatuses] = useState({});

    useEffect(() => {
        if (!orders || orders.length === 0) return;

        const table = $(tableRef.current).DataTable({
            destroy: true,
            responsive: true,
            dom: '<"row mb-3"<"col-md-6"l><"col-md-6 text-end"B>>rt<"row"<"col-md-6"i><"col-md-6"p>>',
            buttons: [
                {
                    extend: 'excel',
                    text: '📊 Export Excel',
                    className: 'btn btn-success btn-sm mx-1'
                },
                {
                    extend: 'pdf',
                    text: '📄 Download PDF',
                    className: 'btn btn-danger btn-sm mx-1'
                },
                {
                    extend: 'print',
                    text: '🖨️ Print Table',
                    className: 'btn btn-primary btn-sm mx-1'
                }
            ],
            pageLength: 5,
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            order: [[4, "desc"]],
            language: {
                search: "🔍 Search Orders:",
                lengthMenu: "Show _MENU_ Entries",
                paginate: {
                    previous: "⬅️ Prev",
                    next: "Next ➡️"
                }
            }
        });

        return () => {
            if ($.fn.dataTable.isDataTable(tableRef.current)) {
                table.destroy();
            }
        };
    }, [orders]);

    const handleStatusClick = (orderId) => {
        setOpenDropdown(openDropdown === orderId ? null : orderId);
    };

    const handleStatusChange = async(orderId, newStatus) => {
        setOrderStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
        setOpenDropdown(null);
        try{
            const  res=await axios.put(`http://localhost:8000/user/${orderId}/changestatus`,{newStatus});
        }
        catch(err){
            console.log(err);
        }
    };

    if (!orders || orders.length === 0) {
        return <p className="text-center text-danger">No Orders Available</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-primary text-center mb-4">Orders Dashboard</h2>

            <div className="table-responsive shadow p-3 bg-white rounded">
                <table ref={tableRef} className="table table-hover table-bordered">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer ID</th>
                            <th>Amount</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const currentStatus = orderStatuses[order._id] || order.status;

                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.userid}</td>
                                    <td className="text-success fw-bold">₹{order.amount}</td>
                                    <td>{order.address}</td>
                                    <td>{new Date(order.date).toLocaleString()}</td>
                                    <td>
                                        <div className="position-relative">
                                            <button
                                                className={`btn btn-sm ${
                                                    currentStatus === "Delivered"
                                                        ? "btn-success"
                                                        : currentStatus === "Out for Delivery"
                                                        ? "btn-info"
                                                        : currentStatus === "Preparing"
                                                        ? "btn-warning"
                                                        : "btn-secondary"
                                                }`}
                                                onClick={() => handleStatusClick(order._id)}
                                            >
                                                {currentStatus}
                                            </button>

                                            {openDropdown === order._id && (
                                                <ul className="list-group position-absolute mt-1 z-3 w-100 shadow-sm ">
                                                    {statuses.map((status) => (
                                                        <li
                                                            key={status}
                                                            className={`list-group-item list-group-item-action text-center ${
                                                                currentStatus === status ? "active" : ""
                                                            }`}
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleStatusChange(order._id, status)}
                                                        >
                                                            {status}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
