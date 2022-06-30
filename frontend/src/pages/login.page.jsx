import { Fragment } from "react";
import { useSelector } from "react-redux";

import LoginForm from "../components/login-form.component";
import SignUpBlock from "../components/sign-up-block.component";
import { selectUserIsLoading } from "../store/user/user.selector";
import Spinner from "../components/spinner.component";

const Login = () => {
  const isLoading = useSelector(selectUserIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <LoginForm />
          <SignUpBlock />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
