import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getUserDetails,
  updateUserProfile,
} from "../store/actions/userActions";
import { listMyOrders } from "../store/actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../store/constants/userConstants";
import validateFormikUsingJoi from "../utils/validateFormikUsingJoi";
import Joi from "joi";
import {
  confirmPasswordError,
  emailRegex,
  emailRegexError,
  passwordRegex,
  passwordRegexError,
} from "../utils/regex";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = () => {
  const [message, setMessage] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: loadingOrders,
    orders,
    error: errorOrders,
  } = useSelector((state) => state.orderListMy);
  const { loading, user, error } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);

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
        .messages(emailRegexError)
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
      setUpdateSuccess(true);

      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    },
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (!user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails("profile"));
      dispatch(listMyOrders());
    } else {
      form.setValues({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [user, success]);

  return (
    <Row>
      <Col md={4} lg={3}>
        <h2>User Profile</h2>

        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {updateSuccess && <Message variant="success">Profile Updated</Message>}

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
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
