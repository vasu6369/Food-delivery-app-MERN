import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import api from "../api"

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [foodlist, setFoodlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [user,setUser]=useState(null);

  useEffect(() => {
    fetchFood();
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchFood = async () => {
    try {
      const response = await api.get(`/foods/list`);
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
      const res = await api.get(`/foods/listorders`);
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
      const res = await api.get(`/user/getusers`);
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
      const res = await api.put(`/foods/updatefood`, selectedFood);
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
      const res = await api.delete(`/foods/deletefood/${_id}`);
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
      const res = await api.post(`/foods/add`, newFood);
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
      const res = await api.delete(`/user/deleteuser/${_id}`);
      if (res.data.success) {
        alert(res.data.msg);
        fetchUsers();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

    const signup = async (details) => {
    try {
      const res = await api.post(`/auth/signup`, details);
      return res.data;
    }
    catch (err) {
      console.log(err);
    }
  };


  const login = async (details) => {
    try {
      const res = await api.post(`/auth/login`, details);
      if (res.data.success) {
        const user = res.data.user;
        console.log(res);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user);
      }
      return res.data;
    }
    catch (err) {
      console.log(err);
    }
  };

    const googlelogin = async (details) => {
    try {
      const res = await api.post(`/auth/googlelogin`, details);
      if (res.data.success) {
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      }
      return res.data;
    }
    catch (err) {
      console.log(err);
    }
  }

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
    signup,
    login,
    googlelogin,
    handleDeleteuser
  };

  return (
  <StoreContext.Provider value={contextValue}>
    {props.children}
    </StoreContext.Provider>);
};
