import React, { useContext } from 'react';
import { StoreContext } from '../context/Context';
import FoodAnalytics from './FoodAnalytics';
import OrderAnalytics from './OrderAnalytics';

export default function Dashboard() {
  const { totalUsers, totalOrders, totalRevenue } = useContext(StoreContext);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dashboard Overview</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-lg border-0 rounded-lg text-center p-1 bg-primary text-white">
            <div className="card-body">
              <h5 className="fw-bold">Total Users</h5>
              <h3 className="display-5 fw-bold">{totalUsers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg border-0 rounded-lg text-center p-1 bg-success text-white">
            <div className="card-body">
              <h5 className="fw-bold">Total Orders</h5>
              <h3 className="display-5 fw-bold">{totalOrders}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg border-0 rounded-lg text-center p-1 bg-warning text-dark">
            <div className="card-body">
              <h5 className="fw-bold">Total Revenue</h5>
              <h3 className="display-5 fw-bold">₹{totalRevenue}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4 mt-4">
        <div className="d-none d-md-block col-md-6">
          <FoodAnalytics />
        </div>

        <div className="d-none d-md-block col-md-6">
          <div className="card p-4 shadow">
            <OrderAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}
