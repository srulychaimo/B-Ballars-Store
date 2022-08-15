import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import { useEffect } from "react";
import { listProducts } from "../store/actions/productActions";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
  const { keyword } = useParams();

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>latest products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
