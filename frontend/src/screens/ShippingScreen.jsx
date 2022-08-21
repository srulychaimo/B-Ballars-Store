import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import FormContainer from "../components/FormContainer";
import Input from "../common/Input";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../store/actions/cartActions";
import { useNavigate } from "react-router-dom";
import Meta from "../common/Meta";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  const form = useFormik({
    initialValues: {
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
    },
    onSubmit(values) {
      dispatch(saveShippingAddress(values));
      navigate("/payment");
    },
  });

  return (
    <>
      <Meta title="B-Ballers Store - Shipping" />

      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={form.handleSubmit}>
          <Input
            {...form.getFieldProps("address")}
            label="Address"
            placeholder="Enter address"
          />
          <Input
            {...form.getFieldProps("city")}
            label="City"
            placeholder="Enter city"
          />
          <Input
            {...form.getFieldProps("postalCode")}
            label="Postal Code"
            placeholder="Enter postal code"
          />
          <Input
            {...form.getFieldProps("country")}
            label="Country"
            placeholder="Enter country"
          />
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

export default ShippingScreen;
