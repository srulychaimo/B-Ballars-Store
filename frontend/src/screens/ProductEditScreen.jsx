import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Message from "../components/Message";
import httpService from "../services/httpService";
import {
  listProductDetails,
  updateProduct,
} from "../store/actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../store/constants/productConstants";

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

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
      dispatch(
        updateProduct({
          _id: productId,
          ...values,
        })
      );
    },
  });

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
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
    }
  }, [dispatch, product, productId, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await httpService.post("/api/upload", formData, config);

      form.setValues({ ...form.values, image: data });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

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

            <Form.Group
              controlId="imageFile"
              className="mb-3"
              onChange={uploadFileHandler}
            >
              <Form.Label>Choose File</Form.Label>
              <Form.Control type="file" />
              {uploading && <Loader />}
            </Form.Group>

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
