import React, { useState, useContext, useEffect } from 'react';
import { StoreContext } from '../context/Context';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, updateuser,changeuserpassword } = useContext(StoreContext);
  
  if (!user) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.picture || "");
  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirmNew: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(null);

  const handleSave = () => {
    const val = updateuser({ _id: user._id, name, picture: image });
    if (val) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (passwords.new && passwords.confirmNew) {
      setPasswordMatch(passwords.new === passwords.confirmNew);
    } else {
      setPasswordMatch(null);
    }
  }, [passwords]);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirmNew) {
      alert("Please fill all password fields!");
      return;
    }
    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }

    const val=changeuserpassword({_id:user._id,current:passwords.current,newpass:passwords.new});
    if(val){
      setShowPasswordFields(false);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4 fw-bold">My Profile</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg">
            <div className="text-center">
              <img 
                src={image || "/default_avatar.jpg"} 
                alt="Profile" 
                className="rounded-circle border shadow-sm" 
                style={{ width: "120px", height: "120px", objectFit: "cover" }} 
              />
            </div>

            <div className="mt-3">
              <label className="form-label fw-bold">Profile Image URL</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter image URL" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                disabled={!editMode} 
              />
            </div>

            <div className="mt-3">
              <label className="form-label fw-bold">Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                disabled={!editMode} 
              />
            </div>

            <div className="mt-3">
              <label className="form-label fw-bold">Email</label>
              <input type="text" className="form-control" value={user?.email} disabled />
            </div>

            {editMode ? (
              <button className="btn btn-success mt-3" onClick={handleSave}>
                Save Changes
              </button>
            ) : (
              <button className="btn btn-primary mt-3" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            )}

            <button className="btn btn-secondary mt-3" onClick={() => setShowPasswordFields(!showPasswordFields)}>
              {showPasswordFields ? "Cancel" : "Change Password"}
            </button>

            {showPasswordFields && (
              <div className="mt-3">
                <label className="form-label fw-bold">Current Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="current"
                  value={passwords.current} 
                  onChange={handlePasswordChange} 
                />

                <label className="form-label fw-bold mt-2">New Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="new"
                  value={passwords.new} 
                  onChange={handlePasswordChange} 
                />

                <label className="form-label fw-bold mt-2">Confirm New Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="confirmNew"
                  value={passwords.confirmNew} 
                  onChange={handlePasswordChange} 
                />
                {passwordMatch !== null && (
                  <span className={`d-block mt-1 ${passwordMatch ? "text-success" : "text-danger"}`}>
                    {passwordMatch ? "Password Matched" : "Password Does Not Match"}
                  </span>
                )}

                <button className="btn btn-success mt-3 w-100" onClick={handleChangePassword}>
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <h4 className="fw-bold">My Account</h4>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/whislist" className="btn btn-secondary">My Wishlist</Link>
          <Link to="/cart" className="btn btn-secondary">My Cart</Link>
          <Link to="/myorders" className="btn btn-secondary">My Orders</Link>
        </div>
      </div>
    </div>
  );
}
