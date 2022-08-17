import {
  Button,
  Col,
  Form,
  FormCheck,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useFormik } from "formik";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../store/actions/cartActions";
import { useNavigate } from "react-router-dom";
import Meta from "../common/Meta";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const form = useFormik({
    initialValues: {
      paymentMethod: "PayPal",
    },
    onSubmit(values) {
      dispatch(savePaymentMethod(values.paymentMethod));
      navigate("/placeorder");
    },
  });
  return (
    <>
      <Meta title="Jersey Store - Payment" />
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={form.handleSubmit}>
          <FormGroup>
            <FormLabel as="legend">Select Method</FormLabel>
            <Col>
              <FormCheck
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                {...form.getFieldProps("paymentMethod")}
                checked
              />
            </Col>
          </FormGroup>
          <div className="my-3">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
