import { useState, useContext } from "react";

import { login } from "../utils/users.utils";
import { UserContext } from "../context/user.context";
import Button from "./button.component";
import { Title } from "../app.styles";

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
    <div>
      <Title>Sign In</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            label="Username"
            required
            onChange={handleChange}
            name="username"
            value={username}
          />
        </div>
        <div>
          <input
            label="Password"
            required
            type="password"
            onChange={handleChange}
            name="password"
            value={password}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
