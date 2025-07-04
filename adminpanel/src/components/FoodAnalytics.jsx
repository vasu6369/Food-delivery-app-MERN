import React, { useContext, useMemo } from "react";
import { StoreContext } from "../context/Context";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function FoodAnalytics() {
    const { orders } = useContext(StoreContext);

    const mostOrderedItems = useMemo(() => {
        const itemCount = {};
        orders.forEach((order) => {
            order.items.forEach((item) => {
                itemCount[item.name] = (itemCount[item.name] || 0) + item.quantity;
            });
        });

        return Object.entries(itemCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [orders]);

    const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

    return (
        <div className="card p-4 shadow-lg bordered rounded-4">
            <h5 className="text-center fw-bold "> Most Ordered Items</h5>
            <ResponsiveContainer width="100%" height={440}>
                <PieChart>
                    <Pie
                        data={mostOrderedItems}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={window.innerWidth < 768 ? 100 : 140} 
                        fill="#8884d8"
                        dataKey="count"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                        animationBegin={0}
                        animationDuration={1000}
                    >
                        {mostOrderedItems.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                            fontWeight: "bold",
                        }}
                    />
                    <Legend align="center" verticalAlign="bottom" iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
