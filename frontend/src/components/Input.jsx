import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <FormGroup controlId={name} className="my-3">
      <FormLabel>{label}</FormLabel>
      <FormControl {...rest} />
      <FormControl.Feedback type={error && "invalid"}>
        {error}
      </FormControl.Feedback>
    </FormGroup>
  );
};

export default Input;
