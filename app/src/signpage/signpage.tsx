import React, { useState } from "react";
import "./styles.css";
import Register from "../users/component/register/register";
import Login from "../users/component/login/login";

export function SignPage() {
 const [isSignInActive, setSignInActive] = useState(true);

 return (
  <>
   <div
    className={`container ${isSignInActive ? "" : "right-panel-active"}`}
    id="container"
   >
    <Register />
    <Login />
    <div className="overlay-container">
     <div className="overlay">
      <div className="overlay-panel overlay-left">
       <h1>Log in</h1>
       <p>Sign in here if you already have an account </p>
       <button
        className="ghost mt-5"
        id="signIn"
        onClick={() => setSignInActive(true)}
       >
        Sign In
       </button>
      </div>
      <div className="overlay-panel overlay-right">
       <h1>Create, Account!</h1>
       <p>Sign up if you still don't have an account </p>
       <button
        className="ghost"
        id="signUp"
        onClick={() => setSignInActive(false)}
       >
        Sign Up
       </button>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}
