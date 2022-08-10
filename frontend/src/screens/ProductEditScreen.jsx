import { useFormik } from "formik";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../store/actions/productActions";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      price: 0,
      image: "",
      description: "",
      countInStock: 0,
      category: "",
      brand: "",
    },

    onSubmit(values) {
      console.log(values);
    },
  });

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      form.setValues({
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        countInStock: product.countInStock,
        category: product.category,
        brand: product.brand,
      });
    }
  }, [dispatch, product, productId]);

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
            <Input
              {...form.getFieldProps("name")}
              label="Name"
              placeholder="Enter Name"
            />
            <Input
              {...form.getFieldProps("price")}
              type="number"
              label="Price"
              placeholder="Enter Price"
            />

            <Input
              {...form.getFieldProps("image")}
              label="Image"
              placeholder="Enter Image url"
            />
            <Input
              {...form.getFieldProps("description")}
              label="Description"
              placeholder="Enter Description"
            />

            <Input
              {...form.getFieldProps("countInStock")}
              type="number"
              label="Count In Stock"
              placeholder="Enter Count In Stock"
            />

            <Input
              {...form.getFieldProps("category")}
              label="Category"
              placeholder="Enter Category"
            />
            <Input
              {...form.getFieldProps("brand")}
              label="Brand"
              placeholder="Enter Brand"
            />

            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
