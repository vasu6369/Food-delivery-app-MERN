import { createContext, useEffect, useState,useRef } from "react";
import { toast } from 'react-toastify';
import axios from 'axios'
export const StoreContext = createContext();
import { BASE_URL } from "../../config";
import api from '../api.js'

export const StoreContextProvider = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const [fooditems, setList] = useState([]);


  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const fetchfood = async () => {
    const foodlist = await api.get(`/foods/list`);
    if (foodlist.data.success) {
      setList(foodlist.data.data);
    }
    else {
      console.log("error");
    }
  }

  useEffect(() => { fetchfood(); getuser(); }, []);

const hasFetchedDetails = useRef(false);

useEffect(() => {
  if (user && fooditems.length > 0 && !hasFetchedDetails.current) {
    hasFetchedDetails.current = true;
    getdetails();
  }
}, [user, fooditems]);


  const getdetails = async () => {
    try {
      const res = await api.post(`/user/getdetails`, { _id: user._id });
      if (res.data.success) {
        console.log("context ", res.data.user.cart);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        setCartItems(res.data.user.cart);
        setWhishlist(res.data.user.wishlist);
        fetchOrders(res.data.user.orders);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const fetchOrders = async (orders) => {
    if(orders.length>0){
try {
    const res = await api.post(`/user/getorders`, {
      
      orderIds: orders
    });
    console.log(res.data.orders);
        setMyorders(res.data.orders);
  } catch (err) { 
    console.error("Failed to fetch orders", err);
  }
    }
  
};


  const getuser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setCartItems({});
    setWhishlist({});
    setMyorders([]);
    window.location.reload();
    
  }
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

  const logintoasty = () => {
    toast.warning("Please log in to continue!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
  const [cartitems, setCartItems] = useState({});

  const addTocart = async (item) => {
    try {
      if (!user) {
        logintoasty();
      }
      else {
        const details = { _id: user._id, itemid: item._id };
        const res = await api.post(`/cart/add`, details);
        if (res.data.success) {
          setCartItems(res.data.cart);
          greentoasty(item.name);
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const removefromCart = async (item) => {
    if (!user) {
      logintoasty();
      return;
    }
    try {
      const details = { _id: user._id, itemid: item._id };
      const res = await api.post(`/cart/remove`, details);
      if (res.data.success) {
        setCartItems(res.data.cart);
        redtoasty(item.name);
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  const clearItemFromCart = async (item) => {
    try {
      const details = { _id: user._id, item: item };
      const res = await api.post(`/cart/deleteitem`, details);
      if (res.data.success) {
        setCartItems(res.data.cart);
      }
    }
    catch (err) {
      console.log(err);
    }
  }



  const [whishlist, setWhishlist] = useState([]);

  const toggleWhishlist = async (item) => {
    if (!user) {
      logintoasty();
    }
    else {
      try {
        const details = { _id: user._id, itemid: item._id };
        const res = await api.post(`/wishlist/togglewish`, details);
        setWhishlist(res.data.wish);
      }
      catch (err) {
        console.log(err);
      }
    }

  };

  const greentoasty = (name) => {
    toast.success(`${name} added to cart!`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      newestOnTop: true,
      style: {
        background: "black",
        border: "solid 2px #07bc0c",
        color: "#07bc0c",
        fontWeight: "bold",
        borderRadius: "9px",
      },
    });
  }

  const redtoasty = (name) => {
    toast.error(`${name} removed from cart!`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      style: { width: "350px", background: "black", border: "solid 2px  #e74d3c", color: "#e74d3c", fontWeight: "bold", borderRadius: "9px", },
    });
  }


  const [myorders, setMyorders] = useState([]);



  const updateuser = async (details) => {
    try {
      const res = await api.post(`/user/updateuser`, details);
      if (res.data.success) {

        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);

        toast.success("Profile updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return true;
      }
      else {
        console.log(res.data.msg);
        return false;
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const changeuserpassword = async (details) => {
    try {
      const res = await api.post(`/user/changepassword`, details);
      if (res.data.success) {

        toast.success(`${res.data.msg}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        })
        return true;
      }
      else {
        toast.error(`${res.data.msg}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
      return false;
    }
    catch (err) {
      console.log(err);
    }
  }

  const getreviewsbyid=async(foodId)=>{
    try{
      const res=await api.post(`/review/get`,{foodId});
      if(res.data.success){
        return res.data.data;
      }
      else{
        console.log(res.data.msg);
      }
    }
    catch(err){
      console.log(err);
    }
  }


  const addreview=async(foodId,rating,comment)=>{
    try{
        const res=await api.post(`/review/add`,{foodId,userId:user._id,username:user.name,rating,comment});
        if(res.data.success){
        return res.data.data;
      }
      else{
        console.log(res.data.msg);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const contextValue = {
    fooditems, cartitems, setCartItems, addTocart, removefromCart, whishlist, toggleWhishlist, myorders, signup, login, user, handleLogout, googlelogin, clearItemFromCart, getdetails, toggleTheme, theme, setUser, updateuser, changeuserpassword,getreviewsbyid,addreview
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
