import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [foodlist, setFoodlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchFood();
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchFood = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/foods/list`);
      if (response.data.success) {
        setFoodlist(response.data.data);
      } else {
        console.log("Error fetching food items");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/foods/listorders`);
      if (res.data.success) {
        setOrders(res.data.data);
        setTotalOrders(res.data.data.length);

        const revenue = res.data.data.reduce((acc, order) => acc + parseFloat(order.amount), 0);
        setTotalRevenue(revenue);
      } else {
        console.log("Error fetching orders");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getusers`);
      if (res.data.success) {
        setUsers(res.data.users);
        setTotalUsers(res.data.users.length); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (selectedFood) => {
    try {
      const res = await axios.put(`${BASE_URL}/foods/updatefood`, selectedFood);
      if (res.data.success) {
        alert(res.data.msg);
        fetchFood();
        return true;
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/foods/deletefood/${_id}`);
      if (res.data.success) {
        alert(res.data.msg);
        fetchFood();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleAddFood = async (newFood) => {
    try {
      const res = await axios.post(`${BASE_URL}/foods/add`, newFood);
      if (res.data.success) {
        alert("Food item added successfully!");
        fetchFood();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };


  const handleDeleteuser = async (_id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/user/deleteuser/${_id}`);
      if (res.data.success) {
        alert(res.data.msg);
        fetchUsers();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };


  const contextValue = {
    fetchFood,
    handleUpdate,
    handleDelete,
    handleAddFood,
    foodlist,
    orders,
    users,
    totalUsers,
    totalOrders,
    totalRevenue,
    handleDeleteuser
  };

  return (
  <StoreContext.Provider value={contextValue}>
    {props.children}
    </StoreContext.Provider>);
};
