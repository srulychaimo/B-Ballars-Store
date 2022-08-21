import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Message from "../common/Message";
import { Link } from "react-router-dom";
import Meta from "../common/Meta";
import { toastifySuccess } from "../utils/toastify";

const CartScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;
  const size = searchParams.get("size") ? searchParams.get("size") : "";

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty, size));
    }
  }, [dispatch, id, qty, size]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toastifySuccess("Product removed from cart!");
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Container>
      <Meta title="B-Ballers Store - Cart" />
      <Row>
        <Col md={12} lg={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/teams/${item.team}/${item.product}`}>
                        {item.name}
                      </Link>
                    </Col>

                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>

                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={5} lg={4}>
          <Card className="mt-md-4 mt-lg-0">
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="/">
                  <Button type="button" className="btn-block" variant="info">
                    Continue Shopping
                  </Button>
                </Link>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
