import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import validateFormikUsingJoi from "../utils/validateFormikUsingJoi";
import Joi from "joi";
import { emailRegex, emailRegexError } from "../utils/regex";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUser } from "../store/actions/userActions";
import { USER_UPDATE_RESET } from "../store/constants/userConstants";

const UserEditScreen = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      isAdmin: false,
    },
    validate: validateFormikUsingJoi({
      name: Joi.string().min(2).required().label("Name"),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .regex(emailRegex)
        .messages(emailRegexError)
        .required()
        .label("Email"),
      isAdmin: Joi.boolean().required(),
    }),
    onSubmit(values) {
      dispatch(
        updateUser({
          _id: userId,
          ...values,
        })
      );
    },
  });

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        form.setValues({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    }
  }, [dispatch, user, userId, successUpdate]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={form.values.isAdmin}
              {...form.getFieldProps("isAdmin")}
            ></Form.Check>

            <Button
              type="submit"
              variant="primary"
              className="my-3"
              disabled={!form.isValid}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
