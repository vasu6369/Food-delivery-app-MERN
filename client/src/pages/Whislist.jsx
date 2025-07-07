import React, { useContext } from 'react'
import { StoreContext } from '../context/Context'

export default function Whislist() {
    const { fooditems, whishlist, toggleWhishlist } = useContext(StoreContext);

    const whishitems = fooditems.filter((item) => whishlist[item._id]);


    return (
        <div>
            <div className="container mt-5 pt-5">
                {whishitems.length > 0 ?
                    <>
                        <h1 className='text-center'>My Wishlist</h1>
                        <div className="row">
                            {whishitems.map(item => (
                                <div key={item._id} className="col-12 col-sm-6 col-md-3 mt-3 mb-2">
                                    <div className="card food-items rounded-4">
                                        <img src={item.url} className="card-img-top rounded-4" draggable="false" alt={item.name} style={{ height: "150px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{item.name}</h5>
                                            <p className="card-text text-center fw-bold fs-5">₹{item.price}</p>
                                            <p className="card-text text-center">{item.description}</p>
                                            <div className='text-center'>
                                                <button className='btn btn-danger' onClick={() => toggleWhishlist(item)}>Remove from Whislist</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                    <h4 className='text-center text-muted'>Your whislist is Empty</h4>
                }
            </div>
        </div>
    )
}
