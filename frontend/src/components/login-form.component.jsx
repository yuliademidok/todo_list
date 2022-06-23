import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import { signInStart } from "../store/user/user.action";
import Button from "./button.component";
import { Title, AuthenticationForm, Input } from "../app.styles";

const LoginForm = () => {
  const [formFields, setFromFields] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formFields;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFromFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signInStart(username, password));
  };

  return (
    <Fragment>
      <Title>Sign In</Title>
      <AuthenticationForm onSubmit={handleSubmit}>
        <Input
          label="Username"
          required
          onChange={handleChange}
          name="username"
          value={username}
        />
        <Input
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <Button type="submit">Login</Button>
      </AuthenticationForm>
    </Fragment>
  );
};

export default LoginForm;
