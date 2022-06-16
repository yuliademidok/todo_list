import {
  BaseButton,
  DeleteButton,
  AddTodoButton,
  SmallButton,
} from "../app.styles";

const getButton = (buttonType = "base") =>
  ({
    base: BaseButton,
    addTodo: AddTodoButton,
    delete: DeleteButton,
    small: SmallButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const Button = getButton(buttonType);

  return <Button {...otherProps}>{children}</Button>;
};

export default Button;
