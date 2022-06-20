import { useState, Fragment } from "react";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import { createUser } from "../utils/users.utils";
import Button from "./button.component";
import { Title, AuthenticationForm, Input } from "../app.styles";

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
      toast.success("A user is successfully created");
      navigate("/");
    } catch (error) {
      console.log("Error occure when sign up:", error);
      if (error.response.data.username) {
        toast.error("A user with this username is already created");
      } else if (error.response.data.email) {
        toast.error("A user with this email is already created");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Fragment>
      <Title>Sign up</Title>
      <AuthenticationForm onSubmit={handleSubmit}>
        <Input
          label="Username"
          required
          onChange={handleChange}
          name="username"
          value={username}
          placeholder="Username"
        />
        <Input
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          placeholder="Email"
        />
        <Input
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          placeholder="Password"
        />
        <Button type="submit">Creare Account</Button>
      </AuthenticationForm>
    </Fragment>
  );
};

export default SignUpForm;
