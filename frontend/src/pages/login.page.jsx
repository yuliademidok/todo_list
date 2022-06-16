import { Fragment } from "react";

import LoginForm from "../components/login-form.component";
import SignUpBlock from "../components/sign-up-block.component";

const Login = () => {
  return (
    <Fragment>
      <LoginForm />
      <SignUpBlock />
    </Fragment>
  );
};

export default Login;
