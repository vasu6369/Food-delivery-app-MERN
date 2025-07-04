import React, { useContext, useState } from "react";
import { StoreContext } from "../context/Context";

export default function Fooddetails() {
  const { foodlist, handleUpdate, handleDelete, handleAddFood } = useContext(StoreContext);
  const [newFood, setNewFood] = useState({ name: "", description: "", price: "", url: "" });
  const [selectedFood, setSelectedFood] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const handlechanges = () => {
    const val = handleUpdate(selectedFood);
    if (val) {
      setShowModal(false);
    }
  };

  const handleInputChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const res = handleAddFood(newFood);
      if (res) {
        setNewFood({ name: "", description: "", price: "", url: "" });
        document.getElementById("closeModal").click();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center text-uppercase fw-bold text-primary">Food Items</h2>

      <div className="text-end mb-3">
        <button className="btn btn-success shadow-sm fw-bold" data-bs-toggle="modal" data-bs-target="#addFoodModal">
          Add New Food
        </button>
      </div>

      <div className="row">
        {foodlist.length > 0 ? (
          foodlist.map((food) => (
            <div className="col-12 col-md-4 col-lg-3 mb-4" key={food._id}>
              <div className="card shadow border-0 rounded-3 overflow-hidden">
                <img src={food.url} className="card-img-top" alt={food.name} style={{ height: "160px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold text-dark">{food.name}</h5>
                  <p className="card-text text-muted">{food.description}</p>
                  <p className="fw-bold text-success">₹{food.price}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary btn-sm px-3 fw-bold" onClick={() => handleEdit(food)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-danger btn-sm px-3 fw-bold" onClick={() => handleDelete(food._id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-danger">
            <h4>No Food Items Available</h4>
          </div>
        )}
      </div>

      {showModal && selectedFood && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog ">
              <div className="modal-content shadow">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">✏️ Edit Food Item</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <label className="fw-bold">Name:</label>
                  <input type="text" className="form-control mb-2" value={selectedFood.name} onChange={(e) => setSelectedFood({ ...selectedFood, name: e.target.value })} />
                  <label className="fw-bold">Description:</label>
                  <input type="text" className="form-control mb-2" value={selectedFood.description} onChange={(e) => setSelectedFood({ ...selectedFood, description: e.target.value })} />
                  <label className="fw-bold">Price:</label>
                  <input type="text" className="form-control mb-2" value={selectedFood.price} onChange={(e) => setSelectedFood({ ...selectedFood, price: e.target.value })} />
                  <label className="fw-bold">Image URL:</label>
                  <input type="text" className="form-control mb-2" value={selectedFood.url} onChange={(e) => setSelectedFood({ ...selectedFood, url: e.target.value })} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button className="btn btn-primary" onClick={handlechanges}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="modal fade" id="addFoodModal" tabIndex="-1" aria-labelledby="addFoodModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content shadow">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title" id="addFoodModalLabel">➕ Add New Food</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Food Name</label>
                  <input type="text" className="form-control" name="name" value={newFood.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea className="form-control" name="description" value={newFood.description} onChange={handleInputChange} required></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Price</label>
                  <input type="number" className="form-control" name="price" value={newFood.price} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Image URL</label>
                  <input type="text" className="form-control" name="url" value={newFood.url} onChange={handleInputChange} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">Close</button>
              <button type="button" className="btn btn-primary fw-bold" onClick={handleAdd}>Save Food</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
