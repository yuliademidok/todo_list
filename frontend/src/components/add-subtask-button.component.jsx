import { useNavigate } from "react-router-dom";

import Button from "./button.component";

const AddSubtaskButton = ({ parent_id, buttonType }) => {
  const navigate = useNavigate();

  const addSubtaskHandler = () => {
    navigate(`/${parent_id}/new-subtask`);
  };

  return (
    <Button buttonType={buttonType} onClick={addSubtaskHandler}>
      Add subtask
    </Button>
  );
};

export default AddSubtaskButton;
