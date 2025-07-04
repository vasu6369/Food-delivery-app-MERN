import React, { useContext } from "react";
import { StoreContext } from "../context/Context";

export default function UserDetails() {
  const { users,handleDeleteuser } = useContext(StoreContext);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold text-primary">User List</h2>

      <div className="row">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="col-lg-3 col-md-4 col-12">
              <div className="card shadow-lg mb-4 border-0 bg-light">
                <div className="card-header text-center bg-gradient bg-secondary text-white rounded-top">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="rounded-circle border border-3 border-white shadow-sm"
                    style={{ width: "90px", height: "90px" }}
                  />
                  <h5 className="mt-2 fw-bold">{user.name}</h5>
                  <p className="mb-0 fst-italic">{user.email}</p>
                </div>

                <div className="card-body">

                  <div className="d-flex flex-row justify-content-evenly">
                    <div>
                    <p>Role: <span className="fw-bold">{user.role}</span></p>
                    <p>Cart Items: <span className="fw-bold">{Object.keys(user.cart || {}).length}</span></p>
                    </div>
                    <div>
                    <p>Wishlist Items: <span className="fw-bold">{Object.keys(user.wishlist || {}).length}</span></p>
                    <p>Orders Placed: <span className="fw-bold">{Object.keys(user.orders || {}).length}</span></p>
                    </div>
                  </div>

                  
                  
                </div>

                <div className="card-footer text-center bg-light border-0">
                  <button className="btn btn-outline-danger btn-sm w-75 rounded-3" onClick={()=>{handleDeleteuser(user._id)}}>
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-danger">
            <h4>No Users Found</h4>
          </div>
        )}
      </div>
    </div>
  );
}
