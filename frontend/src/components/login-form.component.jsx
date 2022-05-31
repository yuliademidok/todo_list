import { useState } from "react";

import { login } from "../utils/users.utils";

const LoginForm = () => {
  const [formFields, setFromFields] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formFields;

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
      console.log(currentUser);
    } catch (error) {
      if (error.response.status === 401) {
        alert("Incorrect username or password");
      }
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
