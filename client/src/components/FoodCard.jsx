import React, { useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { StoreContext } from '../context/Context';
import { Link } from 'react-router-dom';

export default function FoodCard({ item }) {
  const { cartitems, addTocart, removefromCart, whishlist, toggleWhishlist } = useContext(StoreContext);

  const Inwishlist = whishlist[item._id];

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3 mb-2">


      <div className="card m-2 food-items rounded-4">

        <div className="position-relative">
          <Link to={`/productdetails/${item._id}`}><img src={item.url} className="card-img-top rounded-4" draggable="false" alt={item.name} style={{ height: "180px", objectFit: "cover" }} /></Link>


          <div className="position-absolute top-0 end-0 m-2" style={{ cursor: "pointer", zIndex: 2 }}>
            {Inwishlist ? (<FaHeart size={24} color="red" onClick={() => { toggleWhishlist(item) }} />) : (<FaRegHeart size={26} color="gray" onClick={() => { toggleWhishlist(item) }} />)}
          </div>


        </div>


        <div className="card-body m-0">
          <h5 className="card-title text-center">{item.name}</h5>
          <p className="card-text text-center m-1">{item.description}</p>

          <div className="d-flex justify-content-around align-items-center p-2">



            <p className="card-text text-center fw-bold fs-5 p-2 m-0">₹ {item.price}</p>


            <div >
              {!cartitems[item._id] ?
                <button className='btn btn-outline-success' onClick={() => addTocart(item)}>Add</button>
                :
                <div className='px-2  border p-2 rounded-2 shadow'>
                  <button className="btn btn-secondary text-white btn-sm" onClick={() => removefromCart(item)}>-</button>
                  <span className="mx-2 fw-bold">{!cartitems[item._id] ? 0 : cartitems[item._id]}</span>
                  <button className="btn btn-secondary text-white btn-sm" onClick={() => addTocart(item)} >+</button>
                </div>}
            </div>
          </div>

        </div>



      </div>

    </div>
  )
}
