import { useState, useContext, Fragment } from "react";

import { login } from "../utils/users.utils";
import { UserContext } from "../context/user.context";
import Button from "./button.component";
import { Title, AuthenticationForm, Input } from "../app.styles";

const LoginForm = () => {
  const [formFields, setFromFields] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFromFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const currentUser = await login(username, password);
      setCurrentUser(currentUser);
    } catch (error) {
      console.log("Error occure when login:", error);
      if (error.response.status || error.response.status === 401) {
        alert("Incorrect username or password");
      }
    }
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
