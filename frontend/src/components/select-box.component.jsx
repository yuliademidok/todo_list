import { Select } from "../app.styles";

const SelectBox = ({ children, ...otherProps }) => {
  return <Select {...otherProps}>{children}</Select>;
};

export default SelectBox;
