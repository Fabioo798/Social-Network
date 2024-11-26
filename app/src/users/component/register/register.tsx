import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { asyncRegister, asyncLogin } from "../../services/thunks";
import { AppDispatch } from "../../../core/store/store";
import { registerCredential, loginCredential } from "../../model/types";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [registerStatus, setRegisterStatus] = useState("");
  const [showRegisterMessage, setShowRegisterMessage] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);

const handleSubmit = async (
  values: registerCredential,
  { setSubmitting, resetForm }: FormikHelpers<registerCredential>
) => {
  try {
    await dispatch(asyncRegister(values)).unwrap();
    setSubmitting(false);
    resetForm();
    setRegisterStatus("success"); // Successful registration message
    setShowRegisterMessage(true);
    setTimeout(() => {
      setShowRegisterMessage(false);
    }, 3000);

    // Introduce a delay before attempting to login
    setTimeout(async () => {
      try {
        const loginValues: loginCredential = { email: values.email, password: values.password };
        await dispatch(asyncLogin(loginValues)).unwrap();
        setLoginStatus("success"); // Successful login message
      } catch (loginError) {
        setLoginStatus("error"); // Error during login
        setShowLoginMessage(true);
        setTimeout(() => {
          setShowLoginMessage(false);
        }, 3000);
        console.error("Login Error:", loginError); // Log detailed error for debugging
      }
    }, 2000); // 2-second delay before login attempt

  } catch (error) {
    setSubmitting(false);
    setRegisterStatus("error"); // Error during registration
    setShowRegisterMessage(true);
    setTimeout(() => {
      setShowRegisterMessage(false);
    }, 3000);
    console.error("Registration Error:", error); // Log detailed error for debugging
  }
};


  return (
    <div className="form-container sign-up-container">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1>Sign Up</h1>
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
            <span>Or use your Email for registration</span>
            <label>
              <Field type="text" name="name" placeholder="Name" />
            </label>
            <label>
              <Field type="email" name="email" placeholder="Email" />
            </label>
            <label>
              <Field type="password" name="password" placeholder="Password" />
            </label>
            <button type="submit" disabled={isSubmitting} style={{ marginTop: "9px" }}>
              Sign up
            </button>
            {showRegisterMessage && (
              <div className="register-status">
                {registerStatus === "error"
                  ? "Unable to register. Please try again."
                  : "Registration successful!"}
              </div>
            )}
            {showLoginMessage && loginStatus === "error" && (
              <div className="login-status">
                Unable to log in. Please try again.
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
