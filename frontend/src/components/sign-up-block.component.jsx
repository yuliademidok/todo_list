import { useNavigate } from "react-router-dom";

import Button from "./button.component";
import { Subtitle, AuthenticationForm } from "../app.styles";

const SignUpBlock = () => {
  const navigate = useNavigate();

  const addSubtaskHandler = () => {
    navigate("sign-up");
  };

  return (
    <AuthenticationForm>
      <Subtitle>Don't have an account?</Subtitle>
      <Button buttonType="delete" onClick={addSubtaskHandler}>Register</Button>
    </AuthenticationForm>
  );
};

export default SignUpBlock;
