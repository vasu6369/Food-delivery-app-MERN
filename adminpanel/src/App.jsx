import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Fooddetails from "./pages/Fooddetails";
import OrderDetails from "./pages/OrderDetails";
import UserDetails from "./pages/Userdetails";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4 main-content" style={{marginLeft:"250px"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fooddetails" element={<Fooddetails />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
