import { useNavigate } from "react-router-dom";

import Button from "./button.component";

const AddSubtaskButton = ({ parent_id }) => {
  const navigate = useNavigate();

  const addSubtaskHandler = () => {
    navigate(`/${parent_id}/new-subtask`);
  };

  return <Button onClick={addSubtaskHandler}>Add subtask</Button>;
};

export default AddSubtaskButton;
