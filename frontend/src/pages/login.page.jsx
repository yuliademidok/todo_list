import { Fragment } from "react";

import LoginForm from "../components/login-form.component";

const Login = () => {

  return (
    <Fragment>
      <LoginForm />
      <h2>Don't have an account?</h2>
      <a href="sign-up">Register</a>
    </Fragment>
  );
};

export default Login;
