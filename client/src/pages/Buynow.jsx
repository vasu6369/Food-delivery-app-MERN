import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/Context';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import api from '../api';
import { BASE_URL,NOMINATIM_URL } from "../../config";


export default function Buynow() {
    const { user, cartitems, fooditems, addTocart, removefromCart,clearItemFromCart} = useContext(StoreContext);
    const cartItems = fooditems.filter(item => cartitems[item._id] > 0);
    const grandTotal = cartItems.reduce((total, item) => total + (cartitems[item._id] * item.price), 0);

    const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                fetch(`${NOMINATIM_URL}?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        setFormData(prev => ({ ...prev, address: data.display_name }));
                    })
                    .catch(error => console.error("Error fetching location:", error));
            }, () => alert("Unable to fetch location."));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone  || !formData.address) {
            setError("All fields are required.");
            return;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            setError("Enter a valid 10-digit phone number.");
            return;
          }
        setError(null);

        const orderItems = cartItems.map((item) => ({
            name: item.name, 
            price: item.price, 
            image:item.url,
            quantity: cartitems[item._id]
        }));

        const placeorder=await api.post(`/processorder`,{address:formData.address,items:orderItems,amount:grandTotal,userid:user._id});
        if(placeorder.data.success){
            localStorage.setItem("form",JSON.stringify(formData.address))
            localStorage.setItem("cartitems",JSON.stringify(cartitems));
            window.location.replace(placeorder.data.sessionurl);
        }
        else{
            console.log(placeorder.data.msg);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h2 className="text-center mb-4">CheckOut</h2>
            <div className="row">
                <div className="col-md-7 border rounded-3 p-3 overflow-y-scroll" style={{ maxHeight: '710px' }}>
                    {cartItems.length > 0 && <h5 className='text-center'>Your Cart Items</h5>}
                    {cartItems.length > 0 ?
                        cartItems.map((item, index) => (
                            <div key={index} className="card d-flex flex-row justify-content-between p-2 mb-2 ">
                                <div className='d-flex'>
                                    <img src={item.url} alt={item.name} style={{ height: "80px", width: "80px", objectFit: "cover", borderRadius: "10px", marginRight: "15px" }} />
                                    <div>
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="mb-1 text-muted">Price: ₹{item.price} X {cartitems[item._id]}</p>
                                        <p className="mb-0 text-muted">Total: ₹{cartitems[item._id] * item.price}</p>
                                    </div>
                                </div>
                                <div className='d-flex flex-row align-items-center'>
                                    <div className="d-flex flex-row  mx-3">
                                        <button className="btn btn-secondary btn-sm" onClick={() => removefromCart(item)}>-</button>
                                        <span className="mx-2 fw-bold">{cartitems[item._id]}</span>
                                        <button className="btn btn-secondary btn-sm" onClick={() => addTocart(item)}>+</button>
                                    </div>
                                    <button className="btn btn-danger btn-sm ml-5" onClick={() => clearItemFromCart(item)} >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        ))
                        :
                        <p className='text-center text-muted'>your cart is empty</p>
                    }
                </div>
                <div className="col-md-5">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="text-center">Delivery Details</h5>
                            {error && <p className="text-danger text-center fw-bold">{error}</p>}
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">👤 Name</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">📞 Phone</label>
                                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">📧 Email</label>
                                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">🏠 Address</label>
                                    <textarea className="form-control" name="address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
                                </div>
                            </form>
                            <button className="btn btn-outline-primary w-100 mb-3" onClick={getLocation}>Get Current Location</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className='text-center'>Payment Summary</h5>
                            <p>Total Items: {cartItems.length}</p>
                            <p><strong>Total: ₹ {grandTotal}/-</strong></p>
                            <button className="btn btn-success w-100" onClick={handleSubmit} disabled={cartItems.length === 0}>Proceed to Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
