/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../core/store/store";
import { loginCredential } from "../../model/types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { asyncLogin } from "../../services/thunks";
import { useNavigate } from "react-router-dom";
import { menuOptions } from "../../../core/app/App";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginStatus = useSelector((state: RootState) => state.users.userLoginStatus);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (
    values: loginCredential,
    { setSubmitting, resetForm }: FormikHelpers<loginCredential>
  ) => {
    try {
      await dispatch(asyncLogin(values)).unwrap(); // Use `unwrap` to handle rejections
      setSubmitting(false);
      resetForm();
      navigate(menuOptions[3].path);
    } catch (error) {
      setSubmitting(false);
      setShowMessage(true); // Show the error message
      setTimeout(() => {
        setShowMessage(false); // Hide message after 3 seconds
      }, 3000);
      console.error(error); // Log or set error in state
    }
  };

  return (
    <div className="form-container sign-in-container">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" target="_blank" className="social">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" target="_blank" className="social">
                <i className="fab fa-codepen"></i>
              </a>
              <a href="#" target="_blank" className="social">
                <i className="fab fa-google"></i>
              </a>
            </div>
            <span> Or sign in using E-Mail Address</span>
            <label>
              <Field type="email" placeholder="Email" name="email" />
            </label>
            <label>
              <Field type="password" placeholder="Password" name="password" />
            </label>
            <a href="#">Forgot your password?</a>
            <button type="submit" disabled={isSubmitting}>Sign In</button>
            {((isSubmitting || (showMessage && loginStatus === "error"))) && (
              <div className="login-status">
                {loginStatus === "error" ? "Unable to log in. Please try again." : loginStatus}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
