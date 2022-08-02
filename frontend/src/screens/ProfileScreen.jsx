import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import validateFormikUsingJoi from "../utils/validateFormikUsingJoi";
import Joi from "joi";
import {
  confirmPasswordError,
  emailRegex,
  passwordRegex,
  passwordRegexError,
} from "../utils/regex";

const ProfileScreen = () => {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!user || !user.name) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails("profile"));
      return;
    }
    form.setValues({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
    });
  }, [userInfo, user]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateFormikUsingJoi({
      name: Joi.string().min(2).allow("").label("Name"),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .regex(emailRegex)
        .allow("")
        .label("Email"),
      password: Joi.string()
        .allow("")
        .regex(passwordRegex)
        .messages(passwordRegexError)
        .label("Password"),
      confirmPassword: Joi.string()
        .allow("")
        .valid(Joi.ref("password"))
        .messages(confirmPasswordError)
        .label("Confirm Password"),
    }),
    onSubmit(values) {
      if (values.password !== values.confirmPassword) {
        setMessage("Password do not match");
        return;
      }

      dispatch(
        updateUserProfile({
          id: user._id,
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
      setSuccess(true);
    },
  });

  return (
    <Row>
      <Col md={4} lg={3}>
        <h2>User Profile</h2>

        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}

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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8} lg={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
