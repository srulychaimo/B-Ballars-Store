import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

const Input = ({ name, label, error, addFormControl, ...rest }) => {
  return (
    <>
      <FormGroup controlId={name} className="my-3">
        <FormLabel>{label}</FormLabel>
        <FormControl {...rest} isInvalid={error} />
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
        {addFormControl}
      </FormGroup>
    </>
  );
};

export default Input;
