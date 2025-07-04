import React, { useContext, useMemo } from "react";
import { StoreContext } from "../context/Context";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function OrderAnalytics() {
  const { orders } = useContext(StoreContext);

  const orderTrends = useMemo(() => {
    const groupedOrders = orders.reduce((acc, order) => {
      const date = new Date(order.date).toLocaleDateString(); 
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(groupedOrders)
      .map(([date, count]) => ({ date, orders: count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [orders]);

  return (
    <div className="container mt-4 ">
      <h2 className="text-center fw-bold ">Order Trends</h2>

      <div className="card p-4 ">
        <h5 className="text-center">Orders Per Day</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#28a745" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
