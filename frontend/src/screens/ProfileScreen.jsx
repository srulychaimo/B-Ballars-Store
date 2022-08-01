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

const ProfileScreen = () => {
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        form.setValues({
          name: user.name,
          email: user.email,
          password: "",
          confirmPassword: "",
        });
      }
    }
  }, [userInfo, user, success]);

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit(values) {
      if (values.password !== values.confirmPassword) {
        setMessage("Password do not match");
      } else {
        dispatch(
          updateUserProfile({
            id: user._id,
            name: values.name,
            email: values.email,
            password: values.password,
          })
        );
      }
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
            label="Name"
            placeholder="Enter Name"
          />
          <Input
            {...form.getFieldProps("email")}
            label="Email Address"
            placeholder="Enter Email Address"
          />
          <Input
            {...form.getFieldProps("password")}
            label="Password"
            type="password"
            placeholder="Enter Password"
          />
          <Input
            {...form.getFieldProps("confirmPassword")}
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />

          <Button type="submit" variant="primary" className="my-3">
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
