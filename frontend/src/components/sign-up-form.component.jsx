import { useState } from "react";
import { useNavigate } from "react-router";

import { createUser } from "../utils/users.utils";
import { Title } from "../app.styles";

const defaultFormFields = {
  username: "",
  password: "",
  email: "",
};

const SignUpForm = () => {
  const [formFields, setFromFields] = useState(defaultFormFields);
  const { username, password, email } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFromFields(defaultFormFields);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFromFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createUser(formFields);
      resetFormFields();
      navigate("/");
    } catch (error) {
      console.log("Error occure when sign up:", error);
      if (error.response.data.username) {
        alert("A user with this username is already created");
      } else if (error.response.data.email) {
        alert("A user with this email is already created");
      }
    }
  };

  return (
    <div>
      <Title>Sign up</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            label="Username"
            required
            onChange={handleChange}
            name="username"
            value={username}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            label="Email"
            required
            type="email"
            onChange={handleChange}
            name="email"
            value={email}
            placeholder="Email"
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
            placeholder="Password"
          />
        </div>
        <button type="submit">Creare Account</button>
      </form>
    </div>
  );
};

export default SignUpForm;
