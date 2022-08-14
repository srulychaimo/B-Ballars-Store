import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useFormik } from "formik";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../common/Loader";
import Message from "../common/Message";
import {
  listProductDetails,
  createProductReview,
} from "../store/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../store/constants/productConstants";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successProductReview, error: errorProductReview } =
    useSelector((state) => state.productReviewCreate);

  const form = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
    onSubmit(values) {
      dispatch(createProductReview(id, values));
    },
  });

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      form.resetForm();
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={7} lg={6}>
              <Image src={product.image} alt={`${product.name} image`} fluid />
            </Col>
            <Col md={5} lg={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={5} lg={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={form.handleSubmit}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          {...form.getFieldProps("rating")}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          {...form.getFieldProps("comment")}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary" className="my-3">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
