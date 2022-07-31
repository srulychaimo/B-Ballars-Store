import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo]);

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(values) {
      console.log(values);
      dispatch(login(values));
    },
  });

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={form.handleSubmit}>
        <Input {...form.getFieldProps("email")} label="Email Address" />
        <Input
          {...form.getFieldProps("password")}
          label="Password"
          type="password"
        />

        <Button type="submit" variant="primary" className="my-3">
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
