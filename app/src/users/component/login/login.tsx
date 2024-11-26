/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../core/store/store";
import { loginCredential } from "../../model/types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { asyncLogin } from "../../services/thunks";

const Login = () => {
 const dispatch = useDispatch<AppDispatch>();

 const loginStatus = useSelector((state: RootState) => state.users.userLoginStatus);

 const handleSubmit = async (
  values: loginCredential,
  { setSubmitting, resetForm }: FormikHelpers<loginCredential>
 ) => {
  try {
   await dispatch(asyncLogin(values));
   setSubmitting(false);
   resetForm();
  } catch (error) {
   setSubmitting(false);
   //handle error
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
            {(isSubmitting || loginStatus === "error") && (
              <div className="login-status">
                {loginStatus === "error" ? "Unable to log in. Please try again." : loginStatus}
             </div>)}
          </Form>
        )}
   </Formik>
  </div>
 );
};

export default Login;
