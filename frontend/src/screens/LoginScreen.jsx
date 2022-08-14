import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../common/Input";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { login } from "../store/actions/userActions";
import Joi from "joi";
import validateFormikUsingJoi from "../utils/validateFormikUsingJoi";
import {
  emailRegex,
  emailRegexError,
  passwordRegex,
  passwordRegexError,
} from "../utils/regex";

const LoginScreen = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? `/${searchParams.get("redirect")}`
    : "/";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateFormikUsingJoi({
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
    }),
    onSubmit(values) {
      dispatch(login(values));
    },
  });

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={form.handleSubmit}>
        <Input
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
          label="Email Address"
          placeholder="Enter Email"
        />
        <Input
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
          label="Password"
          type="password"
          placeholder="Enter Password"
        />

        <Button
          type="submit"
          variant="primary"
          className="my-3"
          disabled={!form.isValid}
        >
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Create a new account
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
