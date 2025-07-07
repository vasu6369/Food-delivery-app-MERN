import React, { useContext } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { StoreContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { OAUTH_CLIENT_ID } from '../../config';

const clientId = OAUTH_CLIENT_ID;
console.log(clientId);

export default function Google() {
    const navigate=useNavigate();

    const {googlelogin}=useContext(StoreContext);

    const handleLogin=async(details)=>{
        const res=await googlelogin(details);
        if(res.success){
            
           Swal.fire({
                  title: "Login Successful!",
                  text: "Welcome back! 🎉",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                });

            navigate("/");
        }
        else{
            console.log("Login Failed");
        }
    }

    const onSuccess = (response) => {
        const decoded =jwtDecode(response.credential);
        const name=decoded.name;
        const email=decoded.email;
        const picture=decoded.picture;

        handleLogin({name,email,picture});
      };
      const onFailure = (error) => {
        console.log("Login Error");
      };
    
      return (
        <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
        </GoogleOAuthProvider>
      );
}
