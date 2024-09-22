import { useDispatch } from "react-redux";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { asyncRegister } from "../../services/thunks";
import { AppDispatch } from "../../../core/store/store";
import { registerCredential } from "../../model/types";

const Register = () => {
 const dispatch = useDispatch<AppDispatch>();

 const handleSubmit = async (
  values: registerCredential,
  { setSubmitting, resetForm }: FormikHelpers<registerCredential>
 ) => {
  try {
   await dispatch(asyncRegister(values));
   setSubmitting(false);
   resetForm();
  } catch (error) {
   setSubmitting(false);
   // handle error
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
     <button type="submit" style={{ marginTop: "9px" }}>
      Sign up
     </button>
    </Form>
   </Formik>
  </div>
 );
};

export default Register;
