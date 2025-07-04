import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const navigate = useNavigate();
  const { user,fooditems, getuser, getdetails } = useContext(StoreContext);
    const cartitems=JSON.parse(localStorage.getItem("cartitems"));
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
  if (!success) {
    navigate("/");
    return;
  }

  if (user && fooditems.length > 0 && !orderPlaced) {
    console.log({ success, user, fooditems, orderPlaced ,cartitems});
    setOrderPlaced(true);
    const cartItems = fooditems.filter((item) => cartitems[item._id] > 0);
    const grandTotal = cartItems.reduce(
      (total, item) => total + cartitems[item._id] * item.price,
      0
    );
console.log("cart items:: ",cartitems);

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      image: item.url,
      quantity: cartitems[item._id],
    }));
    console.log("order Items: ",orderItems)
    const formdata = JSON.parse(localStorage.getItem("form"));

    const changeOrder = async () => {
      try {
        const res = await axios.post("http://localhost:8000/user/changeorder", {
          address: formdata,
          items: orderItems,
          amount: grandTotal,
          userid: user._id,
        });
        console.log("Order API response:", res.data);

        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.removeItem("form");

          await Swal.fire({
            title: "Order Placed!",
            text: "Your order has been placed successfully.",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });

          await getdetails();
          navigate("/myorders");
        } else {
          console.error(res.data.msg);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if(orderItems.length>0){console.log("Calling changeOrder with:", orderItems);changeOrder();}
  }
}, [success, user, fooditems,cartitems]);

    
  if (!user) {
    return (
      <div className="text-center mt-5 pt-5">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        ></div>
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-5 pt-5">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      ></div>
      <p>Processing your order...</p>
    </div>
  );
}
