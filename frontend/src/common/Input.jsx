import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

const Input = ({ name, label, error, passwordIcon, ...rest }) => {
  return (
    <>
      <FormGroup controlId={name} className="my-3">
        <FormLabel>{label}</FormLabel>
        <FormControl {...rest} isInvalid={error} />
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
      </FormGroup>
    </>
  );
};

export default Input;
