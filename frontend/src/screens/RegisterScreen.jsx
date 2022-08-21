import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../common/Input";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { register } from "../store/actions/userActions";
import validateFormikUsingJoi from "../utils/validateFormikUsingJoi";
import Joi from "joi";
import {
  confirmPasswordError,
  emailRegex,
  emailRegexError,
  passwordRegex,
  passwordRegexError,
} from "../utils/regex";
import Meta from "../common/Meta";
import { toastifySuccess } from "../utils/toastify";

const RegisterScreen = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo) {
      toastifySuccess("Registered successfully");
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

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
        .email({ tlds: { allow: false } })
        .regex(emailRegex)
        .messages(emailRegexError)
        .required()
        .label("Email"),
      password: Joi.string()
        .min(6)
        .required()
        .regex(passwordRegex)
        .messages(passwordRegexError)
        .label("Password"),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages(confirmPasswordError)
        .label("Confirm Password"),
    }),
    onSubmit(values) {
      dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
    },
  });

  return (
    <>
      <Meta title="B-Ballers Store - Sign up" />

      <FormContainer>
        <h1>Sign Up</h1>

        {loading && <Loader />}

        {error && <Message variant="danger">{error}</Message>}

        <Form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
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
            placeholder="Enter Password"
            type="password"
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
    </>
  );
};

export default RegisterScreen;
