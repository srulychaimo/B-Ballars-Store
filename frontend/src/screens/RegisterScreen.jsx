import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import validateFormikUsingJoi from "../utils/validateFormikUsingJoi";
import Joi from "joi";

const RegisterScreen = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateFormikUsingJoi({
      name: Joi.string().min(2).required().label("Name"),
      email: Joi.string()
        .min(6)
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      password: Joi.string()
        .min(6)
        .required()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .label("Password"),

      confirmPassword: Joi.ref("password"),
    }),
    onSubmit(values) {
      if (form.values.password !== form.values.confirmPassword) {
        setMessage("Password do not match");
      } else {
        dispatch(
          register({
            name: values.name,
            email: values.email,
            password: values.password,
          })
        );
      }
    },
  });

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {loading && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={form.handleSubmit}>
        <Input
          {...form.getFieldProps("name")}
          error={form.touched.name && form.errors.name}
          label="Name"
          placeholder="Enter Name"
        />
        <Input
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
          label="Email Address"
          placeholder="Enter Email Address"
        />
        <Input
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
          label="Password"
          type="password"
          placeholder="Enter Password"
        />
        <Input
          {...form.getFieldProps("confirmPassword")}
          error={form.touched.confirmPassword && form.errors.confirmPassword}
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
        />

        <Button
          type="submit"
          variant="primary"
          className="my-3"
          disabled={!form.isValid}
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an account ?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
