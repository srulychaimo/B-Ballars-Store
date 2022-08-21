import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../common/Input";
import { resetPassword } from "../store/actions/userActions";
import Joi from "joi";
import validateFormikUsingJoi from "../utils/validateFormikUsingJoi";
import {
  confirmPasswordError,
  passwordRegex,
  passwordRegexError,
} from "../utils/regex";
import Meta from "../common/Meta";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { toastifySuccess } from "../utils/toastify";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { userId, token } = useParams();
  const { loading, success, error } = useSelector(
    (state) => state.userPasswordReset
  );

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: validateFormikUsingJoi({
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
        resetPassword(
          {
            password: values.password,
          },
          userId,
          token
        )
      );
    },
  });

  useEffect(() => {
    if (success) {
      toastifySuccess("Password updated!");
      navigate("/login");
    }
  }, [success, navigate]);

  return (
    <>
      <Meta title="Reset Password" />
      <FormContainer>
        <h1>Choose your new password</h1>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={form.handleSubmit}>
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
            Save password
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ResetPassword;
